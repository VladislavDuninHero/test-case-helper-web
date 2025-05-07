import React, {useState, useEffect} from 'react'

import styled from 'styled-components';

import { useParams } from 'react-router';

import MainWrapper from '../global-wrappers/MainWrapper';
import LayoutWrapperWithHeader from '../global-wrappers/LayoutWrapperWithHeader';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import Notification from '../notification/Notification';

import CookieService from '../../service/cookie/CookieHandlerService';
import RequestService from '../../service/api/RequestService';
import { Routes } from '../../constants/Route';

const StyledUpdateTestSuiteForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: 1px solid #8f8d8dad;
    border-radius: 5px;
`;

const StyledDescriptionTextArea = styled.textarea`
    min-width: 100%;
    padding: 5px;
    min-width: 300px;
    min-height: 200px;
    max-width: 500px;
    max-height: 200px;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const UpdateTestSuitePage = () => {

    const {suiteId} = useParams();
    const [testSuiteData, setTestSuiteData] = useState({
        title: "",
        description: "",
        tag: ""
    });
    const [response, setResponse] = useState({});
    const [updateTestSuiteRequestStatus, setUpdateTestSuiteRequestStatus] = useState(null);
    const [getTestSuiteDataStatus, setTestSuiteDataStatus] = useState(null);

    const handleChange = (field) => (event) => {
        setTestSuiteData({
            ...testSuiteData,
            [field]: event.target.value
        })
    }

    const token = CookieService.getCookie("token");

    useEffect(() => {
        RequestService.getAuthorizedRequest(`${Routes.TEST_SUITE_ROUTE}/${suiteId}/slim`, token)
            .then(res => {
                setTestSuiteData(res.data);
                setTestSuiteDataStatus(res.status);
            })
            .catch(err => {
                setTestSuiteDataStatus(err.status);
            });
    }, []);

    const handleUpdateTestSuite = (e) => {
        e.preventDefault();

        RequestService.putAuthorizedRequest(`${Routes.TEST_SUITE_ROUTE}/${suiteId}/update`, testSuiteData, token)
            .then(res => {
                setUpdateTestSuiteRequestStatus(res.status);

                setResponse(res.data);
            })
            .catch(err => setUpdateTestSuiteRequestStatus(err.status));
    }

    const updateTestSuiteButtonConfig = {
        buttonName: "Update test-suite",
        fontColor: "white",
        onClick: handleUpdateTestSuite
    }

    const selectTagConfig = {
        borderRadius: "5px"
    }

    const mainConfig = {
        mainContentPosition: "center"
    }

    const renderStatus = () => {
        return <Notification $status={updateTestSuiteRequestStatus} />
    }

    return (
        <MainWrapper>
            <LayoutWrapperWithHeader config={mainConfig}>
                <StyledUpdateTestSuiteForm>
                    <label>Update your project</label>
                    <Input value={testSuiteData.title} onChange={handleChange("title")} placeholder={"Test-suite title"}/>
                    <Dropdown selectConfig={selectTagConfig} onChange={handleChange("tag")} value={testSuiteData.tag}>
                        <option>...</option>
                        <option>SMOKE</option>
                        <option>CRITICAL PATH</option>
                    </Dropdown>
                    <StyledDescriptionTextArea value={testSuiteData.description} onChange={handleChange("description")} placeholder={"Test-suite description"} />
                    <Button buttonConfig={updateTestSuiteButtonConfig} />
                    {
                        updateTestSuiteRequestStatus !== null ? renderStatus() : ""
                    }
                </StyledUpdateTestSuiteForm>
            </LayoutWrapperWithHeader>
        </MainWrapper>
    )
}

export default UpdateTestSuitePage;