import React, {useState} from 'react'

import styled from 'styled-components'
import {BiSolidRightArrow} from "react-icons/bi";

import Button from '../ui/Button';
import KebabMenu from '../ui/KebabMenu';
import Modal from '../ui/Modal';

import {useNavigate} from 'react-router';

import {useAuth} from '../../service/auth/AuthProvider';
import Dropdown from "../ui/Dropdown.jsx";
import RequestService from "../../service/api/RequestService.js";
import {Routes} from "../../constants/Route.js";
import CookieService from "../../service/cookie/CookieHandlerService.js";
import Notification from "../notification/Notification.jsx";
import ActiveTestSuiteRunSession from "./ActiveTestSuiteRunSession.jsx";

const StyledTestSuiteArticle = styled.article`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin: 5px;
    border-radius: 5px;
    padding: 5px;
    min-height: 100%;
    min-width: 100%;
    text-align: center;
    background-color: #ffffff;
    gap: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    > * {
        min-width: 0;
    }
`;

const StyledBoldTextSpan = styled.span`
    font-weight: bold;
    text-align: start;
    flex: 1;
`;

const StyledFieldSpan = styled.span`
    margin-right: 5px;
`;

const StyledTitleAttrContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    min-width: 90%;
`;

const StyledDescriptionAttrContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    min-width: 90%;
`;

const StyledTagAttrContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-width: 100%;
`;

const StyledBottomElementWrapper = styled.article`
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 100%;
`;

const StyledParagraph = styled.p`
    display: flex;
    justify-content: ${(props) => props.$justifyContent || "center"};
    align-items: center;
    margin-bottom: 5px;
`;

const TestSuite = (
    {
        testSuite,
        loading,
        projectId,
        deleteTestSuiteIsLoading,
        onUpdate,
        onDelete,
        onDeleteResponse
    }
) => {

    const {hasPermission, userData} = useAuth();
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [runTestSuiteModalIsOpen, setRunTestSuiteModalIsOpen] = useState(false);
    const [env, setEnv] = useState("STG");
    const [runTestSuiteSessionResponse, setRunTestSuiteSessionResponse] = useState(null);
    const [runTestSuiteSessionResponseStatus, setRunTestSuiteSessionResponseStatus] = useState(null);
    const navigate = useNavigate();

    const token = CookieService.getCookie("token");

    const handleOpenTestSuite = (e) => {
        const testSuiteId = e.currentTarget.parentElement.parentElement.parentElement.dataset.testsuiteid;

        navigate(`/projects/${projectId}/${testSuiteId}`);
    }

    const handleOpenRunTestSuiteModal = () => setRunTestSuiteModalIsOpen(true);
    const handleCloseRunTestSuiteModal = () => {
        setRunTestSuiteModalIsOpen(false);
    }

    const envSelectOnChange = (value) => {
        setEnv(value)
    }


    const runTestSuiteSession = () => {
        const testSuiteId = testSuite.id;

        RequestService.postAuthorizedRequestWithParams(
            `${Routes.SUITE_ROUTE}/${testSuite.id}/run`,
            "",
            {env},
            token
        )
            .then(res => {
                setRunTestSuiteSessionResponseStatus(res.status);
                setRunTestSuiteSessionResponse(res.data)

                navigate(`/projects/${projectId}/${testSuiteId}/run?sessionId=${res.data.runSessionId}`);
            })
            .catch(err => {
                setRunTestSuiteSessionResponseStatus(err.status);
            });
    }

    const openTestSuiteButtonConfig = {
        buttonName: "Open test-suite",
        borderRadius: "5px",
        fontColor: "white",
        minWidth: "85%",
        onClick: handleOpenTestSuite
    }
    const runTestSuiteButtonConfig = {
        buttonName: <BiSolidRightArrow/>,
        borderRadius: "5px",
        backgroundColor: "white",
        fontColor: "green",
        minWidth: "10%",
        minHeight: "10%",
        border: "none",
        background: "none",
        backGroundHoverColor: "white",
        backGroundHoverFontColor: "#008000b8",
        fontSize: "30px",
        padding: "0",
        onClick: handleOpenRunTestSuiteModal
    }
    const runTestSuiteSessionButtonConfig = {
        buttonName: "Run test-suite",
        fontColor: "white",
        borderRadius: "5px",
        onClick: runTestSuiteSession,
        disabled: false,
    }

    const handleOpenDeleteModal = () => {
        setDeleteModalIsOpen(true);
        onDeleteResponse.errors = [];
        onDeleteResponse.status = null;
    }
    const handleCloseDeleteModal = () => setDeleteModalIsOpen(false);


    const kebabMenuConfig = {
        items: [
            {label: "Update", action: onUpdate, hasPermission: hasPermission("UPDATE_TEST_SUITE")},
            {label: "Delete", action: handleOpenDeleteModal, hasPermission: hasPermission("DELETE_TEST_SUITE")}
        ]
    };

    const confirmButtonConfig = {
        buttonName: "Confirm",
        borderRadius: "5px",
        fontColor: "white",
        disabled: deleteTestSuiteIsLoading !== false,
        isLoading: deleteTestSuiteIsLoading !== false,
        onClick: onDelete
    }

    const selectConfig = {
        buttonName: "Select",
        borderRadius: "5px",
        marginBottom: "10px",
    }

    const renderTestSuite = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        if (!loading) {
            return (
                <StyledTestSuiteArticle data-testsuiteid={testSuite.id}>
                    <KebabMenu config={kebabMenuConfig}/>
                    <StyledTitleAttrContainer>
                        <StyledFieldSpan>Title:</StyledFieldSpan>
                        <StyledBoldTextSpan>{testSuite.title}</StyledBoldTextSpan>
                    </StyledTitleAttrContainer>
                    <StyledDescriptionAttrContainer>
                        <StyledFieldSpan>Description:</StyledFieldSpan>
                        <StyledBoldTextSpan>{testSuite.description}</StyledBoldTextSpan>
                    </StyledDescriptionAttrContainer>
                    <StyledBottomElementWrapper>
                        <StyledTagAttrContainer>
                            <StyledFieldSpan>Tag:</StyledFieldSpan>
                            <StyledBoldTextSpan>{testSuite.tag}</StyledBoldTextSpan>
                        </StyledTagAttrContainer>
                        <StyledButtonWrapper>
                            <Button buttonConfig={openTestSuiteButtonConfig}/>
                            <Button buttonConfig={runTestSuiteButtonConfig}/>
                        </StyledButtonWrapper>
                    </StyledBottomElementWrapper>
                    <Modal isOpen={deleteModalIsOpen} closeModal={handleCloseDeleteModal}>
                        <p>Confirm delete test-suite?</p>
                        <Button buttonConfig={confirmButtonConfig}/>
                        { onDeleteResponse.errors?.length > 0
                            ? onDeleteResponse.errors.map((err, index) => (
                                <Notification $status={400} key={`${err.errorMessage}-${index}`}>
                                    <span>{err.errorMessage}:</span>
                                    {err.activeSessions?.map((active, index) => (
                                                <div key={`${active.testSuiteTitle}-${index}`}>{active.testSuiteTitle}</div>
                                            )
                                        )
                                    }
                                </Notification>
                            ))
                            : ""
                        }
                    </Modal>
                    <Modal isOpen={runTestSuiteModalIsOpen} closeModal={handleCloseRunTestSuiteModal}>
                        <StyledParagraph>Ready to go run test-suite {testSuite.id}?</StyledParagraph>
                        <StyledParagraph $justifyContent={"flex-start"}>Please, select the
                            environment:</StyledParagraph>
                        <Dropdown selectConfig={selectConfig} onChange={e => envSelectOnChange(e.target.value)}>
                            <option>STG</option>
                            <option>QA</option>
                            <option>TEST</option>
                            <option>PROD</option>
                        </Dropdown>
                        <Button buttonConfig={runTestSuiteSessionButtonConfig}/>
                    </Modal>
                </StyledTestSuiteArticle>
            );
        }
    }

    return (
        renderTestSuite()
    )
}

export default TestSuite;