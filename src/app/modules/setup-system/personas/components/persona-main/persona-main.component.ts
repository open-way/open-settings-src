import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService, PersonasService } from 'src/app/providers/services';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'open-persona-main',
  templateUrl: './persona-main.component.html',
  styleUrls: ['./persona-main.component.scss']
})
export class PersonaMainComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public personaId: any;
  public personaInSession: any;
  // public userInSession: any;

  public params: any;
  constructor(
    // private authService: AuthService,
    private personasService: PersonasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap
      .pipe(
        map(res => res.get('persona_id')),
        takeUntil(this.destroy$)
      ).subscribe(persona_id => {
        this.personaId = persona_id;
        this.getPersona();
      });

    this.activatedRoute
      .queryParamMap
      .pipe(
        map((res: any) => res.params),
        takeUntil(this.destroy$),
      ).subscribe((response) => {
        this.params = response;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getPersona() {
    this.personasService.getById$(this.personaId)
      .pipe(map(res => res.data), takeUntil(this.destroy$))
      .subscribe(response => {
        this.personaInSession = response;
      }, err => {
        this.personaInSession = null;
      });
  }

  public onBack() {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute, queryParams: this.params,
    });
  }

}
