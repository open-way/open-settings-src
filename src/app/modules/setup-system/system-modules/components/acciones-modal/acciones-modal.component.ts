import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { ModulosService, ModuloAccionsService } from 'src/app/providers/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'open-acciones-modal',
  templateUrl: './acciones-modal.component.html',
  styleUrls: ['./acciones-modal.component.scss']
})
export class AccionesModalComponent implements OnInit, OnDestroy {
  public nuevoForm: FormGroup = this.formBuilder.group({
    modulo_id: ['', [Validators.required]],
    modulo_accion_id: [''],
    nombre: ['', [Validators.required]],
    llave: ['', [Validators.required]],
  });

  public loadingSpinnerSave: boolean = false;
  public moduloAcciones: any[] = [];
  @ViewChild('nombre') nombre: ElementRef | undefined;

  // public aModuloId: boolean;
  private destroy$: Subject<void> = new Subject<void>();
  @Input() set moduloId(moduloId: any) {
    // this.aModuloId = moduloId;
    this.nuevoForm.get('modulo_id')?.patchValue(moduloId);
    this.getModuloAccions();
  }

  constructor(private dialogRef: NbDialogRef<AccionesModalComponent>,
    private modulosService: ModulosService,
    private moduloAccionsService: ModuloAccionsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadingSpinnerSave = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onClose() {
    setTimeout(() => {
      this.dialogRef.close({ cancel: true });
    }, 50);
  }

  public editarAccion(item: any) {
    this.nuevoForm.patchValue({
      modulo_accion_id: item.modulo_accion_id,
      modulo_id: item.modulo_id,
      nombre: item.nombre,
      llave: item.llave,
    });
  }

  public onSave() {
    const value = this.nuevoForm.value;
    const invalid = this.nuevoForm.invalid;
    if (invalid) { return; }

    const data = {
      nombre: value.nombre,
      llave: value.llave,
      modulo_id: value.modulo_id,
    };

    if (value.modulo_accion_id) {
      this.loadingSpinnerSave = true;
      this.moduloAccionsService.update$(value.modulo_accion_id, data)
        .pipe(map(res => res.data),
          takeUntil(this.destroy$))
        .subscribe(response => {
          this.cleanForm();
          this.getModuloAccions();
          this.loadingSpinnerSave = false;
        }, err => {
          this.loadingSpinnerSave = false;
        });
    } else {
      this.loadingSpinnerSave = true;
      this.moduloAccionsService.add$(data)
        .pipe(map(res => res.data),
          takeUntil(this.destroy$))
        .subscribe(response => {
          this.cleanForm();
          this.getModuloAccions();
          // this.dialogRef.close({ cancel: false });
          this.loadingSpinnerSave = false;
        }, err => {
          this.loadingSpinnerSave = false;
        });
    }
  }

  private getModuloAccions() {
    this.moduloAccionsService.getByQuery$({ modulo_id: this.nuevoForm.get('modulo_id')?.value })
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        this.moduloAcciones = response;
      }, err => {
      });
  }

  public eliminarAccion(item: any) {
    this.moduloAccionsService.delete$(item.modulo_accion_id)
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        this.getModuloAccions();
      }, err => {
      });
  }

  public cleanForm() {
    this.nuevoForm.patchValue({
      modulo_accion_id: '',
      nombre: '',
      llave: '',
    });
    this.nombre?.nativeElement.focus();
  }

}
