import React, { useState } from 'react'

import styled from 'styled-components'

import Button from '../ui/Button';
import { useNavigate } from 'react-router';

const StyledTestSuiteArticle = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin: 5px;
    border: 1px solid #8f8d8dad;
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
    align-items: center;
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

const TestSuite = ({testSuite, loading, projectId}) => {

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

    const renderTestSuite = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        if (!loading) {
            return (
                <StyledTestSuiteArticle data-testsuiteid={testSuite.id}>
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
                </StyledTestSuiteArticle>
            );
        }
    }

    return (
        renderTestSuite()
    )
}

export default TestSuite;