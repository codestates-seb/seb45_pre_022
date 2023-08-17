package com.seb45_022.preproject.server.global.security.config;

import com.seb45_022.preproject.server.global.argu.LoginMemberIdResolver;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Getter
    @Value("${jwt.aws_ec2_url}")
    private String ec2_url;

    @Getter
    @Value("${jwt.aws_buket_url}")
    private String buket_url;


    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new LoginMemberIdResolver());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOrigins("http://localhost:8080", "http://localhost:3000",ec2_url, buket_url)
                .allowedHeaders("*")
                .allowedMethods("*")
                .allowCredentials(true);
    }
}
