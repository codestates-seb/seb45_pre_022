package com.seb45_022.preproject.server.global.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Data
public class SingleResponseDto<T> {
    private T data;
}
