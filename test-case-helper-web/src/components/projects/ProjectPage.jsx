import React, { useEffect, useState } from 'react'

import RequestService from '../../service/api/RequestService';
import CookieService from '../../service/cookie/CookieHandlerService';
import { Routes } from '../../constants/Route';
import { useError } from '../hooks/UseErrorHandler';

import MainWrapper from '../global-wrappers/MainWrapper';
import LayoutWrapperWithHeader from '../global-wrappers/LayoutWrapperWithHeader';
import Side from '../sides/Side';
import Button from '../ui/Button';
import TestSuite from '../suites/TestSuite';
import Input from '../ui/Input';
import DropdownMenu from '../ui/DropDownMenu';

import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import Loader from '../ui/Loader';


const StyledMainGrid = styled.section`
    min-width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 0.2fr));
    gap: 10px;
    align-items: center;
    justify-items: center;
    margin: 5px;
`;

const StyledTestSuitesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    min-width: 100%;
    min-height: 50vh;
    border-radius: 5px;
`;

const StyledSectionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledControllersSection = styled.section`
    min-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    align-items: center;
    justify-items: flex-start;
    padding: 5px;
`;

const StyledProjectInformationSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-width: 100%;
    border-top: 1px solid #8f8d8dad;
    padding: 5px;
`;

const StyledInfoArticle = styled.article`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 100%;
`;

const StyledArticleFilterByTag = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const StyledBoldTextSpan = styled.span`
    font-weight: bold;
    text-align: start;
`;

const ProjectPage = () => {

    const [project, setProject] = useState([]);
    const [projectRequestStatus, setprojectRequestStatus] = useState(null);
    const {projectId} = useParams();
    const [loading, setLoading] = useState(true);
    const {setError} = useError();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterTag, setFilterTag] = useState("");
    const navigate = useNavigate();

    const token = CookieService.getCookie("token");

    useEffect(() => {
        RequestService.getAuthorizedRequest(`${Routes.PROJECTS_ROUTE}/${projectId}`, token)
            .then(res => {
                setProject(res.data)
                setprojectRequestStatus(res.status)
                setLoading(false);
            })
            .catch(err => {
                setprojectRequestStatus(err.status)
            });

    }, [projectId]);

    if (loading) {
        return <Loader />;
    }

    const filterByTagDropdownConfig = {
        borderRadius: "5px"
    }

    const handleOpenCreateTestSuitePage = () => {
        return navigate(`/projects/${projectId}/suite/create`)
    }

    const createTestSuiteButtonConfig = {
        buttonName: "Create test-suite +",
        fontColor: "white",
        onClick: handleOpenCreateTestSuitePage
    }
    
    const onChangeSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    const onChangeFilterByTag = (e) => {
        if (e.target.value !== "...") {
            setFilterTag(e.target.value);
            return;
        }
        
        setFilterTag("");
    }

    let filteredTestSuites = project.testSuites.filter(testSuite => testSuite.title.toLowerCase().includes(searchQuery.toLowerCase()));
    filteredTestSuites = filterTag !== "" ? filteredTestSuites.filter(testSuite => testSuite.tag.toLowerCase().includes(filterTag.toLowerCase())) : filteredTestSuites;
    
    const config = {
        border: "none"
    };

    return (
        <MainWrapper>
            <LayoutWrapperWithHeader config={config}>
                <StyledTestSuitesContainer>
                    <Side>
                        <StyledControllersSection>
                            <Button buttonConfig={createTestSuiteButtonConfig}/>
                            <Input placeholder={"Search test-suite"} onChange={onChangeSearch} value={searchQuery} margin={"0px 0px 0px 0px"}/>
                            <StyledArticleFilterByTag>
                                <label>Filter by tag:</label>
                                <DropdownMenu onChange={onChangeFilterByTag} selectConfig={filterByTagDropdownConfig}>
                                    <option>...</option>
                                    <option>SMOKE</option>
                                    <option>CRITICAL PATH</option>
                                </DropdownMenu>
                            </StyledArticleFilterByTag>
                        </StyledControllersSection>
                        <StyledProjectInformationSection>
                            <h2>Info:</h2>
                            <StyledInfoArticle>
                                Project: <StyledBoldTextSpan>{project.title}</StyledBoldTextSpan>
                            </StyledInfoArticle>
                            <StyledInfoArticle>
                                Number of test-suites: <StyledBoldTextSpan>{project.testSuites.length}</StyledBoldTextSpan>
                            </StyledInfoArticle>
                        </StyledProjectInformationSection>
                    </Side>
                    <StyledSectionsWrapper>
                        <StyledMainGrid>
                            {
                                filteredTestSuites.length > 0 
                                ? filteredTestSuites.map((testSuite) => <TestSuite key={testSuite.id} testSuite={testSuite} loading={loading} projectId={projectId} />)
                                : <div>Test-suites not found</div>
                            }
                        </StyledMainGrid>
                    </StyledSectionsWrapper>
                </StyledTestSuitesContainer>
            </LayoutWrapperWithHeader>
        </MainWrapper>
    )
}

export default ProjectPage;