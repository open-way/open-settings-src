import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {
  FormGroup, FormBuilder, Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { TipoVirtualsService, PersonaVirtualsService } from 'src/app/providers/services';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'open-form-persona-virtual-modal',
  templateUrl: './form-persona-virtual-modal.component.html',
  styleUrls: ['./form-persona-virtual-modal.component.scss']
})
export class FormPersonaVirtualModalComponent implements OnInit, OnDestroy {
  public loadingSpinnerSave: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  public personaVirtualForm: FormGroup = this.formBuilder.group({
    persona_virtual_id: [''],
    direccion: ['', Validators.required],
    activo: [false, Validators.required],
    persona_id: ['', Validators.required],
    tipo_virtual_id: ['', Validators.required],
  });

  @Input() set personaId(personaId: any) {
    this.personaVirtualForm.get('persona_id')?.patchValue(personaId);
  }

  public tipoVirtuals: any[] = [];
  @Input() set virtual(virtual: any) {
    if (virtual) {
      this.patchValues(virtual);
    }
  }

  constructor(private dialogRef: NbDialogRef<FormPersonaVirtualModalComponent>,
    private formBuilder: FormBuilder,
    private tipoVirtualsService: TipoVirtualsService,
    private personaVirtualsService: PersonaVirtualsService,
  ) { }

  ngOnInit() {
    this.loadingSpinnerSave = false;
    this.getMasters();
  }

  private patchValues(virtual: any) {
    this.personaVirtualForm.patchValue({
      persona_virtual_id: virtual.persona_virtual_id,
      direccion: virtual.direccion,
      activo: virtual.activo === 1 ? true : false,
      persona_id: virtual.persona_id,
      tipo_virtual_id: virtual.tipo_virtual_id,
    });
  }
  private getMasters() {
    this.tipoVirtualsService.getAll$()
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe(response => {
        this.tipoVirtuals = response;
      }, err => {
        this.tipoVirtuals = [];
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

    const value = this.personaVirtualForm.value;
    const invalid = this.personaVirtualForm.invalid;

    if (invalid) {
      return;
    }
    const data = {
      persona_virtual_id: value.persona_virtual_id,
      direccion: value.direccion,
      activo: value.activo,
      persona_id: value.persona_id,
      tipo_virtual_id: value.tipo_virtual_id,
    };

    this.loadingSpinnerSave = true;
    if (value.persona_virtual_id) {
      this.personaVirtualsService.update$(value.persona_virtual_id, data)
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
      this.personaVirtualsService.add$(data)
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
