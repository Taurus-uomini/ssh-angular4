import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { UserService } from './user.service';
import { User } from "./user";

@Component
(
    {
        templateUrl:'./user-index.component.html',
        styleUrls:['./user-index.component.css'],
        providers:
        [
            
        ]
    }
)
export class UserIndexComponent implements OnInit
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
}