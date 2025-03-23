import React from 'react'
import { Link } from 'react-router';
import styled from 'styled-components'

const StyledLink = styled(Link)`
    margin: 5px;
    cursor: pointer;

    &:hover {
        color: #a5a4a4
    }
`;

const NavigationLink = ({linkName, link}) => {
    return (
        <StyledLink to={link}>{linkName}</StyledLink>
    )
}

export default NavigationLink;