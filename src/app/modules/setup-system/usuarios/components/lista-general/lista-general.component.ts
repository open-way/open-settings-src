import { Component, OnInit, OnDestroy } from '@angular/core';
import { getDateToday } from '../../shared/utils';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormNuevoModalComponent } from '../form-nuevo-modal/form-nuevo-modal.component';
import { FormEditarModalComponent } from '../form-editar-modal/form-editar-modal.component';
import { FormManageRolesModalComponent } from '../form-manage-roles-modal/form-manage-roles-modal.component';
import { UsersService } from 'src/app/providers/services';
import { Subject } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/modules/shared/components';

@Component({
  selector: 'open-lista-general',
  templateUrl: './lista-general.component.html',
  styleUrls: ['./lista-general.component.scss']
})
export class ListaGeneralComponent implements OnInit, OnDestroy {
  public users: any[] = [];
  public loadingSpinner: boolean = false;
  public textSearch: FormControl = new FormControl();
  private destroy$: Subject<void> = new Subject<void>();

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
  // public currentPage: number;
  // public pageSize: number;
  // public totalItems: number;

  constructor(private formBuilder: FormBuilder,
    private nbDialogService: NbDialogService,
    private usersService: UsersService,
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

    // this.loadingSpinner = false;
    this.getUsers();
    this.initPagination();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public pageChanged(event: any) {
    this.pagination.currentPage = event;
    this.getUsers();
  }

  private initPagination() {
    this.pagination.currentPage = 1;
    this.pagination.pageSize = 15;
    this.pagination.totalItems = 0;
  }

  public submitFormSearch() {
    this.getUsers();
  }

  public getUsers() {
    const textSearch = this.textSearch.value || '';
    const params = {
      text_search: textSearch,
      page: this.pagination.currentPage,
      per_page: this.pagination.pageSize,
    };

    this.loadingSpinner = true;
    this.usersService.getByQuery$(params)
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        this.users = response;
        this.loadingSpinner = false;
      }, err => {
        this.loadingSpinner = false;
      });
  }

  public onRegistrarNuevo() {
    const modal = this.nbDialogService.open(FormNuevoModalComponent);
    modal.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (!res.cancel) {
          // this.getUsers();
          this.onEditar(res.user_id)
        }
      }, err => { });
  }

  public onManageRols(userId: any, userNombre: any) {
    const modal = this.nbDialogService.open(FormManageRolesModalComponent);
    modal.componentRef.instance.userId = userId;
    modal.componentRef.instance.nombreUser = userNombre;
    modal.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (!res.cancel) {
          this.getUsers();
        }
      }, err => { });
  }

  public onEditar(userId: any) {
    this.router.navigate(['./', userId], {
      relativeTo: this.activatedRoute, queryParams: {
        text_search: this.textSearch.value,
      },
    });
  }

  public onDelete(userId: any) {
    this.nbDialogService.open(ConfirmModalComponent, { context: { mensaje: '¿Estás seguro de eliminar el usuario?' } })
      .onClose.subscribe(status => {
        if (status) {
          this.usersService.delete$(userId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
              this.getUsers();
            });
        } else {
        }
      }, err => {
      });

  }


}
