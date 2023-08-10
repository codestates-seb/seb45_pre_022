package com.seb45_022.preproject.server.global.dto;

import lombok.Getter;

@Getter
public class AllDataDto<T> {
    private T data;
    private PageInfo pageInfo;

    public AllDataDto(T data, PageInfo pageInfo) {
        this.data = data;
        this.pageInfo = pageInfo;
    }
}
