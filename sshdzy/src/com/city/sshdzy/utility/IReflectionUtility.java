package com.city.sshdzy.utility;

import net.sf.json.JSONObject;

public interface IReflectionUtility {
	public <T> Object set(JSONObject json,Class<T> c)throws Exception;
}
