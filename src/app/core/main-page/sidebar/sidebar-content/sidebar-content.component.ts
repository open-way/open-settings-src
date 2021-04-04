import { Component, OnInit, Inject, ElementRef } from '@angular/core';
// import {UserModulesService} from '@providers/services';
import { map } from 'rxjs/operators';
import { NbSidebarService } from '@nebular/theme';
import {
  // UserModulesService,
  ModulosService
} from 'src/app/providers/services';
import { TOKEN_OPEN_CREDENTIALS_APP, CredentialsApp } from 'src/app/oauth/shared/utils';

@Component({
  selector: 'open-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss'],
})
export class SidebarContentComponent implements OnInit {
  public isSingleClick = false;
  public items = [];
  constructor(
    @Inject(TOKEN_OPEN_CREDENTIALS_APP) protected tokenOpenCredentialsApp: CredentialsApp,
    protected element: ElementRef,
    protected sidebarService: NbSidebarService,
    private modulosService: ModulosService,
  ) { }

  ngOnInit() {
    this.getModulosParentsChilds();
  }

  private getModulosParentsChilds() {
    this.modulosService.getParentsChildsSidenav$(this.tokenOpenCredentialsApp.client_code)
      // this.modulosService.getParentsChildsSidenav$()
      .pipe(map(response => response.data))
      .subscribe(this.loadUserModules.bind(this));
  }

  private loadUserModules(response: any) {
    this.items = response;
  }

  public onClickMenu(event: any): void {
    const menu = this.element.nativeElement.querySelector('lamb-menu');
    if (menu && menu.contains(event.target)) {
      let link = event.target;
      const linkChildren = ['span', 'i'];
      // Si hacemos click en span - Obtenemos el link.
      if (linkChildren.indexOf(link.tagName.toLowerCase()) !== -1 && link.parentNode) {
        link = event.target.parentNode;
      }
      // Nosotros solo expandimos si un item tiene hijos.
      if (link && link.nextElementSibling && link.nextElementSibling.classList.contains('lamb-menu-items')) {
        this.sidebarService.toggle(true, 'lateral-menu-sidebar');
        this.sidebarService.expand('lateral-menu-sidebar');
      }
      if (this.isSingleClick && link && link.href) {
        const lin: string[] = link.href.split('/#');
        if (lin.length < 2) {
          this.sidebarService.toggle(true, 'lateral-menu-sidebar');
        }
      }
    }
  }

}
