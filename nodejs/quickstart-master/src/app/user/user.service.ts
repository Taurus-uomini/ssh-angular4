import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Request } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {User} from './user';
import { Hobby } from "./hobby";
import { AppLoginService } from '../app-login.service';
import { Question } from "../question/question";

@Injectable()
export class UserService
{
    private userUrl="http://localhost:8080/sshdzy/";
    private user:User;
    constructor(private http:Http, private appLoginService:AppLoginService)
    {
        this.user=new User();
    }
    hasUser():boolean
    {
        return this.user.uid!=null;
    }
    setNowUser(user:User)
    {
        this.user=user;
        if(this.user!=null)
        {
            this.appLoginService.setInfo(2,this.user.uname);
        }
    }
    getNowUser():User
    {
        return this.user;
    }

    getUser(): Observable<User[]>
    {
        return this.http.get(this.userUrl+"getlist").map(this.extractData).catch(this.handleError);
    }

    registerUser(user:User): Observable<number>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        return this.http.post(this.userUrl+"user/register",JSON.stringify({user:user}),options).map(this.extractData).catch(this.handleError);
    }

    activationUser(link:string): Observable<number>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        return this.http.post(this.userUrl+"user/activation",JSON.stringify({link:link}),options).map(this.extractData).catch(this.handleError);
    }

    loginUser(uname:string,upassword:string): Observable<number>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        return this.http.post(this.userUrl+"user/login",JSON.stringify({uname:uname,upassword:upassword}),options).map(this.extractData).catch(this.handleError);
    }

    changePassed(uid:number,upassword:string,newupassword:string): Observable<number>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        return this.http.post(this.userUrl+"user/changePasswd",JSON.stringify({uid:uid,upassword:upassword,newupassword:newupassword}),options).map(this.extractData).catch(this.handleError);
    }

    checkUserLogin(uid:number): Observable<User>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        let json=null;
        if(uid!=null)
        {
            json=JSON.stringify({uid:uid});
        }
        else
        {
            json=JSON.stringify({});
        }
        return this.http.post(this.userUrl+"user/checkLogin",json,options).map(this.extractData).catch(this.handleError);
    }

    deleteUser(uid:number): Observable<Boolean>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        return this.http.post(this.userUrl+"user/deleteUser",JSON.stringify({uid:uid}),options).map(this.extractData).catch(this.handleError);
    }

    getUserList(row:number,page:number): Observable<Array<User>>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        return this.http.post(this.userUrl+"user/getUserList",JSON.stringify({row:row,page:page}),options).map(this.extractData).catch(this.handleError);
    }

    getUserCount(): Observable<number>
    {
        return this.http.get(this.userUrl+"user/getUserCount").map(this.extractData).catch(this.handleError);
    }

    editInfo(user:User,hobbiesid:Array<boolean>): Observable<number>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        return this.http.post(this.userUrl+"user/editInfo",JSON.stringify({user:user,userInfo:user.uim,hobbiesid:hobbiesid}),options).map(this.extractData).catch(this.handleError);
    }

    getPhotoData(uid:number): Observable<File>
    {
        return this.http.get(this.userUrl+"user/getPhoto?um.uid="+uid).map(this.extractFileData).catch(this.handleError);
    }

    getHobbyList():Observable<Array<Hobby>>
    {
        return this.http.get(this.userUrl+"hobby/getHobbyList").map(this.extractData).catch(this.handleError);
    }

    deleteQuestion(qid:number):Observable<Boolean>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        return this.http.post(this.userUrl+"user/deleteQuestion",JSON.stringify({qid:qid}),options).map(this.extractData).catch(this.handleError);
    }

    getQuestionCount():Observable<number>
    {
        return this.http.get(this.userUrl+"user/getQuestionCount").map(this.extractData).catch(this.handleError);
    }

    getQuestionList(row:number,page:number): Observable<Array<Question>>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        return this.http.post(this.userUrl+"user/getQuestionList",JSON.stringify({row:row,page:page}),options).map(this.extractData).catch(this.handleError);
    }

    checkQuestion(qid:number):Observable<Boolean>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        return this.http.post(this.userUrl+"user/checkQuestion",JSON.stringify({qid:qid}),options).map(this.extractData).catch(this.handleError);
    }
    
    getQuestion(qid:number):Observable<Question>
    {
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        return this.http.post(this.userUrl+"user/getQuestion",JSON.stringify({qid:qid}),options).map(this.extractData).catch(this.handleError);
    }

    private extractFileData(res: Response)
    {
        return res.blob || {};
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