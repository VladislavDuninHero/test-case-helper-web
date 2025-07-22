import React from 'react';
import {Link, useLocation, useNavigate} from "react-router";
import Button from "../ui/Button.jsx";
import styled from "styled-components";
import MainWrapper from "../global-wrappers/MainWrapper.jsx";

const StyledMainContent = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledLink = styled(Link)`
    &:hover {
        color: #a8a8a8;
    }
`;

const ErrorPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {errorCode, errorMessage} = location.state || {};

    return (
        <MainWrapper>
            <StyledMainContent>
                <h2>{errorCode}</h2>
                <p>{errorMessage}</p>
                <StyledLink to={"/projects"}>Back to projects page</StyledLink>
            </StyledMainContent>
        </MainWrapper>
    );
};

export default ErrorPage;