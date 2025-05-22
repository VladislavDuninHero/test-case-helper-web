import React from 'react'

import MainWrapper from '../global-wrappers/MainWrapper';
import styled from 'styled-components';
import { Link } from 'react-router';

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

const NotFound = () => {
    return (
        <MainWrapper>
            <StyledMainContent>
                <h2>Not found</h2>
                <StyledLink to={"/projects"}>Back to projects page</StyledLink>
            </StyledMainContent>
        </MainWrapper>
    )
}

export default NotFound;