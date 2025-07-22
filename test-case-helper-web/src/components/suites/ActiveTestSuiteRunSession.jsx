import React, {useState} from 'react';
import styled from "styled-components";
import Button from "../ui/Button.jsx";
import {AiOutlineClose} from "react-icons/ai";
import {BiSolidRightArrow} from "react-icons/bi";
import Modal from "../ui/Modal.jsx";
import {useNavigate, useParams} from "react-router";
import CookieService from "../../service/cookie/CookieHandlerService.js";
import {useError} from "../hooks/UseErrorHandler.jsx";

const StyledActiveSessionArticle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    min-width: 100%;
    border-radius: 5px;
    background-color: rgba(68 123 186 / 10%);
    border: 1px solid rgba(68 123 186 / 10%);
    padding: 5px;
`;

const StyledActiveTestSuiteRunSessionContainer = styled.div`
    display: flex;
    flex-direction: ${(props) => props.$flexDirection || ""};
    justify-content: flex-start;
`;

const StyledSpan = styled.span`
    margin-right: ${(props) => props.$marginRight || "5px"};
    color: ${(props) => props.$color || "black"};
    text-wrap: ${(props) => props.$textWrap || ""};
`;

const StyledDiv = styled.div`

`;

const StyledControllersArticle = styled.article`
    font-size: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100%;
`;

const StyledParagraph = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
`;

const ActiveTestSuiteRunSession = ({activeSession, onDelete}) => {

    const [openTestSuiteRunSessionModal, setOpenTestSuiteRunSessionModal] = useState(false);
    const [openTestSuiteCloseSessionModal, setOpenTestSuiteCloseSessionModal] = useState(false);
    const navigate = useNavigate();
    const {projectId} = useParams();
    const {setError} = useError();
    const testSuiteId = activeSession.testSuiteId;
    const runSessionId = activeSession.runSessionId;

    const token = CookieService.getCookie("token");

    const handleOpenTestSuiteRunSessionModal = () => {
        setOpenTestSuiteRunSessionModal(true);
    }
    const handleCloseTestSuiteRunSessionModal = () => {
        setOpenTestSuiteRunSessionModal(false);
    }

    const handleOpenTestSuiteCloseSessionModal = () => {
        setOpenTestSuiteCloseSessionModal(true);
    }
    const handleCloseTestSuiteCloseSessionModal = () => {
        setOpenTestSuiteCloseSessionModal(false);
    }

    const handleContinueTestSuiteRunSession = () => {
        navigate(`/projects/${projectId}/${testSuiteId}/run?sessionId=${runSessionId}`);
    }


    const continueButtonConfig = {
        buttonName: <BiSolidRightArrow />,
        fontSize: "24px",
        borderRadius: "5px",
        fontColor: "green",
        border: "none",
        background: "none",
        backGroundHoverColor: "rgba(68 123 186 / 10%)",
        backGroundHoverFontColor: "green",
        onClick: handleOpenTestSuiteRunSessionModal
    }
    const closeSessionButtonConfig = {
        buttonName: <AiOutlineClose />,
        fontSize: "24px",
        borderRadius: "5px",
        fontColor: "red",
        border: "none",
        background: "none",
        backGroundHoverColor: "rgba(68 123 186 / 10%)",
        backGroundHoverFontColor: "red",
        onClick: handleOpenTestSuiteCloseSessionModal
    }

    const handleContinueRunTestSuiteSessionButtonConfig = {
        buttonName: "Continue",
        borderRadius: "5px",
        fontColor: "white",
        onClick: handleContinueTestSuiteRunSession
    }

    const handleCloseRunTestSuiteSessionButtonConfig = {
        buttonName: "Close testing session",
        borderRadius: "5px",
        fontColor: "white",
        onClick: onDelete
    }

    return (
        <StyledActiveSessionArticle data-activesessionid={activeSession.runSessionId}>
            <StyledDiv>
                <StyledActiveTestSuiteRunSessionContainer>
                    <StyledSpan>Session id:</StyledSpan>
                    <StyledSpan $color={"#447bba"}>{activeSession.runSessionId}</StyledSpan>
                </StyledActiveTestSuiteRunSessionContainer>
                <StyledActiveTestSuiteRunSessionContainer>
                    <StyledSpan $textWrap={"nowrap"}>Test-suite:</StyledSpan>
                    <StyledSpan $color={"#447bba"}>{activeSession.testSuiteTitle}</StyledSpan>
                </StyledActiveTestSuiteRunSessionContainer>
                <StyledActiveTestSuiteRunSessionContainer>
                    <StyledSpan>Environment:</StyledSpan>
                    <StyledSpan $color={"#447bba"}>{activeSession.environment}</StyledSpan>
                </StyledActiveTestSuiteRunSessionContainer>
            </StyledDiv>
            <StyledControllersArticle>
                <Button buttonConfig={continueButtonConfig}/>
                <Button buttonConfig={closeSessionButtonConfig}/>
            </StyledControllersArticle>
            <Modal isOpen={openTestSuiteRunSessionModal} closeModal={handleCloseTestSuiteRunSessionModal}>
                <StyledParagraph>Continue run test-suite session?</StyledParagraph>
                <Button buttonConfig={handleContinueRunTestSuiteSessionButtonConfig} />
            </Modal>
            <Modal isOpen={openTestSuiteCloseSessionModal} closeModal={handleCloseTestSuiteCloseSessionModal}>
                <StyledParagraph>Close run test-suite session?</StyledParagraph>
                <Button buttonConfig={handleCloseRunTestSuiteSessionButtonConfig} />
            </Modal>
        </StyledActiveSessionArticle>
    );
};

export default ActiveTestSuiteRunSession;