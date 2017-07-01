package com.city.sshdzy.service.impl;

import java.util.Date;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.city.sshdzy.model.AdminModel;
import com.city.sshdzy.service.IAdminService;
@Service("adminService")
@Transactional
public class AdminServiceImpl implements IAdminService {
	private SessionFactory sf;
	@Autowired
	public void setSf(SessionFactory sf) {
		this.sf = sf;
	}

	@Override
	public int login(String aname, String apassword, Date alogintime) throws Exception {
		Query<AdminModel> query=sf.getCurrentSession().createQuery("from AdminModel a where a.aname=:aname and a.apassword=:apassword",AdminModel.class);
		query.setParameter("aname", aname);
		query.setParameter("apassword", apassword);
		AdminModel am=query.uniqueResult();
		if(am==null)
		{
			return -404;
		}
		else
		{
			am.setAlogintime(alogintime);
			return am.getAid();
		}
	}

	@Override
	public AdminModel getAdminInfoById(int aid) throws Exception {
		return sf.getCurrentSession().get(AdminModel.class, aid);
	}

	@Override
	public int changeAdmin(AdminModel am) throws Exception {
		sf.getCurrentSession().update(am);
		return 1;
	}

}
