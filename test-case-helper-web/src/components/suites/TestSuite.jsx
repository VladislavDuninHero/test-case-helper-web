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
`;

const StyledBoldTextSpan = styled.span`
    font-weight: bold;
    text-align: start;
`;

const StyledTitleAttrContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    text-align: center;
`;

const StyledDescriptionAttrContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: center;
`;

const StyledTagAttrContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100%;
`;

const TestSuite = ({testSuite, loading, projectId, onUpdate, onDelete}) => {

    const {hasPermission, userData} = useAuth();
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenTestSuite = (e) => {
        const testSuiteId = e.currentTarget.parentElement.parentElement.dataset.testsuiteid;
        
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
                        Title: <StyledBoldTextSpan>{testSuite.title}</StyledBoldTextSpan>
                    </StyledTitleAttrContainer>
                    <StyledDescriptionAttrContainer>
                        Description: <StyledBoldTextSpan>{testSuite.description}</StyledBoldTextSpan>
                    </StyledDescriptionAttrContainer>
                    <StyledTagAttrContainer>
                        Tag: <StyledBoldTextSpan>{testSuite.tag}</StyledBoldTextSpan>
                    </StyledTagAttrContainer>
                    <StyledButtonWrapper>
                        <Button buttonConfig={openTestSuiteButtonConfig}/>
                    </StyledButtonWrapper>
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