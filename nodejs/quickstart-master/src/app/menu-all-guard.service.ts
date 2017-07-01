import { Injectable }       from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MenuService } from './menu.service';
import { Menu } from "./menu";

@Injectable()
export class MenuAllGuardService implements CanActivate
{
    constructor(private router:Router, private menuService:MenuService)
    {
        
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
    {
        let menus;
        this.menuService.setShowMenu(false);
        if(this.menuService.isHasData()==false)
        {
            menus=this.localMenu();
        }
        else
        {
            menus=this.menuService.getNowMenu();
        }
        this.powerCheck(menus,state);
        return true;
    }

    powerCheck(menus:Menu[],state: RouterStateSnapshot):boolean
    {
        let that=this;
        menus.forEach(function(val,index,obj)
        {
            let uri=val.uri;
            menus[index].active=0;
            if(uri==state.url)
            {
                that.menuService.setShowMenu(true);
                menus[index].active=1;
            }
        });
        that.menuService.setNowMenu(menus);
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