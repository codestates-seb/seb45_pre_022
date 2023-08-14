package com.seb45_022.preproject.server.global.security.config;

import com.seb45_022.preproject.server.global.argu.LoginMemberIdResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new LoginMemberIdResolver());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOrigins("http://localhost:8080", "http://localhost:3000","http://ec2-3-39-189-62.ap-northeast-2.compute.amazonaws.com:8080")
                .allowedHeaders("*")
                .allowedMethods("*")
                .allowCredentials(true);
    }
}
