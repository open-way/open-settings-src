import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmailService } from 'src/app/providers/services';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'open-send-email-verify-page',
  templateUrl: './send-email-verify-page.component.html',
  styleUrls: ['./send-email-verify-page.component.scss']
})
export class SendEmailVerifyPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public loading: boolean = false;
  constructor(
    private emailService: EmailService,
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSendOther() {
    this.loading = true;
    this.emailService.verificationNotification$({})
      .pipe(map(res => res.data,
        takeUntil(this.destroy$),
      ))
      .subscribe(response => {
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  

}
