import React from 'react'
import styled from 'styled-components';

const StyledMain = styled.main`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: ${({$alignItems}) => ($alignItems ? $alignItems : "center")};
    justify-content: ${({$mainPosition}) => ($mainPosition ? $mainPosition : "flex-start")};
    border: ${(props) => (props.$border ? props.$border : "none")};
    margin: 5px;
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