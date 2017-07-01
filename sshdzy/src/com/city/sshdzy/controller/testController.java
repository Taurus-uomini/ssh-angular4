package com.city.sshdzy.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.city.sshdzy.model.UserModel;
import com.city.sshdzy.service.IUserService;

import net.sf.json.JSONObject;

@Controller("testController")
public class testController {
	private IUserService ius=null;
	private List<UserModel> list=null;
	Map<String, Object> datamap=null;
	@Autowired
	public void setIus(IUserService ius) {
		this.ius = ius;
	}

	public void setList(List<UserModel> list) {
		this.list = list;
	}
	public List<UserModel> getList() {
		return list;
	}

	public Map<String, Object> getDatamap() {
		return datamap;
	}

	public String getlist()
	{
		try 
		{
			list=ius.getList();
			datamap=new HashMap<String,Object>();
			datamap.put("data", list);
			datamap.put("success", true);
			ServletActionContext.getResponse().addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
			ServletActionContext.getResponse().addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		return "success";
	}
	
	private String getJsonRequest()
	{
		HttpServletRequest request=ServletActionContext.getRequest();
		String jsonstr="";
		if(request.getContentLength()!=-1)
		{
			try 
			{
				InputStream input=request.getInputStream();
				BufferedReader reader=new BufferedReader(new InputStreamReader(input, "utf-8"));
				String str="";
				while((str=reader.readLine())!=null)
				{
					jsonstr+=str;
				}
				reader.close();
				input.close();
			} 
			catch (IOException e) 
			{
				e.printStackTrace();
			}
		}
		return jsonstr;
	}
	
	public String edit()
	{
		String jsonstr=this.getJsonRequest();
		datamap=new HashMap<String,Object>();
		if(!jsonstr.equals(""))
		{
			JSONObject json=JSONObject.fromObject(jsonstr);
			datamap.put("data", json.get("name"));
			datamap.put("success", true);
		}
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		return "success";
	}
}
