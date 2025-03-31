import React, { useState } from 'react'

import Button from '../ui/Button';
import KebabMenu from '../ui/KebabMenu';
import Modal from '../ui/Modal';

import RequestService from '../../service/api/RequestService';
import CookieService from '../../service/cookie/CookieHandlerService';
import { useAuth } from '../../service/auth/AuthProvider';
import { Routes } from '../../constants/Route';

import styled from 'styled-components';
import { useNavigate } from 'react-router';

const StyledProjectContainer = styled.article`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin: 5px;
    border: 1px solid #8f8d8dad;
    border-radius: 5px;
    padding: 5px;
    min-height: 100%;
    min-width: 100%;
    text-align: center;
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100%;
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

const Project = ({project, onDelete, onUpdate}) => {

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
    const handleCloseDeleteModal = () => setDeleteModalIsOpen(false);

    const confirmButtonConfig = {
        buttonName: "Confirm",
        borderRadius: "5px",
        fontColor: "white",
        onClick: onDelete
    }

    const buttonConfig = {
        color: "white",
        backgroundColor: "lightblue",
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
            <KebabMenu config={kebabMenuConfig}/>
            <StyledTitleAttrContainer>Project: <StyledBoldTextSpan>{project.title}</StyledBoldTextSpan></StyledTitleAttrContainer>
            <StyledDescriptionAttrContainer>Description: <StyledBoldTextSpan>{project.description}</StyledBoldTextSpan></StyledDescriptionAttrContainer>
            <StyledButtonWrapper>
                <Button buttonConfig={buttonConfig} />
            </StyledButtonWrapper>
            <Modal isOpen={deleteModalIsOpen} closeModal={handleCloseDeleteModal}>
                <p>Confirm delete project?</p>
                <Button buttonConfig={confirmButtonConfig} />
            </Modal>
        </StyledProjectContainer>
        </>
    )
}

export default Project;