package com.city.sshdzy.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="question_item_option")
public class QuestionItemOptionModel {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="qioid")
	private int qioid;
	@Column(name="qiotitle")
	private String qiotitle;
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH},fetch = FetchType.EAGER)
   @JoinColumn(name = "qiid")
	private QuestionItemModel qim;
	public int getQioid() {
		return qioid;
	}
	public void setQioid(int qioid) {
		this.qioid = qioid;
	}
	public String getQiotitle() {
		return qiotitle;
	}
	public void setQiotitle(String qiotitle) {
		this.qiotitle = qiotitle;
	}
	public QuestionItemModel getQim() {
		return qim;
	}
	public void setQim(QuestionItemModel qim) {
		this.qim = qim;
	}
	
}
