import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    FeedbackComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, ReactiveFormsModule],
  exports: [NavComponent],
})
export class PagesModule {}
