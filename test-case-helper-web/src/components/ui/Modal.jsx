import React from 'react'

import styled from 'styled-components';
import Button from './Button';

const StyledOverlay = styled.article`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const StyledModalBody = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    position: relative;
`;

const Modal = ({isOpen, closeModal, children}) => {
    if (!isOpen) return null;

    const closeModalButtonConfig = {
        buttonName: "Close",
        borderRadius: "5px",
        border: "1px solid #ff0000ab",
        fontColor: "white",
        marginTop: "5px",
        backGroundColor: "red",
        backGroundHoverColor: "#ff0000ab",
        margin: "0 5px 0 5px",
        onClick: closeModal
    }

    return (
        <StyledOverlay>
            <StyledModalBody>
                {children}
                <Button buttonConfig={closeModalButtonConfig} />
            </StyledModalBody>
        </StyledOverlay>
    )
}

export default Modal;