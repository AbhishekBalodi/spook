package com.company.optmizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class OptmizerApplication extends SpringBootServletInitializer 
{

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(OptmizerApplication.class);
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(OptmizerApplication.class, args);
    }
}