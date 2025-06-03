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
import Loader from '../ui/Loader.jsx';

import { useNavigate } from 'react-router';

const StyledMainGrid = styled.section`
    min-width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 0.2fr));
    gap: 10px;
    align-items: center;
    justify-items: stretch;
    margin-top: 30px;
    border-radius: 5px;
`;

const StyledButtonControllerContainer = styled.section`
    display: flex;
    justify-content: stretch;
    align-items: center;
    min-width: 100%;
`;

const StyledProjectNotFoundArticle = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProjectsPage = () => {
    
    const [projects, setProjects] = useState([]);
    const [actionDeleteStatus, setActionDeleteStatus] = useState(null);
    const [responseAfterDeleteProject, setResponseAfterDeleteProject] = useState({});
    const [projectsLoading, setProjectLoading] = useState(true);
    const {setError} = useError();
    const navigate = useNavigate();

    const handleCreateProject = () => {
        return navigate("/projects/create");
    }

    const createProjectButtonConfig = {
        buttonName: "Create project +",
        onClick: handleCreateProject,
        fontColor: "white",
        fontSize: "15px",
        padding: "8px"
    }

    const token = CookieService.getCookie("token");

    useEffect(() => {
        RequestService.getAuthorizedRequest(Routes.PROJECTS_ROUTE, token)
            .then(res => {
                setProjects(res.data);
                setProjectLoading(false)
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    const deleteProject = (project) => {
            
        RequestService.deleteAuthorizedRequest(`${Routes.PROJECTS_ROUTE}/${project.id}/delete`, token)
            .then(res => {
                setResponseAfterDeleteProject(res.data);
                setActionDeleteStatus(res.status);
                setProjects(projects.filter(currentProject => currentProject.id !== project.id));
            })
            .catch(err => {
                setActionDeleteStatus(err.status)
            });
                
    }

    const navigateToUpdateProjectPage = (project) => {
        navigate(`${Routes.MAIN_PAGE_ROUTE}/${project.id}/update`);
    }

    const mainConfig = {
        border: "none",
        alignItems: "stretch"
    }
    
    return (
        <>
            <MainWrapper>
                <LayoutWrapperWithHeader config={mainConfig}>
                    <StyledButtonControllerContainer>
                        <Button buttonConfig={createProjectButtonConfig} />
                    </StyledButtonControllerContainer>
                    { projectsLoading ? <Loader /> :                   
                        projects.length > 0 
                        ? <StyledMainGrid>
                            {
                                projects.map((project) => 
                                    <Project 
                                        key={project.id} 
                                        project={project} 
                                        onDelete={() => deleteProject(project)}
                                        onUpdate={() => navigateToUpdateProjectPage(project)}
                                    />
                                )
                            }
                        </StyledMainGrid>
                        : <StyledProjectNotFoundArticle>Projects not found</StyledProjectNotFoundArticle>
                    }
                </LayoutWrapperWithHeader>
            </MainWrapper>
        </>
    )
}

export default ProjectsPage