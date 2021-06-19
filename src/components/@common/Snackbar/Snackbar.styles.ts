import styled, { keyframes } from 'styled-components';

interface SnackbarContainerProps {
  duration: number;
  backgroundColor: string;
}

const fadeIn = keyframes`
  from {
    bottom: -50px;
    opacity: 0;
  }
  to {
    bottom: 10px;
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    bottom: 10px;
    opacity: 1;
  }
  to {
    bottom: -50px;
    opacity: 0;
  }
`;

export const SnackbarContainer = styled.div<SnackbarContainerProps>`
  min-width: 10rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: #fff;
  text-align: center;
  border-radius: 0.5rem;
  padding: 16px 30px 16px 30px;
  position: fixed;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  -webkit-animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s ${({ duration }) => duration / 1000 + 's'};
  animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s ${({ duration }) => duration / 1000 + 's'};
`;
