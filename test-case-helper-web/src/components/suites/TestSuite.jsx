import React, { useState } from 'react'

import styled from 'styled-components'

import Button from '../ui/Button';
import KebabMenu from '../ui/KebabMenu';
import Modal from '../ui/Modal';

import { useNavigate } from 'react-router';

import { useAuth } from '../../service/auth/AuthProvider';

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
    flex-shrink: 0;
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
    justify-content: center;
    min-width: 100%;
`;

const StyledBottomElementWrapper = styled.article`
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 100%;
`;

const TestSuite = ({testSuite, loading, projectId, deleteTestSuiteIsLoading, onUpdate, onDelete}) => {

    const {hasPermission, userData} = useAuth();
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenTestSuite = (e) => {
        const testSuiteId = e.currentTarget.parentElement.parentElement.parentElement.dataset.testsuiteid;
        
        navigate(`/projects/${projectId}/${testSuiteId}`);
    }

    const openTestSuiteButtonConfig = {
        buttonName: "Open test-suite",
        borderRadius: "5px",
        fontColor: "white",
        minWidth: "100%",
        onClick: handleOpenTestSuite
    }

    const handleOpenDeleteModal = () => {
        setDeleteModalIsOpen(true);
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

    const renderTestSuite = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        if (!loading) {
            return (
                <StyledTestSuiteArticle data-testsuiteid={testSuite.id}>
                    <KebabMenu config={kebabMenuConfig} />
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
                        </StyledButtonWrapper>
                    </StyledBottomElementWrapper>
                    <Modal isOpen={deleteModalIsOpen} closeModal={handleCloseDeleteModal}>
                        <p>Confirm delete test-suite?</p>
                        <Button buttonConfig={confirmButtonConfig} />
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