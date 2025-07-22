import React, {useEffect, useState} from 'react';
import LayoutWrapperWithHeader from "../global-wrappers/LayoutWrapperWithHeader.jsx";
import MainWrapper from "../global-wrappers/MainWrapper.jsx";
import styled from "styled-components";
import Loader from "../ui/Loader.jsx";
import Button from "../ui/Button.jsx";
import PaginationPanel from "../pagination/PaginationPanel.jsx";
import RequestService from "../../service/api/RequestService.js";
import {Routes} from "../../constants/Route.js";
import CookieService from "../../service/cookie/CookieHandlerService.js";
import {useNavigate, useParams} from "react-router";
import {useError} from "../hooks/UseErrorHandler.jsx";
import TestCaseResult from "./TestCaseResult.jsx";
import TimeFormatterService from "../../service/util/TimeFormatterService.js";
import {handleError} from "../../service/error/ErrorHandler.jsx";

const StyledEndTestSuiteWrapper = styled.section`
    min-height: 100vh;
    min-width: 100%;
`;

const StyledEndTestSuiteStatisticWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const StyledTestCaseRunResultInfo = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: ${props => props.$alignItems || 'center'};
    min-width: 750px;
    max-width: 750px;
    min-height: 50px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    padding: ${props => props.$padding || '0'};
`;

const StyledTestingSessionInfo = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 50%;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    padding: 10px;
    max-width: 50%;
`;

const StyledEndTestSuiteRunControllers = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100%;
    gap: 10px;
`;

const Styledh2Results = styled.h2`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 100%;
    padding: ${props => props.$padding || '0'};
    background-color: #ffffff;
    border-radius: 5px;
    color: #447bba;
`;

const StyledSessionInfoWrapper = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    min-width: 750px;
`;

const StyledTestCaseRunStatisticInfo = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 50%;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    padding: 10px;
    max-width: 50%;
`;

const EndTestSuitePage = () => {

    const {projectId} = useParams();
    const {suiteId} = useParams();
    const {sessionId} = useParams();
    
    const {setError} = useError();

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(50);
    const [testSuiteRunSessionResults, setTestSuiteRunSessionResults] = useState([]);
    const [testSuiteRunSessionInfo, setTestSuiteRunSessionInfo] = useState({});
    const [project, setProject] = useState({});
    const [statistic, setStatistic] = useState({
        passed: 0,
        failed: 0,
        skipped: 0,
        blocked: 0,
        not_testing: 0
    });
    const [progress, setProgress] = useState(0);
    const [downloadWordIsLoading, setDownloadWordIsLoading] = useState(false);

    const navigate = useNavigate();

    const token = CookieService.getCookie("token");

    const mainConfig = {
        mainPosition: "center"
    }

    const handleBackToProject = () => {
        navigate(`/projects/${projectId}`);
    }

    const handleConvertTestSuiteRunSessionToWord = async () => {
        setDownloadWordIsLoading(true);

        RequestService.getAuthorizedRequestWithBlob(
            `${Routes.LOAD_WORD_REPORT_AFTER_RUN_TEST_SUITE_SESSION_ROUTE}/${suiteId}/run/ended/word?sessionId=${sessionId}`,
            token
        )
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `test_suite_run_session_${sessionId}_report.docx`);
                document.body.appendChild(link);
                link.click();
                link.remove();
                setDownloadWordIsLoading(false);
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    setError(true);
                }

                setDownloadWordIsLoading(false);

                handleError(err, navigate, {
                    404: Routes.ERROR_ROUTE,
                    400: Routes.ERROR_ROUTE
                })
            });
    }

    const convertResultsButtonConfig = {
        buttonName: "Convert to word",
        borderRadius: "5px",
        fontColor: "white",
        padding: "10px",
        disabled: downloadWordIsLoading,
        onClick: handleConvertTestSuiteRunSessionToWord
    }
    const backToProjectButtonConfig = {
        buttonName: "Back to Project",
        borderRadius: "5px",
        fontColor: "white",
        padding: "10px",
        onClick: handleBackToProject
    }

    useEffect(() => {
        RequestService.getBaseAuthorizedRequest(`${Routes.TEST_SUITE_ROUTE}/run/${sessionId}/end`, token)
            .then(res => {
                setTestSuiteRunSessionInfo(res.data);
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
            });
    }, [suiteId, projectId, token, page, size, setError, sessionId, navigate]);

    useEffect(() => {
        RequestService.getAuthorizedRequest(`${Routes.TEST_SUITE_ROUTE}/run/${sessionId}/end/results`, token, page, size)
            .then(res => {
                setTestSuiteRunSessionResults(res.data);
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
            });
    }, [suiteId, projectId, token, page, size, setError, sessionId, navigate]);

    useEffect(() => {
        RequestService.getBaseAuthorizedRequest(`${Routes.PROJECTS_ROUTE}/${projectId}`, token)
            .then(res => {
                setProject(res.data)
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    setError(true);
                }

                handleError(err, navigate, {
                    404: Routes.ERROR_ROUTE,
                    400: Routes.ERROR_ROUTE
                })
            });
    }, [navigate, projectId, setError, token]);

    const analyzeStatistic = () => {
        const newStatistic = {
            passed: 0,
            failed: 0,
            skipped: 0,
            blocked: 0,
            not_testing: 0
        }

        testSuiteRunSessionInfo.sessionStatistic?.forEach(data => {
            const status = data.status.toLowerCase();
            newStatistic[status] = data.count;
        })

        setStatistic(newStatistic)
    }

    useEffect(() => {
        analyzeStatistic();
        
        setProgress(testSuiteRunSessionResults.totalElements - statistic.not_testing);
    }, [statistic.not_testing, testSuiteRunSessionResults.totalElements]);
    
    const renderStatistic = () => {
        return (
            <StyledTestingSessionInfo>
                <Styledh2Results>Testing session results: </Styledh2Results>
                <p>Progress: {progress} of {testSuiteRunSessionResults.totalElements}</p>
                <p>Passed: {statistic.passed}</p>
                <p>Failed: {statistic.failed}</p>
                <p>Skipped: {statistic.skipped}</p>
                <p>Not testing: {statistic.not_testing}</p>
            </StyledTestingSessionInfo>
        )
    };

    const formatter = new TimeFormatterService();
    const formattedTime = formatter.formatTestSuiteRunTime(testSuiteRunSessionInfo.executionTime);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    }

    if (loading) {
        return <Loader />
    }

    return (
        <MainWrapper>
            <LayoutWrapperWithHeader config={mainConfig}>
                <StyledEndTestSuiteWrapper>
                    <StyledEndTestSuiteStatisticWrapper>
                        <StyledSessionInfoWrapper>
                            <StyledTestingSessionInfo>
                                <Styledh2Results>Testing session info: </Styledh2Results>
                                <p>QA: {testSuiteRunSessionInfo.executedBy?.login}</p>
                                <p>Project: {project.title}</p>
                                <p>Test-suite: {testSuiteRunSessionInfo.testSuiteTitle}</p>
                                <p>Environment: {testSuiteRunSessionInfo.environment}</p>
                                <p>Time: {formattedTime}</p>
                            </StyledTestingSessionInfo>
                            {renderStatistic()}
                        </StyledSessionInfoWrapper>
                        <StyledTestCaseRunResultInfo $alignItems={"center"}>
                            <Styledh2Results $padding={"5px"}>Details:</Styledh2Results>
                            { testSuiteRunSessionResults.results?.length > 0
                                ? testSuiteRunSessionResults.results?.map((result, index) => (
                                        <TestCaseResult key={index} testSuiteRunSessionResult={result} />
                                    )
                                )
                                : <p>Results not found</p>
                            }
                            { testSuiteRunSessionResults.totalElements > size
                                ? <PaginationPanel
                                    onPageChange={handleChangePage}
                                    pageSize={size}
                                    totalElements={testSuiteRunSessionResults?.totalElements}
                                    currentPage={page}
                                />
                                : ""
                            }
                        </StyledTestCaseRunResultInfo>
                        <StyledEndTestSuiteRunControllers>
                            <Button buttonConfig={convertResultsButtonConfig} />
                            <Button buttonConfig={backToProjectButtonConfig} />
                        </StyledEndTestSuiteRunControllers>
                    </StyledEndTestSuiteStatisticWrapper>
                </StyledEndTestSuiteWrapper>
            </LayoutWrapperWithHeader>
        </MainWrapper>
    );
};

export default EndTestSuitePage;