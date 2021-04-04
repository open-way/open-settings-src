import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'open-input-icon',
  styleUrls: ['./input-icon.component.scss'],
  templateUrl: './input-icon.component.html',
})
export class InputIconComponent implements AfterViewInit {
  // @Input() public isLoading: boolean = false;
  @Input() public fieldSize = 'medium';
  @Input() public icon = '';

  constructor(
  ) {
  }

  ngAfterViewInit() {
  }
}