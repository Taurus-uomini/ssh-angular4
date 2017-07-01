package com.city.sshdzy.utility.impl;

import java.lang.reflect.Method;
import java.text.SimpleDateFormat;

import org.springframework.stereotype.Component;

import com.city.sshdzy.model.UserInfoModel;
import com.city.sshdzy.utility.IReflectionUtility;

import net.sf.json.JSONObject;
@Component("reflectionUtility")
public class ReflectionUtilityImpl implements IReflectionUtility {

	@Override
	public <T> Object set(JSONObject json, Class<T> c) throws Exception {
		Method ms[]=c.getDeclaredMethods();
		Object o=c.newInstance();
		for(Method m:ms)
		{
			if(m.getName().startsWith("set"))
			{
				String p=m.getName().split("set")[1].toLowerCase();
				String pc=m.getParameterTypes()[0].getName();
				if(json.has(p))
				{
					if(pc.equals("java.lang.String"))
					{
						m.invoke(o, json.get(p).toString());
					}
					else if(pc.equals("java.util.Date"))
					{
						m.invoke(o, new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss").parse(json.get(p).toString()));
					}
					else if(pc.equals("java.lang.Integer"))
					{
						m.invoke(o, new Integer(json.get(p).toString()));
					}
					else if(pc.equals("java.lang.Double"))
					{
						m.invoke(o, new Double(json.get(p).toString()));
					}
				}
			}
		}
		return o;
	}

}
