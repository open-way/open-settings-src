// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, Subject, ReplaySubject } from 'rxjs';
// import { IResponse } from '../../utils';

// /**
//  * Access => Accesos que el Usuario tiene.
//  */
// @Injectable()
// export class AccessService {
//   private url = 'user-modules';

//   constructor(private http: HttpClient) { }

//   public getModules$(): Observable<IResponse> {
//     return this.http.get<IResponse>(this.url);
//   }

//   public getActionsOfIdModule$(idModule: string): Observable<IResponse> {
//     return this.http.get<IResponse>(`${this.url}/${idModule}/actions`);
//   }

//   public getChildrenOfIdModule$(idModule: number): Observable<IResponse> {
//     return this.http.get<IResponse>(`${this.url}/${idModule}/children`);
//   }
// }

// @Injectable()
// export class AccessObservableService {

//   /***********************************MENU MODULE*********************************************/
//   public menuModules: Observable<any[]>;
//   // private _menuModules: BehaviorSubject<MenuModule[]>;
//   private _menuModules: BehaviorSubject<any[]>;


//   /***********************************MENU MODULE CHILD*********************************************/
//   public menuModulesChild: Observable<any[]>;
//   private _menuModulesChild: BehaviorSubject<any[]>;
//   private dataStoreMenuModuleChild: { // Aquí es donde almacenaremos nuestros datos en la memoria.
//     menuModulesChild: any[],
//   };

//   constructor(private accessService: AccessService) {

//     /** Initilize menuModules */
//     this.dataStoreMenuModule = { menuModules: [] };
//     this._menuModules = <BehaviorSubject<any[]>>new BehaviorSubject([]);
//     this.menuModules = this._menuModules.asObservable();

//     /** Initilize menuModulesChild */
//     this.dataStoreMenuModuleChild = { menuModulesChild: [] };
//     this._menuModulesChild = <BehaviorSubject<any[]>>new BehaviorSubject([]);
//     this.menuModulesChild = this._menuModulesChild.asObservable();
//   }

//   /***********************************lISTEN EVENT*********************************************/
//   private mainMenuButton$ = new Subject<any>();

//   private dataStoreMenuModule: { // Aquí es donde almacenaremos nuestros datos en la memoria.
//     menuModules: any[],
//   };

//   public loadAllMenuModules() {
//     return this.accessService.getModules$()
//       .subscribe(data => {
//         this.dataStoreMenuModule.menuModules = data.data;
//         this._menuModules.next(Object.assign({}, this.dataStoreMenuModule).menuModules);
//       }, error => console.warn('Could not load menu modules.'));
//   }

//   // public loadAllMenuModulesByParentId(idMenuModule: number) {
//   //   return this.accessService.getChildrenOfIdModule$(idMenuModule)
//   //     .subscribe(data => {
//   //       this.dataStoreMenuModule.menuModules = data.data.items;
//   //       this._menuModules.next(Object.assign({}, this.dataStoreMenuModule).menuModules);
//   //     }, error => console.warn('Could not load menu modules.'))
//   // }



//   public loadAllMenuModulesChild(idMenuModule: any) {
//     return this.accessService.getChildrenOfIdModule$(idMenuModule)
//       .subscribe(data => {
//         this.dataStoreMenuModuleChild.menuModulesChild = data.data;
//         this._menuModulesChild.next(Object.assign({}, this.dataStoreMenuModuleChild).menuModulesChild);
//       }, error => console.warn('Could not load menu modules Child.'));
//   }


//   public getMainMenuButton$(): Observable<any> {
//     return this.mainMenuButton$.asObservable();
//   }
//   public emitMainMenuButton(showMaster: boolean) {
//     this.mainMenuButton$.next(showMaster);
//   }
//   // remove from observer
//   public resetEventObserver(): void {
//     this.mainMenuButton$ = new ReplaySubject(5);
//   }


//   // public subject: ReplaySubject<string> = new ReplaySubject<string>(1);

//   // public emitEvent() {
//   //   this.subject.next('hola: ' + (new Date().getTime()));
//   // }
// }
