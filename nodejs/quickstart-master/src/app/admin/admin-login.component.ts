import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Admin } from './admin';
import { AdminService } from './admin.service';

@Component
(
    {
        selector:'admin-login',
        templateUrl:'./admin-login.component.html',
        styleUrls:['./admin-login.component.css'],
        providers:
        [
            
        ]
    }
)
export class AdminLoginComponent implements OnInit, AfterViewChecked
{
    admin: Admin;
    errorMessage:string;
    adminForm:NgForm;
    isloading:boolean;
    @ViewChild('adminForm') currentForm: NgForm;

    constructor(private adminService:AdminService, private router:Router)
    {
       
    }

    ngAfterViewChecked()
    {
        this.formChanged();
    }

    ngOnInit()
    {
        this.admin=new Admin();
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
        if (this.currentForm === this.adminForm) { return; }
        this.adminForm = this.currentForm;
        if (this.adminForm) 
        {
            this.adminForm.valueChanges.subscribe(data => this.onValueChanged(data));
        }
    }
    onValueChanged(data?: any) 
    {
        if (!this.adminForm) { return; }
        const form = this.adminForm.form;
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
        'aname': '',
        'apassword': '',
        'error': ''
    };

    validationMessages = 
    {
        'aname': 
        {
            'required':      '用户名不能为空！',
            'minlength':     '用户名不能少于4个字符',
            'maxlength':     '用户名不能多于20个字符'
        },
        'apassword': 
        {
            'required':      '密码不能为空！',
            'minlength':     '密码不能少于4个字符',
            'maxlength':     '密码不能多于20个字符'
        }
    };

    login()
    {
        this.isloading=true;
        this.adminService.loginAdmin(this.admin.aname,this.admin.apassword).subscribe( success=> (this.loginsuccess(success), this.errorMessage=null),error => (this.errorMessage=<any>error));
    }
    loginsuccess(success:number)
    {
        this.isloading=false;
        if(success>0)
        {
            console.log("success");
            localStorage.setItem('aid',success.toString());
            this.adminService.checkAdminLogin(success).subscribe(admin => this.adminService.setNowAdmin(admin));
            if(localStorage.getItem("wantToGo")!=null)
            {
                let url=localStorage.getItem("wantToGo");
                localStorage.removeItem("wantToGo");
                this.router.navigate([url]);
            }
            else
            {
                this.router.navigate(['/admin/index']);
            }
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