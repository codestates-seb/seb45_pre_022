import { styled } from 'styled-components';

// 텍스트 생략 컴포넌트
export const EllipsisText = styled.div`
  display: -webkit-box;
  overflow: hidden;
  max-height: ${(props) => (props.$maxLine || 1) * (props.$lineHeight || 16)}px;
  -webkit-line-clamp: ${(props) => props.$maxLine || 1};
  -webkit-box-orient: vertical;
  line-height: ${(props) => props.$lineHeight || 16}px;
`;
