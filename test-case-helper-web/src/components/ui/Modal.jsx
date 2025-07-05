import React, {useEffect} from 'react'
import { AiOutlineClose } from "react-icons/ai";

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
    overflow-y: auto;
`;

const StyledModalBody = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : "700px")};
    max-height: ${(props) => (props.$maxHeight ? props.$maxHeight : "600px")};
    width: 100%;
    position: relative;
    overflow-y: auto;
    overscroll-behavior: contain;
`;

const StyledModalContentWrapper = styled.div`
    position: relative;
    width: 90%;
    max-width: 600px;
`;

const StyledCloseModalButtonDefault = styled.button`
    position: absolute;
    top: -40px;
    right: -40px;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1001;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.76);

    &:hover {
        color: white;
    }
`

const Modal = ({isOpen, closeModal, children, maxWidth, maxHeight}) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%'
        };

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.style.touchAction = '';
            document.body.style.overscrollBehavior = '';
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

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
            <StyledModalContentWrapper>
                <StyledCloseModalButtonDefault onClick={closeModal}>
                    <AiOutlineClose />
                </StyledCloseModalButtonDefault>
                <StyledModalBody $maxWidth={maxWidth} $maxHeight={maxHeight}>
                    {children}
                    <Button buttonConfig={closeModalButtonConfig} />
                </StyledModalBody>
            </StyledModalContentWrapper>
        </StyledOverlay>
    )
}

export default Modal;