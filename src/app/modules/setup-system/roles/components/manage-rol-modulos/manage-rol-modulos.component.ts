import { Component, OnInit, OnDestroy } from '@angular/core';
import { getDateToday } from '../../shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { RolsService, RolModulosService } from 'src/app/providers/services';
import { Subject } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { AsignarAccionesModalComponent } from '../asignar-acciones-modal/asignar-acciones-modal.component';

@Component({
  selector: 'open-manage-rol-modulos',
  templateUrl: './manage-rol-modulos.component.html',
  styleUrls: ['./manage-rol-modulos.component.scss']
})
export class ManageRolModulosComponent implements OnInit, OnDestroy {
  get today() {
    return getDateToday();
  }

  public rolId: any;
  public rol: any;
  public modulos: any[] = [];
  public loadingSpinner: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  public params: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private rolsService: RolsService,
    private nbDialogService: NbDialogService,
    private rolModulosService: RolModulosService,
  ) { }

  ngOnInit() {
    this.loadingSpinner = false;
    this.activatedRoute.paramMap
      .pipe(map(res => res.get('rolId')),
        takeUntil(this.destroy$),
      )
      .subscribe(rolId => {
        this.rolId = rolId;
        this.getRolById();
        this.getModulesAllByRolId();
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

  public goBack() {
    this.router.navigate(['../../'], {
      relativeTo: this.activatedRoute, queryParams: this.params,
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getModulesAllByRolId() {
    this.loadingSpinner = true;
    this.rolsService.getModulosAll$(this.rolId)
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        // console.log(response);
        this.loadingSpinner = false;
        this.modulos = response;
      }, errr => {
        this.loadingSpinner = false;
      });
  }

  private getRolById() {
    this.rolsService.getById$(this.rolId)
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        this.rol = response;
      });
  }

  public onSaveCheckeds() {
    const modulosChecked: any[] = this.modulos.filter(res => res.asignado);
    this.modulos.forEach(modulo => {
      if (modulo.children) {
        modulo.children.forEach((modu: any) => {
          if (modu.children) {
            modu.children.forEach((mo: any) => {
              if (mo.children) {
                modulosChecked.push(...(mo.children).filter((ress: any) => ress.asignado));
              }
            });
            modulosChecked.push(...(modu.children).filter((ress: any) => ress.asignado));
          }
        });
        modulosChecked.push(...(modulo.children).filter((ress: any) => ress.asignado));
      }
    });

    // if (modulosChecked.length > 0) {
    this.loadingSpinner = true;
    this.rolsService.addModulos$(this.rolId, { modulos_add: modulosChecked })
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        this.loadingSpinner = false;
        this.getModulesAllByRolId();
      }, err => {
        this.loadingSpinner = false;
      });
    // }
  }

  public onSettigAcciones(item: any) {
    const modal = this.nbDialogService.open(AsignarAccionesModalComponent);
    modal.componentRef.instance.data = {
      modulo: item,
      rol_id: this.rolId
    };
    modal.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (!res.cancel) {
          // this.getRols();
        }
      }, err => { });
  }
}
