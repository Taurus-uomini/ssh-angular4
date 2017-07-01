package com.city.sshdzy.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.city.sshdzy.model.QuestionItemModel;
import com.city.sshdzy.model.QuestionItemOptionModel;
import com.city.sshdzy.model.QuestionModel;
import com.city.sshdzy.model.UserModel;
import com.city.sshdzy.service.IQuestionService;
@Service("questionService")
@Transactional
public class QuestionServiceImpl implements IQuestionService {
	private SessionFactory sf;
	@Autowired
	public void setSf(SessionFactory sf) {
		this.sf = sf;
	}

	@Override
	public int addQuestion(QuestionModel qm) throws Exception {
		sf.getCurrentSession().save(qm);
		return qm.getQid();
	}

	@Override
	public int addQuestionItem(QuestionItemModel qim) throws Exception {
		sf.getCurrentSession().save(qim);
		return qim.getQiid();
	}

	@Override
	public int addQuestionItemOption(QuestionItemOptionModel qiom) throws Exception {
		sf.getCurrentSession().save(qiom);
		return qiom.getQioid();
	}

	@Override
	public void updateQuestion(QuestionModel qm) throws Exception {
		sf.getCurrentSession().update(qm);
	}

	@Override
	public void updateQuestionItem(QuestionItemModel qim) throws Exception {
		sf.getCurrentSession().update(qim);
	}

	@Override
	public QuestionModel getQuestionById(int qid) throws Exception {
		return sf.getCurrentSession().get(QuestionModel.class, qid);
	}

	@Override
	public void deleteQuestion(QuestionModel qm) throws Exception {
		sf.getCurrentSession().delete(qm);
	}

	@Override
	public int getQuestionCount() throws Exception {
		String hql="select count(q) from QuestionModel q";
		Query<Long> query=sf.getCurrentSession().createQuery(hql,Long.class);
		long count=query.uniqueResult();
		return (int)count;
	}

	@Override
	public List<QuestionModel> getListByPage(int row, int page) throws Exception {
		String hql="from QuestionModel q";
		Query<QuestionModel> query=sf.getCurrentSession().createQuery(hql,QuestionModel.class);
		query.setFirstResult(row*(page-1));
		query.setMaxResults(row);
		return query.getResultList();
	}

	@Override
	public void checkQuestion(QuestionModel qm) throws Exception {
		sf.getCurrentSession().update(qm);
	}

}
