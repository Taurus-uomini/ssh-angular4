import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { UserService } from './user.service';
import { User } from "./user";

@Component
(
    {
        templateUrl:'./user-question-show.component.html',
        styleUrls:['./user-question-show.component.css'],
        providers:
        [
            
        ]
    }
)
export class UserQuestionShowComponent implements OnInit
{
    user:User;
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
        this.user=this.userService.getNowUser();
    }
    message: string;
    isloading:boolean;
    constructor(private userService:UserService, private route:ActivatedRoute, private router:Router)
    {
        
    }
    deleteQuestion(qid:number)
    {
        this.isloading=true;
        event.preventDefault();
        this.userService.deleteQuestion(qid).subscribe(b => this.initPage(b));
    }
    initPage(b:Boolean)
    {
        this.isloading=false;
        if(b)
        {
            this.userService.checkUserLogin(parseInt(localStorage.getItem("uid"))).subscribe(user =>(this.userService.setNowUser(user),this.user=user));
        }
    }
}