package com.seb45_022.preproject.server.global.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Data
public class SingleResponseDto<T> {
    @ApiModelProperty(example = "success -- --", position = 1)
    private T data;
}
