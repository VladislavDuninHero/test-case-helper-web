import React, { useState } from 'react'

import { useAuth } from '../../service/auth/AuthProvider';

import styled from 'styled-components';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import KebabMenu from '../ui/KebabMenu';

const StyledTestCaseContainer = styled.article`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    border-radius: 5px;
    padding: 5px;
    min-width: 100%;
    max-width: 100%;
    background-color: #ffffff;
`;

const StyledStepContainer = styled.p`
    display: flex;
`;

const StyledTestCaseInfoInModal = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-bottom: 1px solid #8f8d8dad;
    margin-bottom: 10px;
`;

const TestCase = ({testCase, onDelete, onUpdate}) => {
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const {hasPermission, userData} = useAuth(); 
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

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
        borderRadius: "5px",
        fontColor: "white",
        onClick: handleOpenTestCase
    };

    const handleOpenDeleteModal = () => {
        setDeleteModalIsOpen(true);
    }
    const handleCloseDeleteModal = () => setDeleteModalIsOpen(false);

    const confirmButtonConfig = {
        buttonName: "Confirm",
        borderRadius: "5px",
        fontColor: "white",
        onClick: onDelete
    }

    const kebabMenuConfig = {
        items: [
            {label: "Update", action: onUpdate, hasPermission: hasPermission("UPDATE_TEST_CASES")},
            {label: "Delete", action: handleOpenDeleteModal, hasPermission: hasPermission("DELETE_TEST_CASES")}
        ]
    };

    return (
        <StyledTestCaseContainer>
            <h3>ID: {testCase.id}</h3>
            <h3>Title: {testCase.title}</h3>
            <Button buttonConfig={buttonConfig}/>
            <KebabMenu config={kebabMenuConfig} />
            <Modal isOpen={modalIsOpen} closeModal={handleCloseTestCase}>
                <StyledTestCaseInfoInModal>
                    <h3>ID: {testCase.id}</h3>
                    <h3>Title: {testCase.title}</h3>
                </StyledTestCaseInfoInModal>
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
            <Modal isOpen={deleteModalIsOpen} closeModal={handleCloseDeleteModal}>
                <p>Confirm delete test-case?</p>
                <Button buttonConfig={confirmButtonConfig} />
            </Modal>
        </StyledTestCaseContainer>
    )
}

export default TestCase;