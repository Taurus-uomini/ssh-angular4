import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user';
import { UserService } from './user.service';

@Component
(
    {
        selector:'user-login',
        templateUrl:'./user-login.component.html',
        styleUrls:['./user-register.component.css'],
        providers:
        [
            
        ]
    }
)
export class UserLoginComponent implements OnInit, AfterViewChecked
{
    user: User;
    errorMessage:string;
    userForm:NgForm;
    isloading:boolean;
    @ViewChild('userForm') currentForm: NgForm;

    constructor(private userService:UserService, private router:Router)
    {
       
    }

    ngAfterViewChecked()
    {
        this.formChanged();
    }

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
        'uname': '',
        'upassword': '',
        'error': ''
    };

    validationMessages = 
    {
        'uname': 
        {
            'required':      '用户名不能为空！',
            'minlength':     '用户名不能少于4个字符',
            'maxlength':     '用户名不能多于20个字符'
        },
        'upassword': 
        {
            'required':      '密码不能为空！',
            'minlength':     '密码不能少于4个字符',
            'maxlength':     '密码不能多于20个字符'
        }
    };

    login()
    {
        this.isloading=true;
        this.userService.loginUser(this.user.uname,this.user.upassword).subscribe( success=> (this.loginsuccess(success), this.errorMessage=null),error => (this.errorMessage=<any>error));
    }
    loginsuccess(success:number)
    {
        this.isloading=false;
        if(success>0)
        {
            console.log("success");
            localStorage.setItem('uid',success.toString());
            this.userService.checkUserLogin(success).subscribe(user => this.userService.setNowUser(user));
            if(localStorage.getItem("wantToGo")!=null)
            {
                let url=localStorage.getItem("wantToGo");
                localStorage.removeItem("wantToGo");
                this.router.navigate([url]);
            }
            else
            {
                this.router.navigate(['/user/index']);
            }
        }
        else if(success==-400)
        {
            console.log("account not activation");
            this.formChanged();
            this.formErrors['error']="账号未激活！";
        }
        else if(success==-404)
        {
            console.log("find no account");
            this.formChanged();
            this.formErrors['error']="用户名或密码错误！";
        }
        else
        {
            console.log("fail");
            this.formChanged();
            this.formErrors['error']="未知错误！";
        }
    }
}