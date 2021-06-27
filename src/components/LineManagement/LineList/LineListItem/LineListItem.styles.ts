import { LineColor } from './../../../../types';
import { styled } from '@storybook/theming';
import PALETTE from '../../../../constants/palette';
import Button from '../../../@common/Button/Button.styles';

export const StyledLineListItem = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1.25rem 0.5rem;
  align-items: center;
  border-bottom: 1px solid ${PALETTE.GRAY_300};
`;

export const ControlButton = styled(Button)`
  width: 3rem;
  height: 2rem;
  margin-left: 0.5rem;
`;

interface LineNameProps {
  lineColor: LineColor;
}

// const isColorType = (colorString: string): colorString is ColorType => {
//   return colorTypes.some((colorType) => colorType === colorString);
// };

export const LineName = styled.span<LineNameProps>`
  position: relative;
  font-size: 1.125rem;
  margin-left: 1.25rem;

  &::before {
    content: '';
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: ${({ lineColor }) => lineColor ?? 'white'};
    position: absolute;
    top: 2.8px;
    left: -20px;
  }
`;
