import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import MainWrapper from '../global-wrappers/MainWrapper';
import LayoutWrapperWithHeader from '../global-wrappers/LayoutWrapperWithHeader'
import Input from '../ui/Input';
import Button from '../ui/Button';
import Notification from '../notification/Notification';

import RequestService from '../../service/api/RequestService';
import CookieService from '../../service/cookie/CookieHandlerService';
import { Routes } from '../../constants/Route';
import { Navigate } from 'react-router';

const StyledCreateProjectForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
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

const CreateProjectPage = () => {

    const [projectData, setProjectData] = useState({});
    const [response, setResponse] = useState({});
    const [createProjectRequestStatus, setCreateProjectRequestStatus] = useState(null);

    const token = CookieService.getCookie("token");

    const handleChange = (field) => (event) => {
        setProjectData({
            ...projectData,
            [field]: event.target.value
        })
    }

    const createProjectPageConfig = {
        mainContentPosition: "center",
    }

    const createProject = (event) => {
        event.preventDefault();
        
        RequestService.postAuthorizedRequest(
            Routes.CREATE_PROJECT_ROUTE,
            projectData,
            token
        ).then(res => {
            setResponse(res.data);
        })
        .catch(err => setCreateProjectRequestStatus(err.status));
    }

    if (createProjectRequestStatus < 300 && createProjectRequestStatus !== null) {
        return <Navigate to={"/projects"} />
    }

    const createProjectButtonConfig = {
        buttonName: "Create project",
        onClick: createProject
    }

    const renderStatus = (createProjectStatus) => {
        if (createProjectStatus >= 300 && createProjectRequestStatus !== null) {
            return <Notification status={createProjectStatus}/>
        }
        
        if (createProjectRequestStatus !== null < 300 && createProjectRequestStatus !== null)
        return <Notification status={createProjectStatus}/>
    }

    return (
            <MainWrapper>
                <LayoutWrapperWithHeader config={createProjectPageConfig}>
                    <StyledCreateProjectForm>
                        <label>Create your project</label>
                        <Input placeholder={"Project title"} onChange={handleChange("title")}/>
                        <StyledTextArea placeholder='Project description' onChange={handleChange("description")} />
                        <Button buttonConfig={createProjectButtonConfig} />
                        {renderStatus(createProjectRequestStatus)}
                    </StyledCreateProjectForm>
                </LayoutWrapperWithHeader>
            </MainWrapper>
    )
}

export default CreateProjectPage;