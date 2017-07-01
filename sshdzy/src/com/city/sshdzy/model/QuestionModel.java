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
@Table(name="question")
public class QuestionModel {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="qid")
	private int qid;
	@Column(name="qtitle")
	private String qtitle;
	@Column(name="qstatus")
	private int qstatus;
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH},fetch = FetchType.EAGER)
   @JoinColumn(name = "uid")
	private UserModel um;
	@OneToMany(mappedBy = "qm",fetch=FetchType.EAGER)
	private Set<QuestionItemModel> questionitems;
	public int getQid() {
		return qid;
	}
	public void setQid(int qid) {
		this.qid = qid;
	}
	public String getQtitle() {
		return qtitle;
	}
	public void setQtitle(String qtitle) {
		this.qtitle = qtitle;
	}
	public UserModel getUm() {
		return um;
	}
	public void setUm(UserModel um) {
		this.um = um;
	}
	public Set<QuestionItemModel> getQuestionitems() {
		return questionitems;
	}
	public void setQuestionitems(Set<QuestionItemModel> questionitems) {
		this.questionitems = questionitems;
	}
	public int getQstatus() {
		return qstatus;
	}
	public void setQstatus(int qstatus) {
		this.qstatus = qstatus;
	}
	
	
}
