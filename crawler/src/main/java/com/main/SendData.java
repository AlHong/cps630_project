package com.main;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="data")
public class SendData {
	@Column (name= "url")
	private String url;
	
	@Id
	@Column (name="id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public SendData(String url) {
		this.url = url;
	}
	
	
}
