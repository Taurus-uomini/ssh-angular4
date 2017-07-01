import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from "@angular/forms";

import 'rxjs/add/operator/switchMap';

import { UserService } from './user.service';
import { User } from "./user";
import { FileUploadService } from "../file-upload.service";
import { UserInfo } from "./user-info";
import { Hobby } from "./hobby";

@Component
(
    {
        templateUrl:'./user-edit-info.component.html',
        styleUrls:['./user-edit-info.component.css'],
        providers:
        [
            
        ]
    }
)
export class UserEditInfoComponent implements OnInit
{
    user:User;
    errorMessage:string;
    userForm:NgForm;
    isloading:boolean;
    photoUrl:string;
    hobbies:Array<Hobby>;
    hobbiesid:Array<boolean>;
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
        if(this.user.uim==null)
        {
            this.user.uim=new UserInfo();
        }
        this.photoUrl="sshdzy/user/getPhoto?um.uid="+this.user.uid;
        this.userService.getHobbyList().subscribe(list => this.hobbies=list);
        this.hobbiesid=new Array<boolean>();
        let that=this;
        if(this.user.hobbies!=null)
        {
            this.user.hobbies.forEach(function(val,index,obj)
            {
                that.hobbiesid[val.hid-1]=true;
            });
        }
        
    }
    
    constructor(private userService:UserService, private route:ActivatedRoute, private router:Router, public fileuploadservice:FileUploadService)
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
        'error': '',
        'uphoto' : '',
        'uphone' : ''
    };

    validationMessages = 
    {
        'uphoto': 
        {
            'required':      '未选择头像！',
            'pattern':       '未上传头像！'
        },
        'uphone': 
        {
            'required':      '手机号不能为空！',
            'pattern':       '手机号格式错误！'
        }
    };
    edit()
    {
        this.isloading=true;
        if(this.fileuploadservice.hasFile())
        {
            this.user.uphoto=this.fileuploadservice.getfile(0);
        }
        else
        {
            this.user.uphoto=null;
        }
        this.userService.editInfo(this.user,this.hobbiesid).subscribe( success=> (this.editsuccess(success), this.errorMessage=null),error => (this.errorMessage=<any>error));
    }
    editsuccess(success:number)
    {
        this.isloading=false;
        if(success==1)
        {
            console.log("success");
        }
        else
        {
            console.log("fail");
            this.formChanged();
            this.formErrors['error']="未知错误！";
        }
    }
    hobbyClick(i:number)
    {
        this.hobbiesid[i]==true?this.hobbiesid[i]=false:this.hobbiesid[i]=true;
    }
}