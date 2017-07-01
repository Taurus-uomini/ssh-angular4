package com.city.sshdzy.service.impl;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.city.sshdzy.model.UserInfoModel;
import com.city.sshdzy.service.IUserInfoService;
@Service("userInfoService")
@Transactional
public class UserInfoServiceImpl implements IUserInfoService {
	private SessionFactory sf;
	@Autowired
	public void setSf(SessionFactory sf) {
		this.sf = sf;
	}

	@Override
	public int edit(UserInfoModel uim) throws Exception {
		sf.getCurrentSession().update(uim);
		return 1;
	}

}
