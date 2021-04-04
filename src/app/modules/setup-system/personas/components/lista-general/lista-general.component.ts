import { Component, OnInit, OnDestroy } from '@angular/core';
import { getDateToday } from '../../shared/utils';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormNuevoModalComponent } from '../form-nuevo-modal/form-nuevo-modal.component';
import { FormEditarModalComponent } from '../form-editar-modal/form-editar-modal.component';
import { UsersService, PersonasService } from 'src/app/providers/services';
import { Subject, Subscription } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/modules/shared/components';
import { ManageAutorizationService } from 'src/app/providers/guards';

@Component({
  selector: 'open-lista-general',
  templateUrl: './lista-general.component.html',
  styleUrls: ['./lista-general.component.scss']
})
export class ListaGeneralComponent implements OnInit, OnDestroy {
  public personas: any[] = [];
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
  public subscribe1: Subscription | undefined;
  public acctions = {
    canFilterAllDeptos: false,
  };

  constructor(
    // private formBuilder: FormBuilder,
    private nbDialogService: NbDialogService,
    private personasService: PersonasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private manageAutorizationService: ManageAutorizationService,
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
          this.textSearch.patchValue(response.text_search);
        }
      });

    this.loadingSpinner = false;
    this.getPersonas();
    this.initPagination();
    this.manageActions();
  }

  private manageActions() {
    this.subscribe1 = this.manageAutorizationService.isAutorized('FILTER_ALL_DEPTOS').subscribe(ress => {
      this.acctions.canFilterAllDeptos = ress;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public pageChanged(event: any) {
    this.pagination.currentPage = event;
    this.getPersonas();
  }

  private initPagination() {
    this.pagination.currentPage = 1;
    this.pagination.pageSize = 15;
    this.pagination.totalItems = 0;
  }

  public submitFormSearch() {
    this.getPersonas();
  }

  public getPersonas() {
    const textSearch = this.textSearch.value || '';
    const params = {
      text_search: textSearch,
      page: this.pagination.currentPage,
      per_page: this.pagination.pageSize,
    };

    this.loadingSpinner = true;
    this.personasService.getByQuery$(params)
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        this.personas = response;
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
          this.router.navigate(['./', res.persona_id], { relativeTo: this.activatedRoute });
        }
      }, err => { });
  }

  public onEditar(item: any) {
    this.router.navigate(['./', item.persona_id], {
      relativeTo: this.activatedRoute, queryParams: {
        text_search: this.textSearch.value,
      },
    });
  }

  // public onEditar(userId, userNombre) {
  //   const modal = this.nbDialogService.open(FormEditarModalComponent);
  //   modal.componentRef.instance.userId = userId;
  //   modal.componentRef.instance.nombreUser = userNombre;
  //   modal.onClose
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(res => {
  //       if (!res.cancel) {
  //         this.getPersonas();
  //       }
  //     }, err => { });
  // }

  public onDelete(item: any) {
    this.nbDialogService.open(ConfirmModalComponent, { context: { mensaje: '¿Estás seguro de eliminar la persona?' } })
      .onClose.subscribe(status => {
        if (status) {
          this.personasService.delete$(item.persona_id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
              this.getPersonas();
            });
        } else {
        }
      }, err => {
      });
  }


}
