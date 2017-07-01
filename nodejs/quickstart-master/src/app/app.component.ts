import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { User } from './user/user';
import { UserService } from './user/user.service';
import { FileUploadService } from './file-upload.service';
import { Admin } from './admin/admin';
import { AdminService } from './admin/admin.service';
import { AppLoginService } from './app-login.service';
import { MenuService } from './menu.service';

@Component({
  selector: 'my-app',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.css'],
  providers:[UserService,FileUploadService,AdminService,AppLoginService]
})
export class AppComponent implements OnInit  
{ 
  user: User;
  admin: Admin;
  errorMessage:string;
  constructor(public userService:UserService, public adminService:AdminService, public appLoginService:AppLoginService, private router:Router, public menuService:MenuService)
  {

  } 

  ngOnInit() 
  {
    this.menuService.getMenu().subscribe(obj => this.menuService.setNowMenu(obj));
    let uid=localStorage.getItem('uid')==null?null:parseInt(localStorage.getItem('uid'));
    if(uid==null)
    {
      let aid=localStorage.getItem('aid')==null?null:parseInt(localStorage.getItem('aid'));
      if(aid!=null)
      {
        this.adminService.checkAdminLogin(aid).subscribe(admin =>(this.adminService.setNowAdmin(admin)),error => this.errorMessage=error);
      }
    }
    else
    {
      this.userService.checkUserLogin(uid).subscribe(user =>(this.userService.setNowUser(user)),error => this.errorMessage=error);
    }
  }
}
