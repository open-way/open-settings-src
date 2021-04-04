import {
  Component,
  Input
} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'open-confirm-modal',
  styleUrls: ['./confirm-modal.component.scss'],
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent {
  @Input() public mensaje: any;

  constructor(
    private dialogRef: NbDialogRef<ConfirmModalComponent>,
  ) {
  }

  public onClose() {
    setTimeout(() => {
      this.dialogRef.close(false);
    }, 50);
  }

  public onAceptar() {
    setTimeout(() => {
      this.dialogRef.close(true);
    }, 50);
  }

}