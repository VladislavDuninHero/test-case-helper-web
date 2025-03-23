import React from 'react'

import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: ${(props) => (props.$borderRadius ? props.$borderRadius : "")};
  min-width: ${(props) => (props.$minWidth ? props.$minWidth : "")};
  max-height: ${(props) => (props.$maxHeight ? props.$maxHeight : "")};
  margin-left: ${(props) => (props.$marginLeft ? props.$marginLeft : "")};
  padding: 5px;
  background-color: blue;
  cursor: pointer;
  transition: all ease 0.2s;

  &:hover {
      background-color: #7575ffb9;
  }

  &:active {
      transform: scale(0.6);
  }
`;

const Button = ({buttonConfig}) => {
  return (
    <StyledButton 
      onClick={buttonConfig.onClick} 
      $borderRadius={buttonConfig.borderRadius}
      $minWidth={buttonConfig.minWidth}
      $maxHeight={buttonConfig.maxHeight}
      $marginLeft={buttonConfig.marginLeft}
    >
      {buttonConfig.buttonName}
    </StyledButton>
  )
}

export default Button;