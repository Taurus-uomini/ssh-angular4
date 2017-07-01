package com.city.sshdzy.service;

import java.util.List;

import com.city.sshdzy.model.HobbyModel;

public interface IHobbyService {
	public List<HobbyModel> getList()throws Exception;
	public HobbyModel getHobbyById(int hid)throws Exception;
}
