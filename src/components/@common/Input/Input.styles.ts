import styled from 'styled-components';
import { Palette } from '../../../constants/palette';

export const LabelText = styled.div``;

export const StyledLabel = styled.label`
  display: flex;
  border: 1px solid ${Palette.GRAY_500};
  border-radius: 3px;
  padding: 0.5rem 0.75rem;
  position: relative;
  background-color: white;

  ${LabelText} {
    height: 0.8rem;
    overflow-y: visible;
    position: absolute;
    background-color: inherit;
    color: ${Palette.GRAY_500};
    font-size: 0.875rem;
    top: -0.625rem;
    left: 1rem;
    padding: 0 0.75rem;
  }

  & > input {
    min-height: 2rem;
    border: none;
    flex-grow: 1;
    font-size: 1.125rem;

    &:focus {
      outline: none;
    }

    &:disabled {
      background-color: transparent;
    }
  }
`;

export const LabelIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
`;
