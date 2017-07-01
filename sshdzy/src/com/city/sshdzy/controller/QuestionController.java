package com.city.sshdzy.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.city.sshdzy.model.QuestionItemModel;
import com.city.sshdzy.model.QuestionItemOptionModel;
import com.city.sshdzy.model.QuestionModel;
import com.city.sshdzy.model.UserModel;
import com.city.sshdzy.service.IQuestionService;
import com.city.sshdzy.utility.IJsonUtility;
import com.city.sshdzy.utility.IReflectionUtility;

import net.sf.json.JSONObject;

@Controller("questionController")
public class QuestionController {
	private IQuestionService iqs;
	private Map<String, Object> datamap=null;
	private IJsonUtility iju;
	private IReflectionUtility iru;
	@Autowired
	public void setIqs(IQuestionService iqs) {
		this.iqs = iqs;
	}

	public Map<String, Object> getDatamap() {
		return datamap;
	}
	@Autowired
	public void setIju(IJsonUtility iju) {
		this.iju = iju;
	}
	@Autowired
	public void setIru(IReflectionUtility iru) {
		this.iru = iru;
	}
	public String questionMain()throws Exception
	{
		return "success";
	}
	public String addQuestion()throws Exception
	{
		datamap=new HashMap<String,Object>();
		HttpServletRequest request=ServletActionContext.getRequest();
		String question=request.getParameter("question");
		String questionitem=request.getParameter("questionitem");
		String option=request.getParameter("option");
		if(question!=null)
		{
			UserModel um=new UserModel();
			um.setUid((int)request.getSession().getAttribute("uid"));
			QuestionModel qm=new QuestionModel();
			qm.setQtitle(question);
			qm.setUm(um);
			qm.setQstatus(0);
			this.iqs.addQuestion(qm);
			datamap.put("ret", qm.getQid());
		}
		else if(questionitem!=null)
		{
			String questionid=request.getParameter("questionid");
			String questionitemtype=request.getParameter("questionitemtype");
			QuestionModel qm=new QuestionModel();
			qm.setQid(Integer.parseInt(questionid));
			QuestionItemModel qim=new QuestionItemModel();
			qim.setQitype(Integer.parseInt(questionitemtype));
			qim.setQititle(questionitem);
			qim.setQm(qm);
			this.iqs.addQuestionItem(qim);
			datamap.put("ret", qim.getQiid());
		}
		else
		{
			String questionitemid=request.getParameter("questionitemid");
			QuestionItemModel qim=new QuestionItemModel();
			qim.setQiid(Integer.parseInt(questionitemid));
			QuestionItemOptionModel qiom=new QuestionItemOptionModel();
			qiom.setQiotitle(option);
			qiom.setQim(qim);
			this.iqs.addQuestionItemOption(qiom);
			datamap.put("ret", qiom.getQioid());
		}
		return "success";
	}
	public String deleteQuestion()throws Exception
	{
		datamap=new HashMap<String,Object>();
		JSONObject json=this.iju.getJsonRequest();
		if(json!=null)
		{
			QuestionModel qm=new QuestionModel();
			qm.setQid(json.getInt("qid"));
			this.iqs.deleteQuestion(qm);
			datamap.put("data", true);
		}
		return "success";
	}
	public String getQuestionList()throws Exception
	{
		datamap=new HashMap<String,Object>();
		JSONObject json=this.iju.getJsonRequest();
		if(json!=null&&json.has("row")&&json.has("page"))
		{
			List<QuestionModel> list=this.iqs.getListByPage(json.getInt("row"), json.getInt("page"));
			datamap.put("data", list);
		}
		return "success";
	}
	
	public String getQuestionCount()throws Exception
	{
		datamap=new HashMap<String,Object>();
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cookie");
		int count=this.iqs.getQuestionCount();
		datamap.put("data", count);
		return "success";
	}
	public String checkQuestion()throws Exception
	{
		datamap=new HashMap<String,Object>();
		JSONObject json=this.iju.getJsonRequest();
		if(json!=null)
		{
			QuestionModel qm=this.iqs.getQuestionById(json.getInt("qid"));
			qm.setQstatus(1);
			this.iqs.checkQuestion(qm);
			datamap.put("data", true);
		}
		return "success";
	}
}
