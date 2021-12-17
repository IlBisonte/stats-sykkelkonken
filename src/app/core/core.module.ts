import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './login/register-user/register-user.component';

import { DxMenuModule, DxButtonModule, DxBoxModule, DxPopupModule, DxDataGridModule, DxLoadPanelModule, DxScrollViewModule, 
  DxTextBoxModule, DxFormModule, DxSelectBoxModule, DxDrawerModule, DxListModule, DxToolbarModule } from "devextreme-angular";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxBoxModule,
    DxButtonModule,
    DxMenuModule,
    DxPopupModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DxScrollViewModule,
    DxTextBoxModule,
    DxFormModule,
    DxSelectBoxModule,
    DxDrawerModule,
    DxListModule,
    DxToolbarModule
  ],
  declarations: [NavComponent, LoginComponent, RegisterUserComponent],
  exports: [NavComponent, LoginComponent, RegisterUserComponent]
})
export class CoreModule  {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }


  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
