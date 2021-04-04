import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AuthService } from 'src/app/providers/services';

@Component({
  selector: 'open-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public personaInSession: any;
  public userInSession: any;
  public isMyProfile = true;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getMasters();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getMasters() {
    this.authService.persona$()
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe(response => {
        this.personaInSession = response;
      }, err => {
        this.personaInSession = null;
      });

    this.authService.user$()
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe(response => {
        this.userInSession = response;
        // this.patchDataInform();
      }, err => {
        this.userInSession = null;
      });
  }



}
