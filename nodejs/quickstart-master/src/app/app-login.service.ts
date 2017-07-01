import { Injectable } from '@angular/core';

@Injectable()
export class AppLoginService
{
    private type:number;
    private name:string;
    private mainUrl:string;
    constructor()
    {
        this.initInfo();
    }
    hasInfo():boolean
    {
        return this.name!=null;
    }
    setInfo(type:number,name:string)
    {
        this.type=type;
        this.name=name;
        this.mainUrl="user/index";
        if(this.type==1)
        {
            this.name="管理员："+this.name;
            this.mainUrl="admin/index";
        }
    }

    getInfo():string
    {
        return this.name;
    }

    getType():number
    {
        return this.type;
    }

    initInfo()
    {
        this.type=0;
        this.name=null;
    }

    getMainUrl():string
    {
        return this.mainUrl;
    }
}