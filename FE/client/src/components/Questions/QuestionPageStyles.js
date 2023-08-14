import { styled } from 'styled-components';
import { EllipsisText } from './EllipsisText';
import { NavLink } from 'react-router-dom';

// 하나의 질문 컨테이너
export const QuestionContainer = styled.div`
  display: flex;
  width: 900px;
  padding: 16px;
  border-top: 1px solid lightgrey;
`;

// 질문에 대한 정보 컨테이너
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 110px;
  text-align: right;
  margin-right: 16px;
  margin-bottom: 4px;
`;

// 질문에 대한 각각의 정보 스타일
export const Info = styled.div`
  color: gray;
  margin-top: 4px;
  font-size: 13px;

  &:first-child {
    color: black;
  }
`;

// 질문에 대한 제목, 내용 등 요약 컨테이너
export const QuestionSummary = styled.div`
  display: flex;
  flex-direction: column;
  width: 611px;
`;

// 질문 제목 스타일
export const QuestionTitle = styled(NavLink)`
  margin-bottom: 5px;
  color: #0074cc;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #0088ff;
  }

  &:active {
    color: #00457a;
  }
`;

// 질문 내용 스타일
export const QuestionContent = styled(EllipsisText)`
  font-size: 14px;
`;

// 태그 컨테이너
export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// 유저 정보 컨테이너
export const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

// 유저 정보
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

// 유저 정보 컴포넌트
export const User = styled.div`
  margin-right: 10px;
  font-size: 14px;
`;

// 유저 이름
export const UserName = styled(User)`
  font-weight: bold;
  color: #0074cc;
`;

// 유저 팔로워 수
export const Follower = styled(User)`
  font-weight: bold;
`;

// 질문 생성 날짜
export const CreatedAt = styled(User)`
  color: gray;
`;
