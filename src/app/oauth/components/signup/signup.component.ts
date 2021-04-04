import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services';
import { Subject } from 'rxjs';
import { OpenOAuthStoreService } from '../../providers';

@Component({
  selector: 'open-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm = this.buildLoginForm();
  public loadingSpinnerSignup: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  public msmSuccess: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    // private activatedRoute: ActivatedRoute,
    private openOAuthStoreService: OpenOAuthStoreService,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.loadingSpinnerSignup = false;
    // this.buildLoginForm();
  }

  private buildLoginForm() {
    const controls = {
      name: ['', [Validators.required]],
      ap_paterno: ['', [Validators.required]],
      num_doc: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
      terms: [false, [Validators.required, Validators.requiredTrue]],
    };
    // this.signupForm = this.formBuilder.group(controls);
    return this.formBuilder.group(controls);
  }

  public onCreateAccount() {
    const valid = this.signupForm.valid;
    const value = this.signupForm.value;
    if (valid) {
      this.loadingSpinnerSignup = true;
      this.authService.signup$(value)
        .pipe(map(res => res.data),
          takeUntil(this.destroy$))
        .subscribe(response => {
          if (response.access_token) {
            this.openOAuthStoreService.setAccessToken(response.access_token);
            // this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
            this.router.navigate(['/']);
          };
          // this.msmSuccess = response;
          // this.router.navigate(['../login'], { relativeTo: this.activatedRoute });
          this.loadingSpinnerSignup = false;
        }, err => {
          this.loadingSpinnerSignup = false;
        });
    }
  }
}
