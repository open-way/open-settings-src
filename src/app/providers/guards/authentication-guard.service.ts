import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OpenOAuthStoreService } from 'src/app/oauth/providers';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuardService implements CanActivate {

  constructor(private router: Router, private openOAuthStoreService: OpenOAuthStoreService,
  ) { }

  canActivate(): boolean {
    if (!this.openOAuthStoreService.getAccessToken()) {
      this.router.navigate(['oauth']);
      return false;
    } else {
      return true;
    }
  }

}
