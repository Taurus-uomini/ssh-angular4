package com.city.sshdzy.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="hobby")
public class HobbyModel {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="hid")
	private int hid;
	@Column(name="hname")
	private String hname;
	@ManyToMany(mappedBy="hobbies",fetch=FetchType.EAGER)
	private Set<UserModel> users;
	public int getHid() {
		return hid;
	}
	public void setHid(int hid) {
		this.hid = hid;
	}
	public String getHname() {
		return hname;
	}
	public void setHname(String hname) {
		this.hname = hname;
	}
	public Set<UserModel> getUsers() {
		return users;
	}
	public void setUsers(Set<UserModel> users) {
		this.users = users;
	}
	
}
