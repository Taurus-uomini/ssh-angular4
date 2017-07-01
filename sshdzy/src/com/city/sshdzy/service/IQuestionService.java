package com.city.sshdzy.service;

import java.util.List;

import com.city.sshdzy.model.QuestionItemModel;
import com.city.sshdzy.model.QuestionItemOptionModel;
import com.city.sshdzy.model.QuestionModel;
import com.city.sshdzy.model.UserModel;

public interface IQuestionService {
	public int addQuestion(QuestionModel qm)throws Exception;
	public QuestionModel getQuestionById(int qid)throws Exception;
	public void updateQuestion(QuestionModel qm)throws Exception;
	public int addQuestionItem(QuestionItemModel qim)throws Exception;
	public void updateQuestionItem(QuestionItemModel qim)throws Exception;
	public int addQuestionItemOption(QuestionItemOptionModel qiom)throws Exception;
	public void deleteQuestion(QuestionModel qm)throws Exception;
	public int getQuestionCount()throws Exception;
	public List<QuestionModel> getListByPage(int row,int page)throws Exception;
	public void checkQuestion(QuestionModel qm)throws Exception;
}
