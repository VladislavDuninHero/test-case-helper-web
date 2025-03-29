import React, { useEffect, useState } from 'react'

import { Routes } from '../../constants/Route';

import styled from 'styled-components'
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Navigate } from 'react-router';
import Notification from '../notification/Notification';
import RequestService from '../../service/api/RequestService';
import CookieService from '../../service/cookie/CookieHandlerService';
import { useAuth } from '../../service/auth/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledArticleLabelWithInput = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-width: 100%;
`;

const StyledButtonWrapperForEye = styled.div`
    position: relative;
`;

const StyledEyeShowPasswordButton = styled.button`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding: 0;
`;

const LoginForm = () => {
    const [loginData, setLoginData] = useState({});
    const [loginStatus, setLoginStatus] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [response, setResponse] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const {login} = useAuth();

    const handleChange = (field) => (event) => {
        setLoginData({
            ...loginData,
            [field]: event.target.value
        })
    }

    const renderStatus = (loginStatus) => {
        if (loginStatus >= 300) {
            return <Notification $status={loginStatus}/>
        }
    }

    const handleShowPassword = (e) => {
        e.preventDefault();

        setShowPassword(!showPassword);
    }

    const handleLogin = (event) => {
        event.preventDefault();

        const res = RequestService.postRequest(Routes.LOGIN_ROUTE, loginData)
            .then(res => {
                setLoginStatus(res.status);
                setRedirect(true);
                setResponse(res.data);
                
                login(res.data.tokenInfo.accessToken);
            })
            .catch(err => setLoginStatus(err.status));
        
    };
    
    if (redirect) {
        return <Navigate to={Routes.MAIN_PAGE_ROUTE} />;
    }

    const buttonConfig = {
        buttonName: "Sign in",
        fontColor: "white",
        borderRadius: "5px",
        minWidth: "100%",
        border: "1px solid lightblue"
    }

    return (
        <StyledForm onSubmit={handleLogin}>
            <StyledArticleLabelWithInput>
                <label>Login: </label>
                <Input 
                    type="text" 
                    placeholder={"login"} 
                    onChange={handleChange("login")} 
                    margin={"5px 0px 5px 0px"}
                />
            </StyledArticleLabelWithInput>
            <StyledArticleLabelWithInput>
                <label>Password: </label>
                <StyledButtonWrapperForEye>
                    <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder={"password"} 
                        onChange={handleChange("password")} 
                        padding={"5px 25px 5px 5px"} 
                        margin={"5px 0px 5px 0px"}
                    />
                    <StyledEyeShowPasswordButton onClick={handleShowPassword}>
                        {
                            showPassword ? <FaEyeSlash /> : <FaEye />
                        }
                    </StyledEyeShowPasswordButton>
                </StyledButtonWrapperForEye>
            </StyledArticleLabelWithInput>
            <Button buttonConfig={buttonConfig} />
            {renderStatus(loginStatus)}
        </StyledForm>
    )
}

export default LoginForm;
