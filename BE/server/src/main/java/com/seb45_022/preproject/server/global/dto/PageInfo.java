package com.seb45_022.preproject.server.global.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PageInfo {
    @ApiModelProperty(example = "1",position = 1)
    private int page;
    @ApiModelProperty(example = "1",position = 2)
    private int size;
    @ApiModelProperty(example = "3",position = 3)
    private int totalElements;
    @ApiModelProperty(example = "3",position = 4)
    private int totalPages;
}
