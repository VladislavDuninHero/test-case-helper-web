import React from 'react'
import MainWrapper from '../global-wrappers/MainWrapper.jsx'
import LoginForm from './LoginForm'

import styled from 'styled-components'

const StyledLoginFormWrapper = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
`;

const LoginPage = () => {
  return (
    <>
    <MainWrapper>
        <StyledLoginFormWrapper>
            <label>Login</label>
            <LoginForm />
        </StyledLoginFormWrapper>
    </MainWrapper>
    </>
  )
}

export default LoginPage
