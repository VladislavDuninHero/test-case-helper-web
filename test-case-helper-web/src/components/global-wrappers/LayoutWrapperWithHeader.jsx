import React from 'react'
import styled from 'styled-components'
import Header from '../sections/Header';
import Main from '../sections/Main';
import Footer from '../sections/Footer';

const StyledLayoutWithHeader = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100%;
    min-height: 100vh;
`;

const LayoutWrapperWithHeader = ({headerContent, children, footerContent, config}) => {
    
    return (
        <StyledLayoutWithHeader>
            <Header headerContent={headerContent}/>
            <Main mainConfig={config}>{children}</Main>
            <Footer footerContent={footerContent}/>
        </StyledLayoutWithHeader>
    )
}

export default LayoutWrapperWithHeader;