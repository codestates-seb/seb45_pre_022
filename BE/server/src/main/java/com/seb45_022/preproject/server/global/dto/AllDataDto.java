package com.seb45_022.preproject.server.global.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class AllDataDto<T> {
    @ApiModelProperty(position = 1)
    private T data;

    @ApiModelProperty(position = 2)
    private PageInfo pageInfo;

    public AllDataDto(T data, PageInfo pageInfo) {
        this.data = data;
        this.pageInfo = pageInfo;
    }
}

