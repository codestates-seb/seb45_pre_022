package com.seb45_022.preproject.server.domain.question.dto;

import com.seb45_022.preproject.server.domain.answer.dto.AnswerDto;
import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuestionDetailsResponseDto {
    @ApiModelProperty(example = "1", position = 1)
    private long questionId;

    @ApiModelProperty(example = "1", position = 2)
    private long memberId;

    @ApiModelProperty(example = "HGD", position = 3)
    private String displayName;

    @ApiModelProperty(example = "SampleQuestion", position = 4)
    private String title;

    @ApiModelProperty(example = "This is a SampleQuestion", position = 5)
    private String body;

    @ApiModelProperty(example = "[this,is,sample,tag]",position = 6)
    private List<String> tags;

    @ApiModelProperty(example = "[{" +
            "\"answerId\":1,\"memberId\":1,\"displayName\": \"HGD\",\"body\": \"This is a sample answer.\",\"createdAt\": \"2023-08-11T21:36:26.348484\",\"lastModifiedAt\": \"2023-08-11T21:36:26.348484\"," +
            "\"comments\":"+"["+"{\"commentId\": 1,\"memberId\": 1,\"displayName\": \"HGD\",\"body\": \"This is a sample commet.\",\"createdAt\": \"2023-08-11T21:36:26.348725\",\"lastModifiedAt\": \"2023-08-11T21:36:26.348725\"}"+"]"
            +"}]",position = 7)
//    @ApiModelProperty(position = 7)
    private List<AnswerDto.Response> answers;
}