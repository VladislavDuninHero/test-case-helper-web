import React from 'react'

import styled from 'styled-components'

const StyledSelect = styled.select`
    border-radius: ${(props) => (props.$borderRadius ? props.$borderRadius : "")};
    min-height: 30px;
    cursor: pointer;
`;

const DropdownMenu = ({children, onChange, selectConfig}) => {
    
    return (
        <StyledSelect onChange={onChange} $borderRadius={selectConfig.borderRadius}>
            {children}
        </StyledSelect>
    )
}

export default DropdownMenu;