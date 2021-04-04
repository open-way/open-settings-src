import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'open-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OauthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get year() {
    return new Date().getFullYear();
  }

}
