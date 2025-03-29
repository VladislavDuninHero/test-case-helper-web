import React from 'react'

import styled from 'styled-components'

const StyledInput = styled.input`
    border-radius: 5px;
    padding: ${(props) => (props.$padding ? props.$padding : "5px")};
    margin: ${(props) => (props.$margin ? props.$margin : "5px 5px 5px 5px")};
    min-width: ${(props) => (props.$minWidthPercent ? props.$minWidthPercent : "100%")};
    border: 1px solid #8f8d8dad;
`;

const Input = ({type, placeholder, value, onChange, version, minWidthPercent, padding, margin}) => {
  return (
    <StyledInput 
        $minWidthPercent={minWidthPercent}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        $padding={padding}
        $margin={margin}
    />
  )
}

export default Input;