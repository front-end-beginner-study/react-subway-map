import React from 'react';
import PALETTE from '../../../constants/palette';
import { IconProps } from '../../../types';

const Close = ({ width = '24px', color = PALETTE.GRAY[400] }: IconProps): JSX.Element => {
  return (
    <svg width={width} stroke={color} strokeLinecap="round" strokeWidth={4} viewBox="0 0 40 40">
      <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  );
};

export default Close;
