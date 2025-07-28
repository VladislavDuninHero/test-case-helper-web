import React, {useState} from 'react';
import styled from "styled-components";
import {lightTheme} from "../theme/theme.js";
import Button from "../ui/Button.jsx";
import {AiFillCloseCircle, AiOutlineClose} from "react-icons/ai";
import Modal from "../ui/Modal.jsx";
import RequestService from "../../service/api/RequestService.js";
import {Routes} from "../../constants/Route.js";
import CookieService from "../../service/cookie/CookieHandlerService.js";
import Input from "../ui/Input.jsx";
import {handleError} from "../../service/error/ErrorHandler.jsx";
import {useError} from "../hooks/UseErrorHandler.jsx";
import {useNavigate} from "react-router";
import {useErrorBasic} from "../hooks/UseErrorBasic.jsx";
import Notification from "../notification/Notification.jsx";
import {useUserContext} from "../../service/context/UserProvider.jsx";

const StyledTeamArticle = styled.article`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin: 5px;
    border-radius: 5px;
    padding: 10px;
    min-height: 100%;
    min-width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    text-align: center;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    > * {
        min-width: 0;
    }
`;

const StyledTeamTitle = styled.div`
    display: flex;
    min-width: 100%;
    border-bottom: ${() => lightTheme.colors.borderColorLight};
    color: ${() => lightTheme.colors.defaultButtonColor};
    font-weight: bold;
    margin-bottom: 5px;
`;

const StyledTeammateWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    min-width: 100%;
    align-items: center;
    background-color: ${() => lightTheme.colors.componentWrapperBackgroundColor};
    border: ${() => lightTheme.colors.borderColorLight};
    padding: 5px;
`;

const StyledTeammateLogin = styled.div`
    display: flex;
    border-radius: 5px;
`;

const StyledTeamControllers = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 100%;
    gap: 5px;
`;

const StyledTeamBody = styled.div`
    min-width: 100%;
`;

const StyledModalMessageP = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
`;

const StyledAddTeammatesField = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledYouIndicator = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: ${() => lightTheme.colors.defaultButtonColor};
`;

const Team = ({team, updateUserTeams}) => {

    const {setError} = useError();
    const {filteredErrors, setErrorBasic} = useErrorBasic();
    const {login} = useUserContext();
    const navigate = useNavigate();

    const [openDeleteTeammateModalIsOpen, setOpenDeleteTeammateModalIsOpen] = useState(false);
    const [openDeleteTeamModalIsOpen, setOpenDeleteTeamModalIsOpen] = useState(false);
    const [openAddTeammateModalIsOpen, setOpenAddTeammateModalIsOpen] = useState(false);
    const [teammateId, setTeammateId] = useState(null);

    const [teammateData, setTeammateData] = useState({});

    const [deleteTeammateResponse, setDeleteTeammateResponse] = useState({});
    const [addTeammateResponse, setAddTeammateResponse] = useState({});

    const handleOpenDeleteTeammateModal = (e) => {
        setOpenDeleteTeammateModalIsOpen(!openDeleteTeammateModalIsOpen);
        setTeammateId(e.currentTarget.parentElement.dataset.teammateid)
    };
    const handleOpenDeleteTeamModal = () => setOpenDeleteTeamModalIsOpen(!openDeleteTeamModalIsOpen);
    const handleOpenAddTeammateModal = () => setOpenAddTeammateModalIsOpen(!openAddTeammateModalIsOpen);

    const token = CookieService.getCookie("token");

    const handleDeleteTeammate = () => {

        RequestService.deleteAuthorizedRequest(`${Routes.GET_TEAM_ROUTE}/${team.id}/teammates/${teammateId}/delete`, token)
            .then(res => {
                setDeleteTeammateResponse(res.data);

                updateUserTeams(prev => prev.map(currentTeam => currentTeam.id === team.id ? res.data : currentTeam));

                setOpenDeleteTeammateModalIsOpen(false);
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    setError(true);
                }

            });

        setTeammateId(null);
    }

    const handleChange = (field) => (event) => {
        setTeammateData({
            ...teammateData,
            [field]: event.target.value
        })
    }

    const handleAddTeammate = () => {
        RequestService.postAuthorizedRequest(`${Routes.GET_TEAM_ROUTE}/${team.id}/teammates/add/ldap`, teammateData, token)
            .then(res => {
                setAddTeammateResponse(res.data);

                updateUserTeams(prev => prev.map(currentTeam => currentTeam.id === team.id ? res.data : currentTeam));

                setOpenAddTeammateModalIsOpen(!openAddTeammateModalIsOpen);
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    setError(true);
                }

                setErrorBasic(err.response?.data?.errors);
            })
            .finally(() => {
                setTeammateData({});
            });
    }

    const handleDeleteTeam = () => {
        RequestService.deleteAuthorizedRequest(`${Routes.GET_TEAM_ROUTE}/${team.id}/delete`, token)
            .then(res => {
                updateUserTeams(prev => prev.filter(currentTeam => currentTeam.id !== team.id));

                handleOpenDeleteTeamModal();
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    setError(true);
                }

                setErrorBasic(err.response.data?.errors);
            }).finally(() => {

        });
    }

    const teammateDeleteOpenModalButtonConfig = {
        buttonName: <AiOutlineClose/>,
        borderRadius: "5px",
        fontSize: "13px",
        fontColor: "white",
        backgroundColor: "red",
        backGroundHoverColor: "none",
        border: "none",
        onClick: handleOpenDeleteTeammateModal
    }

    const teamDeleteOpenModalButtonConfig = {
        buttonName: "Delete team",
        minWidth: "50%",
        borderRadius: "5px",
        fontColor: "white",
        backgroundColor: "red",
        backGroundHoverColor: "none",
        border: "none",
        onClick: handleOpenDeleteTeamModal
    }

    const openAddTeammateModalButtonConfig = {
        buttonName: "Add teammate +",
        minWidth: "20%",
        borderRadius: "5px",
        fontColor: "white",
        backGroundHoverColor: "none",
        border: "none",
        onClick: handleOpenAddTeammateModal
    }

    const teammateDeleteButtonConfig = {
        buttonName: "Confirm",
        borderRadius: "5px",
        fontColor: "white",
        backgroundColor: "green",
        backGroundHoverColor: "none",
        border: "none",
        onClick: handleDeleteTeammate
    }

    const teamDeleteButtonConfig = {
        buttonName: "Confirm",
        borderRadius: "5px",
        fontColor: "white",
        backgroundColor: "green",
        backGroundHoverColor: "none",
        border: "none",
        onClick: handleDeleteTeam
    }

    const addTeammateButtonConfig = {
        buttonName: "Confirm",
        borderRadius: "5px",
        fontColor: "white",
        backgroundColor: "green",
        backGroundHoverColor: "none",
        border: "none",
        onClick: handleAddTeammate
    }

    return (
        <StyledTeamArticle>
            <StyledTeamBody>
                <StyledTeamTitle>{team.teamName}</StyledTeamTitle>
                {team.teammates.length > 0 ?
                    team.teammates.map(teammate => (
                        <StyledTeammateWrapper key={teammate.id} data-teammateid={teammate.id}>
                            <StyledTeammateLogin>{teammate.login}</StyledTeammateLogin>
                            {teammate.login !== login
                                ? <Button buttonConfig={teammateDeleteOpenModalButtonConfig}/>
                                : <StyledYouIndicator>You</StyledYouIndicator>
                            }
                        </StyledTeammateWrapper>
                    ))
                    : <StyledTeammateLogin>teammates not found</StyledTeammateLogin>
                }
            </StyledTeamBody>
            <StyledTeamControllers>
                <Button buttonConfig={openAddTeammateModalButtonConfig}/>
                <Button buttonConfig={teamDeleteOpenModalButtonConfig}/>
            </StyledTeamControllers>
            <Modal isOpen={openDeleteTeammateModalIsOpen} closeModal={handleOpenDeleteTeammateModal}>
                <StyledModalMessageP>Confirm delete teammate from team?</StyledModalMessageP>
                <Button buttonConfig={teammateDeleteButtonConfig}/>
            </Modal>
            <Modal isOpen={openDeleteTeamModalIsOpen} closeModal={handleOpenDeleteTeamModal}>
                <StyledModalMessageP>Confirm delete team?</StyledModalMessageP>
                <Button buttonConfig={teamDeleteButtonConfig}/>
            </Modal>
            <Modal isOpen={openAddTeammateModalIsOpen} closeModal={handleOpenAddTeammateModal}>
                <StyledModalMessageP>Add new teammate:</StyledModalMessageP>
                <Input placeholder={"Teammate LDAP"} margin={"0 0 10px 0"} onChange={handleChange("teammateLdap")}/>
                <Button buttonConfig={addTeammateButtonConfig}/>
                {filteredErrors.length > 0 &&
                    filteredErrors.map((err, index) => (
                        <Notification $status={400} key={`${err.errorMessage}-${index}`}>
                            <span>{err}</span>
                        </Notification>
                    ))
                }
            </Modal>
        </StyledTeamArticle>
    );
};

export default Team;