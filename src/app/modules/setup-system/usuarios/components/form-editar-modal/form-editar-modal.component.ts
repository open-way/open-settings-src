import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { UsersService } from 'src/app/providers/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'open-form-editar-modal',
  templateUrl: './form-editar-modal.component.html',
  styleUrls: ['./form-editar-modal.component.scss']
})
export class FormEditarModalComponent implements OnInit, OnDestroy {
  public loadingSpinnerSave: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  @Input() nombreUser: string = '';
  @Input() set userId(userId: any) {
    this.getUserById(userId);
  }
  public editarForm: FormGroup = this.buildNuevoForm();

  constructor(private dialogRef: NbDialogRef<FormEditarModalComponent>,
    private usersService: UsersService,
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
      id: ['', [Validators.required]],
      persona_id: ['', [Validators.required]],
      num_doc: [{ value: '', disabled: true }, [Validators.required]],
      name: ['', [Validators.required]],
      ap_paterno: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    };
    // this.editarForm = this.formBuilder.group(controls);
    return this.formBuilder.group(controls);
  }

  public getUserById(userId: any) {
    this.usersService.getById$(userId)
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        this.patchValues(response);
      });
  }

  private patchValues(value: any) {
    this.editarForm.patchValue({
      id: value.id,
      persona_id: value.persona_id,
      num_doc: (value.persona && value.persona.num_doc) || '',
      name: value.name,
      ap_paterno: (value.persona && value.persona.ap_paterno) || '',
      email: value.email,
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
      this.usersService.update$(value.id, value)
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
