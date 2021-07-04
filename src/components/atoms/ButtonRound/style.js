import styled from 'styled-components';

import { COLOR } from '../../../constants';
import { Button } from '../../';

export const StyledButtonRound = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  width: 3rem;
  height: 3rem;

  font-weight: 700;
  color: ${COLOR.TEXT_DEFAULT};
  border-radius: 50%;
  background-color: ${COLOR.THEME};
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
`;
