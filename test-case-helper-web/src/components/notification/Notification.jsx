import React from 'react'
import styled from 'styled-components';

const StyledArticle = styled.article`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
    background-color: ${(props) => (props.$status >= 300 ? "#ff0000ad" : "#01a501cf")};
`;

const Notification = ({width, height, version, message, $status}) => {
    return (
        <StyledArticle $status={$status}>
            {$status >= 300 ? "failed" : "success"}
        </StyledArticle>
    )
}

export default Notification;
