import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {
  FormGroup, FormBuilder, Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/providers/services';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'open-form-change-password-modal',
  templateUrl: './form-change-password-modal.component.html',
  styleUrls: ['./form-change-password-modal.component.scss']
})
export class FormChangePasswordModalComponent implements OnInit, OnDestroy {
  public loadingSpinnerSave: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  public editarForm: FormGroup = this.formBuilder.group({
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
  });
  public modulos: any[] = [];

  @Input() public userId: any;

  constructor(
    private dialogRef: NbDialogRef<FormChangePasswordModalComponent>,
    private formBuilder: FormBuilder,
    // private usersService: UsersService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    // this.loadingSpinnerSave = false;
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

  public onConfirm() {
    const value = this.editarForm.value;
    const invalid = this.editarForm.invalid;
    if (invalid) { return; }
    const data = {
      password: value.password,
      password_confirmation: value.password_confirmation,
    };
    this.loadingSpinnerSave = true;
    this.authService.passswordRequest$(this.userId, data)
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe(response => {
        this.loadingSpinnerSave = false;
        setTimeout(() => {
          this.dialogRef.close({ cancel: false });
        }, 50);
      }, err => {
        this.loadingSpinnerSave = false;
      });
  }

}
