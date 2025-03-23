import React, { useEffect, useState } from 'react'

import MainWrapper from '../global-wrappers/MainWrapper.jsx'
import Project from './Project.jsx';

import CookieService from '../../service/cookie/CookieHandlerService.js';
import RequestService from '../../service/api/RequestService.js';
import { Routes } from '../../constants/Route.js';
import { useError } from '../hooks/UseErrorHandler.jsx';
import LayoutWrapperWithHeader from '../global-wrappers/LayoutWrapperWithHeader.jsx';
import styled from 'styled-components';
import Button from '../ui/Button.jsx';
import { Navigate, useNavigate } from 'react-router';

const StyledMainGrid = styled.section`
    min-width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 0.2fr));
    gap: 10px;
    align-items: center;
    justify-items: center;
    margin: 30px 5px 5px 5px;
    border: 1px solid black;
`;

const StyledButtonControllerContainer = styled.section`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 100%;
`;

const ProjectsPage = () => {
    
    const [projects, setProjects] = useState([]);
    const {setError} = useError();
    const navigate = useNavigate();

    const handleCreateProject = () => {
        return navigate("/projects/create");
    }

    const createProjectButtonConfig = {
        buttonName: "Create project",
        onClick: handleCreateProject
    }

    const token = CookieService.getCookie("token");

    useEffect(() => {
        RequestService.getAuthorizedRequest(Routes.PROJECTS_ROUTE, token)
            .then(res => {
                setProjects(res.data);
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    return (
        <>
            <MainWrapper>
                <LayoutWrapperWithHeader>
                    <StyledButtonControllerContainer>
                        <Button buttonConfig={createProjectButtonConfig} />
                    </StyledButtonControllerContainer>
                    <StyledMainGrid>
                        {
                            projects.length > 0 
                            ? projects.map((project) => <Project key={project.id} project={project} />)
                            : <div>Projects not found</div>
                        }
                    </StyledMainGrid>
                </LayoutWrapperWithHeader>
            </MainWrapper>
        </>
    )
}

export default ProjectsPage