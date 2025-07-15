import React, {useState} from 'react';

import styled from "styled-components";

const StyledCustomOption = styled.div`
    border-radius: ${(props) => props.$borderRadius || "0"};
    color: ${(props) => props.$color || "black"};
    background-color: ${(props) => props.$backgroundColor || ""};
    padding: ${props => props.$padding || "0"};
    cursor: pointer;
    text-align: center;

    &:hover {
        filter: brightness(0.9);
    }
`;

const StyledSelectContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const StyledSelectList = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 100;
    border: none;
    border-radius: 5px;
    margin-top: 4px;
`;

const StyledSelectedOption = styled.div`
    border-radius: ${(props) => (props.$borderRadius ? props.$borderRadius : "0")};
    color: ${(props) => (props.$color ? props.$color : "black")};
    background-color: ${(props) => (props.$backgroundColor ? props.$backgroundColor : "")};
    padding: ${props => props.$padding ? props.$padding : "0"};
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

const CustomSelect = ({options, value, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);

    const selected = options.find(option => option.value === value) || options[0];

    const backgroundColorStatusFactory = (selected) => {
        const statusMap = new Map([
            ["NOT_TESTING", "gray"],
            ["PASSED", "green"],
            ["FAILED", "red"],
            ["BLOCKED", "crimson"],
            ["SKIPPED", "lightblue"],
        ]);

        return statusMap.get(selected) ? statusMap.get(selected) : "";
    }

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    }

    return (
        <StyledSelectContainer>
            <StyledSelectedOption
                $backgroundColor={backgroundColorStatusFactory(selected.value)}
                $padding={"5px"}
                $borderRadius={"10px"}
                onClick={handleOpen}
            >
                {selected.value}
            </StyledSelectedOption>
            { isOpen && (
                <StyledSelectList>
                    {options.map(option => (
                        <StyledCustomOption
                            key={option.value}
                            value={option.value}
                            $color={option.styles.color}
                            $backgroundColor={option.styles.backgroundColor}
                            $borderRadius={option.styles.borderRadius}
                            $padding={option.styles.padding}
                            onClick={ () => handleSelect(option.value) }
                        >
                            {option.label}
                        </StyledCustomOption>
                        ))
                    }
                </StyledSelectList>
                )
            }
        </StyledSelectContainer>
    );
};

export default React.memo(CustomSelect);