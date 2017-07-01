import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from './user';
import { UserService } from './user.service';
import { FileUploadService } from '../file-upload.service';

@Component
(
    {
        selector:'user-register',
        templateUrl:'./user-register.component.html',
        styleUrls:['./user-register.component.css'],
        providers:
        [
            
        ]
    }
)
export class UserRegisterComponent implements OnInit, AfterViewChecked
{
    user: User;
    rupassword:string;
    errorMessage:string;
    userForm:NgForm;
    isloading:boolean;
    @ViewChild('userForm') currentForm: NgForm;

    constructor(private userService:UserService, public fileuploadservice:FileUploadService)
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
        'rupassword': '',
        'urename': '',
        'uemail': '',
        'error': '',
        'uphoto' : ''
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
        },
        'rupassword': 
        {
            'required':      '重复密码从不能为空！',
            'pattern':       '两次密码不相同！'
        },
        'urename': 
        {
            'required':      '真实姓名不能为空！'
        },
        'uemail': 
        {
            'required':      '电子邮箱不能为空！',
            'pattern':       '电子邮箱格式错误！'
        },
        'uphoto': 
        {
            'required':      '未选择头像！',
            'pattern':       '未上传头像！'
        },
    };
    register()
    {
        this.isloading=true;
        let nowtime=new Date();
        this.user.uregistertime=nowtime.getFullYear()+'-'+(nowtime.getMonth()+1)+'-'+nowtime.getDate()+'T'+nowtime.getHours()+':'+nowtime.getMinutes()+':'+nowtime.getSeconds();
        this.user.ustatic=0;
        this.user.uphoto=this.fileuploadservice.getfile(0);
        this.userService.registerUser(this.user).subscribe( success=> (this.registersuccess(success), this.errorMessage=null),error => (this.errorMessage=<any>error));
    }
    registersuccess(success:number)
    {
        this.isloading=false;
        if(success==200)
        {
            console.log("success");
            let mail=this.user.uemail.split("@")[1].split(".")[0]+"邮箱";
            window.location.href="https://www.baidu.com/s?wd="+mail;
        }
        else if(success==202)
        {
            console.log("uname already have");
            this.formChanged();
            this.formErrors['uname']="用户名已存在！";
        }
        else
        {
            console.log("fail");
            this.formChanged();
            this.formErrors['error']="未知错误！";
        }
    }
}