import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {RegisterComponent} from "./register.component";
import {RouterModule} from "@angular/router";
import {RegisterRoutingModule} from "./register-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RegisterRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
