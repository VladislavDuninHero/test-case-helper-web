import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { Routes } from '../../constants/Route';

import styled from 'styled-components'
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Navigate } from 'react-router';
import Notification from '../notification/Notification';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LoginForm = () => {
    const [loginData, setLoginData] = useState({});
    const [loginStatus, setLoginStatus] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [response, setResponse] = useState({});

    const handleChange = (field) => (event) => {
        setLoginData({
            ...loginData,
            [field]: event.target.value
        })
    }

    const renderStatus = (loginStatus) => {
        if (loginStatus >= 300) {
            return <Notification status={loginStatus}/>
        }
    }

    const handleLogin = (event) => {
        event.preventDefault()

        const res = axios
            .post(Routes.LOGIN_ROUTE, loginData)
            .then(res => {
                setLoginStatus(res.status);
                setRedirect(true);
                setResponse(res.data);
                
                document.cookie = `token=${res.data.tokenInfo.accessToken}; max-age=${60 * 60 * 1000}`;
            })
            .catch(err => setLoginStatus(err.status))
        
    };

    if (redirect) {
        return <Navigate to={Routes.MAIN_PAGE_ROUTE} />;
    }

    return (
        <StyledForm onSubmit={handleLogin}>
            <Input type="text" placeholder={"login"} onChange={handleChange("login")} />
            <Input type="text" placeholder={"password"} onChange={handleChange("password")} />
            <Input type="text" placeholder={"email"} onChange={handleChange("email")} />
            <Button buttonName="submit" />
            {renderStatus(loginStatus)}
        </StyledForm>
    )
}

export default LoginForm;
