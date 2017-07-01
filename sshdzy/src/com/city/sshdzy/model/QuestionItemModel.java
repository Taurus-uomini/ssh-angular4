package com.city.sshdzy.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="question_item")
public class QuestionItemModel {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="qiid")
	private int qiid;
	@Column(name="qitype")
	private int qitype;
	@Column(name="qititle")
	private String qititle;
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH},fetch = FetchType.EAGER)
   @JoinColumn(name = "qid")
	private QuestionModel qm;
	@OneToMany(mappedBy = "qim",fetch = FetchType.EAGER)
	private Set<QuestionItemOptionModel> questionitemoptions;
	public int getQiid() {
		return qiid;
	}
	public void setQiid(int qiid) {
		this.qiid = qiid;
	}
	public String getQititle() {
		return qititle;
	}
	public void setQititle(String qititle) {
		this.qititle = qititle;
	}
	public QuestionModel getQm() {
		return qm;
	}
	public void setQm(QuestionModel qm) {
		this.qm = qm;
	}
	public Set<QuestionItemOptionModel> getQuestionitemoptions() {
		return questionitemoptions;
	}
	public void setQuestionitemoptions(Set<QuestionItemOptionModel> questionitemoptions) {
		this.questionitemoptions = questionitemoptions;
	}
	public int getQitype() {
		return qitype;
	}
	public void setQitype(int qitype) {
		this.qitype = qitype;
	}
	
}
