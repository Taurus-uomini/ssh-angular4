package com.city.sshdzy.service;

import java.util.Date;

import com.city.sshdzy.model.AdminModel;

public interface IAdminService {
	public int login(String aname,String apassword,Date alogintime)throws Exception;
	public AdminModel getAdminInfoById(int aid)throws Exception;
	public int changeAdmin(AdminModel am)throws Exception;
}
