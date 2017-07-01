package com.city.sshdzy.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
@Table(name="userinfo")
public class UserInfoModel {
	@Id
	@GenericGenerator(name="pkGenerator",strategy="foreign",parameters={@Parameter(name="property",value="um")})
	@GeneratedValue(generator="pkGenerator")
	private int uid;
	@Column(name="uphone")
	private String uphone;
	@OneToOne(cascade=CascadeType.ALL,mappedBy="uim")
	@PrimaryKeyJoinColumn
	private UserModel um;
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getUphone() {
		return uphone;
	}
	public void setUphone(String uphone) {
		this.uphone = uphone;
	}
	public UserModel getUm() {
		return um;
	}
	public void setUm(UserModel um) {
		this.um = um;
	}
	
}
