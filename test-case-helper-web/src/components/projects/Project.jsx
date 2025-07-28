import React, { useState } from 'react'

import Button from '../ui/Button';
import KebabMenu from '../ui/KebabMenu';
import Modal from '../ui/Modal';

import { useAuth } from '../../service/auth/AuthProvider';

import styled from 'styled-components';
import { useNavigate } from 'react-router';
import Notification from "../notification/Notification.jsx";

const StyledProjectContainer = styled.article`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    border-radius: 5px;
    padding: 10px;
    min-height: 100%;
    min-width: 100%;
    text-align: center;
    background-color: #ffffff;
    box-shadow: ${props => props.theme.effects.boxShadow};
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    margin-top: 5px;
`;

const StyledBoldTextSpan = styled.span`
    font-weight: bold;
    text-align: start;
`;

const StyledTextSpan = styled.span`
    margin-right: 5px;
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

const StyledTeamAttrContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Project = ({project, onDelete, onUpdate, onDeleteResponse, deleteProjectIsLoading}) => {

    const navigate = useNavigate();
    const [projectActionStatus, setProjectActionStatus] = useState(null);
    const {hasPermission, userData} = useAuth();
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    const onClickOpenProject = (event) => {
        const projectId = event.currentTarget.parentElement.parentElement.dataset.projectid;
        
        navigate(`/projects/${projectId}`);
    }

    const handleOpenDeleteModal = () => {
        setDeleteModalIsOpen(true);
    }
    const handleCloseDeleteModal = () => {
        setDeleteModalIsOpen(false);
        onDeleteResponse.errors = [];
        onDeleteResponse.status = null;
    }

    const confirmButtonConfig = {
        buttonName: "Confirm",
        borderRadius: "5px",
        fontColor: "white",
        disabled: deleteProjectIsLoading !== false,
        onClick: onDelete
    }

    const buttonConfig = {
        color: "white",
        minHeight: "5px",
        borderRadius: "5px",
        buttonName: "Open project",
        fontColor: "white",
        minWidth: "100%",
        onClick: onClickOpenProject
    }

    const kebabMenuConfig = {
        items: [
            {label: "Update", action: onUpdate, hasPermission: hasPermission("UPDATE_PROJECT")},
            {label: "Delete", action: handleOpenDeleteModal, hasPermission: hasPermission("DELETE_PROJECT")}
        ]
    };
    
    return (
        <>
        <StyledProjectContainer data-projectid={project.id}>
            <KebabMenu config={kebabMenuConfig} />
            <StyledTitleAttrContainer>
                <StyledTextSpan>Project:</StyledTextSpan>
                <StyledBoldTextSpan>{project.title}</StyledBoldTextSpan>
            </StyledTitleAttrContainer>
            <StyledTeamAttrContainer>
                <StyledTextSpan>Team:</StyledTextSpan>
                <StyledBoldTextSpan>{project.teamName}</StyledBoldTextSpan>
            </StyledTeamAttrContainer>
            <StyledDescriptionAttrContainer>
                <StyledTextSpan>Description:</StyledTextSpan>
                <StyledBoldTextSpan>{project.description}</StyledBoldTextSpan>
            </StyledDescriptionAttrContainer>
            <StyledButtonWrapper>
                <Button buttonConfig={buttonConfig} />
            </StyledButtonWrapper>
            <Modal isOpen={deleteModalIsOpen} closeModal={handleCloseDeleteModal}>
                <p>Confirm delete project?</p>
                <Button buttonConfig={confirmButtonConfig} />
                { onDeleteResponse.errors?.length > 0
                    ? onDeleteResponse.errors.map((err, index) => (
                        <Notification $status={400} key={`${err.errorMessage}-${index}`}>
                            <span>{err.errorMessage}:</span>
                            {err.activeSessions?.map((active, index) => (
                                    <div key={`${active.testSuiteTitle}-${index}`}>{active.testSuiteTitle}</div>
                                )
                            )
                            }
                        </Notification>
                    ))
                    : ""
                }
            </Modal>
        </StyledProjectContainer>
        </>
    )
}

export default Project;