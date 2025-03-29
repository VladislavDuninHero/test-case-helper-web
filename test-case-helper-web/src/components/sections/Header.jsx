import React from 'react'
import styled from 'styled-components'

import Profile from '../user/Profile';
import NavigationPanel from '../navigation/NavigationPanel';
import Button from '../ui/Button';
import { SlArrowLeft } from "react-icons/sl";
import { SlLogout } from "react-icons/sl";

import CookieService from '../../service/cookie/CookieHandlerService';

import { Navigate, useNavigate } from 'react-router';

const StyledHeader = styled.header`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid #8f8d8dad;
    padding: 5px;
    border-radius: 0px 0px 5px 5px;
    min-width: 100%;
`;

const StyledHeaderContainer = styled.section`
    display: flex;
    justify-content: space-between;
    min-width: 100%;
`;

const StyledUserArticle = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
`;

const StyledBackButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 20px;

    &:active {
        transform: scale(0.8);
    }
`;

const StyledLogoutButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    font-size: 25px;

    &:hover {
        color: red;
    }
`;

const Header = () => {

    const navigate = useNavigate();

    const onClickBackForward = () => {
        navigate(-1);
    }

    const handleLogout = () => {
        CookieService.deleteCookie("token");

        navigate("/");
    }

    return (
        <StyledHeader>
            <StyledHeaderContainer>
                <StyledBackButton onClick={onClickBackForward}>
                    <SlArrowLeft />
                </StyledBackButton>
                <NavigationPanel />
                <StyledUserArticle>
                    <Profile />
                    <StyledLogoutButton onClick={handleLogout}>
                        <SlLogout />
                    </StyledLogoutButton>
                </StyledUserArticle>
            </StyledHeaderContainer>
        </StyledHeader>
    )
}

export default Header;