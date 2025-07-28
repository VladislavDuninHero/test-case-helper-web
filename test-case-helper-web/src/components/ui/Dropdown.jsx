import React from 'react'

import styled from 'styled-components'

const StyledSelect = styled.select`
    border-radius: ${(props) => (props.$borderRadius ? props.$borderRadius : "")};
    min-height: 30px;
    margin-bottom: ${(props) => (props.$marginBottom ? props.$marginBottom : "0")};
    cursor: pointer;
    padding: ${(props) => (props.$padding ? props.$padding : "0")};
`;

const Dropdown = ({children, onChange, selectConfig, value}) => {
    
    return (
        <StyledSelect
            onChange={onChange}
            $borderRadius={selectConfig.borderRadius}
            $marginBottom={selectConfig.marginBottom}
            $padding={selectConfig.padding}
            value={value}
        >
            {children}
        </StyledSelect>
    )
}

export default Dropdown;