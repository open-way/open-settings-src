import { Component, OnInit, Inject } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { TOKEN_OPEN_SHELL_APP_URL } from 'src/app/oauth/shared/utils';

@Component({
  selector: 'open-sidebar-footer',
  templateUrl: './sidebar-footer.component.html',
  styleUrls: ['./sidebar-footer.component.scss'],
})
export class SidebarFooterComponent implements OnInit {

  public userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
    @Inject(TOKEN_OPEN_SHELL_APP_URL) private tokenOpenShellAppUrl: string,
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnInit() {
  }

  get year() {
    return new Date().getFullYear();
  }
  get devTeam() {
    return 'OPEN';
  }

  get version() {
    return '1.0.0';
  }
  get envName() {
    return environment.production ? '' : 'dev';
  }
  get isProd() {
    return false;
  }
  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  public goToShellApp() {
    this.document.location.href = this.tokenOpenShellAppUrl;
  }
}
