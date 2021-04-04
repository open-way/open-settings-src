import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import {
//     MyDepartmentService, MyEntitiesService,
//     MyEntityDepartmentsService,
// } from 'src/app/providers/services';
import { map, takeUntil } from 'rxjs/operators';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';

@Component({
    selector: 'open-change-enterprise-modal',
    templateUrl: 'change-enterprise-modal.component.html',
    styleUrls: ['change-enterprise-modal.component.scss'],
})

export class ChangeEnterpriseModalComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public enterpriseForm: FormGroup = this.buildForm();
    public entities: any[] = [];
    public departments: any[] = [];

    public loadingSave: boolean = false;
    constructor(
        private dialogRef: NbDialogRef<ChangeEnterpriseModalComponent>,
        // public myDepartmentService: MyDepartmentService,
        // public myEntitiesService: MyEntitiesService,
        // public myEntityDepartmentsService: MyEntityDepartmentsService,
        public formBuilder: FormBuilder) { }

    ngOnInit() {
        // this.buildForm();
        // this.loadMasters();
        // this.subscribeEntityChanges();
        // this.loadingSave = false;
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

    // private subscribeEntityChanges() {
    //     this.enterpriseForm.controls['id_entidad'].valueChanges
    //         .pipe(
    //             takeUntil(this.destroy$),
    //         )
    //         .subscribe(value => {
    //             if (value) {
    //                 this.loadDepartments(value);
    //             }
    //         });
    // }

    // private loadDepartments(entityId) {
    //     this.myDepartmentService.getWithQuery$({ id_entidad: entityId })
    //         .pipe(
    //             map(res => res.data),
    //             takeUntil(this.destroy$),
    //         )
    //         .subscribe(response => {
    //             this.departments = response;
    //         });
    // }

    // private loadMasters() {
    //     this.myEntitiesService.getAll$()
    //         .pipe(
    //             map(res => res.data),
    //             takeUntil(this.destroy$),
    //         )
    //         .subscribe(response => {
    //             this.entities = response;
    //         });
    // }

    private buildForm() {
        const controls = this.initializeControls();
        // this.enterpriseForm = this.formBuilder.group(controls);
        return this.formBuilder.group(controls);
    }
    private initializeControls() {
        const controls = {
            id_entidad: ['', Validators.required],
            id_depto: ['', Validators.required],
        };
        return controls;
    }

    public onSubmit() {
        const valid = this.enterpriseForm.valid;
        const value = this.enterpriseForm.value;
        if (valid) {
            this.loadingSave = true;
            // this.myEntityDepartmentsService.add$(value)
            //     .pipe(
            //         map(resp => resp.data),
            //         takeUntil(this.destroy$),
            //     )
            //     .subscribe(ress => {
            //         if (ress) {
            //             this.dialogRef.close({ cancel: false });
            //         }
            //         this.loadingSave = false;
            //     }, err => {
            //         this.loadingSave = false;
            //     });
        }
    }
}
