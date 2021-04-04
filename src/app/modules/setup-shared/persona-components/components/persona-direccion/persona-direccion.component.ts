import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { UbigeosService, PersonaDireccionsService } from 'src/app/providers/services';
import { Subject } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { ConfirmModalComponent } from 'src/app/modules/shared/components';

@Component({
  selector: 'open-persona-direccion',
  templateUrl: './persona-direccion.component.html',
  styleUrls: ['./persona-direccion.component.scss']
})
export class PersonaDireccionComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  // readonly position = { lat: 51.678418, lng: 7.809007 };
  public personaDireccionForm: FormGroup = this.formBuilder.group({
    ubigeo_depto_id: ['', Validators.required],
    ubigeo_pvcia_id: ['', Validators.required],
    ubigeo_ditto_id: ['', Validators.required],
    referencia: [''],
    activo: [false, Validators.required],
    search_map: [''],
  });

  @Output() onDeleted = new EventEmitter<boolean>();
  @Input() index: number = 0;
  private aPersonaDireccion: any;

  @Input() set personaDireccion(personaDireccion: any) {
    if (personaDireccion) {
      this.aPersonaDireccion = personaDireccion;
      setTimeout(() => {
        this.patchForm();
      }, 500);
    }
  }

  public paises: any[] = [];
  public departamentos: any[] = [];
  public provincias: any[] = [];
  public distritos: any[] = [];
  public loadingSaveDireccion: boolean = false;

  public optionsDefault: google.maps.MapOptions = {
    center: { lat: -12.060504062036333, lng: -77.03311934134406 },
  };

  // public options: google.maps.MapOptions = {
  public options: any = {
    center: { lat: -12.060504062036333, lng: -77.03311934134406 },
    zoom: 4,
  };
  // centerr = { lat: -12.060504062036333, lng: -77.03311934134406 };

  moveMap(event: any) {
    this.options.center = (event.latLng.toJSON());
  }

  constructor(
    private formBuilder: FormBuilder,
    private personaDireccionsService: PersonaDireccionsService,
    private ubigeosService: UbigeosService,
    private nbDialogService: NbDialogService,
  ) {
  }

  ngOnInit() {
    this.subscribeForms();
    this.getDepartamentos();
  }

  private subscribeForms() {

    // this.personaForm.get('ubigeo_pais_id').valueChanges
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(res => {
    //     this.getDepartamentos();
    //   });

    this.personaDireccionForm.get('ubigeo_depto_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.getProvincias();
      });

    this.personaDireccionForm.get('ubigeo_pvcia_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.getDistritos();
      });

  }

  private patchForm() {
    this.personaDireccionForm.patchValue({
      ubigeo_depto_id: this.aPersonaDireccion.ubigeo_depto_id,
      ubigeo_pvcia_id: this.aPersonaDireccion.ubigeo_pvcia_id,
      ubigeo_ditto_id: this.aPersonaDireccion.ubigeo_ditto_id,
      referencia: this.aPersonaDireccion.referencia,
      activo: this.aPersonaDireccion.activo === 1 ? true : false,
      search_map: '',
    });
    console.log(this.aPersonaDireccion);

    if (this.aPersonaDireccion.map_latitud && this.aPersonaDireccion.map_longitud) {
      this.options.center = {
        lat: parseFloat(this.aPersonaDireccion.map_latitud),
        lng: parseFloat(this.aPersonaDireccion.map_longitud),
      };
    } else {
      this.options.center = this.optionsDefault.center;
    }

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
    const departamentoId = this.personaDireccionForm.get('ubigeo_depto_id')?.value;
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
    const provinciaId = this.personaDireccionForm.get('ubigeo_pvcia_id')?.value;
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

  // public onRegistrarNuevaDireccion() {
  //   // 'persona_direccion_id',
  //   //     'referencia',
  //   //     'map_latitud',
  //   //     'map_longitud',
  //   //     'activo',
  //   //     'persona_id',
  //   //     'ubigeo_id',
  //   const data = {
  //     referencia: '',
  //     map_latitud: '51.678418',
  //     map_longitud: '7.809007',
  //     activo: false,
  //     persona_id: ,
  //     // ubigeo_id: null,
  //   };
  //   // readonly position = { lat: 51.678418, lng: 7.809007 };
  //   this.loadingSaveDireccion = true;
  //   this.personaDireccionsService.add$(data)
  //     .pipe(map(res => res.data), takeUntil(this.destroy$))
  //     .subscribe((response: any[]) => {
  //       this.loadingSaveDireccion = false;
  //     }, err => {
  //       this.loadingSaveDireccion = false;
  //     });
  // }

  public onSavePersonaDireccion() {
    const value = this.personaDireccionForm.value;
    const invalid = this.personaDireccionForm.invalid;

    if (invalid) { return; }
    const data = {
      referencia: value.referencia,
      map_latitud: this.options.center?.lat,
      map_longitud: this.options.center?.lng,
      activo: value.activo ? 1 : 0,
      persona_id: this.aPersonaDireccion.persona_id,
      ubigeo_id: value.ubigeo_ditto_id,
    };
    this.loadingSaveDireccion = true;
    this.personaDireccionsService.update$(this.aPersonaDireccion.persona_direccion_id, data)
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe((response: any[]) => {
        this.loadingSaveDireccion = false;
      }, err => {
        this.loadingSaveDireccion = false;
      });
  }

  public onRemovePersonaDireccion() {

    this.nbDialogService.open(ConfirmModalComponent, { context: { mensaje: '¿Estás seguro de eliminar el registro?' } })
      .onClose.subscribe(status => {
        if (status) {
          this.personaDireccionsService.delete$(this.aPersonaDireccion.persona_direccion_id)
            .pipe(map(res => res.data), takeUntil(this.destroy$))
            .subscribe((response: any[]) => {
              this.onDeleted.emit(true);
            }, err => {
            });
        } else {
        }
      }, err => {
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
