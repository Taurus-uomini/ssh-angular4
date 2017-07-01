import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { UserService } from './user.service';

@Component
(
    {
        templateUrl:'./user-activation.component.html',
        styleUrls:['./user-activation.component.css'],
        providers:
        [
            
        ]
    }
)
export class UserActivationComponent implements OnInit
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
        this.message="正在激活！";
        this.activation();
    }
    message: string;
    isloading:boolean;
    tcount:number;
    interid:any;
    constructor(private userService:UserService, private route:ActivatedRoute, private router:Router)
    {

    }
    timecount(message:string)
    {
        this.tcount--;
        this.message=message+this.tcount+"秒后跳转到登陆页面。";
        if(this.tcount==0)
        {
            clearInterval(this.interid);
            this.router.navigate(['/user/login']);
        }
    }
    activation()
    {
        this.isloading=true;
        this.route.params.switchMap((params:Params) => this.userService.activationUser(params['link'])).subscribe(success =>this.activationsuccess(success));
    }
    activationsuccess(success:number)
    {
        this.isloading=false;
        if(success==200)
        {
            this.tcount=5;
            this.message="激活成功！ "+this.tcount+"秒后跳转到登陆页面。";
            this.interid=setInterval(()=>this.timecount("激活成功！ "),1000);
        }
        else if(success==202)
        {
            this.tcount=5;
            this.message="不能重复激活！ "+this.tcount+"秒后跳转到登陆页面。";
            this.interid=setInterval(()=>this.timecount("不能重复激活！ "),1000);
        }
        else if(success==404)
        {
            this.message="非法操作！";
        }
        else if(success==500)
        {
            this.message="激活失败！";
        }
    }
}