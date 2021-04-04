import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { map, tap, filter, debounceTime, distinctUntilChanged, switchMap, catchError, takeUntil, startWith } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { PersonasService, UsersService } from 'src/app/providers/services';

@Component({
  selector: 'open-form-nuevo-modal',
  templateUrl: './form-nuevo-modal.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./form-nuevo-modal.component.scss']
})
export class FormNuevoModalComponent implements OnInit, OnDestroy {
  public userForm: FormGroup = this.buildForm();
  public loadingSpinnerSave: boolean = false;
  public loadingSpinnerGetData: boolean = false;
  public options: string = '';
  public textSearch = new FormControl('', Validators.required);
  private destroy$: Subject<void> = new Subject<void>();

  public personas: any[] = [];
  public filteredOptions$!: Observable<any[]>;
  // inputFormControl: FormControl;
  public personaDocumentos: any[] = [];

  constructor(private dialogRef: NbDialogRef<FormNuevoModalComponent>,
    private usersService: UsersService,
    private personasService: PersonasService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.options = 'INIT';
    this.loadingSpinnerSave = false;
    this.loadingSpinnerGetData = false;
    // this.buildNuevoForm();

    this.filteredOptions$ = of(this.personas);
    // this.buildForm();
    this.subscribeForm();

  }

  private subscribeForm() {
    this.filteredOptions$ = this.textSearch.valueChanges
      .pipe(
        // startWith(''),
        debounceTime(500),
        distinctUntilChanged(), // contenido sea distinto al anterior
        // map(filterString => this.filter(filterString)),
        switchMap(this.getPersonas.bind(this)),
        // tap(() => this.loadingSpinnerSearch = false), // icon spin
        map((items) => {
          return items;
        }),
      );
  }

  private getPersonas(term: String) {
    const query = {
      text_search: term,
    };
    return this.personasService.getByQuery$(query)
      .pipe(
        catchError(() => of({ data: [] })),
        map(response => response.data),
        takeUntil(this.destroy$)
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildForm() {
    const controls = {
      persona_id: ['', [Validators.required]],
      name: [''],
      title: [''],
      picture: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    };
    // this.userForm = this.formBuilder.group(controls);
    return this.formBuilder.group(controls);
  }

  private getPersonasDocumentos(personaId: any) {
    this.loadingSpinnerGetData = true;
    this.personasService.getDocumentos$(personaId)
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe(response => {
        this.loadingSpinnerGetData = false;
        this.personaDocumentos = response;
      }, err => {
        this.loadingSpinnerGetData = false;
        this.personaDocumentos = [];
      });
  }

  public viewHandle(value: any) {
    return value.fullname || value;
  }

  public onClose() {
    setTimeout(() => {
      this.dialogRef.close({ cancel: true });
    }, 50);
  }

  public onNextPersonaExist() {
    this.options = 'PERSONA_EXIST';
    const personaSeleccionada = this.textSearch.value;
    if (personaSeleccionada) {
      this.userForm.patchValue({
        persona_id: personaSeleccionada.persona_id,
        name: personaSeleccionada.fullname,
        title: personaSeleccionada.fecha_nac_parse,
        picture: personaSeleccionada.img_default_url,
      });
      this.getPersonasDocumentos(personaSeleccionada.persona_id);
    }
  }

  public onSave() {
    const value = this.userForm.value;
    const valid = this.userForm.valid;
    if (valid) {
      const data = {
        id: value.persona_id,
        email: value.email,
        password: value.password,
        password_confirmation: value.password_confirmation,
      };
      this.loadingSpinnerSave = true;
      this.usersService.add$(data)
        .pipe(map(res => res.data),
          takeUntil(this.destroy$))
        .subscribe(response => {
          this.dialogRef.close({ cancel: false, user_id: response.id });
          // this.dialogRef.close({ cancel: false });
          this.loadingSpinnerSave = false;
        }, err => {
          this.loadingSpinnerSave = false;
        });
    }
  }

}
