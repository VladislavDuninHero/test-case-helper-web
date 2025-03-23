import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import RequestService from '../../service/api/RequestService'
import CookieService from '../../service/cookie/CookieHandlerService'
import { Routes } from '../../constants/Route'
import { useError } from '../hooks/UseErrorHandler'

const StyledArticle = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
`;

const Profile = () => {

    const [userData, setUserData] = useState({});
    const {setError} = useError();

    const token = CookieService.getCookie("token");
    
    useEffect(() => {
        RequestService.getAuthorizedRequest(Routes.USER_ROUTE, token)
            .then(res => {
                setUserData(res.data);
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    return (
        <StyledArticle>{userData.login}</StyledArticle>
    )
}

export default Profile;