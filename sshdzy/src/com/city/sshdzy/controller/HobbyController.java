package com.city.sshdzy.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.city.sshdzy.service.IHobbyService;
import com.city.sshdzy.utility.IJsonUtility;
import com.city.sshdzy.utility.IReflectionUtility;

@Controller("hobbyController")
public class HobbyController {
	private IHobbyService ihs;
	private IJsonUtility iju;
	private IReflectionUtility iru;
	private Map<String, Object> datamap=null;
	
	public Map<String, Object> getDatamap() {
		return datamap;
	}
	public void setDatamap(Map<String, Object> datamap) {
		this.datamap = datamap;
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
	public void setIhs(IHobbyService ihs) {
		this.ihs = ihs;
	}
	public String getHobbyList()throws Exception
	{
		datamap=new HashMap<String,Object>();
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cookie");
		datamap.put("data", this.ihs.getList());
		return "success";
	}
}
