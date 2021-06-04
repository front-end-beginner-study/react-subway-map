import styled, { css } from 'styled-components';
import { ButtonVariant, ButtonShape } from './Button.types';

interface ButtonProps {
  variant: ButtonVariant;
  shape: ButtonShape;
  fullWidth: boolean;
  active: boolean;
}

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.color.bg.primary.default};
    box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%),
      0 1px 18px 0 rgb(0 0 0 / 12%);

    &:hover,
    &:active {
      background-color: ${({ theme }) => `${theme.color.bg.primary.active}`};
    }
  `,

  text: css<ButtonProps>`
    background: ${({ active, theme }) => (active ? theme.color.bg.secondary.active : 'none')};

    &:hover,
    &:active {
      background-color: ${({ theme }) => `${theme.color.bg.secondary.active}`};
    }
  `,

  link: css<ButtonProps>`
    background: ${({ active, theme }) => (active ? theme.color.bg.secondary.active : 'none')};
    color: ${({ theme }) => theme.color.text.link};

    &:hover,
    &:active {
      background-color: ${({ theme }) => `${theme.color.bg.secondary.active}`};
      text-decoration: underline;
    }
  `,
};

const shapeStyles = {
  default: css`
    padding: 0.7em 1.4em;
    border-radius: 5px;
  `,

  circle: css`
    border-radius: 50%;
    width: 56px;
    height: 56px;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    svg {
      height: 18px;
    }
  `,

  round: css`
    border-radius: 100px;
    padding: 0.7em 1.4em;

    svg {
      height: 18px;
      margin-right: 3px;
      vertical-align: middle;
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  border: none;
  font-size: 16px;
  cursor: pointer;
  font-family: inherit;
  color: inherit;
  letter-spacing: inherit;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  ${({ variant }) => variantStyles[variant]};
  ${({ shape }) => shapeStyles[shape]};

  &:disabled {
    cursor: not-allowed;
    background: none;
    opacity: 0.1;
  }
`;
