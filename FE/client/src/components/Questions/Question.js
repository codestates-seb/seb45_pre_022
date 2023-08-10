import { styled } from 'styled-components';
import { Tag } from './Tags';
import { EllipsisText } from './EllipsisText';

// 하나의 질문 컨테이너
const QuestionContainer = styled.div`
  display: flex;
  width: 727px;
  padding: 16px;
  border-top: 1px solid lightgray;
`;

// 질문에 대한 정보 컨테이너
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 110px;
  text-align: right;
  margin-right: 16px;
  margin-bottom: 4px;
`;

// 질문에 대한 각각의 정보 스타일
const Info = styled.div`
  color: gray;
  margin-top: 4px;
  font-size: 13px;

  &:first-child {
    color: black;
  }
`;

// 질문에 대한 제목, 내용 등 요약 컨테이너
const QuestionSummary = styled.div`
  display: flex;
  flex-direction: column;
  width: 611px;
`;

// 질문 제목 스타일
const QuestionTitle = styled.h3`
  margin-bottom: 5px;
  color: #0074cc;
  cursor: pointer;

  &:hover {
    color: #0088ff;
  }
`;

// 질문 내용 스타일
const QuestionContent = styled(EllipsisText)`
  font-size: 14px;
`;

// 태그 컨테이너
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// 유저 정보 컨테이너
const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

// 유저 정보
const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

// 유저 정보 컴포넌트
const User = styled.div`
  margin-right: 10px;
  font-size: 14px;
`;

// 유저 이름
const UserName = styled(User)`
  font-weight: bold;
  color: #0074cc;
`;

// 유저 팔로워 수
const Follower = styled(User)`
  font-weight: bold;
`;

// 질문 생성 날짜
const CreatedAt = styled(User)`
  color: gray;
`;

const Question = () => {
  // 임시 상태 값
  const votes = 2;
  const answers = 3;
  const views = 3;

  const username = 'username';
  const follower = 3;
  const createdAt = '2023-08-10';

  return (
    <QuestionContainer>
      <InfoContainer>
        <Info>{votes} votes</Info>
        <Info>{answers} answers</Info>
        <Info>{views} views</Info>
      </InfoContainer>
      <QuestionSummary>
        <QuestionTitle>리액트 컴포넌트에서 문제가 생겼습니다!</QuestionTitle>
        <QuestionContent maxLine={2} lineHeight={20}>
          컴포넌트를 분할하고 폴더를 옮겼는데 갑자기 오류가 발생했습니다. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Iure, repellat
          quis, totam nam inventore est possimus ea sunt non velit quo animi
          error autem iusto deleniti vitae perferendis corrupti quibusdam!
        </QuestionContent>
        <UserContainer>
          <TagContainer>
            <Tag>React</Tag>
            <Tag>JavaScript</Tag>
            <Tag>Frontend</Tag>
          </TagContainer>
          <UserInfo>
            <UserName>{username}</UserName>
            <Follower>{follower}</Follower>
            <CreatedAt>{createdAt}</CreatedAt>
          </UserInfo>
        </UserContainer>
      </QuestionSummary>
    </QuestionContainer>
  );
};

export default Question;
