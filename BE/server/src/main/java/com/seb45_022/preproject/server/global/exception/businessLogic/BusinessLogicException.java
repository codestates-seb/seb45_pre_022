package com.seb45_022.preproject.server.global.exception.businessLogic;

import com.seb45_022.preproject.server.global.exception.code.ExceptionCode;
import lombok.Getter;

public class BusinessLogicException extends RuntimeException {
    @Getter
    private ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}