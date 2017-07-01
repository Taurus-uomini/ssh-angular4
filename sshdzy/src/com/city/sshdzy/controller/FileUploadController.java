package com.city.sshdzy.controller;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

@Controller("fileUploadController")
public class FileUploadController {
	private File file;
	private String fileFileName;
	private String fileContentType;
	private String fileuploaddir;
	private Map<String, Object> datamap=null;
	public Map<String, Object> getDatamap() {
		return datamap;
	}
	public void setDatamap(Map<String, Object> datamap) {
		this.datamap = datamap;
	}
	
	public void setFile(File file) {
		this.file = file;
	}
	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}
	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}
	
	public void setFileuploaddir(String fileuploaddir) {
		this.fileuploaddir = fileuploaddir;
	}
	public String fileupload()throws Exception
	{
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		ServletActionContext.getResponse().addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cookie");
		datamap=new HashMap<String,Object>();
		String path=ServletActionContext.getServletContext().getRealPath(fileuploaddir);
		File newfile=new File(path);
		if(!newfile.exists())
		{
			newfile.mkdirs();
		}
		String fileurl=new Date().getTime()+this.fileFileName;
		FileUtils.copyFile(file, new File(path,fileurl));
		datamap.put("data", this.fileuploaddir+"/"+fileurl);
		return "success";
	}
}
