package com.city.sshdzy.javabean;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name="menu")
public class getXmlMenu {
	@XmlElement(name="item")
	private List<XmlToJava> item;

	public List<XmlToJava> getItem() {
		return item;
	}

	public void setItem(List<XmlToJava> item) {
		this.item = item;
	}
	
}
