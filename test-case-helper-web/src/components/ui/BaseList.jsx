import React from 'react';
import styled from "styled-components";

const StyledList = styled.ul`
    
`;

const BaseList = ({children}) => {
    return (
        <StyledList>
            {children}
        </StyledList>
    );
};

export default BaseList;