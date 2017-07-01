package com.city.sshdzy.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

import com.city.sshdzy.javabean.XmlToJava;
import com.city.sshdzy.javabean.getXmlMenu;


@Controller("menuController")
public class MenuController {
	private Map<String, Object> datamap=null;
	
	public Map<String, Object> getDatamap() {
		return datamap;
	}

	public String getmenu()throws Exception
	{
		datamap=new HashMap<String,Object>();
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cookie");
		JAXBContext jc=JAXBContext.newInstance(getXmlMenu.class);
		Unmarshaller us=jc.createUnmarshaller();
		getXmlMenu xml=(getXmlMenu)us.unmarshal(new File(ServletActionContext.getRequest().getServletContext().getRealPath("/xml/menu.xml")));
		List<XmlToJava> menu=xml.getItem();
		datamap.put("data", menu);
		return "success";
	}
}
