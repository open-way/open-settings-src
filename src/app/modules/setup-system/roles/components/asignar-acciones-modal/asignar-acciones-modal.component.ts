import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { ModulosService, ModuloAccionsService, RolsService } from 'src/app/providers/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'open-asignar-acciones-modal',
  templateUrl: './asignar-acciones-modal.component.html',
  styleUrls: ['./asignar-acciones-modal.component.scss']
})
export class AsignarAccionesModalComponent implements OnInit, OnDestroy {

  public loadingSpinnerSave: boolean = false;
  public moduloAcciones: any[] = [];
  // @ViewChild('nombre') nombre: ElementRef;

  private destroy$: Subject<void> = new Subject<void>();
  public aData: any;
  @Input() set data(data: any) {
    if (data) {
      // console.log(data);
      this.aData = data;
      this.getModuloAccions();
    }
  }

  constructor(private dialogRef: NbDialogRef<AsignarAccionesModalComponent>,
    // private moduloAccionsService: ModuloAccionsService,
    private rolsService: RolsService,
    // private formBuilder: FormBuilder,
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

  private getModuloAccions() {
    this.rolsService.getAcciones$(this.aData.rol_id, this.aData.modulo.modulo_id)
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        this.moduloAcciones = response;
      }, err => {
      });
  }

  public onSave() {
    const moduloAccionesChecked: any[] = this.moduloAcciones.filter(res => res.asignado).map(ress => ress.modulo_accion_id);
    // const modulosChildrenChecked: any[] = [];
    // this.moduloAcciones.forEach(modulo => {
    //   if (modulo.children) {
    //     modulosChildrenChecked.push(...(modulo.children).filter(ress => ress.asignado));
    //   }
    // });

    // modulosChecked.push(...modulosChildrenChecked);

    // if (modulosChecked.length > 0) {
    this.loadingSpinnerSave = true;
    this.rolsService.addAcciones$(this.aData.rol_id, this.aData.modulo.modulo_id, { modulo_accions_add: moduloAccionesChecked })
      .pipe(map(res => res.data),
        takeUntil(this.destroy$))
      .subscribe(response => {
        this.loadingSpinnerSave = false;
        this.dialogRef.close({ cancel: false });
        // this.getModulesAllByRolId();
      }, err => {
        this.loadingSpinnerSave = false;
      });
    // }
  }

}
