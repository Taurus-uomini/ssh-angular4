import { QuestionItemOption } from "./questionitemoption";

export class QuestionItem
{
    public qiid:number;
    public qitype:number;
    public qititle:string;
    public questionitemoptions:Array<QuestionItemOption>;
}