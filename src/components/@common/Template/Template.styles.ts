import styled from 'styled-components';
import { TemplateProps } from './Template';

export const StyledTemplate = styled.main`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const InnerTemplate = styled.div<TemplateProps>`
  width: 100%;
  min-height: calc(100vh - 5.125rem);
  padding: 3rem 0;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ type }) => type === 'vertical' && 'flex-direction: column'}
`;
