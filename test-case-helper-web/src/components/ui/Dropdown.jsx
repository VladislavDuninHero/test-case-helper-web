import React from 'react'

import styled from 'styled-components'

const StyledSelect = styled.select`
    border-radius: ${(props) => (props.$borderRadius ? props.$borderRadius : "")};
    min-height: 30px;
    cursor: pointer;
`;

const Dropdown = ({children, onChange, selectConfig, value}) => {
    
    return (
        <StyledSelect onChange={onChange} $borderRadius={selectConfig.borderRadius} value={value}>
            {children}
        </StyledSelect>
    )
}

export default Dropdown;