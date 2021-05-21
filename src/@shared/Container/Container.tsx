import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  width?: string;
}

const Container = ({ children, width }: ContainerProps) => {
  return (
    <div className={`flex flex-col p-8 justify-center shadow-lg border-t-8 border-red-300 rounded ${width}`}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  width: 'w-1/3',
};

export default Container;
