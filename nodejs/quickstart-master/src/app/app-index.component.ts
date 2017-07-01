import { Component, OnInit } from '@angular/core';
import { UserService } from "./user/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Question } from "./question/question";

@Component
(
    {
        selector:'index',
        templateUrl:'./app-index.component.html',
        styleUrls:['./app-index.component.css'],
        providers:
        [
            
        ]
    }
)
export class AppIndexComponent implements OnInit
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
    showQuestion(pid:number)
    {
        localStorage.setItem("pid",pid.toString());
        this.router.navigate(["show"]);
    }
}