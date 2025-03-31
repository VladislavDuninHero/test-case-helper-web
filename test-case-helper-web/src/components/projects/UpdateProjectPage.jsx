import React, { useEffect, useState } from 'react'

import RequestService from '../../service/api/RequestService';
import { Routes } from '../../constants/Route';

import MainWrapper from '../global-wrappers/MainWrapper';
import LayoutWrapperWithHeader from '../global-wrappers/LayoutWrapperWithHeader';

import styled from 'styled-components';
import { useParams } from 'react-router';
import Input from '../ui/Input';
import Button from '../ui/Button';
import CookieService from '../../service/cookie/CookieHandlerService';
import Notification from '../notification/Notification';

const StyledUpdateProjectForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: 1px solid #8f8d8dad;
    border-radius: 5px;
`;

const StyledDescriptionTextArea = styled.textarea`
    min-width: 100%;
    padding: 5px;
    min-width: 300px;
    min-height: 200px;
    max-width: 500px;
    max-height: 200px;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const UpdateProjectPage = () => {

    const {projectId} = useParams();

    const [updatedProjectData, setUpdatedProjectData] = useState({
        title: "",
        description: ""
    });
    const [responseAfterUpdate, setResponseAfterUpdate] = useState({});
    const [projectActionStatus, setProjectActionStatus] = useState(null);
    const [defaultRequestStatus, setDefaultRequestStatus] = useState(null);
    
    const token = CookieService.getCookie("token");

    useEffect(() => {
        RequestService.getAuthorizedRequest(`${Routes.PROJECTS_ROUTE}/${projectId}`, token)
            .then(res => {
                setUpdatedProjectData(res.data);
                setDefaultRequestStatus(res.status);
            })
            .catch(err => {
                setDefaultRequestStatus(err.status);
            });
    }, []);

    const updateProject = (e) => {
        e.preventDefault();

        RequestService.putAuthorizedRequest(`${Routes.PROJECTS_ROUTE}/${projectId}/update`, updatedProjectData, token)
            .then(res => {
                setResponseAfterDeleteProject(res.data);
                setProjectActionStatus(res.status);
            })
            .catch(err => {
                setProjectActionStatus(err.status);
            });
    }

    const handleChange = (field) => (event) => {
        setUpdatedProjectData({
            ...updatedProjectData,
            [field]: event.target.value
        });
    }

    const mainContentPositionConfig = {
        mainContentPosition: "center"
    }

    const updateProjectButtonConfig = {
        buttonName: "Update",
        fontColor: "white",
        onClick: updateProject
    }

    const renderStatus = () => {
        return <Notification $status={projectActionStatus} />
    }

    return (
        <MainWrapper>
            <LayoutWrapperWithHeader config={mainContentPositionConfig}>
                <StyledUpdateProjectForm>
                    <label>Update your project</label>
                    <Input value={updatedProjectData.title} onChange={handleChange("title")} placeholder={"Project title"}/>
                    <StyledDescriptionTextArea value={updatedProjectData.description} onChange={handleChange("description")} placeholder={"Project description"} />
                    <Button buttonConfig={updateProjectButtonConfig} />
                    {
                        projectActionStatus !== null ? renderStatus() : ""
                    }
                </StyledUpdateProjectForm>
            </LayoutWrapperWithHeader>
        </MainWrapper>
    )
}

export default UpdateProjectPage;