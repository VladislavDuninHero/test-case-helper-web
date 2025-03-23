import React, { useState } from 'react'

import styled from 'styled-components';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const StyledTestCaseContainer = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    min-width: 100%;
    max-width: 100%;
`;

const StyledStepContainer = styled.p`
    display: flex;
`;

const TestCase = ({testCase}) => {
    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const testCaseData = testCase.testCaseData;
    const preconditions = testCase.preconditions;
    const steps = testCase.steps;
    const expectedResult = testCase.expectedResult;

    const handleOpenTestCase = (e) => {
        setModalIsOpen(true);
    }

    const handleCloseTestCase = () => setModalIsOpen(false);

    const buttonConfig = {
        buttonName: "Open test-case",
        onClick: handleOpenTestCase
    };

    return (
        <StyledTestCaseContainer>
            <h3>ID: {testCase.id}</h3>
            <h3>Title: {testCase.title}</h3>
            <Button buttonConfig={buttonConfig}/>
            <Modal isOpen={modalIsOpen} closeModal={handleCloseTestCase}>
                <h3>Test data:</h3>
                {
                    testCaseData.map((data, index) => <StyledStepContainer key={index}>{index + 1}. {data.step}</StyledStepContainer>)
                }
                <h3>Preconditions:</h3>
                {   
                    preconditions.map((precondition, index) => <StyledStepContainer key={index}>{index + 1}. {precondition.step}</StyledStepContainer>)
                }
                <h3>Steps:</h3>
                {
                    steps.map((steps, index) => <StyledStepContainer key={index}>{index + 1}. {steps.step}</StyledStepContainer>)
                }
                <h3>Expected result:</h3>
                {
                    expectedResult.map((er, index) => <StyledStepContainer key={index}>{index + 1}. {er.step}</StyledStepContainer>)
                }
            </Modal>
        </StyledTestCaseContainer>
    )
}

export default TestCase;