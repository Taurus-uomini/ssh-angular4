import { Component, OnInit, ViewChild } from '@angular/core';

import { Admin } from './admin';
import { AdminService } from './admin.service';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component
(
    {
        selector:'admin-index',
        templateUrl:'./admin-change-passwd.component.html',
        styleUrls:['./admin-change-passwd.component.css'],
        providers:
        [
            
        ]
    }
)
export class AdminChangePasswdComponent implements OnInit
{
    admin:Admin;
    errorMessage:string;
    adminForm:NgForm;
    isloading:boolean;
    apassword:string;
    newapassword:string;
    newreapassword:string;
    @ViewChild('adminForm') currentForm: NgForm;
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
        this.admin=this.adminService.getNowAdmin();
    }
    constructor(private adminService:AdminService, private route:ActivatedRoute, private router:Router)
    {
        
    }
    ngAfterViewChecked()
    {
        this.formChanged();
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
        'apassword': '',
        'newapassword': '',
        'newreapassword': '',
        'error': ''
    };

    validationMessages = 
    {
        'apassword': 
        {
            'required':      '原密码不能为空！',
            'minlength':     '原密码不能少于4个字符',
            'maxlength':     '原密码不能多于20个字符'
        },
        'newapassword': 
        {
            'required':      '新密码不能为空！',
            'minlength':     '新密码不能少于4个字符',
            'maxlength':     '新密码不能多于20个字符'
        },
        'newreapassword': 
        {
            'required':      '重复新密码不能为空！',
            'pattern':       '两次密码不相同！'

        }
    };

    changePasswd()
    {
        this.isloading=true;
        this.adminService.changePasswd(this.admin.aid,this.apassword,this.newapassword).subscribe( success=> (this.changePasswdSuccess(success), this.errorMessage=null),error => (this.errorMessage=<any>error));
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