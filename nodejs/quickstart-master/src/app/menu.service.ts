import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Request } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Menu } from "./menu";


@Injectable()
export class MenuService
{
    private Url = "http://localhost:8080/sshdzy/getmenu";
    private menu:Array<Menu>;
    private urlPower:Map<string,Array<Object>>;
    private hasData:boolean;
    private showMenu:boolean;
    constructor(private http:Http)
    {
        this.urlPower=new Map();
        this.hasData=false;
        this.showMenu=false;
    }
    setNowMenu(menu:Array<Menu>)
    { 
        this.hasData=true; 
        this.menu=menu;
    }
    getNowMenu():Array<Menu>
    {
        return this.menu;
    }
    getMenu(): Observable<Array<Menu>>
    {
        return this.http.get(this.Url).map(this.extractData).catch(this.handleError);
    }
    isHasData():boolean
    {
        return this.hasData;
    }

    isShowMenu():boolean
    {
        return this.showMenu;
    }

    setShowMenu(b:boolean)
    {
        this.showMenu=b;
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