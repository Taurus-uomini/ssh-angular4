import { Component, OnInit } from '@angular/core';

import { Admin } from './admin';
import { AdminService } from './admin.service';
import { User } from "../user/user";
import { UserService } from "../user/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Question } from "../question/question";

@Component
(
    {
        selector:'admin-index',
        templateUrl:'./admin-question.componet.html',
        styleUrls:['./admin-question.componet.css'],
        providers:
        [
            
        ]
    }
)
export class AdminQuestionComponent implements OnInit
{
    questions:Array<Question>;
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
        this.userService.getQuestionCount().subscribe(count => this.allpage=Math.ceil(count/this.row));
        this.userService.getQuestionList(this.row,1).subscribe(list => this.questions=list);
    }
    constructor(private userService:UserService, private route:ActivatedRoute, private router:Router)
    {
        
    }
    getPage(page:number,event:Event)
    {
        this.isloading=true;
        event.preventDefault();
        this.nowpage=page;
        this.userService.getQuestionList(this.row,page).subscribe(list => (this.questions=list,this.isloading=false));
    }
    deleteQuestion(qid:number)
    {
        this.isloading=true;
        event.preventDefault();
        this.userService.deleteQuestion(qid).subscribe(b => this.initPage(b));
    }
    checkQuestion(qid:number)
    {
        this.isloading=true;
        event.preventDefault();
        this.userService.checkQuestion(qid).subscribe(b => this.initPage(b));
    }
    initPage(b:Boolean)
    {
        this.isloading=false;
        if(b)
        {
            this.nowpage=1;
            this.userService.getQuestionCount().subscribe(count => this.allpage=Math.ceil(count/this.row));
            this.userService.getQuestionList(this.row,1).subscribe(list => this.questions=list);
        }
        else
        {
            this.errormessage="删除失败！";
        }
    }
}