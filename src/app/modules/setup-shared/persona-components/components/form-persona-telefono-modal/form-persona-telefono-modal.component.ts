import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {
  FormGroup, FormBuilder, Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { TipoTelefonosService, PersonaTelefonosService } from 'src/app/providers/services';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'open-form-persona-telefono-modal',
  templateUrl: './form-persona-telefono-modal.component.html',
  styleUrls: ['./form-persona-telefono-modal.component.scss']
})
export class FormPersonaTelefonoModalComponent implements OnInit, OnDestroy {
  public loadingSpinnerSave: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  public personaTelefonoForm: FormGroup = this.formBuilder.group({
    persona_telefono_id: [''],
    num_telefono: ['', Validators.required],
    es_privado: [false, Validators.required],
    activo: [false, Validators.required],
    persona_id: ['', Validators.required],
    tipo_telefono_id: ['', Validators.required],
  });

  public tipoTelefonos: any[] = [];

  @Input() set personaId(personaId: any) {
    this.personaTelefonoForm.get('persona_id')?.patchValue(personaId);
  }

  @Input() set telefono(telefono: any) {
    if (telefono) {
      this.patchValues(telefono);
    }
  }

  constructor(private dialogRef: NbDialogRef<FormPersonaTelefonoModalComponent>,
    private formBuilder: FormBuilder,
    private tipoTelefonosService: TipoTelefonosService,
    private personaTelefonosService: PersonaTelefonosService,
  ) { }

  ngOnInit() {
    this.loadingSpinnerSave = false;
    this.getMasters();
  }

  private patchValues(telefono: any) {
    this.personaTelefonoForm.patchValue({
      persona_telefono_id: telefono.persona_telefono_id,
      num_telefono: telefono.num_telefono,
      es_privado: telefono.es_privado,
      activo: telefono.activo === 1 ? true : false,
      persona_id: telefono.persona_id,
      tipo_telefono_id: telefono.tipo_telefono_id,
    });
  }
  private getMasters() {
    this.tipoTelefonosService.getAll$()
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe(response => {
        this.tipoTelefonos = response;
      }, err => {
        this.tipoTelefonos = [];
      });
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

  public onSave() {
    const value = this.personaTelefonoForm.value;
    const invalid = this.personaTelefonoForm.invalid;

    if (invalid) {
      return;
    }
    const data = {
      persona_virtual_id: value.persona_virtual_id,
      num_telefono: value.num_telefono,
      es_privado: value.es_privado,
      activo: value.activo,
      persona_id: value.persona_id,
      tipo_telefono_id: value.tipo_telefono_id,
    };

    this.loadingSpinnerSave = true;
    if (value.persona_telefono_id) {
      this.personaTelefonosService.update$(value.persona_telefono_id, data)
        .pipe(
          map(res => res.data),
          takeUntil(this.destroy$),
        )
        .subscribe(values => {
          this.loadingSpinnerSave = false;
          setTimeout(() => {
            this.dialogRef.close({ cancel: false });
          }, 50);
        }, err => {
          this.loadingSpinnerSave = false;
        });
    } else {
      this.personaTelefonosService.add$(data)
        .pipe(
          map(res => res.data),
          takeUntil(this.destroy$),
        )
        .subscribe(values => {
          this.loadingSpinnerSave = false;
          setTimeout(() => {
            this.dialogRef.close({ cancel: false });
          }, 50);
        }, err => {
          this.loadingSpinnerSave = false;
        });
    }
  }



}
