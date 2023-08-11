import { styled } from 'styled-components';
import { StyledButton } from '../../components/Buttons/AskButton';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  width: 1200px;
  height: 130px;
`;

export const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Notice = styled.div`
  background-color: #ebf4fb;
  padding: 16px;
  border: 1px solid #379fef;
  border-radius: 7px;
  width: 850px;
  margin: 16px 0 24px;

  > div {
    margin: 8px 0;
  }

  > ul > div {
    margin: 8px 0;
    font-weight: 600;
  }

  > ul > li {
    margin-left: 24px;
    font-size: 90%;
  }
`;

export const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Content = styled.div`
  background-color: 'white';
  width: 850px;
  border-radius: 7px;
  padding: 24px;
  border: 1px solid lightgrey;
  margin-bottom: 10px;
  opacity: ${(props) =>
    props.disabled ? '0.5' : '1'}; // 내용이 비활성화된 경우 흐림 효과
  pointer-events: ${(props) =>
    props.disabled ? 'none' : 'auto'}; // 내용이 비활성화된 경우 클릭 불가
`;

export const Description = styled.div`
  margin: 2px 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 9px;
  border-radius: 7px;
  border: 1px solid lightgrey;
`;

export const NextButton = styled(StyledButton)`
  width: auto;
  margin: 10px 0;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 180px;
  resize: vertical;
  overflow: auto;
`;

export const DiscardButton = styled.button`
  color: red;
  width: 200px;
  border: none;
  padding: 24px;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: #ffdbdb;
  }
`;
