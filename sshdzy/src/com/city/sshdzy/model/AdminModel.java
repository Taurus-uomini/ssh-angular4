package com.city.sshdzy.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="admin")
public class AdminModel {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="aid")
	private int aid;
	@Column(name="aname")
	private String aname;
	@Column(name="apassword")
	private String apassword;
	@Column(name="alogintime")
	private Date alogintime;
	@Column(name="aloginip")
	private String aloginip;
	public int getAid() {
		return aid;
	}
	public void setAid(int aid) {
		this.aid = aid;
	}
	public String getAname() {
		return aname;
	}
	public void setAname(String aname) {
		this.aname = aname;
	}
	public String getApassword() {
		return apassword;
	}
	public void setApassword(String apassword) {
		this.apassword = apassword;
	}
	public Date getAlogintime() {
		return alogintime;
	}
	public void setAlogintime(Date alogintime) {
		this.alogintime = alogintime;
	}
	public String getAloginip() {
		return aloginip;
	}
	public void setAloginip(String aloginip) {
		this.aloginip = aloginip;
	}
	
}
