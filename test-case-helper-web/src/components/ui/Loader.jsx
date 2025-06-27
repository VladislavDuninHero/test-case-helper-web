import React from 'react'

import styled from 'styled-components';

const StyledSpinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: ${(props) => (props.$width ? props.$width : "40px")};
    height: ${(props) => (props.$height ? props.$height : "40px")};;
    animation: spin 1s linear infinite;
    margin: 20px auto;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const Loader = ({width, height}) => {
    return (
        <StyledSpinner
            $width={width}
            $height={height}
        />
    )
}

export default Loader;