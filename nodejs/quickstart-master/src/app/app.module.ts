import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { AppIndexComponent } from './app-index.component';
import { UserIndexComponent } from "./user/user-index.component";
import { UserRegisterComponent } from './user/user-register.component';
import { UserActivationComponent } from './user/user-activation.component';
import { UserLoginComponent } from './user/user-login.component';
import { UserLogoutComponent } from './user/user-logout.component';
import { UserEditInfoComponent } from "./user/user-edit-info.component";
import { UserChangePasswdComponent } from "./user/user-change-passwd.component";
import { UserQuestionShowComponent } from "./user/user-question-show.component";
import { AdminLoginComponent } from './admin/admin-login.component';
import { AdminIndexComponent } from './admin/admin-index.component';
import { AdminChangePasswdComponent } from "./admin/admin-change-passwd.component";
import { AdminQuestionComponent } from "./admin/admin-question.componet";

import {AppRoutingModule} from './app-routing.module';
import { GuardService } from "./guard.service";
import { MenuService } from "./menu.service";
import { MenuAllGuardService } from "./menu-all-guard.service";
import { AppShowComponent } from "./app.show.component";

@NgModule({
  imports:      
  [ 
    BrowserModule,
    HttpModule,
    JsonpModule ,
    AppRoutingModule,
    FormsModule
  ],
  declarations: 
  [ 
    AppComponent,
    AppIndexComponent,
    AppShowComponent,
    UserIndexComponent,
    UserRegisterComponent ,
    UserActivationComponent,
    UserLoginComponent,
    UserLogoutComponent,
    UserEditInfoComponent,
    UserChangePasswdComponent,
    UserQuestionShowComponent,
    AdminLoginComponent,
    AdminIndexComponent,
    AdminChangePasswdComponent,
    AdminQuestionComponent
  ],
  providers:
  [
    MenuService,
    MenuAllGuardService,
    GuardService
  ],
  bootstrap:    
  [ 
    AppComponent 
  ]
})
export class AppModule
{

}
