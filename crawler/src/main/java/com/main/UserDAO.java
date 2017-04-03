package com.main;


import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional 
public interface UserDAO extends CrudRepository<SendData, Long> {
	
	public SendData findById (int id);
	public SendData findByUrl (String url);
}
