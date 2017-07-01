package com.city.sshdzy.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.apache.struts2.ServletActionContext;
import org.hibernate.engine.jdbc.BlobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.city.sshdzy.model.HobbyModel;
import com.city.sshdzy.model.UserInfoModel;
import com.city.sshdzy.model.UserModel;
import com.city.sshdzy.service.IHobbyService;
import com.city.sshdzy.service.IUserInfoService;
import com.city.sshdzy.service.IUserService;
import com.city.sshdzy.utility.IJsonUtility;
import com.city.sshdzy.utility.IMd5Utility;
import com.city.sshdzy.utility.IReflectionUtility;

import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;

@Controller("userController")
public class UserController {
	private IUserService ius;
	private IHobbyService ihs;
	private IUserInfoService iuis;
	private UserModel um;
	private IJsonUtility iju;
	private IReflectionUtility iru;
	private IMd5Utility md5;
	private Map<String, Object> datamap=null;
	@Autowired
	public void setIus(IUserService ius) {
		this.ius = ius;
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
	public Map<String, Object> getDatamap() {
		return datamap;
	}
	@Autowired
	public void setIuis(IUserInfoService iuis) {
		this.iuis = iuis;
	}
	@Autowired
	public void setIhs(IHobbyService ihs) {
		this.ihs = ihs;
	}
	public String register()throws Exception
	{
		datamap=new HashMap<String,Object>();
		JSONObject json=this.iju.getJsonRequest();
		if(json!=null)
		{
			this.um=(UserModel)this.iru.set(json.getJSONObject("user"), UserModel.class);
			this.um.setUpassword(this.md5.getMD5(this.um.getUpassword()));
			String link=this.md5.getMD5(this.um.getUname()+new Date().getTime());
			this.um.setUlink(link);
			File photo=new File(ServletActionContext.getServletContext().getRealPath(json.getJSONObject("user").getString("uphoto")));
			InputStream input=new FileInputStream(photo);
			byte[] b=IOUtils.toByteArray(input);
			this.um.setUphotp(BlobProxy.generateProxy(b));
			int success=this.ius.register(this.um);
			if(success==200)
			{
				String url="http://localhost:3000/user/activation/"+link;
				String content="<p>尊敬的"+this.um.getUname()+",我们已收到你的注册请求，请点击链接激活你的帐号</p>"+"<a href='"+url+"'>链接</a>";
				this.ius.sendMail("taurus-uomini@taurus.cn", this.um.getUemail(), "激活你的账户", content);
			}
			datamap.put("data", success);
		}
		return "success";
	}
	public String activation()throws Exception
	{
		datamap=new HashMap<String,Object>();
		JSONObject json=this.iju.getJsonRequest();
		if(json!=null)
		{
			if(json.getString("link")!=null)
			{
				int success=this.ius.activation(json.getString("link"));
				datamap.put("data", success);
			}
			else
			{
				datamap.put("data", 500);
			}
		}	
		return "success";
	}
	public String login()throws Exception
	{
		datamap=new HashMap<String,Object>();
		JSONObject json=this.iju.getJsonRequest();
		if(json!=null)
		{
			if(json.getString("uname")!=null&&json.getString("upassword")!=null)
			{
				int success=this.ius.login(json.getString("uname"), this.md5.getMD5(json.getString("upassword")));
				if(success!=-404&&success!=-400)
				{
					HttpSession session=ServletActionContext.getRequest().getSession();
					session.setAttribute("uid", success);
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
			if(json.get("uid")!=null)
			{
				this.um=this.ius.getUserInfoById((int)json.get("uid"));
				datamap.put("data", this.um);
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
			this.um=this.ius.getUserInfoById((int)json.get("uid"));
			if(this.um==null)
			{
				datamap.put("data", -500);
			}
			else if(this.um.getUpassword().equals(this.md5.getMD5(json.get("upassword").toString())))
			{
				this.um.setUpassword(this.md5.getMD5(json.getString("newupassword")));
				this.ius.changeUser(this.um);
				datamap.put("data", 1);
			}
			else
			{
				datamap.put("data", -404);
			}
		}
		return "success";
	}
	public String editInfo()throws Exception
	{
		datamap=new HashMap<String,Object>();
		JSONObject json=this.iju.getJsonRequest();
		if(json!=null)
		{
			this.um=(UserModel)this.iru.set(json.getJSONObject("user"), UserModel.class);
			UserInfoModel uim=(UserInfoModel)this.iru.set(json.getJSONObject("userInfo"), UserInfoModel.class);
			System.out.println(json.getJSONObject("user").getString("uphoto"));
			Object[] array=json.getJSONArray("hobbiesid").toArray();
			int i=1;
			this.um.setHobbies(this.ius.getUserInfoById(this.um.getUid()).getHobbies());
			this.um.getHobbies().clear();
			for(Object b:array)
			{
				if(b.toString().equals("true"))
				{
					HobbyModel hm=this.ihs.getHobbyById(i);
					this.um.getHobbies().add(hm);
				}
				++i;
			}
			if(json.getJSONObject("user").getString("uphoto").trim().equals("null"))
			{
				this.um.setUphotp(this.ius.getUserInfoById(this.um.getUid()).getUphotp());
			}
			else
			{
				File photo=null;
				photo=new File(ServletActionContext.getServletContext().getRealPath(json.getJSONObject("user").getString("uphoto")));
				InputStream input=new FileInputStream(photo);
				byte[] b=IOUtils.toByteArray(input);
				this.um.setUphotp(BlobProxy.generateProxy(b));
			}
			if(this.ius.getUserInfoById(this.um.getUid()).getUim()==null)
			{
				this.um.setUim(uim);
				this.um.getUim().setUm(this.um);
			}
			else
			{
				uim=this.ius.getUserInfoById(this.um.getUid()).getUim();
				uim.setUphone(json.getJSONObject("userInfo").getString("uphone"));
				uim.setUm(this.um);
				this.um.setUim(uim);
			}
			int success=this.ius.changeUser(this.um);
			datamap.put("data", success);
		}
		return "success";
	}
	
	public String deleteUser()throws Exception
	{
		datamap=new HashMap<String,Object>();
		JSONObject json=this.iju.getJsonRequest();
		if(json!=null&&json.has("uid"))
		{
			this.um=new UserModel();
			this.um.setUid(json.getInt("uid"));
			this.ius.deleteUser(this.um);
			datamap.put("data", true);
		}
		return "success";
	}
	
	public String getUserList()throws Exception
	{
		datamap=new HashMap<String,Object>();
		JSONObject json=this.iju.getJsonRequest();
		if(json!=null&&json.has("row")&&json.has("page"))
		{
			List<UserModel> list=this.ius.getListByPage(json.getInt("row"), json.getInt("page"));
			datamap.put("data", list);
		}
		return "success";
	}
	
	public String getUserCount()throws Exception
	{
		datamap=new HashMap<String,Object>();
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cookie");
		int count=this.ius.getUserCount();
		datamap.put("data", count);
		return "success";
	}
	
	public InputStream getInputStream()throws Exception
	{
		InputStream input=null;
		if(this.um!=null)
		{
			this.um=this.ius.getUserInfoById(this.um.getUid());
			input=this.um.getUphotp().getBinaryStream();
		}
		return input;
	}
	public String getPhoto()throws Exception
	{	
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cookie");
		if(this.um==null)
		{
			return "false";
		}
		return "success";
	}
}
