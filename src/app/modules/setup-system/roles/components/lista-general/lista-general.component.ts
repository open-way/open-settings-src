import { Component, OnInit, OnDestroy } from '@angular/core';
import { getDateToday } from '../../shared/utils';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormNuevoModalComponent } from '../form-nuevo-modal/form-nuevo-modal.component';
import { FormEditarModalComponent } from '../form-editar-modal/form-editar-modal.component';
import { RolsService } from 'src/app/providers/services';
import { Subject } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/modules/shared/components';

@Component({
  selector: 'open-lista-general',
  templateUrl: './lista-general.component.html',
  styleUrls: ['./lista-general.component.scss']
})
export class ListaGeneralComponent implements OnInit, OnDestroy {
  public rols: any[] = [];
  public loadingSpinner: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  public textSearch: FormControl = new FormControl();

  get today() {
    return getDateToday();
  }

  public pagination: any = {
    currentPage: 1,
    pageSize: 15,
    totalItems: 15,
  };

  public paginationControls: any = {
    maxSize: 9,
    directionLinks: true,
    responsive: true,
    autoHide: true,
  };

  constructor(private formBuilder: FormBuilder,
    private nbDialogService: NbDialogService,
    private rolsService: RolsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    // Seleccionar si hay params en la ruta
    this.activatedRoute
      .queryParamMap
      .pipe(
        map((res: any) => res.params),
        takeUntil(this.destroy$),
      ).subscribe((response) => {
        if (response.text_search) {
          // setTimeout(() => {
          this.textSearch.patchValue(response.text_search);
          // }, 700);
        }
      });

    this.loadingSpinner = false;
    this.initPagination();
    this.getRols();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public pageChanged(event: any) {
    this.pagination.currentPage = event;
    this.getRols();
  }

  private initPagination() {
    this.pagination.currentPage = 1;
    this.pagination.pageSize = 15;
    this.pagination.totalItems = 0;
  }

  public submitFormSearch() {
    this.getRols();
  }

  public getRols() {
    const textSearch = this.textSearch.value || '';
    const params = {
      text_search: textSearch,
      page: this.pagination.currentPage,
      per_page: this.pagination.pageSize,
    };
    this.loadingSpinner = true;
    this.rolsService.getByQuery$(params)
      .pipe(map(res => res.data),
        takeUntil(this.destroy$),
      )
      .subscribe(response => {
        this.rols = response;
        this.loadingSpinner = false;
      }, err => {
        this.loadingSpinner = false;
      });
  }

  public onRegistrarNuevo() {
    const modal = this.nbDialogService.open(FormNuevoModalComponent);
    modal.onClose
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        if (!res.cancel) {
          this.getRols();
        }
      }, err => { });
  }

  public onView(rol: any) {
    this.router.navigate(['./', rol.rol_id, 'manage-rol-modulos'], {
      relativeTo: this.activatedRoute, queryParams: {
        text_search: this.textSearch.value,
      },
    });
  }

  public onEditar(rolId: any, rolNombre: any) {
    const modal = this.nbDialogService.open(FormEditarModalComponent);
    modal.componentRef.instance.rolId = rolId;
    modal.componentRef.instance.nombreRol = rolNombre;
    modal.onClose
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        if (!res.cancel) {
          this.getRols();
        }
      }, err => { });
  }

  public onDelete(rolId: any) {
    this.nbDialogService.open(ConfirmModalComponent, { context: { mensaje: '¿Estás seguro de eliminar el rol?' } })
      .onClose.subscribe(status => {
        if (status) {
          this.rolsService.delete$(rolId)
            .pipe(
              takeUntil(this.destroy$),
            )
            .subscribe(response => {
              this.getRols();
            });
        } else {
        }
      }, err => {
      });
  }


  public onActivate(rolId: any, activo: any) {
    const data = { activo: !activo };
    this.rolsService.activate$(rolId, data)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(response => {
        this.getRols();
      });
  }

}
