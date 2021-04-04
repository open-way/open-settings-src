import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { UsersService } from 'src/app/providers/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'open-form-manage-roles-modal',
  templateUrl: './form-manage-roles-modal.component.html',
  styleUrls: ['./form-manage-roles-modal.component.scss']
})
export class FormManageRolesModalComponent implements OnInit, OnDestroy {
  public loadingSpinnerSave: boolean = false;
  public rols: any[] = [];
  public auserId: any;
  private destroy$: Subject<void> = new Subject<void>();

  @Input() nombreUser: string = '';
  @Input() set userId(userId: any) {
    this.auserId = userId;
    this.getRolesAssignedById();
  }
  constructor(private dialogRef: NbDialogRef<FormManageRolesModalComponent>,
    private usersService: UsersService) { }

  ngOnInit() {
    // this.loadingSpinnerSave = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getRolesAssignedById() {
    this.usersService.getRolsById$(this.auserId)
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        this.rols = response.map((res: any) => {
          return { asignado: (res.user_rol_existe) === 1 ? true : false, ...res };
        });
      });
  }

  public onClose() {
    setTimeout(() => {
      this.dialogRef.close({ cancel: true });
    }, 50);
  }

  public onSave() {
    const rols_asignados = this.rols.filter(res => res.asignado);
    const data = { rols_add: rols_asignados };
    this.loadingSpinnerSave = true;
    this.usersService.addRolsById$(this.auserId, data)
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
