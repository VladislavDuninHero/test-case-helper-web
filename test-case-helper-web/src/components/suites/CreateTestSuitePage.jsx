import React, { useState } from 'react'

import MainWrapper from '../global-wrappers/MainWrapper';
import LayoutWrapperWithHeader from '../global-wrappers/LayoutWrapperWithHeader';
import Input from '../ui/Input';
import Button from '../ui/Button';
import DropdownMenu from '../ui/DropDownMenu';
import Notification from '../notification/Notification';

import RequestService from '../../service/api/RequestService';
import CookieService from '../../service/cookie/CookieHandlerService';
import { Routes } from '../../constants/Route';

import styled from 'styled-components';
import { useParams } from 'react-router';

const StyledCreateTestSuiteForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    padding: 5px;
`;

const StyledTextArea = styled.textarea`
    min-width: 100%;
    padding: 5px;
    min-width: 300px;
    min-height: 200px;
    max-width: 500px;
    max-height: 200px;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const StyledSelectTagContainer = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledLabel = styled.label`
    margin-right: 5px;
`;

const CreateTestSuitePage = () => {

    const {projectId} = useParams();
    const [testSuiteData, setTestSuiteData] = useState({
        projectId: projectId
    });
    const [response, setResponse] = useState({});
    const [createTestSuiteRequestStatus, setCreateTestSuiteRequestStatus] = useState(null);

    const handleChange = (field) => (event) => {
        setTestSuiteData({
            ...testSuiteData,
            [field]: event.target.value
        })
    }

    const token = CookieService.getCookie("token");

    const handleCreateTestSuite = (e) => {
        e.preventDefault();

        RequestService.postAuthorizedRequest(Routes.CREATE_TEST_SUITE_ROUTE, testSuiteData, token)
                    .then(res => {
                        setCreateTestSuiteRequestStatus(res.status);

                        setResponse(res.data);
                    })
                    .catch(err => setCreateTestSuiteRequestStatus(err.status));
    }

    const createTestSuiteButtonConfig = {
        buttonName: "Create test-suite",
        onClick: handleCreateTestSuite
    }

    const selectTagConfig = {
        borderRadius: "5px"
    }

    const mainConfig = {
        mainContentPosition: "center"
    }

    return (
        <MainWrapper>
            <LayoutWrapperWithHeader config={mainConfig}>
                <StyledCreateTestSuiteForm>
                    <Input placeholder={"Title"} onChange={handleChange("title")}/>
                    <StyledSelectTagContainer>
                        <StyledLabel>Tag:</StyledLabel>
                        <DropdownMenu selectConfig={selectTagConfig} onChange={handleChange("tag")}>
                            <option>SMOKE</option>
                            <option>CRITICAL PATH</option>
                        </DropdownMenu>
                    </StyledSelectTagContainer>
                    <StyledTextArea placeholder="Description" onChange={handleChange("description")}/>
                    <Button buttonConfig={createTestSuiteButtonConfig}/>
                    {
                        createTestSuiteRequestStatus !== null ? <Notification $status={createTestSuiteRequestStatus} /> : ""
                    }
                </StyledCreateTestSuiteForm>
            </LayoutWrapperWithHeader>
        </MainWrapper>
    )
}

export default CreateTestSuitePage;