import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {
  FormGroup, FormControl, Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { UsersService } from 'src/app/providers/services';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'open-update-user-email-modal',
  templateUrl: './update-user-email-modal.component.html',
  styleUrls: ['./update-user-email-modal.component.scss']
})
export class UpdateUserEmailModalComponent implements OnInit, OnDestroy {
  public loadingSpinnerSave: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  public controlEmail = new FormControl('', Validators.required);

  @Input() public userId: any;

  @Input() set email(mail: any) {
    if (mail) {
      this.controlEmail.patchValue(mail);
    }
  }

  constructor(private dialogRef: NbDialogRef<UpdateUserEmailModalComponent>,
    private usersService: UsersService,
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
    }, 0);
  }

  public onConfirm() {

    if (this.controlEmail.invalid) { return; }

    this.loadingSpinnerSave = true;
    this.usersService.updateOnlyEmail$(this.userId, { email: this.controlEmail.value })
      .pipe(map(res => res.data,
        takeUntil(this.destroy$),
      ))
      .subscribe(response => {
        this.loadingSpinnerSave = false;
        setTimeout(() => {
          this.dialogRef.close({ cancel: false, user: response });
        }, 0);
      }, err => {
        this.loadingSpinnerSave = false;
      });


  }

}
