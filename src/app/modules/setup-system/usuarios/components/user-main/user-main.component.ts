import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { UsersService } from 'src/app/providers/services';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'open-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public userInSession: any;
  public userId: any;
  public isMyProfile = false;

  public params: any;
  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap
      .pipe(
        map(res => res.get('id')),
        takeUntil(this.destroy$)
      ).subscribe(user_id => {
        this.userId = user_id;
        this.getUser();
      });

    this.activatedRoute
      .queryParamMap
      .pipe(
        map((res: any) => res.params),
        takeUntil(this.destroy$),
      ).subscribe((response) => {
        this.params = response;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getUser() {
    this.usersService.getById$(this.userId)
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe(response => {
        this.userInSession = response;
      }, err => {
        this.userInSession = null;
      });
  }

  public onBack() {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute, queryParams: this.params,
    });
  }
}
