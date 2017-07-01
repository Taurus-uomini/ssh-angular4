package com.city.sshdzy.service.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.city.sshdzy.model.HobbyModel;
import com.city.sshdzy.service.IHobbyService;
@Service("hobbyService")
@Transactional
public class HobbyServiceImpl implements IHobbyService {
	private SessionFactory sf;
	@Autowired
	public void setSf(SessionFactory sf) {
		this.sf = sf;
	}

	@Override
	public List<HobbyModel> getList() throws Exception {
		Query<HobbyModel> query=sf.getCurrentSession().createQuery("from HobbyModel h", HobbyModel.class);
		return query.getResultList();
	}

	@Override
	public HobbyModel getHobbyById(int hid) throws Exception {
		return sf.getCurrentSession().get(HobbyModel.class, hid);
	}

}
