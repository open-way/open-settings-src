import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment';
// import { ToastrService } from 'ngx-toastr';
// import { OpenOAuthStoreService } from 'src/app/oauth/providers';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { OpenOAuthStoreService } from 'src/app/oauth/providers';
// import { LambOAuthStoreService } from 'src/app/oauth/providers/store';
// import { environment } from '@env/environment';

@Injectable()
export class CatchInterceptorService implements HttpInterceptor {
  private started: any;

  constructor(private router: Router,
    private toastrService: NbToastrService,
    // private toastr: ToastrService,
    // private toastrService: NbToastrService,
    private openOAuthStoreService: OpenOAuthStoreService,
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.started = Date.now();
    const handleRequest = next.handle(req);

    return handleRequest.pipe(
      tap(
        (res: HttpEvent<any>) => this.interceptResponse(res, req.method),
        (err: any) => this.catchError(err),
      ),
    );

  }

  private interceptResponse(event: HttpEvent<any>, method: any) {
    if (event instanceof HttpResponse) {
      const elapsed_ms = Date.now() - this.started;
      // console.warn(`La solicitud de ${event.url} tomó ${elapsed_ms} ms.`);
      if (elapsed_ms >= 10 * 1000) {
        console.warn(`La solicitud de ${event.url} tomó ${elapsed_ms} ms.`);
      }
      if (this.isExceptions(event, method)) {
        this.toastByStatus(event.status, event);
      }
    }
  }

  private isExceptions(event: HttpEvent<any>, method: any) {
    const resource = this.getOnlyUrlResource(event);
    if (method === 'GET') {
      return false;
    } else if (this.isFileExceptions(resource)) {
      return false;
    }
    return true;
  }

  private isFileExceptions(resource: any) {
    const exceptions = require('./exceptions.json');
    if (exceptions.indexOf(resource) !== -1) {
      return true;
    }
    return false;
  }

  private getOnlyUrlResource(event: HttpEvent<any>) {
    // const resource = (event.url).replace(environment.apiEsUrl, '');
    // return resource;
    return '';
  }

  private catchError(err: any) {
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    } else {
      console.error(err.message);
    }
    setTimeout(() => {
      this.toastCatchHttpErrorByStatus(err.status, err);
    }, 0);
  }

  private catchHttpError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.catchUnauthorized();
    } if (err.status === 403) {
      this.manageError403(err);
    } else {
      console.warn(err.statusText);
    }
  }

  private manageError403(err: HttpErrorResponse) {
    if (err.error.error && err.error.error.email_notverified) {
      this.router.navigate(['/pages/send-email-verify-page'])
    } else if (err.error.error && err.error.error.user_notactived) {
      this.router.navigate(['/pages/user-desactive-page'])
    }
  }

  private catchUnauthorized() {
    this.cleanAuthData();
    this.setRedirectUrl();
    this.navigateToLogin();
  }

  private cleanAuthData() {
    this.openOAuthStoreService.clearAll();
    // logout();
  }

  private setRedirectUrl() {
    // Esto es temporal en la realidad debe de pedir un accesToken no un Code Authorization
    // this.oauthLambService.getAccessToken();
  }

  private navigateToLogin() {
    this.router.navigateByUrl('/oauth');
  }

  private toastCatchHttpErrorByStatus(status: number, err: HttpErrorResponse) {
    this.toastrService.show(
      this.getMessageCatchHttpError('M', status, err),
      this.getMessageCatchHttpError('T', status),
      { status: this.getClassByStatus(status, (err && err.error.success)), }
    );
  }

  /**
   * T = title; M = message
   */
  private getMessageCatchHttpError(type: 'T' | 'M', status: number, err?: HttpErrorResponse) {
    const message = require('./status-messages.json');
    if (type === 'T') {
      return message[status].title;
    }
    return (err && err.error.error) ? (err && err.error.error.message) : message[status].description;
  }

  private toastByStatus(status: number, event?: HttpResponse<any>) {
    this.toastrService.show(
      this.getMessage('M', status, event),
      this.getMessage('T', status),
      { status: this.getClassByStatus(status, (event && event.body.error)), }
    );
  }

  /**
   * T = title; M = message
   */
  private getMessage(type: 'T' | 'M', status: number, event?: HttpResponse<any>) {
    const message = require('./status-messages.json');
    if (type === 'T') {
      return message[status].title;
    }
    return (event && event.body.error) ? (event && event.body.error.message) : message[status].description;
  }

  get configToast() {
    return {
      progressBar: true,
    };
  }

  private getClassByStatus(status: number, internalSuccess?: boolean): NbComponentStatus {
    let classToast: NbComponentStatus = 'primary';
    if (typeof internalSuccess !== 'undefined' && internalSuccess === false) {
      classToast = 'basic';
    } else
      if (status <= 0) {
        classToast = 'danger';
      } else if (status >= 0 && status < 200) {
        classToast = 'info';
      } else if (status >= 200 && status < 300) {
        classToast = 'success';
      } else if (status >= 300 && status < 400) {
        classToast = 'warning';
      } else if (status >= 400 && status < 500) {
        classToast = 'danger';
      } else if (status >= 500 && status < 600) {
        classToast = 'danger';
      }

    return classToast;
  }
}

