import React from 'react'

import styled from 'styled-components'

const StyledInput = styled.input`
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
`;

const Input = ({type, placeholder, value, onChange, version}) => {
  return (
    <StyledInput 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
  )
}

export default Input;