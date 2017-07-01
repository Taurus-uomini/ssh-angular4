package com.city.sshdzy.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.city.sshdzy.model.UserModel;
import com.city.sshdzy.service.IUserService;
@Service("UserService")
@Transactional
public class UserServiceImpl implements IUserService {
	private SessionFactory sf=null;
	@Autowired
	public void setSf(SessionFactory sf) {
		this.sf = sf;
	}

	@Override
	public List<UserModel> getList() throws Exception {
		String hql="from UserModel u";
		return sf.getCurrentSession().createQuery(hql,UserModel.class).getResultList();
	}

	@Override
	public int register(UserModel um) throws Exception {
		Session session=sf.getCurrentSession();
		Query<Integer> query=session.createQuery("select u.uid from UserModel u where u.uname=:uname",Integer.class);
		query.setParameter("uname", um.getUname());
		if(query.getResultList().size()!=0)
		{
			return 202;
		}
		else
		{
			return session.save(um) != null?200:500;
		}
	}

	@Override
	public int login(String uname, String upassword) throws Exception {
		Query<UserModel> query=sf.getCurrentSession().createQuery("from UserModel u where u.uname=:uname and u.upassword=:upassword",UserModel.class);
		query.setParameter("uname", uname);
		query.setParameter("upassword", upassword);
		UserModel um=query.uniqueResult();
		if(um==null)
		{
			return -404;
		}
		else if(um.getUstatic()==0)
		{
			return -400;
		}
		else
		{
			return um.getUid();
		}
	}
	
	@Override
	public void sendMail(String from, String to, String title, String content) throws Exception {
		Properties props=new Properties();
		props.put("mail.stmp.host", "localhost");
		props.put("mail.stmp.port", 25);
		javax.mail.Session session=javax.mail.Session.getDefaultInstance(props);
		MimeMessage message=new MimeMessage(session);
		message.setFrom(new InternetAddress(from));
		message.addRecipient(Message.RecipientType.TO,new InternetAddress(to) );
		message.setSubject(title);
		message.setSentDate(new Date());
		Multipart mp=new MimeMultipart("related");
		BodyPart bodyPart=new MimeBodyPart();
		bodyPart.setDataHandler(new DataHandler(content,"text/html;charset=utf-8"));
		mp.addBodyPart(bodyPart);
		message.setContent(mp);
		Transport.send(message);
	}

	@Override
	public int activation(String ulink) throws Exception {
		Session session=sf.getCurrentSession();
		Query<UserModel> query=session.createQuery("from UserModel u where u.ulink=:ulink",UserModel.class);
		query.setParameter("ulink", ulink);
		UserModel um=query.uniqueResult();
		if(um==null)
		{
			return 404;
		}
		else if(um.getUstatic()==1)
		{
			return 202;
		}
		else
		{
			um.setUstatic(1);
			return 200;
		}
	}

	@Override
	public UserModel getUserInfoById(int uid) throws Exception {
		return sf.getCurrentSession().get(UserModel.class, uid);
	}

	@Override
	public int changeUser(UserModel um) throws Exception {
		sf.getCurrentSession().update(um);
		return 1;
	}

	@Override
	public List<UserModel> getListByPage(int row, int page) throws Exception {
		String hql="from UserModel u";
		Query<UserModel> query=sf.getCurrentSession().createQuery(hql,UserModel.class);
		query.setFirstResult(row*(page-1));
		query.setMaxResults(row);
		return query.getResultList();
	}

	@Override
	public int getUserCount() throws Exception {
		String hql="select count(u) from UserModel u";
		Query<Long> query=sf.getCurrentSession().createQuery(hql,Long.class);
		long count=query.uniqueResult();
		return (int)count;
	}

	@Override
	public void deleteUser(UserModel um) throws Exception {
		sf.getCurrentSession().delete(um);
	}
}
