import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { ModulosService } from 'src/app/providers/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'open-view-documento-modal',
  templateUrl: './view-documento-modal.component.html',
  styleUrls: ['./view-documento-modal.component.scss']
})
export class ViewDocumentoModalComponent implements OnInit, OnDestroy {
  public loadingSpinnerSave: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  @Input() set documento(documento: any) {
    // this.getModuloById(documento);
  }
  // public editarForm: FormGroup;
  public modulos: any[] = [];

  constructor(private dialogRef: NbDialogRef<ViewDocumentoModalComponent>,
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

}
