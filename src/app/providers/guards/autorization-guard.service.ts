import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
// import { Location } from '@angular/common';
import { StoreUserActionsService } from './store-user-actions.service';
import { AccessService } from '../services';
import { ManageAutorizationService } from './manage-autorization.service';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class AutorizationGuardService implements CanActivate, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private storeUserActionsService: StoreUserActionsService,
    private accessService: AccessService,
    private manageAutorizationService: ManageAutorizationService,
    // private location: Location,
    private toastrService: NbToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    const codigoModule = route.data.module;

    /**
     * Load new actions for module os users
     */
    if (codigoModule) {
      this.loadActions(codigoModule)
        .pipe(map(res => res.data), takeUntil(this.destroy$))
        .subscribe(this.loadActionsInStore.bind(this));

      return this.manageAutorizationService.isAutorizedInit()
        .pipe(map((res: boolean) => {
          if (!res) {

            this.router.navigate(['/pages/unauthorized-page'], { relativeTo: this.activatedRoute });
            // this.location.back();
            // this.toastrService.show(
            //   'La operación solicitada no está permitida para el usuario.',
            //   'Prohibido',
            //   { status: 'danger' }
            // );
          }
          return res;
        }));
    }
    return of(true);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadActionsInStore(response: any) {
    const actions = response || [];
    this.storeUserActionsService.setUserActions(actions);
  }

  private loadActions(codigoModule: string): Observable<any> {
    return this.accessService.getActionsByModuloCodigo$(codigoModule);
  }
}
