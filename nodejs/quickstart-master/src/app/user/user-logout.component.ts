import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component
(
    {
        selector:'user-logout',
        templateUrl:'./user-logout.component.html',
        styleUrls:['./user-activation.component.css'],
        providers:
        [
            
        ]
    }
)
export class UserLogoutComponent implements OnInit
{
    ngOnInit()
    {
        let h=document.documentElement.clientHeight;
        document.getElementById("bg").style.height=h+"px";
        document.getElementById("loading").style.height=h+"px";
        window.onresize=function()
        {
            h=document.documentElement.clientHeight;
            document.getElementById("bg").style.height=h+"px";
            document.getElementById("loading").style.height=h+"px";
        }
        this.message="正在退出！";
        this.logout();
    }
    message: string;
    tcount:number;
    interid:any;
    url:string;
    constructor(private router:Router, private userService:UserService)
    {

    }
    timecount(message:string)
    {
        this.tcount--;
        this.message=message+this.tcount+"秒后跳转到登陆页面。";
        if(this.tcount==0)
        {
            clearInterval(this.interid);
            window.location.href=this.url;
        }
    }
    logout()
    {
        let mess="退出成功！ ";
        if(localStorage.getItem("uid")==null&&localStorage.getItem("aid")==null)
        {
            mess="你还未登陆！";
        }
        else
        {
            if(localStorage.getItem("uid")==null)
            {
                this.url="/admin/login";
            }
            else
            {
                this.url="/user/login";
            }
            if(localStorage.getItem("loginurl")!=null)
            {
                this.url=localStorage.getItem("loginurl");
                localStorage.removeItem("loginurl");
            }
            localStorage.removeItem("uid");
            localStorage.removeItem("aid");
        }
        this.tcount=5;
        this.message=mess+this.tcount+"秒后跳转到登陆页面。";
        this.interid=setInterval(()=>this.timecount(mess),1000);
    }
}