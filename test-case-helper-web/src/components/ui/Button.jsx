import React from 'react'

import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => (props.$borderRadius ? props.$borderRadius : "1px solid black")};
  border-radius: ${(props) => (props.$borderRadius ? props.$borderRadius : "")};
  min-width: ${(props) => (props.$minWidth ? props.$minWidth : "")};
  max-height: ${(props) => (props.$maxHeight ? props.$maxHeight : "")};
  margin-left: ${(props) => (props.$marginLeft ? props.$marginLeft : "")};
  padding: ${(props) => (props.$padding ? props.$padding : "5px")};
  background-color: ${(props) => (props.$backGroundColor ? props.$backGroundColor : "blue")};
  color: ${(props) => (props.$fontColor ? props.$fontColor : "")};
  font-size: ${(props) => (props.$fontSize ? props.$fontSize : "16px")};
  cursor: pointer;
  transition: all ease 0.2s;

  &:hover {
      background-color: ${(props) => (props.$backGroundHoverColor ? props.$backGroundHoverColor : "#0000fdb8")};
  }

  &:active {
      transform: scale(0.9);
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
      $fontColor={buttonConfig.fontColor}
      $border={buttonConfig.border}
      $fontSize={buttonConfig.fontSize}
      $padding={buttonConfig.padding}
      $backGroundColor={buttonConfig.backGroundColor}
      $backGroundHoverColor={buttonConfig.backGroundHoverColor}
    >
      {buttonConfig.buttonName}
    </StyledButton>
  )
}

export default Button;