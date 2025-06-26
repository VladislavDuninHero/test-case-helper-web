import React from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const StyledPaginationSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 20px 0;
`;


const Ellipsis = styled.span`
    display: inline-block;
    width: 32px;
    text-align: center;
`;

const PaginationPanel = ({ currentPage, pageSize, onPageChange, totalElements }) => {

    const totalPages = Math.ceil(totalElements / pageSize);

    const buttonConfigInitiator = (key) => {
        const isActive = key === currentPage;
        return <Button
                    key={key}
                    buttonConfig={{
                        buttonName: key + 1,
                        onClick: () => onPageChange(key),
                        borderRadius: "5px",
                        fontColor: "white",
                        minWidth: "30px",
                        maxHeight: "30px",
                        backGroundHoverFontColor: "white",
                        backGroundHoverColor: "orange",
                        border: isActive ? "1px solid orange" : "",
                        backGroundColor: isActive ? "orange" : ""
                    }}
                />
    }

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 10;

        if (totalPages === 1) {
            return buttonConfigInitiator(0);
        }

        for (let i = 0; i < totalPages; i++) {
            pages.push(buttonConfigInitiator(i))
        }

        return pages;
    };

    return (
        <StyledPaginationSection>
            <Button
                buttonConfig={{
                    buttonName: <SlArrowLeft />,
                    onClick: () => currentPage >= 1 ? onPageChange(currentPage - 1) : currentPage,
                    disabled: currentPage === 0,
                    fontColor: "black",
                    borderRadius: "5px",
                    backGroundColor: "unset",
                    backGroundHoverFontColor: "#00000073",
                    backGroundHoverColor: "unset",
                    border: "none"
                }}
            />
            
            {renderPageNumbers()}
            
            <Button
                buttonConfig={{
                    buttonName: <SlArrowRight />,
                    onClick: () => onPageChange(currentPage + 1),
                    fontColor: "black",
                    borderRadius: "5px",
                    backGroundColor: "unset",
                    backGroundHoverFontColor: "#00000073",
                    backGroundHoverColor: "unset",
                    border: "none",
                    disabled: currentPage === totalPages - 1
                }}
                
            />
        </StyledPaginationSection>
    );
};

export default PaginationPanel;