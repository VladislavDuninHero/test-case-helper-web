import React from 'react'

import styled from 'styled-components'
import Input from '../ui/Input';


const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LoginForm = () => {
  return (
    <StyledForm>
      <Input type="text" />
      <Input type="text" />
      <button>submit</button>
    </StyledForm>
  )
}

export default LoginForm;
