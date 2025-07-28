import React from 'react'

import styled from 'styled-components'
import Loader from "./Loader.jsx";

const StyledButton = styled.button`
  display: flex;
  justify-content: ${(props) => (props.$justifyContent ? props.$justifyContent : "center")};
  align-items: center;
  border: ${(props) => (props.$border ? props.$border : "1px solid lightblue")};
  border-radius: ${(props) => (props.$borderRadius ? props.$borderRadius : "")};
  min-width: ${(props) => (props.$minWidth ? props.$minWidth : "")};
  min-height: ${(props) => (props.$minHeight ? props.$minHeight : "")};
  max-height: ${(props) => (props.$maxHeight ? props.$maxHeight : "")};
  margin-left: ${(props) => (props.$marginLeft ? props.$marginLeft : "")};
  margin-top: ${(props) => (props.$marginTop ? props.$marginTop : "")};
  padding: ${(props) => (props.$padding ? props.$padding : "5px")};
  background-color: ${(props) => (props.$backgroundColor ? props.$backgroundColor : "#447bba")};
  color: ${(props) => (props.$fontColor ? props.$fontColor : "")};
  font-size: ${(props) => (props.$fontSize ? props.$fontSize : "16px")};
  background: ${(props) => (props.$background ? props.$background : "")};
  font-weight: ${(props) => (props.$fontWeight ? props.$fontWeight : "")};;
  cursor: pointer;
  transition: all ease 0.2s;
  position: relative;

  &:hover {
        filter: brightness(0.9);
        background-color: ${(props) => (props.$backGroundHoverColor ? props.$backGroundHoverColor : "#1768c4")};
        color: ${(props) => (props.$backGroundHoverFontColor ? props.$backGroundHoverFontColor : "white")};
        border: ${(props) => (props.$border ? props.$border : "")};
  }

  &:active {
      transform: ${(props) => (props.$activeEffect ? props.$activeEffect : "scale(0.98)")};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Button = ({buttonConfig}) => {

  const reversed = buttonConfig.reversed;

  return (
    <StyledButton 
      onClick={buttonConfig.disabled ? null : buttonConfig.onClick} 
      $borderRadius={buttonConfig.borderRadius}
      $minWidth={buttonConfig.minWidth}
      $maxHeight={buttonConfig.maxHeight}
      $minHeight={buttonConfig.minHeight}
      $marginLeft={buttonConfig.marginLeft}
      $fontColor={buttonConfig.fontColor}
      $border={buttonConfig.border}
      $fontSize={buttonConfig.fontSize}
      $padding={buttonConfig.padding}
      $backgroundColor={buttonConfig.backgroundColor}
      $marginTop={buttonConfig.marginTop}
      $backGroundHoverColor={buttonConfig.backGroundHoverColor}
      $backGroundHoverFontColor={buttonConfig.backGroundHoverFontColor}
      $disabled={buttonConfig.disabled}
      $background={buttonConfig.background}
      $activeEffect={buttonConfig.activeEffect}
      $justifyContent={buttonConfig.justifyContent}
      $fontWeight={buttonConfig.fontWeight}
      disabled={buttonConfig.disabled}
    >
      { reversed ?
          <>
            {buttonConfig.children}
            {buttonConfig.buttonName}
          </>
          :
          <>
            {buttonConfig.buttonName}
            {buttonConfig.children}
          </>
      }
    </StyledButton>
  )
}

export default Button;