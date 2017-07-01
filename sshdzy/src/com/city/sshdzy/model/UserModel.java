package com.city.sshdzy.model;

import java.sql.Blob;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.springframework.jdbc.support.GeneratedKeyHolder;

@Entity
@Table(name="user")
public class UserModel {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="uid")
	private Integer uid=0;
	@Column(name="uname")
	private String uname=null;
	@Column(name="upassword")
	private String upassword;
	@Column(name="urename")
	private String urename;
	@Column(name="uemail")
	private String uemail;
	@Column(name="ustatic")
	private Integer ustatic;
	@Column(name="uregistertime")
	private Date uregistertime;
	@Column(name="ulink")
	private String ulink;
	@Column(name="uphoto")
	private Blob uphotp;
	@OneToOne(cascade={CascadeType.ALL})
	@PrimaryKeyJoinColumn
	private UserInfoModel uim;
	@ManyToMany(cascade=CascadeType.ALL,fetch=FetchType.EAGER)
	@JoinTable(name="user_hobby",joinColumns={@JoinColumn(name="uid")},inverseJoinColumns={@JoinColumn(name="hid")})
	private Set<HobbyModel> hobbies;
	@OneToMany(mappedBy = "um",fetch=FetchType.EAGER)
	private Set<QuestionModel> questions;
	public Integer getUid() {
		return uid;
	}
	public void setUid(Integer uid) {
		this.uid = uid;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getUpassword() {
		return upassword;
	}
	public void setUpassword(String upassword) {
		this.upassword = upassword;
	}
	public String getUrename() {
		return urename;
	}
	public void setUrename(String urename) {
		this.urename = urename;
	}
	public String getUemail() {
		return uemail;
	}
	public void setUemail(String uemail) {
		this.uemail = uemail;
	}
	public Integer getUstatic() {
		return ustatic;
	}
	public void setUstatic(Integer ustatic) {
		this.ustatic = ustatic;
	}
	public Date getUregistertime() {
		return uregistertime;
	}
	public void setUregistertime(Date uregistertime) {
		this.uregistertime = uregistertime;
	}
	public String getUlink() {
		return ulink;
	}
	public void setUlink(String ulink) {
		this.ulink = ulink;
	}
	public Blob getUphotp() {
		return uphotp;
	}
	public void setUphotp(Blob uphotp) {
		this.uphotp = uphotp;
	}
	public UserInfoModel getUim() {
		return uim;
	}
	public void setUim(UserInfoModel uim) {
		this.uim = uim;
	}
	public Set<HobbyModel> getHobbies() {
		return hobbies;
	}
	public void setHobbies(Set<HobbyModel> hobbies) {
		this.hobbies = hobbies;
	}
	public Set<QuestionModel> getQuestions() {
		return questions;
	}
	public void setQuestions(Set<QuestionModel> questions) {
		this.questions = questions;
	}
	
}
