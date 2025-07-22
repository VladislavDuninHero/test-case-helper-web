import React, {useEffect, useState} from 'react';

import styled from "styled-components";

import Button from "../ui/Button.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";
import CustomTextArea from "../ui/CustomTextArea.jsx";
import RequestService from "../../service/api/RequestService.js";
import {Routes} from "../../constants/Route.js";
import CookieService from "../../service/cookie/CookieHandlerService.js";
import {useParams, useSearchParams} from "react-router";
import {useError} from "../hooks/UseErrorHandler.jsx";

const StyledTestCase = styled.article`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    min-width: 100%;
`;
const StyledTestCaseColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    height: 100%;
    padding: 5px;
    border-right: 1px solid #8f8d8dad;
    max-width: 300px;
    
    &:not(:first-child) {
        flex: 1;
    }
`;

const StyledTestCaseWrapper = styled.div`
    display: flex;
    min-width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin: 5px;
`;

const StyledTestCaseRunControllers = styled.article`
    display: flex;
    justify-content: start;
    align-items: start;
`;
const StyledTestCaseRunController = styled.article`
    display: flex;
    flex: 1;
    min-width: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: ${props => props.$alignItems || 'flex-start'};
    gap: 10px;
    height: 100%;
    padding: 5px;
    max-width: ${props => props.$maxWidth || '300px'};
    
    &:not(:last-child) {
        border-right: 1px solid #8f8d8dad;
    }
`;

const StyledTestCaseStep = styled.p`

`

const StyledTestCaseColumnTitle = styled.div`
    min-width: 100%;
    border-radius: 10px;
    padding: 5px;
    background-color: rgba(68 123 186 / 10%);
`;

const StyledTestCaseExtraColumnTitle = styled.article`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 100%;
    border-radius: 10px;
    padding: 5px;
    background-color: rgba(68 123 186 / 10%);
`;

const StyledStatusSelect = styled.select`
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    min-width: 100%;
`;

const StyledStatusSpan = styled.span`
    padding: 5px;
    border-radius: 10px;
    color: white;
    background-color: ${props => props.$backgroundColor ? props.$backgroundColor : ''};
`;

const status = [
    {
        value: "PASSED",
        label: "PASSED",
        styles: {
            color: "black",
            backgroundColor: "green",
            padding: "5px",
        }
    },
    {
        value: "FAILED",
        label: "FAILED",
        styles: {
            color: "black",
            backgroundColor: "red",
            padding: "5px",
        }
    },
    {
        value: "BLOCKED",
        label: "BLOCKED",
        styles: {
            color: "black",
            backgroundColor: "crimson",
            padding: "5px",
        }
    },
    {
        value: "SKIPPED",
        label: "SKIPPED",
        styles: {
            color: "black",
            backgroundColor: "lightblue",
            padding: "5px",
        }
    },
    {
        value: "NOT_TESTING",
        label: "NOT_TESTING",
        styles: {
            color: "black",
            backgroundColor: "gray",
            marinTop: "5px",
            padding: "5px",
        }
    },
]

const StyledSaveDataArticle = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    min-width: 100%;
`;

const StyledSpan = styled.span`
    color: ${props => props.$color ? props.$color : 'black'};
    min-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledTextValue = styled.p`
    display: flex;
    word-break: break-all;
`;

const RunTestCase = ({runTestCase, onStatusChange}) => {
    const {projectId} = useParams();
    const {suiteId} = useParams();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("sessionId");

    const {setError} = useError();

    const [actualResultIsVisible, setActualResultIsVisible] = useState(false);
    const [commentIsVisible, setCommentIsVisible] = useState(false);

    const [runTestCaseData, setRunTestCaseData] = useState( {
        testSuiteId: suiteId,
        sessionId: sessionId,
        testCaseResultId: runTestCase.id,
        actualResult: runTestCase.testCase.actualResult || "",
        status: runTestCase.testCase.status || "NOT_TESTING",
        comment: runTestCase.testCase.comment || ""
    })
    const [savedResults, setSavedResults] = useState({
        testCaseResultId: runTestCase.id,
        actualResult: runTestCase.actualResult || "",
        status: runTestCase.status || "NOT_TESTING",
        comment: runTestCase.comment || ""
    });
    const [savedResultsRequestStatus, setSavedResultsRequestStatus] = useState(null);

    const token = CookieService.getCookie("token");

    const renderSteps = (items, prefix) => {
        return items?.map((item, index) =>
            <StyledTestCaseStep key={`${prefix}-${index}`}>
                {`${index + 1}. ${item.step}`}
            </StyledTestCaseStep>
        )
    }

    const handleOpenActualResult = () => {
        if (!actualResultIsVisible) {
            setRunTestCaseData({
                ...runTestCaseData,
                actualResult: savedResults.actualResult
            })
        }

        setActualResultIsVisible(!actualResultIsVisible);
    }
    const handleChangeActualResult = (field) => (e) => {
        setRunTestCaseData({
            ...runTestCaseData,
            [field]: e.target.value
        });
    }
    const handleOpenComment = () => {
        if (!commentIsVisible) {
            setRunTestCaseData({
                ...runTestCaseData,
                comment: savedResults.comment
            })
        }

        setCommentIsVisible(!commentIsVisible);
    }
    const handleChangeComment = (field) => (e) => {
        setRunTestCaseData({
            ...runTestCaseData,
            [field]: e.target.value
        });
    }
    const handleChangeStatus = (status) => {
        const updatedStatus = {
            ...runTestCaseData,
            status: status
        }

        setRunTestCaseData(updatedStatus);

        RequestService.putAuthorizedRequest(
            `${Routes.RUN_TEST_SUITE_SESSION_ROUTE}/update`,
            updatedStatus,
            token
        )
            .then(res => {
                setSavedResults(res.data);
                setSavedResultsRequestStatus(res.status);
                onStatusChange(res.data.sessionStatistic)
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    setError(true);
                }
                setSavedResultsRequestStatus(err.status);
            });
    }

    const handleSaveUpdatedFields = (setIsVisible) => {
        setSavedResultsRequestStatus(null);

        RequestService.putAuthorizedRequest(
            `${Routes.RUN_TEST_SUITE_SESSION_ROUTE}/update`,
            runTestCaseData,
            token
        )
            .then(res => {
                setSavedResults(res.data);
                setSavedResultsRequestStatus(res.status);
                if (setIsVisible !== null) {
                    setIsVisible(false);
                }
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    setError(true);
                }
                setSavedResultsRequestStatus(err.status);
            });
    }


    const changeActualResultButtonConfig = {
        buttonName: "+",
        maxHeight: "20px",
        onClick: handleOpenActualResult
    }
    const changeCommentButtonConfig = {
        buttonName: "+",
        maxHeight: "20px",
        onClick: handleOpenComment
    }
    const saveActualResultUpdatedButtonConfig = {
        buttonName: "Save",
        minWidth: "100%",
        borderRadius: "5px",
        backgroundColor: "green",
        fontColor: "white",
        backGroundHoverFontColor: "white",
        backGroundHoverColor: "#008000c9",
        disabled: setSavedResultsRequestStatus == null,
        onClick: () => handleSaveUpdatedFields(setActualResultIsVisible)
    }
    const saveCommentUpdatedButtonConfig = {
        buttonName: "Save",
        minWidth: "100%",
        borderRadius: "5px",
        backgroundColor: "green",
        backGroundHoverColor: "#008000c9",
        backGroundHoverFontColor: "white",
        fontColor: "white",
        disabled: setSavedResultsRequestStatus == null,
        onClick: () => handleSaveUpdatedFields(setCommentIsVisible),
    }

    const renderCustomTextArea = (
        isVisibleContainer,
        value,
        onChange,
        saveUpdatedButtonConfig,
        savedValue,
        placeholder
    ) => {
        return ( isVisibleContainer
            ? <StyledSaveDataArticle>
                <CustomTextArea
                    value={value}
                    onChange={onChange}
                    isError={savedResultsRequestStatus >= 400}
                />
                <Button buttonConfig={saveUpdatedButtonConfig}/>
            </StyledSaveDataArticle>
            : <StyledTextValue>
                    {
                        savedValue !== ""
                            ? savedValue
                            : <StyledSpan $color={"gray"}>{placeholder}</StyledSpan>
                    }
            </StyledTextValue>

        )
    }

    useEffect(() => {
        setRunTestCaseData({
            testSuiteId: suiteId,
            sessionId: sessionId,
            testCaseResultId: runTestCase.id,
            actualResult: runTestCase.actualResult || "",
            status: runTestCase.status || "NOT_TESTING",
            comment: runTestCase.comment || ""
        });
    }, [runTestCase, sessionId, suiteId]);

    return (
        <StyledTestCaseWrapper key={runTestCase.testCase.id}>
            <StyledTestCase>
                <StyledTestCaseColumn>
                    <StyledTestCaseColumnTitle>ID</StyledTestCaseColumnTitle>
                    {runTestCase.id}
                </StyledTestCaseColumn>
                <StyledTestCaseColumn>
                    <StyledTestCaseColumnTitle>Title</StyledTestCaseColumnTitle>
                    {runTestCase.testCase.title}
                </StyledTestCaseColumn>
                <StyledTestCaseColumn>
                    <StyledTestCaseColumnTitle>Test-case data:</StyledTestCaseColumnTitle>
                    {renderSteps(runTestCase.testCase.testCaseData, "testCaseData")}
                </StyledTestCaseColumn>
                <StyledTestCaseColumn>
                    <StyledTestCaseColumnTitle>Preconditions:</StyledTestCaseColumnTitle>
                    {renderSteps(runTestCase.testCase.preconditions, "preconditions")}
                </StyledTestCaseColumn>
                <StyledTestCaseColumn>
                    <StyledTestCaseColumnTitle>Steps to reproduce:</StyledTestCaseColumnTitle>
                    {renderSteps(runTestCase.testCase.steps, "steps")}
                </StyledTestCaseColumn>
                <StyledTestCaseColumn>
                    <StyledTestCaseColumnTitle>Expected result:</StyledTestCaseColumnTitle>
                    {renderSteps(runTestCase.testCase.expectedResult, "expectedResult")}
                </StyledTestCaseColumn>
                <StyledTestCaseRunController>
                    <StyledTestCaseExtraColumnTitle>
                        Actual result:
                        <Button buttonConfig={changeActualResultButtonConfig}/>
                    </StyledTestCaseExtraColumnTitle>
                    { renderCustomTextArea(
                        actualResultIsVisible,
                        runTestCaseData.actualResult,
                        handleChangeActualResult("actualResult"),
                        saveActualResultUpdatedButtonConfig,
                        savedResults.actualResult,
                        "Add a actual result"
                        )
                    }
                </StyledTestCaseRunController>
                <StyledTestCaseRunController $maxWidth={"130px"} $alignItems={"center"}>
                    <StyledTestCaseColumnTitle>Status:</StyledTestCaseColumnTitle>
                    <CustomSelect options={status} value={runTestCaseData.status} onChange={handleChangeStatus}/>
                </StyledTestCaseRunController>
                <StyledTestCaseRunController>
                    <StyledTestCaseExtraColumnTitle>
                        Comment:
                        <Button buttonConfig={changeCommentButtonConfig}/>
                    </StyledTestCaseExtraColumnTitle>
                    { renderCustomTextArea(
                        commentIsVisible,
                        runTestCaseData.comment,
                        handleChangeComment("comment"),
                        saveCommentUpdatedButtonConfig,
                        savedResults.comment,
                        "Add a comment"
                        )
                    }
                </StyledTestCaseRunController>
            </StyledTestCase>
        </StyledTestCaseWrapper>
    );
};

export default React.memo(RunTestCase);