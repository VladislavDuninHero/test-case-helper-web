import React from 'react'
import styled from 'styled-components';

const StyledMain = styled.main`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: ${({$mainPosition}) => ($mainPosition ? $mainPosition : "flex-start")};
    border: 1px solid black;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
`;

const Main = ({children, mainConfig = {}}) => {
   
    return (
        <StyledMain $mainPosition={mainConfig.mainContentPosition}>{children}</StyledMain>
    )
}

export default Main;