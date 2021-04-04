import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { map } from 'rxjs/operators';
// import { ActivatedRoute, Router } from '@angular/router';
// import { OpenOAuthStoreService } from '../../providers';
import { AuthService } from 'src/app/providers/services';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'open-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public resetPasswordForm: FormGroup = this.buildResetPasswordForm();
  public loadingResetPassword: boolean = false;

  private token: any;
  private email: any;
  public msmSuccess: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.loadingResetPassword = false;
    // this.buildResetPasswordForm();

    this.activatedRoute
      .queryParamMap
      .pipe(
        map((res: any) => res.params),
        takeUntil(this.destroy$),
      ).subscribe((response) => {
        if (response.token && response.email) {
          this.token = response.token;
          this.email = response.email;
        } else {
          this.router.navigate(['oauth']);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildResetPasswordForm() {
    const controls = {
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    };
    // this.resetPasswordForm = this.formBuilder.group(controls);
    return this.formBuilder.group(controls);
  }

  public onResetPassword() {
    const valid = this.resetPasswordForm.valid;
    const value = this.resetPasswordForm.value;
    if (valid) {
      const data = {
        token: this.token,
        email: this.email,
        password: value.password,
        password_confirmation: value.password_confirmation,
      };

      this.loadingResetPassword = true;
      this.authService.resetPassword$(data)
        .pipe(map(res => res.data,
          takeUntil(this.destroy$),
        )).subscribe(response => {
          this.msmSuccess = response;
          this.loadingResetPassword = false;
        }, err => {
          this.loadingResetPassword = false;
        });
    }
  }

}
