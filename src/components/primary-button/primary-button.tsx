import React from 'react';
import { PrimaryButtonProps } from './primary-button.types';
import Styled from 'styled-components';

const ButtonContainer = Styled.button`
  border-radius: 4px;
  border-width: 0;
  background-color: #239F87;
  background-size: cover;
  height: 40px;
  position: relative;
  padding: 0 18px;
  color: white;
  font-size: 20px;

  &:focus{
    outline: none;
  }

  ${att =>
    att.className?.includes('is-white') &&
    `
      background-color: #ffffff;
      color: #239F87;
      font-weight: normal;
    `}
`;

export const PrimaryButton = ({
  className,
  onClick,
  children,
  isWhite,
  ...rest
}: PrimaryButtonProps) => {
  return (
    <React.Fragment>
      <ButtonContainer
        className={`${className ? className : ''} ${isWhite ? 'is-white' : ''}`}
        onClick= {onClick}
        {...rest}
      >
        {children}
      </ButtonContainer>
    </React.Fragment>
  );
};
