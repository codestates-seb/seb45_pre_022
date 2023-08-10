package com.seb45_022.preproject.server.domain.answer.controllerTest;

import com.google.gson.Gson;
import com.seb45_022.preproject.server.domain.answer.dto.AnswerDto;
import com.seb45_022.preproject.server.domain.answer.entity.AnswerEntity;
import com.seb45_022.preproject.server.domain.answer.mapper.AnswerMapper;
import com.seb45_022.preproject.server.domain.answer.service.AnswerService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AnswerControllerMockTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;

    @MockBean
    private AnswerService answerService;
    @MockBean
    private AnswerMapper mapper;

    @Test
    void postAnswerTest() throws Exception {
        // given
        AnswerDto.Post post = new AnswerDto.Post("답변 내용입니다");

        given(mapper.answerPostDtoToAnswer(Mockito.any(AnswerDto.Post.class))).willReturn(new AnswerEntity());

        AnswerEntity mockResultAnswer = new AnswerEntity();
        mockResultAnswer.setAnswerId(1L);
        given(answerService.createAnswer(Mockito.any(AnswerEntity.class))).willReturn(mockResultAnswer);

        String content = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/answers").build().toUri();

        // when
        ResultActions actions =
                mockMvc.perform(
                        MockMvcRequestBuilders
                                .post(uri)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content));

        // then
        actions
                .andExpect(status().isCreated());
    }

}
