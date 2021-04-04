import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {
  FormGroup, FormBuilder, Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { TipoDocumentosService, PersonaDocumentosService } from 'src/app/providers/services';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'open-form-persona-documento-modal',
  templateUrl: './form-persona-documento-modal.component.html',
  styleUrls: ['./form-persona-documento-modal.component.scss']
})
export class FormPersonaDocumentoModalComponent implements OnInit, OnDestroy {
  public loadingSpinnerSave: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  public personDocumentoForm: FormGroup = this.formBuilder.group({
    num_doc: ['', Validators.required],
    img_url: [''],
    persona_id: ['', Validators.required],
    tipo_documento_id: ['', Validators.required],
  });
  public tipoDocumentos: any[] = [];
  public adocumento: any;

  @Input() set personaId(personaId: any) {
    this.personDocumentoForm.get('persona_id')?.patchValue(personaId);
  }

  @Input() set documento(documento: any) {
    if (documento) {
      this.adocumento = documento;
      this.patchValues();
    }
  }

  @ViewChild('inputFile') inputFile?: ElementRef;
  public imageFile: any;

  constructor(private dialogRef: NbDialogRef<FormPersonaDocumentoModalComponent>,
    private formBuilder: FormBuilder,
    private tipoDocumentosService: TipoDocumentosService,
    private personaDocumentosService: PersonaDocumentosService,
    // private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.loadingSpinnerSave = false;
    this.getMasters();
  }

  private patchValues() {
    this.personDocumentoForm.patchValue({
      num_doc: this.adocumento.num_doc,
      img_url: this.adocumento.img_url,
      // persona_id: this.adocumento.persona_id,
      tipo_documento_id: this.adocumento.tipo_documento_id,
    });
  }

  private getMasters() {
    this.tipoDocumentosService.getAll$()
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe(response => {
        this.tipoDocumentos = response;
      }, err => {
        this.tipoDocumentos = [];
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
    const value = this.personDocumentoForm.value;
    const invalid = this.personDocumentoForm.invalid;

    if (invalid) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('num_doc', value.num_doc || '');
    formData.append('tipo_documento_id', value.tipo_documento_id || '');
    formData.append('persona_id', value.persona_id || '');
    formData.append('img_file', this.imageFile || '');
    formData.append('img_url', (this.imageFile) ? '' : value.img_url);
    // formData.append('img_url', '');
    this.loadingSpinnerSave = true;
    if (this.adocumento) {
      this.personaDocumentosService.updateWithFile$(value.num_doc, formData)
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
      this.personaDocumentosService.add$(formData)
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


  public onFileChange(event: any) {
    // if (this.isExistFiles(event)) {
    //   const files = event.target.files as FileList;
    //   this.imageFile = files.item(0);
    //   this.formFirma.patchValue(
    //     {
    //       imageFile: this.imageFile,
    //       img_firma_url: ''
    //     }
    //   );
    //   this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.imageFile));
    // }
    const reader = new FileReader();
    if (this.isExistFiles(event)) {
      // const files = event.target.files as FileList;
      const files = event.target.files;
      reader.readAsDataURL(files.item(0));
      reader.onload = () => {
        this.personDocumentoForm.patchValue({
          img_url: reader.result as string,
        });
        // this.changeDetectorRef.markForCheck();
      };
      this.imageFile = files.item(0);
    }
  }

  public onDeleteArchivo() {
    // this.imageFile = null;
    // // this.imageUrl = null;
    // this.personDocumentoForm.patchValue(
    //   {
    //     imageFile: '',
    //     img_firma_url: ''
    //   }
    // );

    this.imageFile = null;
    this.inputFile!.nativeElement.value = '';
    this.personDocumentoForm.patchValue({
      img_url: (this.adocumento && this.adocumento.img_default_url) || '',
    });
  }

  private isExistFiles(event: any) {
    return event.target.files && (event.target.files.length > 0);
  }

}
