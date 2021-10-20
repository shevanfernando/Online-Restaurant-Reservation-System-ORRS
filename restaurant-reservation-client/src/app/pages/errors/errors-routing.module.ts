import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E404Component } from './e404/e404.component';
import { E403Component } from './e403/e403.component';
import { E401Component } from './e401/e401.component';
import { E500Component } from './e500/e500.component';

const routes: Routes = [
  {
    path: '401',
    component: E401Component,
  },
  {
    path: '404',
    component: E404Component,
  },
  {
    path: '403',
    component: E403Component,
  },
  {
    path: '500',
    component: E500Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorsRoutingModule {}
