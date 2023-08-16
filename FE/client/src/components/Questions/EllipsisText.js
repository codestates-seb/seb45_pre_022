import { styled } from 'styled-components';

// 텍스트 생략 컴포넌트
export const EllipsisText = styled.div`
  display: -webkit-box;
  overflow: hidden;
  max-height: ${(props) => props.maxLine * props.lineHeight}px;
  -webkit-line-clamp: ${(props) => props.maxLine};
  -webkit-box-orient: vertical;
  line-height: ${(props) => props.lineHeight}px;
`;
