package com.city.sshdzy.interceptor;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.MethodFilterInterceptor;

public class userCheckingInterceptor extends MethodFilterInterceptor{

	@Override
	protected String doIntercept(ActionInvocation arg0) throws Exception {
		HttpServletRequest request=ServletActionContext.getRequest();
		String uid=request.getParameter("uid");
		if(uid!=null)
		{
			request.getSession().setAttribute("uid", Integer.parseInt(uid));
			return arg0.invoke();
		}
		else if(request.getAttribute("uid")!=null&&!request.getAttribute("uid").equals(""))
		{
			return arg0.invoke();
		}
		else
		{
			return "login";
		}
	}

}
