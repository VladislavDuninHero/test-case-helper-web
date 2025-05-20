import React, { useState, useEffect } from 'react'

import MainWrapper from '../global-wrappers/MainWrapper';
import LayoutWrapperWithHeader from '../global-wrappers/LayoutWrapperWithHeader';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Notification from '../notification/Notification';
import { AiFillCloseCircle } from "react-icons/ai";

import RequestService from '../../service/api/RequestService';
import CookieService from '../../service/cookie/CookieHandlerService';
import { Routes } from '../../constants/Route';

import styled from 'styled-components';
import { useParams } from 'react-router';
import { Navigate } from 'react-router';

const StyledCreateTestCaseForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: 1px solid #8f8d8dad;
    border-radius: 5px;
    min-width: 300px;
`;

const StyledAddColumnArticle = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`;

const StyledAddControllerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledFieldsWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px 5px 20px 5px;
    min-width: 100%;
`;

const StyledAddedField = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledDeleteButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15px;
    font-size: 15px;
    color: red;
    margin-left: 5px;
    cursor: pointer;

    &:active {
      transform: scale(0.9);
    }

    &:hover {
        color: #ff0000a7;
    }
`;


const CreateTestCasePage = () => {

    const {suiteId, projectId, caseId} = useParams();

    const [testCase, setTestCase] = useState({
        testSuiteId: suiteId
    });
    const [createTestCaseStatus, setCreateTestCaseStatus] = useState(null);
    const [response, setResponse] = useState({});
    const [testingDataField, setTestingDataField] = useState([]);
    const [preconditionField, setPreconditionField] = useState([]);
    const [stepField, setStepField] = useState([]);
    const [erField, setErField] = useState([]);
    const [defaultRequestStatus, setDefaultRequestStatus] = useState(null);

    const handleChange = (field) => (event) => {
        setTestCase({
            ...testCase,
            [field]: event.target.value
        })
    }

    const token = CookieService.getCookie("token");

    useEffect(() => {
            RequestService.getAuthorizedRequest(`${Routes.TEST_CASE_ROUTE}/${caseId}`, token)
                .then(res => {
                    testCase.title = res.data.title || "";
                    setTestingDataField(res.data.testCaseData);
                    setPreconditionField(res.data.preconditions);
                    setStepField(res.data.steps);
                    setErField(res.data.expectedResult);

                    setDefaultRequestStatus(res.status);
                })
                .catch(err => {
                    setDefaultRequestStatus(err.status);
                });
        }, []);

    const testCaseData = testingDataField.map(field => {return {step: field.step}});
    const preconditions = preconditionField.map(field => {return {step: field.step}});
    const steps = stepField.map(field => {return {step: field.step}});
    const expectedResult = erField.map(field => {return {step: field.step}});

    const updateTestCaseData = {
        ...testCase,
        testCaseData,
        preconditions,
        steps,
        expectedResult
    }
    
    const addTestingDataFields = () => {
        setTestingDataField([...testingDataField, {step: ""}])
    }

    const addPreconditionFields = () => {
        setPreconditionField([...preconditionField, {step: ""}])
    }

    const addStepsFields = () => {
        setStepField([...stepField, {step: ""}])
    }

    const addERFields = () => {
        setErField([...erField, {step: ""}])
    }

    const handleDeleteTestingDataField = (e, currentIndex) => {
        e.preventDefault();

        setTestingDataField(testingDataField.filter((data, index) => index !== currentIndex));
    } 
    const handleDeletePreconditionField = (e, currentIndex) => {
        e.preventDefault();

        setPreconditionField(preconditionField.filter((data, index) => index !== currentIndex));
    } 
    const handleDeleteStepsField = (e, currentIndex) => {
        e.preventDefault();

        setStepField(stepField.filter((data, index) => index !== currentIndex));
    } 
    const handleDeleteErField = (e, currentIndex) => {
        e.preventDefault();

        setErField(erField.filter((data, index) => index !== currentIndex));
    } 

    const handleTestingDataChange = (index, event) => {
        const newTestingData = [...testingDataField];
        newTestingData[index].step = event.target.value;
        setTestingDataField(newTestingData);
    };
    const handlePreconditionChange = (index, event) => {
        const preconditions = [...preconditionField];
        preconditions[index].step = event.target.value;
        setPreconditionField(preconditions);
    };
    const handleStepsChange = (index, event) => {
        const steps = [...stepField];
        steps[index].step = event.target.value;
        setStepField(steps);
    };
    const handleErChange = (index, event) => {
        const er = [...erField];
        er[index].step = event.target.value;
        setErField(er);
    };

    const clearState = () => {
        testCase.title = "";
        
        setTestingDataField([])
        setPreconditionField([]);
        setStepField([]);
        setErField([]);
    }

    const handleCreateTestCase = (e) => {
        e.preventDefault();

        RequestService.putAuthorizedRequest(`${Routes.TEST_CASE_ROUTE}/${caseId}/update`, updateTestCaseData, token)
            .then(res => {
                setCreateTestCaseStatus(res.status);
                setResponse(res.data);
                clearState();
            })
            .catch(err => setCreateTestCaseStatus(err.status));
    }

    const handleAddTestingDataField = (e) => {
        e.preventDefault();
        
        addTestingDataFields();
    }

    const handleAddPreconditionField = (e) => {
        e.preventDefault();
        
        addPreconditionFields();
    }

    const handleAddStepsField = (e) => {
        e.preventDefault();
        
        addStepsFields();
    }

    const handleAddErField = (e) => {
        e.preventDefault();
        
        addERFields();
    }

    const createTestCaseButtonConfig = {
        buttonName: "Update test-case",
        fontColor: "white",
        border: "1px solid blue",
        onClick: handleCreateTestCase
    }

    const addTestingDataButtonConfig = {
        buttonName: "+",
        maxHeight: "20px",
        marginLeft: "5px",
        fontColor: "white",
        border: "1px solid blue",
        onClick: handleAddTestingDataField
    }

    const addPreconditionButtonConfig = {
        buttonName: "+",
        maxHeight: "20px",
        marginLeft: "5px",
        fontColor: "white",
        border: "1px solid blue",
        onClick: handleAddPreconditionField
    }

    const addStepsButtonConfig = {
        buttonName: "+",
        maxHeight: "20px",
        marginLeft: "5px",
        fontColor: "white",
        border: "1px solid blue",
        onClick: handleAddStepsField
    }

    const addExpectedResultButtonConfig = {
        buttonName: "+",
        maxHeight: "20px",
        marginLeft: "5px",
        fontColor: "white",
        border: "1px solid blue",
        onClick: handleAddErField
    }

    const renderStatus = () => {
        return <Notification $status={createTestCaseStatus} />
    }

    const mainConfig = {
        mainContentPosition: "center"
    }

    if (createTestCaseStatus < 300 && createTestCaseStatus !== null) {
        return <Navigate to={`/projects/${projectId}/${suiteId}`} />
    }

    return (
        <MainWrapper>
                <LayoutWrapperWithHeader config={mainConfig}>
                    <StyledCreateTestCaseForm>
                        <label>Update test-case</label>
                        <StyledFieldsWrapper>
                            <Input placeholder={"Test-case title"} onChange={handleChange("title")} value={testCase.title || ""}/>
                            <StyledAddColumnArticle>
                                <StyledAddControllerContainer>
                                    <div>Testing data: </div>
                                    <Button buttonConfig={addTestingDataButtonConfig} />
                                </StyledAddControllerContainer>
                                {
                                    testingDataField.map((field, index) => (
                                        <StyledAddedField key={index}>
                                            {index + 1}.
                                            <Input onChange={(e) => handleTestingDataChange(index, e)} margin={"5px 0 5px 0"} value={field.step}/>
                                            <StyledDeleteButton onClick={(e) => handleDeleteTestingDataField(e, index)}>
                                                <AiFillCloseCircle />
                                            </StyledDeleteButton>
                                        </StyledAddedField>
                                    ))
                                }
                            </StyledAddColumnArticle>
                            <StyledAddColumnArticle>
                                <StyledAddControllerContainer>
                                    <div>Preconditions: </div>
                                    <Button buttonConfig={addPreconditionButtonConfig} />
                                </StyledAddControllerContainer>
                                {
                                    preconditionField.map((field, index) => (
                                        <StyledAddedField key={index}>
                                            {index + 1}.
                                            <Input onChange={(e) => handlePreconditionChange(index, e)} margin={"5px 0 5px 0"} value={field.step}/>
                                            <StyledDeleteButton onClick={(e) => handleDeletePreconditionField(e, index)}>
                                                <AiFillCloseCircle />
                                            </StyledDeleteButton>
                                        </StyledAddedField>
                                    ))
                                }
                            </StyledAddColumnArticle>
                            <StyledAddColumnArticle>
                                <StyledAddControllerContainer>
                                    <div>Steps: </div>
                                    <Button buttonConfig={addStepsButtonConfig} />
                                </StyledAddControllerContainer>
                                {
                                    stepField.map((field, index) => (
                                        <StyledAddedField key={index}>
                                            {index + 1}.
                                            <Input onChange={(e) => handleStepsChange(index, e)} margin={"5px 0 5px 0"} value={field.step}/>
                                            <StyledDeleteButton onClick={(e) => handleDeleteStepsField(e, index)}>
                                                <AiFillCloseCircle />
                                            </StyledDeleteButton>
                                        </StyledAddedField>
                                    ))
                                }
                            </StyledAddColumnArticle>
                            <StyledAddColumnArticle>
                                <StyledAddControllerContainer>
                                    <div>Expected Result: </div>
                                    <Button buttonConfig={addExpectedResultButtonConfig} />
                                </StyledAddControllerContainer>
                                {
                                    erField.map((field, index) => (
                                        <StyledAddedField key={index}>
                                            {index + 1}.
                                            <Input onChange={(e) => handleErChange(index, e)} margin={"5px 0 5px 0"} value={field.step}/>
                                            <StyledDeleteButton onClick={(e) => handleDeleteErField(e, index)}>
                                                <AiFillCloseCircle />
                                            </StyledDeleteButton>
                                        </StyledAddedField>
                                    ))
                                }
                            </StyledAddColumnArticle>
                        </StyledFieldsWrapper>
                        <Button buttonConfig={createTestCaseButtonConfig} />
                        {
                            createTestCaseStatus !== null ? renderStatus() : ""
                        }
                    </StyledCreateTestCaseForm>
                </LayoutWrapperWithHeader>
            </MainWrapper>
    )
}

export default CreateTestCasePage;