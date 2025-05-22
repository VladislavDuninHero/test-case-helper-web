import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';

import LayoutWrapperWithHeader from '../global-wrappers/LayoutWrapperWithHeader';
import MainWrapper from '../global-wrappers/MainWrapper';
import Button from '../ui/Button';
import Input from '../ui/Input';

import { useError } from '../hooks/UseErrorHandler';
import RequestService from '../../service/api/RequestService';
import CookieService from '../../service/cookie/CookieHandlerService';
import { Routes } from '../../constants/Route';

import styled from 'styled-components';
import TestCase from '../cases/TestCase';
import Loader from '../ui/Loader';
import PaginationPanel from '../pagination/PaginationPanel';

const StyledMainGrid = styled.section`
    min-width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 0.2fr));
    gap: 10px;
    align-items: stretch;
    justify-items: center;
    margin-bottom: 10px;
`;

const StyledTestSuiteContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100%;
    border-radius: 5px;
`;

const StyledSectionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100%;
    padding: 5px;
`;

const StyledControllersSection = styled.section`
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
    margin: 5px;
`;

const StyledProjectInformationSection = styled.section`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 100%;
    border-top: 1px solid #8f8d8dad;
    padding: 5px;
`;

const StyledInfoArticle = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
`;

const StyledArticleFilterByTag = styled.article`
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

const StyledControllerSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledTestCaseNotFoundArticle = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SuitePage = () => {
    
    const {suiteId} = useParams();
    const {projectId} = useParams();

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(50);
    const [totalEl, setTotalEl] = useState(0);

    const [loading, setLoading] = useState(true);
    const [projectLoading, setProjectLoading] = useState(true);
    const [testSuite, setTestSuite] = useState({});
    const [project, setProject] = useState({});
    const {setError} = useError();
    const [testSuiteRequestStatus, setTestSuiteRequestStatus] = useState(null);
    const [projectRequestStatus, setProjectRequestStatus] = useState(null);
    const [actionDeleteStatus, setActionDeleteStatus] = useState(null);
    const [responseAfterDeleteTestCase, setResponseAfterDeleteTestCase] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const token = CookieService.getCookie("token");

    useEffect(() => {
        RequestService.getAuthorizedRequest(`${Routes.TEST_SUITE_ROUTE}/${suiteId}`, token, page, size)
            .then(res => {
                setTestSuite(res.data);
                setTestSuiteRequestStatus(res.status);
                setTotalEl(res.data.numberOfTestCases);
                setLoading(false);
            })
            .catch(err => {
                setTestSuiteRequestStatus(err.status);
            });

    }, [suiteId, actionDeleteStatus, page, size]);

    useEffect(() => {
        RequestService.getAuthorizedRequest(`${Routes.PROJECTS_ROUTE}/${projectId}`, token)
            .then(res => {
                setProject(res.data)
                setProjectRequestStatus(res.status)
                setProjectLoading(false);
            })
            .catch(err => {
                setProjectRequestStatus(err.status)
            });
    }, [testSuite]);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    }

    if (testSuiteRequestStatus === 401 || projectRequestStatus === 401) {
        setError(true);   
    }

    if (loading) {
        return <Loader />
    }

    const onChangeSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleCreateTestCase = () => navigate(`/projects/${projectId}/${suiteId}/case/create`)

    const createTestCaseButtonConfig = {
        buttonName: "Create test-case +",
        fontColor: "white",
        onClick: handleCreateTestCase
    }

    let testCases = testSuite.testCases;
    let filteredTestCases = testCases.filter(testCase => testCase.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const mainConfig = {
        border: "none"
    }

    const deleteTestCase = (testCase) => {
                
            RequestService.deleteAuthorizedRequest(`${Routes.TEST_CASE_ROUTE}/${testCase.id}/delete`, token)
                .then(res => {
                    setResponseAfterDeleteTestCase(res.data);
                    setActionDeleteStatus(res.status);
                    filteredTestCases = filteredTestCases.filter(currentTC => currentTC.id !== testCase.id);
                })
                .catch(err => {
                    setActionDeleteStatus(err.status)
                });
                    
        }
    
        const navigateToUpdateTestCasePage = (testCase) => {
            navigate(`${Routes.MAIN_PAGE_ROUTE}/${projectId}/${suiteId}/${testCase.id}/update`);
        }

    return (
        <MainWrapper>
            <LayoutWrapperWithHeader config={mainConfig}>
                <StyledTestSuiteContainer>
                    <StyledControllerSection>
                        <StyledControllersSection>
                            <Button buttonConfig={createTestCaseButtonConfig}/>
                            <Input placeholder={"Search test-case"} onChange={onChangeSearch} value={searchQuery} minWidthPercent={"0"}/>
                        </StyledControllersSection>
                        <StyledProjectInformationSection>
                            <StyledInfoArticle><h3>Project:</h3> {project.title}</StyledInfoArticle>
                            <StyledInfoArticle><h3>Test-suite:</h3> {testSuite.title}</StyledInfoArticle>
                            <StyledInfoArticle><h3>Number of test-cases:</h3> {totalEl}</StyledInfoArticle>
                        </StyledProjectInformationSection>
                    </StyledControllerSection>
                    <StyledSectionsWrapper>
                        
                            {   
                                filteredTestCases.length > 0
                                ? <StyledMainGrid>
                                    {
                                        filteredTestCases.map(testCase => 
                                            <TestCase 
                                                key={testCase.id} 
                                                testCase={testCase} 
                                                onDelete={() => deleteTestCase(testCase)}
                                                onUpdate={() => navigateToUpdateTestCasePage(testCase)}
                                            />
                                        )
                                    }
                                </StyledMainGrid>
                                : <StyledTestCaseNotFoundArticle>Test-cases not found</StyledTestCaseNotFoundArticle>
                            }
                        
                        {   totalEl > 0
                            ? <PaginationPanel onPageChange={handleChangePage} pageSize={size} totalElements={totalEl} currentPage={page} />
                            : ""
                        }
                    </StyledSectionsWrapper>
                </StyledTestSuiteContainer>
            </LayoutWrapperWithHeader>
        </MainWrapper>
    )
}

export default SuitePage;