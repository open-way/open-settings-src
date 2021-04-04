import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {
  FormGroup,
} from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'open-desactive-user-modal',
  templateUrl: './desactive-user-modal.component.html',
  styleUrls: ['./desactive-user-modal.component.scss']
})
export class DesactiveUserModalComponent implements OnInit, OnDestroy {
  public loadingSpinnerSave: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  @Input() set documento(documento: any) {
    // this.getModuloById(documento);
  }
  // public editarForm: FormGroup;
  public modulos: any[] = [];

  constructor(private dialogRef: NbDialogRef<DesactiveUserModalComponent>,
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
    setTimeout(() => {
      this.dialogRef.close({ cancel: true });
    }, 50);
  }

}
