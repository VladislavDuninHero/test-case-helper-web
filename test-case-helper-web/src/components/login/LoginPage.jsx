import React from 'react'
import MainWrapper from '../global-wrappers/MainWrapper.jsx'
import LoginForm from './LoginForm'

import styled from 'styled-components'

const StyledLoginFormWrapper = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border: 1px solid #8f8d8dad;
    border-radius: 10px;
    padding: 10px;
`;

const StyledFormLabel = styled.label`
  font-size: large;
  font-weight: bold;
`;

const LoginPage = () => {
  return (
    <>
    <MainWrapper>
        <StyledLoginFormWrapper>
            <StyledFormLabel>Login</StyledFormLabel>
            <LoginForm />
        </StyledLoginFormWrapper>
    </MainWrapper>
    </>
  )
}

export default LoginPage
