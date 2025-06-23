import React from 'react'
import styled from 'styled-components'
import NavigationLink from '../ui/NavigationLink';

const StyledNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: small;
    color: #535353;
`;

const NavigationPanel = () => {
    return (
        <StyledNav>
            <NavigationLink link={"/"} linkName={"Home"} />
            <NavigationLink link={"/projects"} linkName={"Projects"}/>
            <NavigationLink link={"/faq"} linkName={"FAQ"}/>
        </StyledNav>
    )
}

export default NavigationPanel;