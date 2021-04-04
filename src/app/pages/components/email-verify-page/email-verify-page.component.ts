import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map, takeUntil, } from 'rxjs/operators';
import { EmailService, EmailVerifyService } from 'src/app/providers/services';


@Component({
  selector: 'open-email-verify-page',
  templateUrl: './email-verify-page.component.html',
  styleUrls: ['./email-verify-page.component.scss']
})
export class EmailVerifyPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public loading: boolean = true;
  private url: any;

  public response: any;
  public hasWarninng: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private emailVerifyService: EmailVerifyService,
  ) {
  }

  ngOnInit() {

    this.activatedRoute
      .queryParamMap
      .pipe(
        map((res: any) => res.params),
        takeUntil(this.destroy$),
      ).subscribe((response) => {
        if (response.url) {
          this.url = response.url;
          console.log(this.url);
          this.emailVerify();
        } else {
          // this.router.navigate(['oauth']);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private emailVerify() {
    this.loading = true;
    this.hasWarninng = false;
    this.emailVerifyService.emailVerify$(this.url)
      .pipe(map(res => res.data,
        takeUntil(this.destroy$),
      ))
      .subscribe(response => {
        this.response = response;
        this.loading = false;
        this.hasWarninng = false;
      }, err => {
        this.loading = false;
        this.hasWarninng = true;
      });
  }

  public goToHome() {
    this.router.navigate(['/']);
  }
  
  public onSendOther() {
    this.router.navigate(['/pages/send-email-verify-page']);
  }

}
