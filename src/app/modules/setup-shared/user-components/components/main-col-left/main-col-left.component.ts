import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { ModulosService, UsersService } from 'src/app/providers/services';
import { Subject, merge } from 'rxjs';
import { FormChangePasswordModalComponent } from '../form-change-password-modal/form-change-password-modal.component';
import { DesactiveUserModalComponent } from '../desactive-user-modal/desactive-user-modal.component';
import { Router, ActivatedRoute, ROUTER_CONFIGURATION } from '@angular/router';
import { UpdateUserEmailModalComponent } from '../update-user-email-modal/update-user-email-modal.component';

@Component({
  selector: 'open-main-col-left',
  templateUrl: './main-col-left.component.html',
  styleUrls: ['./main-col-left.component.scss']
})
export class MainColLeftComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public formUser: FormGroup = this.formBuilder.group({
    is_superuser: [false, Validators.required],
    active: [false, Validators.required],
    name: ['', Validators.required],
    img_url: ['', Validators.required],
    email: ['', Validators.required],
    email_show: [{ value: '', disabled: true }, Validators.required],
    id: ['', Validators.required],
  });

  public aUser: any;
  @Input() isMyProfile: boolean = true;

  @Input() set user(user: any) {
    if (user) {
      this.aUser = user;
      setTimeout(() => {
        this.patchUserForm();
      }, 0);
    }
  }

  @ViewChild('inputFile') inputFile!: ElementRef;

  public imageFile: any;
  public loadingSendVarificationEmail: boolean = false;
  public loadingUpdate: boolean = false;

  constructor(
    private nbDialogService: NbDialogService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.buildForm();
    this.subcribeForm();
  }

  // private buildForm() {
  //   const controls = {
  //     is_superuser: [false, Validators.required],
  //     active: [false, Validators.required],
  //   };
  //   this.formUser = this.formBuilder.group(controls);
  // }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private patchUserForm() {
    this.formUser.patchValue({
      is_superuser: this.aUser.is_superuser === 1 ? true : false,
      active: this.aUser.active === 1 ? true : false,
      name: this.aUser.name,
      email: this.aUser.email,
      email_show: this.aUser.email,
      img_url: this.aUser.img_url,
      id: this.aUser.id,
    }, { emitEvent: false });
  }

  public onGoPersona() {
    this.router.navigate(['/setup-system/personas', this.aUser.id], { relativeTo: this.activatedRoute });
  }

  public onFileChange(event: any) {
    const reader = new FileReader();
    if (this.isExistFiles(event)) {
      // const files = event.target.files as FileList;
      const files = event.target.files;
      reader.readAsDataURL(files.item(0));
      reader.onload = () => {
        this.formUser.patchValue({
          img_url: reader.result as string,
        });
        // this.changeDetectorRef.markForCheck();
      };
      this.imageFile = files.item(0);
    }
  }

  private isExistFiles(event: any) {
    return event.target.files && (event.target.files.length > 0);
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
    this.inputFile.nativeElement.value = '';
    this.formUser.patchValue({
      img_url: (this.aUser && this.aUser.img_default_url) || '',
      // img_url: '',
    });
  }

  private subcribeForm() {
    var isSuperuser = this.formUser.get('is_superuser');
    var active = this.formUser.get('active');
    var imgUrl = this.formUser.get('img_url');

    if (isSuperuser && active && imgUrl) {
      merge(isSuperuser.valueChanges,
        active.valueChanges,
        imgUrl.valueChanges)
        .pipe(
          takeUntil(this.destroy$),
        )
        .subscribe(res => {
          setTimeout(() => {
            this.saveUserData();
          }, 500);
        });
    }
  }

  public onSaveName() {
    this.saveUserData();

  }

  // public onSaveEmail() {
  //   this.saveUserData();
  // }

  private saveUserData() {
    const value = this.formUser.value;
    const invalid = this.formUser.invalid;
    // console.log('saveUserData');
    // console.log(invalid);
    // console.log(value);

    // if (invalid) {
    //   return;
    // }

    const formData: FormData = new FormData();
    formData.append('is_superuser', (value.is_superuser) ? '1' : '0');
    formData.append('active', value.active ? '1' : '0');
    formData.append('name', value.name || '');
    // formData.append('email', value.email || '');
    formData.append('img_file', this.imageFile || '');
    formData.append('img_url', (this.imageFile) ? '' : value.img_url);

    if (this.formUser.value.id) {
      this.loadingUpdate = true;
      this.usersService.updateWithFile$(this.formUser.value.id, formData)
        .pipe(
          map(res => res.data),
          takeUntil(this.destroy$),
        )
        .subscribe(res => {
          this.loadingUpdate = false;
        }, err => {
          this.loadingUpdate = false;
        });
    }
  }

  public updateEmail() {
    const modal = this.nbDialogService.open(UpdateUserEmailModalComponent);
    modal.componentRef.instance.email = this.formUser.value.email;
    modal.componentRef.instance.userId = this.formUser.value.id;
    modal.onClose
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        if (!res.cancel) {
          this.aUser = res.user;
          this.patchUserForm();
        }

      }, err => { });
  }

  public onSendOtherConfirmEmail() {
    if (!this.formUser.value.id) {
      return;
    }
    this.loadingSendVarificationEmail = true;
    this.usersService.verificationNotification$(this.formUser.value.id, {})
      .pipe(map(res => res.data,
        takeUntil(this.destroy$),
      ))
      .subscribe(response => {
        this.loadingSendVarificationEmail = false;
      }, err => {
        this.loadingSendVarificationEmail = false;
      });
  }

  public onChangePassword() {
    const modal = this.nbDialogService.open(FormChangePasswordModalComponent);
    modal.componentRef.instance.userId = this.formUser.value.id;
    modal.onClose
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        if (!res.cancel) {
        }
      }, err => { });
  }

  public onDesactiveUser() {
    const modal = this.nbDialogService.open(DesactiveUserModalComponent);
    // modal.componentRef.instance.rolId = rolId;
    modal.onClose
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        if (!res.cancel) {
        }
      }, err => { });
  }



}
