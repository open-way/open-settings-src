import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'open-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // public apiLoaded: Observable<boolean>;
  readonly position = { lat: 51.678418, lng: 7.809007 };

  constructor(
    private httpClient: HttpClient,
  ) {
    // this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyD9PNvufMruSoGRQtcEsjkk1RLN6ZJsIjU', 'callback')
    //   .pipe(
    //     map(() => true),
    //     catchError(() => of(false)),
    //   );
  }

  ngOnInit() {
  }

}
