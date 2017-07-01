import { UserInfo } from "./user-info";
import { Hobby } from "./hobby";
import { Question } from "../question/question";

export class User
{
    public uid:number;
    public uname:string;
    public upassword:string;
    public urename:string;
    public uemail:string;
    public ustatic:number;
    public uregistertime:string;
    public uphoto:string;
    public uim:UserInfo;
    public hobbies:Array<Hobby>;
    public questions:Array<Question>;
}