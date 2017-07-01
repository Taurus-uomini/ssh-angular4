package com.city.sshdzy.controller;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.city.sshdzy.model.AdminModel;
import com.city.sshdzy.service.IAdminService;
import com.city.sshdzy.utility.IJsonUtility;
import com.city.sshdzy.utility.IMd5Utility;
import com.city.sshdzy.utility.IReflectionUtility;

import net.sf.json.JSONObject;

@Controller("adminController")
public class AdminController {
	private AdminModel am;
	private IAdminService ias;
	private IJsonUtility iju;
	private IReflectionUtility iru;
	private IMd5Utility md5;
	private Map<String, Object> datamap=null;
	public Map<String, Object> getDatamap() {
		return datamap;
	}
	@Autowired
	public void setIas(IAdminService ias) {
		this.ias = ias;
	}
	@Autowired
	public void setIju(IJsonUtility iju) {
		this.iju = iju;
	}
	@Autowired
	public void setIru(IReflectionUtility iru) {
		this.iru = iru;
	}
	@Autowired
	public void setMd5(IMd5Utility md5) {
		this.md5 = md5;
	}
	public String login()throws Exception
	{
		datamap=new HashMap<String,Object>();
		JSONObject json=this.iju.getJsonRequest();
		if(json!=null)
		{
			if(json.getString("aname")!=null&&json.getString("apassword")!=null)
			{
				int success=this.ias.login(json.getString("aname"), this.md5.getMD5(json.getString("apassword")),new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").parse(json.getString("alogintime")));
				if(success!=-404)
				{
					HttpSession session=ServletActionContext.getRequest().getSession();
					session.setAttribute("aid", success);
				}
				datamap.put("data", success);
			}
			else
			{
				datamap.put("data", -500);
			}
		}
		return "success";
	}
	public String checkLogin()throws Exception
	{
		JSONObject json=this.iju.getJsonRequest();
		datamap=new HashMap<String,Object>();
		if(json!=null)
		{
			if(json.get("aid")!=null)
			{
				this.am=this.ias.getAdminInfoById((int)json.get("aid"));
				datamap.put("data", this.am);
			}
			else
			{
				datamap.put("data", null);
			}
		}
		return "success";
	}
	public String changePasswd()throws Exception
	{
		JSONObject json=this.iju.getJsonRequest();
		datamap=new HashMap<String,Object>();
		if(json!=null)
		{
			this.am=this.ias.getAdminInfoById((int)json.get("aid"));
			if(this.am==null)
			{
				datamap.put("data", -500);
			}
			else if(this.am.getApassword().equals(this.md5.getMD5(json.get("apassword").toString())))
			{
				this.am.setApassword(this.md5.getMD5(json.getString("newapassword")));
				this.ias.changeAdmin(this.am);
				datamap.put("data", 1);
			}
			else
			{
				datamap.put("data", -404);
			}
		}
		return "success";
	}
}
