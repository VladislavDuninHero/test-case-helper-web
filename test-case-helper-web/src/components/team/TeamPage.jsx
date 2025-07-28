import React, {useEffect, useState} from 'react';
import LayoutWrapperWithHeader from "../global-wrappers/LayoutWrapperWithHeader.jsx";
import MainWrapper from "../global-wrappers/MainWrapper.jsx";
import RequestService from "../../service/api/RequestService.js";
import {Routes} from "../../constants/Route.js";
import {useUserContext} from "../../service/context/UserProvider.jsx";
import CookieService from "../../service/cookie/CookieHandlerService.js";
import {handleError} from "../../service/error/ErrorHandler.jsx";
import {useNavigate} from "react-router";
import {useError} from "../hooks/UseErrorHandler.jsx";
import styled from "styled-components";
import Team from "./Team.jsx";

const StyledGridSection = styled.section`
    min-width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 10px;
    align-items: center;
    justify-items: center;
    margin-top: 30px;
    border-radius: 5px;
    box-sizing: border-box;
    max-width: 100%;
`;

const TeamPage = () => {

    const {teams} = useUserContext();
    const [userTeams, setUserTeams] = useState([]);
    const navigate = useNavigate();
    const {setError} = useError();

    const [openDeleteTeammateModal, setOpenDeleteTeammateModal] = useState(false);
    const [openDeleteTeamModal, setOpenDeleteTeamModal] = useState(false);

    const mainConfig = {
        mainContentPosition: "flex-start"
    }

    const token = CookieService.getCookie("token");

    const getTeamsIds = teams.map(team => team.teamId) || [];
    const createTeamRequests = () => {
        return getTeamsIds.map(teamId => RequestService.getAuthorizedRequest(`${Routes.GET_TEAM_ROUTE}/${teamId}`, token));
    }

    useEffect(() => {
        const requests = createTeamRequests();

        Promise.allSettled(requests)
            .then(teams => {
                setUserTeams(teams.map(team => team.value.data));
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    setError(true);
                }

                handleError(err, navigate, {
                    404: Routes.ERROR_ROUTE,
                    400: Routes.ERROR_ROUTE
                })
            })
    }, [teams]);

    return (
        <MainWrapper>
            <LayoutWrapperWithHeader config={mainConfig}>
                {userTeams.length > 0 ?
                    <StyledGridSection>
                        {userTeams.map(team => (
                            <Team
                                key={team.id}
                                team={team}
                                updateUserTeams={setUserTeams}
                            />
                            ))
                        }
                    </StyledGridSection>
                    : <p>Team not found</p>
                }
            </LayoutWrapperWithHeader>
        </MainWrapper>
    );
};

export default TeamPage;