import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map, takeUntil, } from 'rxjs/operators';
import { EmailService, EmailVerifyService } from 'src/app/providers/services';


@Component({
  selector: 'open-user-desactive-page',
  templateUrl: './user-desactive-page.component.html',
  styleUrls: ['./user-desactive-page.component.scss']
})
export class UserDesactivePageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public loading: boolean = true;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goToHome() {
    this.router.navigate(['/']);
  }
  
}
