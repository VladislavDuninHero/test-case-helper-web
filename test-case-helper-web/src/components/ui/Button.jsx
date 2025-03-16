import React from 'react'

import styled from 'styled-components'

const StyledButton = styled.button`
    border: 1px solid black;
    border-radius: 5px;
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

const Button = ({width, height, color, buttonName, borderRadius}) => {
  return (
    <StyledButton>{buttonName}</StyledButton>
  )
}

export default Button;