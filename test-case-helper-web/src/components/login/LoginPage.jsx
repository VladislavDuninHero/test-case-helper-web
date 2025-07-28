import React from 'react'
import MainWrapper from '../global-wrappers/MainWrapper.jsx'
import LoginForm from './LoginForm'

import styled from 'styled-components'

const StyledLoginFormWrapper = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    padding: 20px;
    background-color: ${props => props.theme.colors.backgroundColor};
    box-shadow: ${props => props.theme.effects.boxShadow};
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
