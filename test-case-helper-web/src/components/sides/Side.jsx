import React from 'react'

import styled from 'styled-components';

const StyledASide = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const Side = ({children}) => {
    return (
        <StyledASide>
            {children}
        </StyledASide>
    )
}

export default Side;