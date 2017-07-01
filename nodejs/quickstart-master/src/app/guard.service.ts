import { Injectable }       from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MenuService } from './menu.service';
import { Menu } from "./menu";

@Injectable()
export class GuardService implements CanActivate
{
    constructor(private router:Router, private menuService:MenuService)
    {
        
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
    {
        let menus;
        if(this.menuService.isHasData()==false)
        {
            menus=this.localMenu();
        }
        else
        {
            menus=this.menuService.getNowMenu();
        }
        if(this.powerCheck(menus,state)==false)
        {
            return false;
        }
        if(state.url=="/user/login")
        {
            if(localStorage.getItem("uid")!=null||localStorage.getItem("aid")!=null)
            {
                this.router.navigate(['/user/logout']);
                localStorage.setItem("loginurl",state.url);
                return false;
            }
        }
        if(state.url=="/admin/login")
        {
            if(localStorage.getItem("uid")!=null||localStorage.getItem("aid")!=null)
            {
                this.router.navigate(['/user/logout']);
                localStorage.setItem("loginurl",state.url);
                return false;
            }
        }
        if(state.url=="/index")
        {
            if(localStorage.getItem("uid")==null)
            {
                this.router.navigate(['user/login']);
                return false;
            }

        }
        /*if(state.url=="/admin/index")
        {
            if(localStorage.getItem("aid")==null)
            {
                this.router.navigate(['admin/login']);
                return false;
            }

        }*/
        return true;
    }

    powerCheck(menus:Menu[],state: RouterStateSnapshot):boolean
    {
        let that=this;
        menus.forEach(function(val,index,obj)
        {
            let uri=val.uri;
            let loginurl=val.loginurl;
            let power=val.power;
            if(uri==state.url)
            {
                if((power==1&&localStorage.getItem("aid")==null)||(power==2&&localStorage.getItem("uid")==null))
                {
                    console.log("has no power");
                    that.router.navigate([loginurl]);
                    localStorage.setItem("wantToGo",state.url);
                    return false;
                }
            }
        });
        return true;
    }

    localMenu():Menu[]
    {
        let menus;
        let map;
        menus=new Array<Menu>();
        map=new Menu();
        map.power=1;
        map.loginurl="/admin/login";
        map.uri="/admin/index";
        menus.push(map);
        map=new Menu();
        map.power=2;
        map.loginurl="/user/login";
        map.uri="/user/index";
        menus.push(map);
        map=new Menu();
        map.power=2;
        map.loginurl="/user/login";
        map.uri="/user/index/editinfo";
        menus.push(map);
        map=new Menu();
        map.power=2;
        map.loginurl="/user/login";
        map.uri="/user/index/changepasswd";
        menus.push(map);
        return menus;
    }

}