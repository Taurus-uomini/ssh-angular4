import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { UserService } from './user.service';
import { User } from "./user";
import { NgForm } from "@angular/forms";

@Component
(
    {
        templateUrl:'./user-change-passwd.component.html',
        styleUrls:['./user-change-passwd.component.css'],
        providers:
        [
            
        ]
    }
)
export class UserChangePasswdComponent implements OnInit
{
    user:User;
    errorMessage:string;
    userForm:NgForm;
    isloading:boolean;
    upassword:string;
    newupassword:string;
    newreupassword:string;
    @ViewChild('userForm') currentForm: NgForm;
    ngOnInit()
    {
        this.user=new User();
        let h=document.documentElement.clientHeight;
        document.getElementById("bg").style.height=h+"px";
        document.getElementById("loading").style.height=h+"px";
        window.onresize=function()
        {
            h=document.documentElement.clientHeight;
            document.getElementById("bg").style.height=h+"px";
            document.getElementById("loading").style.height=h+"px";
        }
        this.user=this.userService.getNowUser();
    }
    constructor(private userService:UserService, private route:ActivatedRoute, private router:Router)
    {
        
    }
    ngAfterViewChecked()
    {
        this.formChanged();
    }

    formChanged() 
    {
        if (this.currentForm === this.userForm) { return; }
        this.userForm = this.currentForm;
        if (this.userForm) 
        {
            this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
        }
    }
    onValueChanged(data?: any) 
    {
        if (!this.userForm) { return; }
        const form = this.userForm.form;
        for (const field in this.formErrors) 
        {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) 
            {
                const messages = this.validationMessages[field];
                for (const key in control.errors) 
                {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = 
    {
        'upassword': '',
        'newupassword': '',
        'newreupassword': '',
        'error': ''
    };

    validationMessages = 
    {
        'upassword': 
        {
            'required':      '原密码不能为空！',
            'minlength':     '原密码不能少于4个字符',
            'maxlength':     '原密码不能多于20个字符'
        },
        'newupassword': 
        {
            'required':      '新密码不能为空！',
            'minlength':     '新密码不能少于4个字符',
            'maxlength':     '新密码不能多于20个字符'
        },
        'newreupassword': 
        {
            'required':      '重复新密码不能为空！',
            'pattern':       '两次密码不相同！'

        }
    };

    changePasswd()
    {
        this.isloading=true;
        this.userService.changePassed(this.user.uid,this.upassword,this.newupassword).subscribe( success=> (this.changePasswdSuccess(success), this.errorMessage=null),error => (this.errorMessage=<any>error));
    }
    
    changePasswdSuccess(success:number)
    {
        this.isloading=false;
        if(success>0)
        {
            console.log("success");
            this.router.navigate(['/user/logout']);
        }
        else if(success==-404)
        {
            console.log("passwd wrong");
            this.formChanged();
            this.formErrors['error']="原密码错误！";
        }
        else
        {
            console.log("fail");
            this.formChanged();
            this.formErrors['error']="未知错误！";
        }
    }
}