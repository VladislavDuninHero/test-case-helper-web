import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'

import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineHistory } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { RiUserSettingsLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";


import RequestService from '../../service/api/RequestService'
import CookieService from '../../service/cookie/CookieHandlerService'
import { Routes } from '../../constants/Route'
import { useError } from '../hooks/UseErrorHandler'
import {useNavigate} from "react-router";
import Button from "../ui/Button.jsx";
import {lightTheme} from "../theme/theme.js";
import {useUserContext} from "../../service/context/UserProvider.jsx";
import {useAuth} from "../../service/auth/AuthProvider.jsx";

const StyledSpan = styled.span`
    display: flex;
    justify-content: center;
    padding: 5px;
`;

const StyledUserArticle = styled.article`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    min-width: 75px;
    font-size: 15px;
`;

const StyledButtonNameSpan = styled.span`
    margin-left: 5px;
    margin-right: 5px;
`;

const UserMenu = styled.div`
    position: absolute;
    right: 0;
    top: 100%;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    z-index: 100;
    min-width: 150px;
`;

const StyledUserProfileData = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 5px;
    
    &:not(:last-child) {
        border-bottom: 1px solid #ddd;
    }
`;

const Profile = () => {

    const [userData, setUserData] = useState({});
    const {setError} = useError();
    const {setTeams, setLogin} = useUserContext();

    const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);
    const menuRef = useRef(null);

    const navigate = useNavigate();
    const {hasPermission} = useAuth();

    const handleLogout = () => {
        CookieService.deleteCookie("token");

        navigate("/");
    }

    const token = CookieService.getCookie("token");

    useEffect(() => {
        RequestService.getAuthorizedRequest(Routes.USER_ROUTE, token)
            .then(res => {
                setUserData(res.data);
                setTeams(res.data.teams?.map((team) => {
                    return {teamId: team.id, teamName: team.teamName}
                }) || []);
                setLogin(res.data.login);
            })
            .catch(() => {
                setError(true);
            });
    }, [setError, token]);

    const openUserMenu = () => {
        setUserMenuIsOpen(!userMenuIsOpen);
    }

    const renderArrow = () => {
        return userMenuIsOpen ? <IoIosArrowUp key={1}/>  : <IoIosArrowDown key={1}/>
    }

    const findUserTeams = () => {
        const teams = userData?.teams;
        const formattedTeams = teams.map(team => team.teamName).join(', ');

        return formattedTeams || "no team";
    }

    const handleOpenTeammatesPage = () => navigate(`/team/teammates`);

    const userSelectButtonConfig = {
        buttonName: <CgProfile fontSize={"20px"}/>,
        children: [
            <StyledButtonNameSpan key={0}>{userData.login}</StyledButtonNameSpan>,
            renderArrow()
        ],
        backgroundColor: "white",
        backGroundHoverColor: lightTheme.colors.componentWrapperBackgroundColor,
        backGroundHoverFontColor: lightTheme.colors.defaultButtonColor,
        border: lightTheme.colors.boldBorderColorLight,
        borderRadius: "10px",
        padding: "5px",
        fontColor: lightTheme.colors.defaultButtonColor,
        minWidth: "100%",
        activeEffect: "none",
        onClick: openUserMenu
    }

    const userLogoutButtonConfig = {
        buttonName: <StyledButtonNameSpan>Logout</StyledButtonNameSpan>,
        children: [<IoMdLogOut key={0} fontSize={"20px"}/>],
        justifyContent: "space-between",
        backgroundColor: "white",
        backGroundHoverColor: lightTheme.colors.componentWrapperBackgroundColor,
        backGroundHoverFontColor: "red",
        padding: "5px",
        fontColor: lightTheme.colors.defaultButtonColor,
        minWidth: "100%",
        activeEffect: "none",
        onClick: handleLogout
    }

    const userTeamButtonConfig = {
        buttonName: <StyledButtonNameSpan>Your team</StyledButtonNameSpan>,
        children: [<LuUsers key={0} fontSize={"20px"}/>],
        justifyContent: "space-between",
        backgroundColor: "white",
        backGroundHoverColor: lightTheme.colors.componentWrapperBackgroundColor,
        backGroundHoverFontColor: lightTheme.colors.defaultButtonColor,
        padding: "5px",
        fontColor: lightTheme.colors.defaultButtonColor,
        minWidth: "100%",
        activeEffect: "none",
        onClick: handleOpenTeammatesPage
    }

    const userSessionsHistoryButtonConfig = {
        buttonName: <StyledButtonNameSpan>History</StyledButtonNameSpan>,
        children: [
            <AiOutlineHistory key={0} fontSize={"20px"}/>
        ],
        justifyContent: "space-between",
        backgroundColor: "white",
        backGroundHoverColor: lightTheme.colors.componentWrapperBackgroundColor,
        backGroundHoverFontColor: lightTheme.colors.defaultButtonColor,
        padding: "5px",
        fontColor: lightTheme.colors.defaultButtonColor,
        minWidth: "100%",
        activeEffect: "none",
        disabled: true
    };

    const userProfileButtonConfig = {
        buttonName: <StyledButtonNameSpan>Profile</StyledButtonNameSpan>,
        children: [
            <RiUserSettingsLine key={0} fontSize={"20px"}/>
        ],
        justifyContent: "space-between",
        backgroundColor: "white",
        backGroundHoverColor: lightTheme.colors.componentWrapperBackgroundColor,
        backGroundHoverFontColor: lightTheme.colors.defaultButtonColor,
        padding: "5px",
        fontColor: lightTheme.colors.defaultButtonColor,
        minWidth: "100%",
        activeEffect: "none",
        disabled: true
    };

    return (
        <StyledUserArticle ref={menuRef}>
            <Button buttonConfig={userSelectButtonConfig} />
            { userMenuIsOpen &&
                <UserMenu>
                    <StyledUserProfileData>
                        <StyledSpan>Email: </StyledSpan>
                        <StyledSpan>{userData?.email}</StyledSpan>
                    </ StyledUserProfileData>
                    <StyledUserProfileData>
                        <StyledSpan>Team: </StyledSpan>
                        <StyledSpan>{findUserTeams()}</StyledSpan>
                    </StyledUserProfileData>
                    <Button buttonConfig={userProfileButtonConfig}/>
                    <Button buttonConfig={userSessionsHistoryButtonConfig}/>
                    {hasPermission('CREATE_TEAM') && <Button buttonConfig={userTeamButtonConfig} />}
                    <Button buttonConfig={userLogoutButtonConfig} />
                </UserMenu>
            }
        </StyledUserArticle>
    )
}

export default Profile;