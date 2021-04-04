import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { LambOAuthStoreService, UpeuOAuthStoreService } from '../../oauth/providers/store';
import { environment } from 'src/environments/environment';
import { OpenOAuthStoreService } from 'src/app/oauth/providers';
// import { environment as env } from '@env/environment';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private accessToken: any = 'InitialAuthorizationToken';

  constructor(private lambOAuthStoreService: OpenOAuthStoreService,
    // private upeuOAuthStoreService: UpeuOAuthStoreService
  ) {
  }

  // private subscribeToTokenUpeuChanges() {
  //   this.accessToken = this.upeuOAuthStoreService.getAccessToken();
  // }

  private subscribeToTokenLambChanges() {
    this.accessToken = this.lambOAuthStoreService.getAccessToken();
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (this.urlHaveUpeu(req)) {
    //   this.subscribeToTokenUpeuChanges();
    // } else {
    this.subscribeToTokenLambChanges();
    // }
    const authorizationReq = this.accessToken ? this.setAuthHeader(req) : req;
    const urlReq = this.setUrl(authorizationReq);
    const handleRequest = next.handle(urlReq);
    return handleRequest;
  }

  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const authorization = `Bearer ${this.accessToken}`;
    const header = req.headers
      //.set('Content-Type', 'application/json') /** Optional */
      .set('Authorization', authorization);

    const authorizationReq = req.clone({ headers: header });

    return authorizationReq;
  }

  private setUrl(req: HttpRequest<any>): HttpRequest<any> {
    if (!req.url.includes('assets/')) {

      let URL_API: any;
      let URL_RESOURCE: any;
      // if (this.urlHaveUpeu(req)) {
      //   URL_API = environment.apiUpeuUrl;
      //   URL_RESOURCE = req.url.slice(5);
      // } else {
      URL_API = environment.apiEsUrl;
      URL_RESOURCE = req.url;
      // }


      return req.clone({ url: `${URL_API}${URL_RESOURCE}` });
    } else {
      return req.clone({ url: `${req.url}` });
    }
  }

}
