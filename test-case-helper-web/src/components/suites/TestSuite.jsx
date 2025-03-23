import React, { useState } from 'react'

import { usePreloading } from '../hooks/UsePreloading'
import styled from 'styled-components'

import Button from '../ui/Button';
import { useNavigate } from 'react-router';
import Project from '../projects/Project';

const StyledTestSuiteArticle = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    margin: 5px;
    border: 1px solid black;
    padding: 5px;
    min-height: 100%;
    min-width: 250px;
    text-align: center;
`;


const TestSuite = ({testSuite, loading, projectId}) => {

    const navigate = useNavigate();

    const handleOpenTestSuite = (e) => {
        const testSuiteId = e.currentTarget.parentElement.dataset.testsuiteid;
        
        navigate(`/projects/${projectId}/${testSuiteId}`);
    }

    const openTestSuiteButtonConfig = {
        buttonName: "Open test-suite",
        onClick: handleOpenTestSuite
    }

    const renderTestSuite = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        if (!loading) {
            return (
                <StyledTestSuiteArticle data-testsuiteid={testSuite.id}>
                    <h2>{testSuite.title}</h2>
                    <p>{testSuite.description}</p>
                    <span>{testSuite.tag}</span>
                    <Button buttonConfig={openTestSuiteButtonConfig}/>
                </StyledTestSuiteArticle>
            );
        }
    }

    return (
        renderTestSuite()
    )
}

export default TestSuite;