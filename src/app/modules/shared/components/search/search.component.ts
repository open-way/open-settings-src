import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { NB_WINDOW } from '@nebular/theme';

@Component({
  selector: 'open-search',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements AfterViewInit {
  @Input() public isLoading: boolean = false;
  @Input() public fieldSize: any = 'medium';

  constructor(
    // @Inject(NB_WINDOW) private window,
  ) {
  }

  ngAfterViewInit() {
    // this.isLoading = true;
    // this.window.docsearch({
    //   apiKey: 'fe0dbef6ee2b748314266d7d71d7dea3',
    //   indexName: 'nebular',
    //   inputSelector: '#doc-search',
    //   debug: false,
    // });
  }
}