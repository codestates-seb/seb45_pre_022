package com.seb45_022.preproject.server.swagger;

import com.seb45_022.preproject.server.domain.answer.dto.AnswerDto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.OperationsSorter;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .useDefaultResponseMessages(false)
                .select()
                .apis(RequestHandlerSelectors.withClassAnnotation(RestController.class))
                .paths(PathSelectors.any())
                .build();
    }
    @Bean
    public UiConfiguration uiConfig() {
        return UiConfigurationBuilder
                .builder()
                .operationsSorter(OperationsSorter.METHOD)
                .build();
    }


    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title("StackOverflow Clone Coding Ver0.0.1")
                .description("CodeStates SEB45 Preproject 22조 백지장 StackOverflow 클론코딩 Swagger API 문서입니다.")
                .contact(new Contact("백지장","https://github.com/codestates-seb/seb45_pre_022",null))
                .version("0.0.1")
                .build();
    }

}