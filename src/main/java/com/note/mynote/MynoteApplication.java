package com.note.mynote;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.note.mynote.dao")
@SpringBootApplication
public class MynoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(MynoteApplication.class, args);
	}

}
