import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { NbSidebarService, NbMenuService, NbMediaBreakpointsService, NbDialogService } from '@nebular/theme';
import { map, filter, takeUntil, debounceTime } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
// import { TOKEN_OPEN_SHELL_APP_URL } from '../../../oauth/utils';
// import { LambOAuthStoreService, UpeuOAuthStoreService } from '../../../oauth/providers/store';
import { Router, ActivatedRoute } from '@angular/router';
// import { NbThemeService } from '@nebular/theme';
// import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';
import { Subject } from 'rxjs';
// import { StateService } from '../../shared/state.service';
// import { environment } from 'src/environments/environment';
import { TOKEN_OPEN_SHELL_APP_URL } from 'src/app/oauth/shared/utils';
import { OpenOAuthStoreService } from 'src/app/oauth/providers';
import { AuthService } from 'src/app/providers/services';

@Component({
  selector: 'open-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss'],
})
export class HeaderPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public userPictureOnly = false;
  public user: { full_name: string; email: string; picture: string } = { email: '', full_name: '', picture: '' };

  // public theme: NbJSThemeOptions;

  // public userMenu = [
  //   { icon: 'person-outline', title: 'Mi perfil', data: 'profile' },
  //   { icon: 'settings-2-outline', title: 'Mi entidad', data: 'changeenterprise' }
  // ];

  // public enterprise: any;
  @Input() position = 'normal';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sidebarService: NbSidebarService,
    @Inject(DOCUMENT) private document: any,
    @Inject(TOKEN_OPEN_SHELL_APP_URL) private tokenOpenShellAppUrl: string,
    // private nbMenuService: NbMenuService,
    private openOAuthStoreService: OpenOAuthStoreService,
    // private userDataService: UserDataService,
    // private upeuUserDataService: UpeuUserDataService,
    // private usersThemesService: UsersThemesService,
    // private upeuOAuthStoreService: UpeuOAuthStoreService,
    // private themeService: NbThemeService,
    // private stateService: StateService,
    // private breakpointService: NbMediaBreakpointsService,
    // private nbDialogService: NbDialogService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getUser();
    // this.subscribeMenuProfile();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // private subscribeMenuProfile() {
  //   this.nbMenuService.onItemClick()
  //     .pipe(
  //       filter(({ tag }) => tag === 'context-menu-profile'),
  //       map(({ item: { data } }) => data),
  //       takeUntil(this.destroy$),
  //     )
  //     .subscribe(data => {
  //       if (data === 'log-out') {
  //         // this.logout();
  //       } else if (data === 'changeenterprise') {
  //         // const modal = this.nbDialogService.open(ChangeEnterpriseModalComponent);
  //         // modal.onClose.subscribe(res => {
  //         //   if (!res.cancel) {
  //         //     window.location.reload();
  //         //   }
  //         // }, err => { });
  //       } else if (data === 'profile') {
  //         this.router.navigate(['/setup-profile/my-profile'], { relativeTo: this.activatedRoute })
  //       }
  //     });

  //   const { xl } = this.breakpointService.getBreakpointsMap();
  //   this.themeService.onMediaQueryChange()
  //     .pipe(
  //       map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
  //       takeUntil(this.destroy$),
  //     )
  //     .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
  // }

  public onLogout(): boolean {
    this.logout();
    return false;
  }

  private logout() {
    this.authService.logout$()
      .pipe(map(res => res.data,
        takeUntil(this.destroy$),
      ))
      .subscribe(response => {
        this.openOAuthStoreService.clearAll();
        this.router.navigate(['/oauth'], { relativeTo: this.activatedRoute });
      });
  }

  private getUser() {
    this.authService.user$()
      .pipe(map(res => res.data,
        takeUntil(this.destroy$),
      ))
      .subscribe(response => {
        // console.log(response);
        if (response) {
          this.user.email = response.email || '';
          this.user.full_name = response.name || '';
          this.user.picture = response.img_url || '';
        }
      });

    this.loadUsersThemes();
  }

  public loadUsersThemes() {
    // this.themeService.changeTheme('default');
    // const orientationSidebar = this.getOrientationSidebar('left');
    // this.stateService.setSidebarState(orientationSidebar);
  }

  // private getOrientationSidebar(sidebar: any) {
  //   if (sidebar === 'right') {
  //     return {
  //       name: 'Right Sidebar',
  //       icon: 'nb-layout-sidebar-right',
  //       id: 'right',
  //       selected: true,
  //     };
  //   } else if (sidebar === 'left') {
  //     return {
  //       name: 'Left Sidebar',
  //       icon: 'nb-layout-sidebar-left',
  //       id: 'left',
  //       selected: true,
  //     };
  //   }
  // }

  // private loadLambMasters(response) {
  //   this.enterprise = response;
  // }

  private loadUpeuMasters(response: any) {
    this.user = response;
    this.user['full_name'] = `${response.first_name} ${response.last_name}`;
  }

  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  public goToShellApp() {
    this.document.location.href = this.tokenOpenShellAppUrl;
  }
}
