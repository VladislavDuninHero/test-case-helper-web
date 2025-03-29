import React from 'react'

import styled from 'styled-components';

const StyledASide = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 100vh;
    border-right: 1px solid #8f8d8dad;
`;

const Side = ({children}) => {
    return (
        <StyledASide>
            {children}
        </StyledASide>
    )
}

export default Side;