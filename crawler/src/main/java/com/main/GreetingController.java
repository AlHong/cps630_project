package com.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class GreetingController {
	@Autowired
	private UserDAO userDao;
	
	@RequestMapping(value ="/greeting", method= RequestMethod.GET)
	public SendData greeting (){
		SendData data = new SendData("http://...");
		userDao.save(data);
		
		return data;
	}
}
