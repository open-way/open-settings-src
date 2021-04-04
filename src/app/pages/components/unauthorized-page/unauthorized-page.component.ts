import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'open-unauthorized-page',
  templateUrl: './unauthorized-page.component.html',
  styleUrls: ['./unauthorized-page.component.scss']
})
export class UnauthorizedPageComponent implements OnInit {

  constructor(
    private location: Location,
  ) {
  }

  ngOnInit() {
  }

  public onBack() {
    this.location.back();
  }

}
