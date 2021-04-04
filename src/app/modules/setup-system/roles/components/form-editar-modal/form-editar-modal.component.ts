import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { RolsService } from 'src/app/providers/services';
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

  @Input() nombreRol: string = '';
  @Input() set rolId(rolId: any) {
    this.getRolById(rolId);
  }
  public editarForm: FormGroup = this.buildNuevoForm();

  constructor(private dialogRef: NbDialogRef<FormEditarModalComponent>,
    private rolsService: RolsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.buildNuevoForm();
    this.loadingSpinnerSave = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildNuevoForm() {
    const controls = {
      rol_id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      activo: [true, [Validators.required]],
    };
    // this.editarForm = this.formBuilder.group(controls);
    return this.formBuilder.group(controls);
  }

  public getRolById(leccionId: any) {
    this.rolsService.getById$(leccionId)
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        this.patchValues(response);
      });
  }

  private patchValues(value: any) {
    this.editarForm.patchValue({
      rol_id: value.rol_id,
      nombre: value.nombre,
      activo: value.activo === 1 ? true : false,
    });
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
      this.rolsService.update$(value.rol_id, value)
        .pipe(map(res => res.data),
          takeUntil(this.destroy$))
        .subscribe(response => {
          this.loadingSpinnerSave = false;
          this.dialogRef.close({ cancel: false });
        }, err => {
          this.loadingSpinnerSave = false;
        });
    }
  }



}
