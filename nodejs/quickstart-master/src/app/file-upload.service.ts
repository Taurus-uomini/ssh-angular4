import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Request } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class FileUploadService
{
    private Url = "http://localhost:8080/sshdzy/fileupload";
    private files:Array<any>=[];
    constructor(private http:Http)
    {
        
    }
    hasFile():boolean
    {
        return this.files.length>0;
    }
    getfile(index:number):string
    {
        return this.files[index].valuedata;
    }
    setmousemove(file:any,is:boolean)
    {
        if(file.url==null)
        {
            file.ismousemove=false;
        }
        else
        {
            file.ismousemove=is;
        }    
    }
    addfile()
    {
        this.files.push(null);
    }
    setNowFile(file:any, url:string)
    {
        this.files[0]=file;
        this.files[0].valuedata=url;
        this.files[0].isupload=true;
    }
    setfile(file:any, index:number)
    {
        let reader=new FileReader();
        file.isupload=false;
        if(file.value!='')
        {
            this.files[index]=file;
            file.valuedata="文件路径："+file.value;
            reader.onload=function()
            {
                file.url=reader.result;
            }
            reader.readAsDataURL(file.files[0]);
        }
        else
        {
            file.valuedata="";
            file.url=null;
            this.files[index]=null;
        }
    }
    upload(index:number)
    {
        let form:FormData=new FormData();
        if(this.files[index]!=null)
        {
            let file:File=this.files[index].files[0];
            form.append("file",file);
            this.http.post(this.Url,form).map(this.extractData).subscribe(url => {this.files[index].valuedata=url,this.files[index].isupload=true});
        }
    }
    uploadall()
    {
        let that=this;
        this.files.forEach(function(value,index,obj)
        {
            that.upload(index);
        });
    }
    private extractData(res: Response)
    {
        let body=res.json();
        return body.data || {};
    }
}