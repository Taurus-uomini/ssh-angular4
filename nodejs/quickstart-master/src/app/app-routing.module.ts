import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { AppIndexComponent } from './app-index.component';
import { UserIndexComponent } from "./user/user-index.component";
import { UserRegisterComponent } from './user/user-register.component';
import { UserActivationComponent } from './user/user-activation.component';
import { UserLoginComponent } from './user/user-login.component';
import { UserLogoutComponent } from './user/user-logout.component';
import { UserEditInfoComponent } from "./user/user-edit-info.component";
import { UserChangePasswdComponent } from "./user/user-change-passwd.component";
import { UserQuestionShowComponent } from "./user/user-question-show.component";
import { GuardService } from "./guard.service";
import { AdminLoginComponent } from './admin/admin-login.component';
import { AdminIndexComponent } from './admin/admin-index.component';
import { AdminChangePasswdComponent } from "./admin/admin-change-passwd.component";
import { AdminQuestionComponent } from "./admin/admin-question.componet";
import { AppComponent } from "./app.component";
import { MenuAllGuardService } from "./menu-all-guard.service";
import { AppShowComponent } from "./app.show.component";

const routes: Routes =
[
    {path:'index',component:AppIndexComponent,canActivate:[MenuAllGuardService]},
    {path:'show',component:AppShowComponent,canActivate:[MenuAllGuardService]},
    {path:'user/index',component:UserIndexComponent,canActivate:[GuardService,MenuAllGuardService]},
    {path:'user/index/editinfo',component:UserEditInfoComponent,canActivate:[GuardService,MenuAllGuardService]},
    {path:'user/index/changepasswd',component:UserChangePasswdComponent,canActivate:[GuardService,MenuAllGuardService]},
    {path:'user/index/question',component:UserQuestionShowComponent,canActivate:[GuardService,MenuAllGuardService]},
    {path:'user/register',component:UserRegisterComponent,canActivate:[MenuAllGuardService]},
    {path:'user/activation/:link',component:UserActivationComponent,canActivate:[MenuAllGuardService]},
    {path:'user/login',component:UserLoginComponent,canActivate:[GuardService,MenuAllGuardService]},
    {path:'user/logout',component:UserLogoutComponent,canActivate:[MenuAllGuardService]},
    {path:'admin/login',component:AdminLoginComponent,canActivate:[GuardService,MenuAllGuardService]},
    {path:'admin/index',component:AdminIndexComponent,canActivate:[GuardService,MenuAllGuardService]},
    {path:'admin/index/changepasswd',component:AdminChangePasswdComponent,canActivate:[GuardService,MenuAllGuardService]},
    {path:'admin/index/question',component:AdminQuestionComponent,canActivate:[GuardService,MenuAllGuardService]},
    {path:'**',component:AppIndexComponent,canActivate:[MenuAllGuardService]},
    
];

@NgModule
(
    {
        imports:
        [
            RouterModule.forRoot(routes)
        ],
        exports:
        [
            RouterModule
        ]
    }
)
export class AppRoutingModule
{

}
