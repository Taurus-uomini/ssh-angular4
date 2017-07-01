import { Component, OnInit } from '@angular/core';
import { UserService } from "./user/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Question } from "./question/question";

@Component
(
    {
        selector:'show',
        templateUrl:'./app-show.component.html',
        styleUrls:['./app-show.component.css'],
        providers:
        [
            
        ]
    }
)
export class AppShowComponent implements OnInit
{
    question:Question;
    errormessage:string;
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
        let qid=parseInt(localStorage.getItem("qid"));
        this.userService.getQuestion(qid).subscribe(question => this.question=question);
    }
    constructor(private userService:UserService, private route:ActivatedRoute, private router:Router)
    {
        
    }
}