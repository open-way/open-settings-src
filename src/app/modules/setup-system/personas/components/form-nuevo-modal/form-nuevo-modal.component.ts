import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { map, tap, filter, debounceTime, distinctUntilChanged, switchMap, catchError, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { PersonasService, UsersService } from 'src/app/providers/services';

@Component({
  selector: 'open-form-nuevo-modal',
  templateUrl: './form-nuevo-modal.component.html',
  styleUrls: ['./form-nuevo-modal.component.scss']
})
export class FormNuevoModalComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public persona: any;
  public loadingSpinnerSave: boolean = false;

  constructor(private dialogRef: NbDialogRef<FormNuevoModalComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
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

  public onSaved(event: any) {
    if (event.saved) {
      setTimeout(() => {
        this.dialogRef.close({ cancel: false, persona_id: event.persona_id });
      }, 50);
    }
  }
}
