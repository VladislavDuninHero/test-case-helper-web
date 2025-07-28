import React, {useState} from 'react';
import LayoutWrapperWithHeader from "../global-wrappers/LayoutWrapperWithHeader.jsx";
import MainWrapper from "../global-wrappers/MainWrapper.jsx";
import styled from "styled-components";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import RequestService from "../../service/api/RequestService.js";
import {Routes} from "../../constants/Route.js";
import CookieService from "../../service/cookie/CookieHandlerService.js";
import Notification from "../notification/Notification.jsx";
import {useNavigate} from "react-router";

const StyledCreateTeamForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #8f8d8dad;
    padding: 5px;
`;

const CreateTeamPage = () => {

    const [teamData, setTeamData] = useState({});
    const [createTeamStatus, setCreateTeamStatus] = useState(null);
    const navigate = useNavigate();

    const mainConfig = {
        mainContentPosition: "center"
    }

    const token = CookieService.getCookie("token");

    const handleChange = (field) => (event) => {
        setTeamData({
            ...teamData,
            [field]: event.target.value
        })
    }

    const handleCreateTeam = (e) => {
        e.preventDefault();

        RequestService.postAuthorizedRequest(Routes.CREATE_TEAM_ROUTE, teamData, token)
            .then(res => {
                setTeamData(res.data);
                setCreateTeamStatus(res.status);

                navigate(`/team/teammates`);
            })
            .catch(err => {
                setCreateTeamStatus(err.status)
            });
    }

    const createTeamButtonConfig = {
        buttonName: "Create team",
        fontColor: "white",
        onClick: handleCreateTeam
    }

    return (
        <MainWrapper>
            <LayoutWrapperWithHeader config={mainConfig}>
                <StyledCreateTeamForm>
                    <Input placeholder={"Your team name"} onChange={handleChange('teamName')}/>
                    <Button buttonConfig={createTeamButtonConfig} />
                    {
                        createTeamStatus !== null ? <Notification $status={createTeamStatus} /> : ""
                    }
                </StyledCreateTeamForm>
            </LayoutWrapperWithHeader>
        </MainWrapper>
    );
};

export default CreateTeamPage;