import { Component, OnInit } from '@angular/core';

import { Admin } from './admin';
import { AdminService } from './admin.service';
import { User } from "../user/user";
import { UserService } from "../user/user.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component
(
    {
        selector:'admin-index',
        templateUrl:'./admin-index.component.html',
        styleUrls:['./admin-index.component.css'],
        providers:
        [
            
        ]
    }
)
export class AdminIndexComponent implements OnInit
{
    users:Array<User>;
    row:number=2;
    isloading:boolean;
    nowpage:number;
    allpage:number;
    errormessage:string;
    ngOnInit()
    {
        this.isloading=false;
        this.nowpage=1;
        let h=document.documentElement.clientHeight;
        document.getElementById("bg").style.height=h+"px";
        document.getElementById("loading").style.height=h+"px";
        window.onresize=function()
        {
            h=document.documentElement.clientHeight;
            document.getElementById("bg").style.height=h+"px";
            document.getElementById("loading").style.height=h+"px";
        }
        this.userService.getUserCount().subscribe(count => this.allpage=Math.ceil(count/this.row));
        this.userService.getUserList(this.row,1).subscribe(list => this.users=list);
    }
    constructor(private userService:UserService, private route:ActivatedRoute, private router:Router)
    {
        
    }
    getPage(page:number,event:Event)
    {
        this.isloading=true;
        event.preventDefault();
        this.nowpage=page;
        this.userService.getUserList(this.row,page).subscribe(list => (this.users=list,this.isloading=false));
    }
    deleteUser(uid:number)
    {
        this.isloading=true;
        event.preventDefault();
        this.userService.deleteUser(uid).subscribe(b => this.initPage(b));
    }
    initPage(b:Boolean)
    {
        this.isloading=false;
        if(b)
        {
            this.nowpage=1;
            this.userService.getUserCount().subscribe(count => this.allpage=Math.ceil(count/this.row));
            this.userService.getUserList(this.row,1).subscribe(list => this.users=list);
        }
        else
        {
            this.errormessage="删除失败！";
        }
    }
}