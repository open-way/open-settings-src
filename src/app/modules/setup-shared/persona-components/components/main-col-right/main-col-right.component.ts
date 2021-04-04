import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { PersonasService, UbigeosService, PersonaDocumentosService, PersonaVirtualsService, PersonaTelefonosService, PersonaDireccionsService } from 'src/app/providers/services';
import { Subject } from 'rxjs';
import { ViewDocumentoModalComponent } from '../view-documento-modal/view-documento-modal.component';
import { FormPersonaDocumentoModalComponent } from '../form-persona-documento-modal/form-persona-documento-modal.component';
import { FormPersonaTelefonoModalComponent } from '../form-persona-telefono-modal/form-persona-telefono-modal.component';
import { FormPersonaVirtualModalComponent } from '../form-persona-virtual-modal/form-persona-virtual-modal.component';
import { ConfirmModalComponent } from 'src/app/modules/shared/components';

@Component({
  selector: 'open-main-col-right',
  templateUrl: './main-col-right.component.html',
  styleUrls: ['./main-col-right.component.scss']
})
export class MainColRightComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public personaDocumentos: any[] = [];
  public personaTelefonos: any[] = [];
  public personaVirtuales: any[] = [];
  public personaDireccions: any[] = [];
  public aPersona: any;
  @Input() set persona(persona: any) {
    if (persona) {
      this.aPersona = persona;
      setTimeout(() => {
        this.getMasters();
      }, 500);
    }
  }

  public loadingSaveDireccion: boolean = false;

  constructor(
    private nbDialogService: NbDialogService,
    private personasService: PersonasService,
    private personaDocumentosService: PersonaDocumentosService,
    private personaVirtualsService: PersonaVirtualsService,
    private personaTelefonosService: PersonaTelefonosService,
    private personaDireccionsService: PersonaDireccionsService,
  ) {
  }

  ngOnInit() {
    // this.loadingSaveDireccion = false;
  }

  private getMasters() {
    this.getPersonasDocumentos();
    this.getPersonasVirtuales();
    this.getPersonasTelefonos();
    this.getPersonasDireccions();
  }

  private getPersonasDocumentos() {
    this.personasService.getDocumentos$(this.aPersona.persona_id)
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe(response => {
        this.personaDocumentos = response;
      }, err => {
        this.personaDocumentos = [];
      });
  }

  private getPersonasVirtuales() {
    this.personasService.getVirtuals$(this.aPersona.persona_id)
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe(response => {
        this.personaVirtuales = response;
      }, err => {
        this.personaVirtuales = [];
      });
  }

  private getPersonasTelefonos() {
    this.personasService.getTelefonos$(this.aPersona.persona_id)
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe(response => {
        this.personaTelefonos = response;
      }, err => {
        this.personaTelefonos = [];
      });
  }

  private getPersonasDireccions() {
    this.personasService.getDireccions$(this.aPersona.persona_id)
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe((response: any[]) => {
        this.personaDireccions = response || [];
      }, err => {
        this.personaDireccions = [];
      });
  }

  public onRegistrarNuevaDireccion() {
    const data = {
      referencia: '',
      map_latitud: '-12.037140383956068',
      map_longitud: '-77.03809197299898',
      activo: false,
      persona_id: this.aPersona.persona_id,
      // ubigeo_id: null,
    };
    this.loadingSaveDireccion = true;
    this.personaDireccionsService.add$(data)
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe((response: any[]) => {
        this.loadingSaveDireccion = false;
        this.getPersonasDireccions();
      }, err => {
        this.loadingSaveDireccion = false;
      });
  }

  public onDeleted(event: any) {
    this.getPersonasDireccions();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onViewDocumento(item: any) {
    const modal = this.nbDialogService.open(ViewDocumentoModalComponent);
    modal.componentRef.instance.documento = item;
    modal.onClose
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        if (!res.cancel) {
        }
      }, err => { });
  }

  public onEditarDocumento(item: any) {
    const modal = this.nbDialogService.open(FormPersonaDocumentoModalComponent);
    modal.componentRef.instance.documento = item;
    modal.componentRef.instance.personaId = this.aPersona.persona_id;
    modal.onClose
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        if (!res.cancel) {
          this.getPersonasDocumentos();
        }
      }, err => { });
  }

  public onEliminarDocumento(item: any) {
    this.nbDialogService.open(ConfirmModalComponent, { context: { mensaje: '¿Estás seguro de eliminar el registro?' } })
      .onClose.subscribe(status => {
        if (status) {
          this.personaDocumentosService.delete$(item.num_doc)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
              this.getPersonasDocumentos();
            }, err => {
            });
        } else {
        }
      }, err => {
      });
  }

  public onEliminarTelefono(item: any) {
    this.nbDialogService.open(ConfirmModalComponent, { context: { mensaje: '¿Estás seguro de eliminar el registro?' } })
      .onClose.subscribe(status => {
        if (status) {
          this.personaTelefonosService.delete$(item.persona_telefono_id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
              this.getPersonasTelefonos();
            }, err => {
            });
        } else {
        }
      }, err => {
      });
  }

  public onEliminarVirtual(item: any) {
    this.nbDialogService.open(ConfirmModalComponent, { context: { mensaje: '¿Estás seguro de eliminar el registro?' } })
      .onClose.subscribe(status => {
        if (status) {
          this.personaVirtualsService.delete$(item.persona_virtual_id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
              this.getPersonasVirtuales();
            }, err => {
            });
        } else {
        }
      }, err => {
      });
  }

  public onRegistrarNuevoTelefono() {
    const modal = this.nbDialogService.open(FormPersonaTelefonoModalComponent);
    modal.componentRef.instance.telefono = null;
    modal.componentRef.instance.personaId = this.aPersona.persona_id;
    modal.onClose
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        if (!res.cancel) {
          this.getPersonasTelefonos();
        }
      }, err => { });
  }

  public onEditarTelefono(item: any) {
    const modal = this.nbDialogService.open(FormPersonaTelefonoModalComponent);
    modal.componentRef.instance.telefono = item;
    modal.componentRef.instance.personaId = this.aPersona.persona_id;
    modal.onClose
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        if (!res.cancel) {
          this.getPersonasTelefonos();
        }
      }, err => { });
  }

  public onRegistrarNuevoDocumento() {
    const modal = this.nbDialogService.open(FormPersonaDocumentoModalComponent);
    modal.componentRef.instance.documento = null;
    modal.componentRef.instance.personaId = this.aPersona.persona_id;
    modal.onClose
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        if (!res.cancel) {
          this.getPersonasDocumentos();
        }
      }, err => { });
  }

  public onRegistrarNuevaDireccionVirtual() {
    const modal = this.nbDialogService.open(FormPersonaVirtualModalComponent);
    modal.componentRef.instance.virtual = null;
    modal.componentRef.instance.personaId = this.aPersona.persona_id;
    modal.onClose
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        if (!res.cancel) {
          this.getPersonasVirtuales();
        }
      }, err => { });
  }

  public onEditarVirtual(item: any) {
    const modal = this.nbDialogService.open(FormPersonaVirtualModalComponent);
    modal.componentRef.instance.virtual = item;
    modal.componentRef.instance.personaId = this.aPersona.persona_id;
    modal.onClose
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        if (!res.cancel) {
          this.getPersonasVirtuales();
        }
      }, err => { });
  }


}
