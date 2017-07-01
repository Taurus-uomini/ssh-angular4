package com.city.sshdzy.utility.impl;

import java.math.BigInteger;
import java.security.MessageDigest;

import org.springframework.stereotype.Component;

import com.city.sshdzy.utility.IMd5Utility;
@Component("md5Utility")
public class Md5UtilityImpl implements IMd5Utility{
	public String getMD5(String value)throws Exception
	{
		String MD5=null;
		try 
		{
			MessageDigest md=MessageDigest.getInstance("MD5");
			md.update(value.getBytes());
			MD5=new BigInteger(1, md.digest()).toString(16)+"Taurus";
			md.update(MD5.getBytes());
			MD5=new BigInteger(1,md.digest()).toString(16);
		} catch (Exception e) 
		{
			e.printStackTrace();
		}
		return MD5;
	}
}
