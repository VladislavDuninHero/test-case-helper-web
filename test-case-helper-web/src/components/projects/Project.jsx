import React from 'react'
import Button from '../ui/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const StyledProjectContainer = styled.article`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-around;
    margin: 5px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    min-height: 100%;
    min-width: 100%;
    text-align: center;
`;

const Project = ({project}) => {

    const navigate = useNavigate();

    const onClickOpenProject = (event) => {
        const projectId = event.currentTarget.parentElement.dataset.projectid;
        
        navigate(`/projects/${projectId}`);
    }

    const buttonConfig = {
        color: "white",
        backgroundColor: "lightblue",
        minHeight: "5px",
        minWidth: "10px",
        borderRadius: "5px",
        buttonName: "Open project",
        onClick: onClickOpenProject
    }
   
    return (
        <>
        <StyledProjectContainer data-projectid={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <Button buttonConfig={buttonConfig} />
        </StyledProjectContainer>
        </>
    )
}

export default Project;