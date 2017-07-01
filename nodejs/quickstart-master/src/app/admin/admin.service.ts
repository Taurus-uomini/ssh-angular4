import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Request } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Admin} from './admin';
import { AppLoginService } from '../app-login.service';

@Injectable()
export class AdminService
{
    private adminUrl="http://localhost:8080/sshdzy/";
    private admin:Admin;
    constructor(private http:Http, private appLoginService:AppLoginService)
    {
        this.admin=new Admin();
    }
    hasAdmin():boolean
    {
        return this.admin.aid!=null;
    }
    setNowAdmin(admin:Admin)
    {
        this.admin=admin;
        if(this.admin!=null)
        {
            this.appLoginService.setInfo(1,this.admin.aname);
        }
    }

    getNowAdmin():Admin
    {
        return this.admin;
    }

    loginAdmin(aname:string,apassword:string): Observable<number>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        let nowtime=new Date();
        let alogintime=nowtime.getFullYear()+'-'+(nowtime.getMonth()+1)+'-'+nowtime.getDate()+' '+nowtime.getHours()+':'+nowtime.getMinutes()+':'+nowtime.getSeconds();
        return this.http.post(this.adminUrl+"admin/login",JSON.stringify({aname:aname,apassword:apassword,alogintime:alogintime}),options).map(this.extractData).catch(this.handleError);
    }

    checkAdminLogin(aid:number): Observable<Admin>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        let json=null;
        if(aid!=null)
        {
            json=JSON.stringify({aid:aid});
        }
        else
        {
            json=JSON.stringify({});
        }
        return this.http.post(this.adminUrl+"admin/checkLogin",json,options).map(this.extractData).catch(this.handleError);
    }

    changePasswd(aid:number,apassword:string,newapassword:string): Observable<number>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        return this.http.post(this.adminUrl+"admin/changePasswd",JSON.stringify({aid:aid,apassword:apassword,newapassword:newapassword}),options).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response)
    {
        let body=res.json();
        return body.data || {};
    }

    private handleError (error: Response | any) 
    {
        let errMsg: string;
        if (error instanceof Response) 
        {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else 
        {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}