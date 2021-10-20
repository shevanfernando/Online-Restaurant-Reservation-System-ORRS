import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { E404Component } from './e404/e404.component';
import { E401Component } from './e401/e401.component';
import { E403Component } from './e403/e403.component';
import { E500Component } from './e500/e500.component';


@NgModule({
  declarations: [
    E404Component,
    E401Component,
    E403Component,
    E500Component
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }
