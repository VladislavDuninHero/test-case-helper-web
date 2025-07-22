import React from 'react'
import styled from 'styled-components';

const StyledArticle = styled.article`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    padding: 5px;
    border-radius: 5px;
    background-color: ${(props) => (props.$status >= 300 ? "#ff0000ad" : "#01a501cf")};
`;

const Notification = ({width, height, version, message, $status, children}) => {
    return (
        <StyledArticle $status={$status}>
            {!children && ($status >= 400 ? "Failed" : "Success")}
            {children}
        </StyledArticle>
    )
}

export default Notification;
