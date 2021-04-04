import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenOAuthStoreService } from '../../providers';
import { AuthService } from 'src/app/providers/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'open-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup = this.buildLoginForm();
  public loadingSpinnerLogin: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private openOAuthStoreService: OpenOAuthStoreService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.loadingSpinnerLogin = false;
    // this.buildLoginForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildLoginForm() {
    const controls = {
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember_me: [false, [Validators.required]],
    };
    // this.loginForm = this.formBuilder.group(controls);
    return this.formBuilder.group(controls);
  }

  public onLogin() {
    const valid = this.loginForm.valid;
    const value = this.loginForm.value;
    if (valid) {
      this.loadingSpinnerLogin = true;
      this.authService.login$(value)
        .pipe(map(res => res.data,
          takeUntil(this.destroy$),
        )).subscribe(response => {
          if (response.access_token) {
            this.openOAuthStoreService.setAccessToken(response.access_token);
            this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
          }
          this.loadingSpinnerLogin = false;
        }, err => {
          this.loadingSpinnerLogin = false;
        });
    }
  }

}
