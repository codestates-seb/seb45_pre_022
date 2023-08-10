package com.seb45_022.preproject.server.global.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PageInfo {
    private int page;
    private int size;
    private int totalElements;
    private int totalPages;
}
