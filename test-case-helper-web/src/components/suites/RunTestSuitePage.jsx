import React, {useCallback, useEffect, useMemo, useState} from 'react';

import MainWrapper from '../global-wrappers/MainWrapper';
import LayoutWrapperWithHeader from '../global-wrappers/LayoutWrapperWithHeader';
import Input from '../ui/Input';
import Button from '../ui/Button';

import Notification from '../notification/Notification.jsx';

import RequestService from '../../service/api/RequestService';
import CookieService from '../../service/cookie/CookieHandlerService';
import TagFactory from '../../service/util/TagFactory.js';
import {Routes} from '../../constants/Route';

import styled from 'styled-components';
import {useNavigate, useParams, useSearchParams} from 'react-router';
import {Navigate} from 'react-router';
import {useError} from "../hooks/UseErrorHandler.jsx";
import Loader from "../ui/Loader.jsx";
import RunTestCase from "../cases/RunTestCase.jsx";
import PaginationPanel from "../pagination/PaginationPanel.jsx";
import {handleError} from "../../service/error/ErrorHandler.jsx";
import StatusFactory from "../../service/util/StatusFactory.js";

const StyledRunTestSuiteWrapper = styled.section`
    min-height: 100vh;
    min-width: 100%;
`;

const StyledHeaderSection = styled.section`
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgba(68 123 186 / 10%);
    background-color: rgba(68 123 186 / 10%);
    font-family: 'Inter',sans-serif;
`;
const StyledHeaderSessionStatisticGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(2, 1fr);
    gap: 10px;
    padding: 5px;
`;

const StyledHeaderProjectInfo = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-right: 1px solid rgba(68 123 186 / 10%);
`;

const StyledHeaderMainContent = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledHeaderMainControllersContent = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledHeaderTestSuiteInfo = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding: 5px;
    border-right: 1px solid rgba(68 123 186 / 10%);
    border-left: 1px solid rgba(68 123 186 / 10%);
`;

const StyledHeaderTestSuiteInfoField = styled.div`
    display: flex;
`;

const StyledFieldSpan = styled.span`
    color: ${props => props.$color ? props.$color : 'black'};
    margin-right: ${props => props.$marginRight ? props.$marginRight : '0'};
`;
const StyledInfoContainer = styled.article`
    display: flex;
    justify-content: start;
    align-items: center;
    min-width: 100%;
`;

const StyledTestCasesSection = styled.section`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 100%;
`;


const RunTestSuitePage = () => {

    const {projectId} = useParams();
    const {suiteId} = useParams();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("sessionId");

    const [loading, setLoading] = useState(true);
    const [projectLoading, setProjectLoading] = useState(true);
    const [testSuiteRequestStatus, setTestSuiteRequestStatus] = useState(null);
    const [projectRequestStatus, setProjectRequestStatus] = useState(null);
    const {setError} = useError();
    const navigate = useNavigate();
    const [testSuiteRunSession, setTestSuiteRunSession] = useState({});
    const [testSuiteRunSessionRequestStatus, setTestSuiteRunSessionRequestStatus] = useState({});
    const [testSuite, setTestSuite] = useState({});
    const [testSuiteRunSessionId, setTestSuiteRunSessionId] = useState(null);
    const [project, setProject] = useState({});
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(50);
    const [progress, setProgress] = useState(0);

    const [statistic, setStatistic] = useState({
        passed: 0,
        failed: 0,
        skipped: 0,
        blocked: 0,
        notTesting: 0
    });
    const [sessionStatistic, setSessionStatistic] = useState([]);
    const updateSessionStatistic = (statistic) => {
        setSessionStatistic(statistic);
    }

    const token = CookieService.getCookie("token");

    useEffect(() => {
        RequestService.getAuthorizedRequest(`${Routes.TEST_SUITE_ROUTE}/${suiteId}/slim`, token, page, size)
            .then(res => {
                setTestSuite(res.data);
                setTestSuiteRequestStatus(res.status);
                setLoading(false);
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    setError(true);
                }
                setTestSuiteRequestStatus(err.status);
            });
    }, [suiteId, projectId, token, page, size, setError]);

    useEffect(() => {
        RequestService.getAuthorizedRequest(`${Routes.TEST_SUITE_ROUTE}/${suiteId}/run?sessionId=${sessionId}`, token, page, size)
            .then(res => {
                setTestSuiteRunSession(res.data);
                setSessionStatistic(res.data.sessionStatistic);
                setTestSuiteRunSessionRequestStatus(res.status);
                setLoading(false);
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    setError(true);
                }

                handleError(err, navigate, {
                    404: Routes.ERROR_ROUTE,
                    400: Routes.ERROR_ROUTE
                })

                setTestSuiteRunSessionRequestStatus(err.status);
            });

    }, [suiteId, projectId, page, size, sessionId, token, navigate, setError]);

    useEffect(() => {
        RequestService.getAuthorizedRequest(`${Routes.PROJECTS_ROUTE}/${projectId}`, token)
            .then(res => {
                setProject(res.data)
                setProjectRequestStatus(res.status)
                setProjectLoading(false);
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    setError(true);
                }
                setTestSuiteRequestStatus(err.status);
            });

    }, [projectId]);


    const mainConfig = {
        mainPosition: "center"
    }

    const analyzeStatistic = () => {
        const newStatistic = {
            passed: 0,
            failed: 0,
            skipped: 0,
            blocked: 0,
            not_testing: 0
        }

        sessionStatistic.forEach(data => {
            const status = data.status.toLowerCase();
            newStatistic[status] = data.count;
        })

        setStatistic(newStatistic)
    };

    useEffect(() => {
        analyzeStatistic();

        setProgress(testSuite.numberOfTestCases - statistic.not_testing);
    }, [sessionStatistic, statistic.not_testing]);


    const handleChangePage = (newPage) => {
        setPage(newPage);
    }

    const renderStatistic = () => {
        return(
            <>
                <StyledInfoContainer>
                    <StyledFieldSpan $color={"green"} $marginRight={"5px"}>Passed: </StyledFieldSpan>
                    <StyledFieldSpan>{statistic.passed}</StyledFieldSpan>
                </StyledInfoContainer>
                <StyledInfoContainer>
                    <StyledFieldSpan $color={"red"} $marginRight={"5px"}>Failed:</StyledFieldSpan>
                    <StyledFieldSpan>{statistic.failed}</StyledFieldSpan>
                </StyledInfoContainer>
                <StyledInfoContainer>
                    <StyledFieldSpan $color={"crimson"} $marginRight={"5px"}>Blocked:</StyledFieldSpan>
                    <StyledFieldSpan>{statistic.blocked}</StyledFieldSpan>
                </StyledInfoContainer>
                <StyledInfoContainer>
                    <StyledFieldSpan $color={"blue"} $marginRight={"5px"}>Skipped:</StyledFieldSpan>
                    <StyledFieldSpan>{statistic.skipped}</StyledFieldSpan>
                </StyledInfoContainer>
                <StyledInfoContainer>
                    <StyledFieldSpan $color={"gray"} $marginRight={"5px"}>Not testing:</StyledFieldSpan>
                    <StyledFieldSpan>{statistic.not_testing}</StyledFieldSpan>
                </StyledInfoContainer>
            </>
        );
    }

    const endTestingSessionButtonConfig = {
        buttonName: "End testing session"
    }
    const cancelTestingSessionButtonConfig = {
        buttonName: "Cancel testing session"
    }

    if (loading) {
        return <Loader />
    }

    return (
        <MainWrapper>
            <LayoutWrapperWithHeader config={mainConfig}>
                <StyledRunTestSuiteWrapper>
                    <StyledHeaderSection>
                        <StyledHeaderMainContent>
                            <StyledHeaderProjectInfo>
                                <StyledFieldSpan $color={"#447bba"} $marginRight={"5px"}>Project:</StyledFieldSpan>
                                <StyledFieldSpan>{project.title}</StyledFieldSpan>
                            </StyledHeaderProjectInfo>
                            <StyledHeaderTestSuiteInfo>
                                <StyledHeaderTestSuiteInfoField>
                                    <StyledFieldSpan $color={"#447bba"} $marginRight={"5px"}>Test-suite:</StyledFieldSpan>
                                    <StyledFieldSpan>{testSuite.title}</StyledFieldSpan>
                                </StyledHeaderTestSuiteInfoField>
                                <StyledHeaderTestSuiteInfoField>
                                    <StyledFieldSpan $color={"#447bba"} $marginRight={"5px"}>Environment:</StyledFieldSpan>
                                    <StyledFieldSpan>{testSuiteRunSession.environment}</StyledFieldSpan>
                                </StyledHeaderTestSuiteInfoField>
                                <StyledHeaderTestSuiteInfoField>
                                    <StyledFieldSpan $color={"#447bba"} $marginRight={"5px"}>Progress:</StyledFieldSpan>
                                    <StyledFieldSpan>{progress} of {testSuite.numberOfTestCases}</StyledFieldSpan>
                                </StyledHeaderTestSuiteInfoField>
                            </StyledHeaderTestSuiteInfo>
                            <StyledHeaderSessionStatisticGrid>
                                {renderStatistic()}
                            </StyledHeaderSessionStatisticGrid>
                        </StyledHeaderMainContent>
                        <StyledHeaderMainControllersContent>
                            <Button buttonConfig={endTestingSessionButtonConfig}/>
                            <Button buttonConfig={cancelTestingSessionButtonConfig}/>
                        </StyledHeaderMainControllersContent>
                    </StyledHeaderSection>
                    <StyledTestCasesSection>
                        { testSuiteRunSession.testCaseRunResults?.length > 0 ?
                            testSuiteRunSession.testCaseRunResults?.map(runTestCase => (
                                <RunTestCase
                                    key={runTestCase.testCase.id}
                                    runTestCase={runTestCase}
                                    onStatusChange={updateSessionStatistic}
                                />
                            ))
                            : <p>Test-cases not found</p>
                        }
                    </StyledTestCasesSection>
                </StyledRunTestSuiteWrapper>
                { testSuite.numberOfTestCases > 0
                    ? <PaginationPanel onPageChange={handleChangePage} pageSize={size} totalElements={testSuite.numberOfTestCases} currentPage={page} />
                    : ""
                }
            </LayoutWrapperWithHeader>
        </MainWrapper>
    );
}

export default React.memo(RunTestSuitePage);