import React from 'react'
import styled from 'styled-components'

import Profile from '../user/Profile';
import NavigationPanel from '../navigation/NavigationPanel';

import { Navigate, useNavigate } from 'react-router';

const StyledHeader = styled.header`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid black;
    padding: 5px;
    border-radius: 5px;
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
    border: 1px solid black;
`;

const Header = () => {

    const navigate = useNavigate();

    const onClickBackForward = () => {
        navigate(-1);
    }

    return (
        <StyledHeader>
            <StyledHeaderContainer>
                <StyledBackButton onClick={onClickBackForward}>back</StyledBackButton>
                <NavigationPanel />
                <StyledUserArticle>
                    <Profile />
                    <div>logout</div>
                </StyledUserArticle>
            </StyledHeaderContainer>
        </StyledHeader>
    )
}

export default Header;