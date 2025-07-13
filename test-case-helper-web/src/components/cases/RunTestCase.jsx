import React, {useState} from 'react';

import styled from "styled-components";

import Button from "../ui/Button.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";

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
    align-items: flex-start;
    gap: 10px;
    height: 100%;
    padding: 5px;
    max-width: 300px;
    
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
    background-color: ${props => props.$backgroundColor ? props.$backgroundColor : ''};;
`;

const status = [
    {
        value: "PASSED",
        label: "PASSED",
        styles: {
            color: "black",
            backgroundColor: "green",
            borderRadius: "10px",
            padding: "5px",
        }
    },
    {
        value: "FAILED",
        label: "FAILED",
        styles: {
            color: "black",
            backgroundColor: "red",
            borderRadius: "10px",
            padding: "5px",
        }
    },
    {
        value: "BLOCKED",
        label: "BLOCKED",
        styles: {
            color: "black",
            backgroundColor: "crimson",
            borderRadius: "10px",
            padding: "5px",
        }
    },
    {
        value: "SKIPPED",
        label: "SKIPPED",
        styles: {
            color: "black",
            backgroundColor: "lightblue",
            borderRadius: "10px",
            padding: "5px",
        }
    },
    {
        value: "NOT_TESTING",
        label: "NOT_TESTING",
        styles: {
            color: "black",
            backgroundColor: "gray",
            borderRadius: "10px",
            padding: "5px",
        }
    },
]

const RunTestCase = ({runTestCase}) => {

    const [actualResult, setActualResult] = useState(null);
    const [comment, setComment] = useState(null);

    const renderSteps = (items, prefix) => {
        return items?.map((item, index) =>
            <StyledTestCaseStep key={`${prefix}-${index}`}>
                {`${index + 1}. ${item.step}`}
            </StyledTestCaseStep>
        )
    }

    const handleChangeActualResult = () => {

    }

    const changeButtonConfig = {
        buttonName: "+",
        maxHeight: "20px"
    }

    return (
        <StyledTestCaseWrapper key={runTestCase.testCase.id}>
            <StyledTestCase>
                <StyledTestCaseColumn>
                    <StyledTestCaseColumnTitle>ID</StyledTestCaseColumnTitle>
                    {runTestCase.testCase.id}
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
                        <Button buttonConfig={changeButtonConfig}/>
                    </StyledTestCaseExtraColumnTitle>
                    <p>Smth</p>
                </StyledTestCaseRunController>
                <StyledTestCaseRunController>
                    <StyledTestCaseColumnTitle>Status:</StyledTestCaseColumnTitle>
                    <CustomSelect options={status} />
                </StyledTestCaseRunController>
                <StyledTestCaseRunController>
                    <StyledTestCaseExtraColumnTitle>
                        Comment:
                        <Button buttonConfig={changeButtonConfig}/>
                    </StyledTestCaseExtraColumnTitle>
                    <p>Smth</p>
                </StyledTestCaseRunController>
            </StyledTestCase>
        </StyledTestCaseWrapper>
    );
};

export default RunTestCase;