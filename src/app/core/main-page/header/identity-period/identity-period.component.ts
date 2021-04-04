import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'open-identity-period',
    templateUrl: 'identity-period.component.html',
    styleUrls: ['identity-period.component.scss'],
})

export class IdentityPeriodComponent implements OnInit {
    @Input() id: any;
    @Input() name: any;
    @Input() onlyId: boolean = false;
    constructor() { }
    ngOnInit() { }
}
