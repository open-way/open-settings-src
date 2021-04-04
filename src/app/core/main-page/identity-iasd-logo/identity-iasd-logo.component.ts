import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'lamb-identity-iasd-logo',
    templateUrl: 'identity-iasd-logo.component.html',
    styleUrls: ['identity-iasd-logo.component.scss'],
})

export class IdentityIasdLogoComponent implements OnInit {
    @Input() position: any;

    constructor() { }

    ngOnInit() { }
}
