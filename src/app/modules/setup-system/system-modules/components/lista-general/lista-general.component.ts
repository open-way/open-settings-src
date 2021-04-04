import { Component, OnInit, OnDestroy } from '@angular/core';
import { getDateToday } from '../../shared/utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormNuevoModalComponent } from '../form-nuevo-modal/form-nuevo-modal.component';
import { FormEditarModalComponent } from '../form-editar-modal/form-editar-modal.component';
import { ModulosService } from 'src/app/providers/services';
import { Subject } from 'rxjs';
import { AccionesModalComponent } from '../acciones-modal/acciones-modal.component';

@Component({
  selector: 'open-lista-general',
  templateUrl: './lista-general.component.html',
  styleUrls: ['./lista-general.component.scss']
})
export class ListaGeneralComponent implements OnInit, OnDestroy {
  public moduloParents: any[] = [];
  public loadingSpinner: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  get today() {
    return getDateToday();
  }

  constructor(
    private formBuilder: FormBuilder,
    private nbDialogService: NbDialogService,
    private modulosService: ModulosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.loadingSpinner = false;
    this.getParentsChilds();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onRegistrarNuevo() {
    const modal = this.nbDialogService.open(FormNuevoModalComponent);
    modal.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (!res.cancel) {
          this.getParentsChilds();
        }
      }, err => { });
  }

  public onEditar(moduloId: any, moduloNombre: any) {
    const modal = this.nbDialogService.open(FormEditarModalComponent);
    modal.componentRef.instance.moduloId = moduloId;
    modal.componentRef.instance.nombreModulo = moduloNombre;
    modal.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (!res.cancel) {
          this.getParentsChilds();
        }
      }, err => { });
  }

  public onAcciones(moduloId: any, moduloNombre: any) {
    const modal = this.nbDialogService.open(AccionesModalComponent);
    modal.componentRef.instance.moduloId = moduloId;
    // modal.componentRef.instance.nombreModulo = moduloNombre;
    modal.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.getParentsChilds();
        if (!res.cancel) {
        }
      }, err => { });
  }

  public onDelete(rolId: any) {
    if (confirm('¿Seguro?')) {
      this.modulosService.delete$(rolId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(response => {
          this.getParentsChilds();
        });
    }
  }

  // private getMasters() {
  //   const query = { distrito_misionero_id: 1 };
  //   this.iglesiasService.getToFilterByQuery$(query)
  //     .pipe(map(res => res.data))
  //     .subscribe(response => {
  //       this.iglesias = response;
  //     }, err => {
  //     });
  // }
  // public buildFiltrosForm() {
  // const controls = {
  //   activo: [0, [Validators.required]],
  //   iglesia_id: [0, [Validators.required]],
  // };
  // this.filtrosForm = this.formBuilder.group(controls);
  // }

  public getParentsChilds() {
    // const value = this.filtrosForm.value;
    // const valid = this.filtrosForm.valid;
    // if (valid) {
    this.loadingSpinner = true;
    // const query = value;
    this.modulosService.getParentsChilds$()
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.moduloParents = response;
        this.loadingSpinner = false;
      }, err => {
        this.loadingSpinner = false;
      });
    // }
  }

}
