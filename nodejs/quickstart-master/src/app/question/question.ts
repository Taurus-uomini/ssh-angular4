import { QuestionItem } from "./questionitem";

export class Question
{
    public qid:number;
    public qstatus:number;
    public qtitle:string;
    public questionitems:Array<QuestionItem>;
}