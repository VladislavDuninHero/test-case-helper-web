import React from 'react'
import styled from 'styled-components';

const StyledMain = styled.main`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: ${({$alignItems}) => ($alignItems ? $alignItems : "center")};
    justify-content: ${({$mainPosition}) => ($mainPosition ? $mainPosition : "flex-start")};
    border: ${(props) => (props.$border ? props.$border : "1px solid #8f8d8dad")};
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
`;

const Main = ({children, mainConfig = {}}) => {
   
    return (
        <StyledMain 
            $mainPosition={mainConfig.mainContentPosition}
            $border={mainConfig.border}
            $alignItems={mainConfig.alignItems}
        >
            {children}
        </StyledMain>
    )
}

export default Main;