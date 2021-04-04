import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { ModulosService } from 'src/app/providers/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'open-form-nuevo-modal',
  templateUrl: './form-nuevo-modal.component.html',
  styleUrls: ['./form-nuevo-modal.component.scss']
})
export class FormNuevoModalComponent implements OnInit, OnDestroy {
  public nuevoForm: FormGroup = this.buildNuevoForm();
  public loadingSpinnerSave: boolean = false;
  public modulos: any[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dialogRef: NbDialogRef<FormNuevoModalComponent>,
    private modulosService: ModulosService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadingSpinnerSave = false;
    // this.buildNuevoForm();
    this.getMaters();
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
    // this.nuevoForm = this.formBuilder.group(controls);
    return this.formBuilder.group(controls);
  }

  public onClose() {
    setTimeout(() => {
      this.dialogRef.close({ cancel: true });
    }, 50);
  }

  public onSave() {
    const value = this.nuevoForm.value;
    const valid = this.nuevoForm.valid;
    if (valid) {
      this.loadingSpinnerSave = true;
      this.modulosService.add$(value)
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
