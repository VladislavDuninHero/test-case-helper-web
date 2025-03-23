import React from 'react'

import styled from 'styled-components'

const StyledInput = styled.input`
    border-radius: 5px;
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    min-width: ${(props) => (props.$minWidthPercent)};
`;

const Input = ({type, placeholder, value, onChange, version, minWidthPercent}) => {
  return (
    <StyledInput 
        $minWidthPercent={minWidthPercent}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
  )
}

export default Input;