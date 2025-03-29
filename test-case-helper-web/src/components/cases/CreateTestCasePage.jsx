import React, { useState } from 'react'

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

const StyledCreateTestCaseForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: 1px solid black;
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

    const {suiteId} = useParams();

    const [testCase, setTestCase] = useState({
        testSuiteId: suiteId
    });
    const [createTestCaseStatus, setCreateTestCaseStatus] = useState(null);
    const [response, setResponse] = useState({});
    const [testingDataField, setTestingDataField] = useState([]);
    const [preconditionField, setPreconditionField] = useState([]);
    const [stepField, setStepField] = useState([]);
    const [erField, setErField] = useState([]);

    const handleChange = (field) => (event) => {
        setTestCase({
            ...testCase,
            [field]: event.target.value
        })
    }

    const testCaseData = testingDataField.map(field => {return {step: field.value}});
    const precondition = preconditionField.map(field => {return {step: field.value}});
    const steps = stepField.map(field => {return {step: field.value}});
    const expectedResult = testingDataField.map(field => {return {step: field.value}});

    const createTestCaseData = {
        ...testCase,
        testCaseData,
        precondition,
        steps,
        expectedResult
    }
    
    const addTestingDataFields = () => {
        setTestingDataField([...testingDataField, {value: ""}])
    }

    const addPreconditionFields = () => {
        setPreconditionField([...preconditionField, {value: ""}])
    }

    const addStepsFields = () => {
        setStepField([...stepField, {value: ""}])
    }

    const addERFields = () => {
        setErField([...erField, {value: ""}])
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
        newTestingData[index].value = event.target.value;
        setTestingDataField(newTestingData);
    };
    const handlePreconditionChange = (index, event) => {
        const preconditions = [...preconditionField];
        preconditions[index].value = event.target.value;
        setPreconditionField(preconditions);
    };
    const handleStepsChange = (index, event) => {
        const steps = [...stepField];
        steps[index].value = event.target.value;
        setStepField(steps);
    };
    const handleErChange = (index, event) => {
        const er = [...erField];
        er[index].value = event.target.value;
        setErField(er);
    };

    const token = CookieService.getCookie("token");

    const clearState = () => {
        testCase.title = "";
        
        setTestingDataField([])
        setPreconditionField([]);
        setStepField([]);
        setErField([]);
    }

    const handleCreateTestCase = (e) => {
        e.preventDefault();

        RequestService.postAuthorizedRequest(Routes.CREATE_TEST_CASE_ROUTE, createTestCaseData, token)
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
        buttonName: "Create test-case",
        fontColor: "white",
        onClick: handleCreateTestCase
    }

    const addTestingDataButtonConfig = {
        buttonName: "+",
        maxHeight: "20px",
        marginLeft: "5px",
        fontColor: "white",
        onClick: handleAddTestingDataField
    }

    const addPreconditionButtonConfig = {
        buttonName: "+",
        maxHeight: "20px",
        marginLeft: "5px",
        fontColor: "white",
        onClick: handleAddPreconditionField
    }

    const addStepsButtonConfig = {
        buttonName: "+",
        maxHeight: "20px",
        marginLeft: "5px",
        fontColor: "white",
        onClick: handleAddStepsField
    }

    const addExpectedResultButtonConfig = {
        buttonName: "+",
        maxHeight: "20px",
        marginLeft: "5px",
        fontColor: "white",
        onClick: handleAddErField
    }

    const renderStatus = () => {
        return <Notification $status={createTestCaseStatus} />
    }

    const mainConfig = {
        mainContentPosition: "center"
    }

    return (
        <MainWrapper>
                <LayoutWrapperWithHeader config={mainConfig}>
                    <StyledCreateTestCaseForm>
                        <label>Create your test-case</label>
                        <StyledFieldsWrapper>
                            <Input placeholder={"Test-case title"} onChange={handleChange("title")}/>
                            <StyledAddColumnArticle>
                                <StyledAddControllerContainer>
                                    <div>Testing data: </div>
                                    <Button buttonConfig={addTestingDataButtonConfig} />
                                </StyledAddControllerContainer>
                                {
                                    testingDataField.map((field, index) => (
                                        <StyledAddedField key={index}>
                                            {index + 1}.
                                            <Input onChange={(e) => handleTestingDataChange(index, e)} margin={"5px 0 5px 0"}/>
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
                                            <Input onChange={(e) => handlePreconditionChange(index, e)} margin={"5px 0 5px 0"} />
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
                                            <Input onChange={(e) => handleStepsChange(index, e)} margin={"5px 0 5px 0"} />
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
                                            <Input onChange={(e) => handleErChange(index, e)} margin={"5px 0 5px 0"} />
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