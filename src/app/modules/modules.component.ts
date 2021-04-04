import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'open-modules',
  templateUrl: './modules.component.html',
  styles: [],
})
export class ModulesComponent implements OnInit {

  constructor(
    // private toastrService: ToastrService,
  ) { }

  ngOnInit() {
  }

  public showToastr() {
    // this.toastrService.error('everything is broken', 'Major Error', {
    //   timeOut: 3000
    // });
    // this.toastrService.warning('Hello world!', 'Toastr warning!');
    // this.toastrService.info('Hello world!', 'Toastr info!');
    // this.toastrService.success('Hello world!', 'Toastr success!');
  }
}
