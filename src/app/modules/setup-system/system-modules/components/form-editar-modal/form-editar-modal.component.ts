import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { ModulosService } from 'src/app/providers/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'open-form-editar-modal',
  templateUrl: './form-editar-modal.component.html',
  styleUrls: ['./form-editar-modal.component.scss']
})
export class FormEditarModalComponent implements OnInit, OnDestroy {
  public iglesia: any;
  public loadingSpinnerSave: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  @Input() nombreModulo: string = '';
  @Input() set moduloId(moduloId: any) {
    this.getModuloById(moduloId);
  }
  public editarForm: FormGroup = this.buildNuevoForm();
  public modulos: any[] = [];

  constructor(private dialogRef: NbDialogRef<FormEditarModalComponent>,
    private modulosService: ModulosService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.buildNuevoForm();
    this.getMaters();
    this.loadingSpinnerSave = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getMaters() {
    this.modulosService.getAll$()
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        this.modulos = response;
      });
  }

  private buildNuevoForm() {
    const controls = {
      modulo_id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      link: ['', [Validators.required]],
      order: ['', [Validators.required]],
      icon: [''],
      parent_id: [''],
      codigo: ['', [Validators.required]],
      group: [false, [Validators.required]],
      home: [false, [Validators.required]],
      is_mobile: [false, [Validators.required]],
      activo: [true, [Validators.required]],
    };
    // this.editarForm = this.formBuilder.group(controls);
    return this.formBuilder.group(controls);
  }

  public getModuloById(moduloId: any) {
    this.modulosService.getById$(moduloId)
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        this.patchValues(response);
      });
  }

  private patchValues(value: any) {
    setTimeout(() => {
      this.editarForm.patchValue({
        modulo_id: value.modulo_id,
        title: value.title,
        link: value.link,
        order: value.order,
        icon: value.icon,
        parent_id: value.parent_id,
        codigo: value.codigo,
        group: value.group === 0 ? false : true,
        home: value.home === 0 ? false : true,
        is_mobile: value.is_mobile === 0 ? false : true,
        activo: value.activo === 0 ? false : true,
      });
    }, 0);
  }

  public onClose() {
    setTimeout(() => {
      this.dialogRef.close({ cancel: true });
    }, 50);
  }

  public onSave() {
    const value = this.editarForm.value;
    const valid = this.editarForm.valid;
    if (valid) {
      this.loadingSpinnerSave = true;
      this.modulosService.update$(value.modulo_id, value)
        .pipe(map(res => res.data),
          takeUntil(this.destroy$))
        .subscribe(response => {
          this.dialogRef.close({ cancel: false });
          this.loadingSpinnerSave = false;
        }, err => {
          this.loadingSpinnerSave = false;
        });
    }
  }
}
