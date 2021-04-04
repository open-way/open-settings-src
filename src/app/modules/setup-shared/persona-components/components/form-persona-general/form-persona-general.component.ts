import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import {
  PersonasService, UbigeosService,
} from 'src/app/providers/services';
import { Subject } from 'rxjs';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'open-form-persona-general',
  templateUrl: './form-persona-general.component.html',
  styleUrls: ['./form-persona-general.component.scss']
})
export class FormPersonaGeneralComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public personaForm: FormGroup = this.formBuilder.group({
    persona_id: [''],
    nombres: ['', [Validators.required]],
    ap_paterno: ['', [Validators.required]],
    ap_materno: ['', [Validators.required]],
    fecha_nac: ['', [Validators.required]],
    estado_civil: ['', [Validators.required]],
    // ubigeo_pais_id: ['', [Validators.required]],
    ubigeo_depto_id: ['', [Validators.required]],
    ubigeo_pvcia_id: ['', [Validators.required]],
    ubigeo_ditto_id: ['', [Validators.required]],
    sexo: ['M', [Validators.required]],
  });

  public aPersona: any;
  @Output() onSaved = new EventEmitter<any>();

  @Input() set persona(persona: any) {
    if (persona) {
      this.aPersona = persona;
      this.patchDataInform();
      this.getMasters();
    } else {
      this.getMasters();
    }
  }

  public paises: any[] = [];
  public departamentos: any[] = [];
  public provincias: any[] = [];
  public distritos: any[] = [];

  public loadingSaveDatosGenerales: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private personasService: PersonasService,
    private ubigeosService: UbigeosService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    // this.loadingSaveDatosGenerales = false;
    this.subscribeForms();
  }

  private getMasters() {
    this.getDepartamentos();
    // this.getDepartamentos();
    this.getProvincias();
    this.getDistritos();
  }

  private subscribeForms() {

    // this.personaForm.get('ubigeo_pais_id').valueChanges
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(res => {
    //     this.getDepartamentos();
    //   });

    this.personaForm.get('ubigeo_depto_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.getProvincias();
      });

    this.personaForm.get('ubigeo_pvcia_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.getDistritos();
      });

  }

  // private getPersonaInSesion() {
  //   this.authService.persona$()
  //     .pipe(map(res => res.data), takeUntil(this.destroy$))
  //     .subscribe(response => {
  //       this.personaInSession = response;
  //       this.patchDataInform();
  //     }, err => {
  //       this.personaInSession = null;
  //     });
  // }

  private patchDataInform() {
    this.personaForm.patchValue({
      persona_id: this.aPersona.persona_id,
      nombres: this.aPersona.nombres,
      ap_paterno: this.aPersona.ap_paterno,
      ap_materno: this.aPersona.ap_materno,
      fecha_nac: new Date(this.aPersona.fecha_nac),
      estado_civil: this.aPersona.estado_civil,
      sexo: this.aPersona.sexo || 'M',
      ubigeo_depto_id: this.aPersona.ubigeo_depto_id,
      ubigeo_pvcia_id: this.aPersona.ubigeo_pvcia_id,
      ubigeo_ditto_id: this.aPersona.ubigeo_ditto_id,
    });
  }

  // private getPaises() {
  //   this.ubigeosService.getAll$()
  //     .pipe(map(res => res.data), takeUntil(this.destroy$))
  //     .subscribe(response => {
  //       console.log(response);
  //       this.paises = response;
  //     }, err => {
  //       this.paises = [];
  //     });
  // }

  private getDepartamentos() {
    // const paisId = this.personaForm.get('ubigeo_pais_id').value;
    // if (paisId) {
    //   this.ubigeosService.getByParentId$(paisId)
    //     .pipe(map(res => res.data), takeUntil(this.destroy$))
    //     .subscribe(response => {

    //       this.departamentos = response;
    //     }, err => {
    //       this.departamentos = [];
    //     });
    // }

    this.ubigeosService.getAll$()
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe(response => {
        this.departamentos = response;
      }, err => {
        this.departamentos = [];
      });
  }

  private getProvincias() {
    const departamentoId = this.personaForm.get('ubigeo_depto_id')?.value;
    if (departamentoId) {
      this.ubigeosService.getByParentId$(departamentoId)
        .pipe(map(res => res.data), takeUntil(this.destroy$))
        .subscribe(response => {
          this.provincias = response;
        }, err => {
          this.provincias = [];
        });
    }
  }

  private getDistritos() {
    const provinciaId = this.personaForm.get('ubigeo_pvcia_id')?.value;
    if (provinciaId) {
      this.ubigeosService.getByParentId$(provinciaId)
        .pipe(map(res => res.data), takeUntil(this.destroy$))
        .subscribe(response => {
          this.distritos = response;
        }, err => {
          this.distritos = [];
        });
    }
  }

  public onDatosGeneralesSave() {
    const value = this.personaForm.value;
    const personaFormInvalid = this.personaForm.invalid;

    if (personaFormInvalid) { return; }

    value.fecha_nac = this.datePipe.transform(value.fecha_nac, 'yyyy/MM/dd');
    const data = {
      nombres: value.nombres,
      ap_paterno: value.ap_paterno,
      ap_materno: value.ap_materno,
      estado_civil: value.estado_civil,
      fecha_nac: value.fecha_nac,
      sexo: value.sexo,
      ubigeo_id: value.ubigeo_ditto_id,
    };
    if (value.persona_id) {
      this.loadingSaveDatosGenerales = true;
      this.personasService.update$(value.persona_id, data)
        .pipe(map(res => res.data), takeUntil(this.destroy$))
        .subscribe(response => {
          this.loadingSaveDatosGenerales = false;
          this.onSaved.emit({ persona_id: response.persona_id, saved: true });
        }, err => {
          this.loadingSaveDatosGenerales = false;
          this.onSaved.emit({ persona_id: null, saved: false });
        });
    } else {
      this.loadingSaveDatosGenerales = true;
      this.personasService.add$(data)
        .pipe(map(res => res.data), takeUntil(this.destroy$))
        .subscribe(response => {
          this.loadingSaveDatosGenerales = false;
          this.onSaved.emit({ persona_id: response.persona_id, saved: true });
        }, err => {
          this.loadingSaveDatosGenerales = false;
          this.onSaved.emit({ persona_id: true, saved: true });
        });
    }

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
