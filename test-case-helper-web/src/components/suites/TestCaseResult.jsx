import React from 'react';
import styled from "styled-components";
import StatusFactory from "../../service/util/StatusFactory.js";

const StyledTestCaseResultWrapper = styled.article`
    display: flex;
    justify-content: space-between;
    min-width: 100%;
    border-top: 1px solid #8f8d8dad;
    background-color: rgba(68 123 186 / 10%);
`;

const StyledTestCaseResult = styled.div`
    display: flex;
    justify-content: ${props => props.$justifyContent || 'center'};
    align-items: flex-start;
    word-wrap: break-word;
    max-width: 600px;
    min-width: ${props => props.$minWidth || '150px'};
    margin-right: ${props => props.$marginRight || '0'};
    padding: ${props => props.$padding || '5px'};
    border-left: ${props => props.$borderLeft && '1px solid #8f8d8dad'};
    color: ${props => props.$color || 'black'}
`;

const StyledTestCaseTitleSpan = styled.span`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 100%;
`;

const TestCaseResult = ({testSuiteRunSessionResult}) => {

    const status = StatusFactory.getStatus(testSuiteRunSessionResult.status);
    
    return (
        <StyledTestCaseResultWrapper>
            <StyledTestCaseResult $justifyContent={"flex-start"} $minWidth={"400px"}>
                <StyledTestCaseTitleSpan>{testSuiteRunSessionResult.testCaseTitle}</StyledTestCaseTitleSpan>
            </StyledTestCaseResult>
            <StyledTestCaseResult $borderLeft={true} $color={status[1]}>{status[0]}</StyledTestCaseResult>
        </StyledTestCaseResultWrapper>
    );
};

export default TestCaseResult;