package com.city.sshdzy.service;

import java.util.List;

import com.city.sshdzy.model.UserModel;

public interface IUserService {
	public List<UserModel> getList()throws Exception;
	public int getUserCount()throws Exception;
	public List<UserModel> getListByPage(int row,int page)throws Exception;
	public int register(UserModel um)throws Exception;
	public int login(String uname,String upassword)throws Exception;
	public void sendMail(String from, String to, String title, String content) throws Exception;
	public int activation(String ulink)throws Exception;
	public UserModel getUserInfoById(int uid)throws Exception;
	public int changeUser(UserModel um)throws Exception;
	public void deleteUser(UserModel um)throws Exception;
}
