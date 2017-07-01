package com.city.sshdzy.utility.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Component;

import com.city.sshdzy.utility.IJsonUtility;
import net.sf.json.JSONObject;

@Component("jsonUtility")
public class JsonUtilityImpl implements IJsonUtility {

	@Override
	public JSONObject getJsonRequest() throws Exception {
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cookie");
		HttpServletRequest request=ServletActionContext.getRequest();
		JSONObject json=null;
		if(request.getContentLength()!=-1)
		{
			try 
			{
				String jsonstr="";
				InputStream input=request.getInputStream();
				BufferedReader reader=new BufferedReader(new InputStreamReader(input, "utf-8"));
				String str="";
				while((str=reader.readLine())!=null)
				{
					jsonstr+=str;
				}
				reader.close();
				input.close();
				json=JSONObject.fromObject(jsonstr);
			} 
			catch (IOException e) 
			{
				e.printStackTrace();
			}
		}
		return json;
	}

}
