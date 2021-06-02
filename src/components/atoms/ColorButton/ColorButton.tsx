import { Container } from './ColorButton.styles';

export interface ColorButtonProps {
  bgColor: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ColorButton = ({ bgColor, onClick }: ColorButtonProps) => (
  <Container type="button" bgColor={bgColor} onClick={onClick} />
);

export default ColorButton;
