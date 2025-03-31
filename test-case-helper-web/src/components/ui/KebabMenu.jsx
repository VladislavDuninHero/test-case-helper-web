import React, { useState } from 'react'
import styled from 'styled-components'

const StyledDot = styled.div`
    border-radius: 50%;
    background-color: black;
    width: 3px;
    height: 3px;
`;

const StyledKebabMenuButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
`;

const StyledKebabMenuContainer = styled.article`
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 10;
    border-radius: 10px;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const StyledDropdownMenu = styled.div`
    position: absolute;
    right: 0;
    top: 100%;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    z-index: 100;
    min-width: 100px;
`;

const StyledMenuItem = styled.div`
    padding: 5px 16px;
    cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
    font-size: 15px;
    opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};

    &:hover {
        background-color: ${({ $disabled }) => $disabled ? 'transparent' : '#f5f5f5'};
    }
`;

const KebabMenu = ({config}) => {

    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <StyledKebabMenuContainer>
            <StyledKebabMenuButton onClick={() => setIsOpen(!isOpen)}>
                <StyledDot />
                <StyledDot />
                <StyledDot />
            </StyledKebabMenuButton>
            {
                isOpen && (
                    <StyledDropdownMenu onClick={(e) => e.stopPropagation()}>
                        {
                            config.items.map((item, index) => (
                                <StyledMenuItem  key={index} onClick={() => item.hasPermission && item.action()} $disabled={!item.hasPermission}>
                                    {item.label}
                                </StyledMenuItem>
                            ))
                        }
                    </StyledDropdownMenu>
                )
            }
        </StyledKebabMenuContainer>
    )
}

export default KebabMenu;