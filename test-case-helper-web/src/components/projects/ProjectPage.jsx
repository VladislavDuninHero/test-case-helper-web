import React, { useEffect, useState } from 'react'

import RequestService from '../../service/api/RequestService';
import CookieService from '../../service/cookie/CookieHandlerService';
import TagFactory from '../../service/util/TagFactory.js';
import { Routes } from '../../constants/Route';
import { useError } from '../hooks/UseErrorHandler';

import MainWrapper from '../global-wrappers/MainWrapper';
import LayoutWrapperWithHeader from '../global-wrappers/LayoutWrapperWithHeader';
import Side from '../sides/Side';
import Button from '../ui/Button';
import TestSuite from '../suites/TestSuite';
import Input from '../ui/Input';
import Modal from '../ui/Modal.jsx';
import Notification from '../notification/Notification.jsx';

import styled from 'styled-components';
import Loader from '../ui/Loader';
import Dropdown from '../ui/Dropdown.jsx';
import { useNavigate, useParams } from 'react-router';

import { FaArrowRightArrowLeft } from "react-icons/fa6";

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
    grid-template-columns: 1fr 4fr;
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
    align-items: end;
    justify-content: center;
    justify-items: stretch;
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
    align-items: stretch;
`;

const StyledArticleConvertControllers = styled.article`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-width: 100%;
    min-height: 20px;
`;

const StyledBoldTextSpan = styled.span`
    font-weight: bold;
    text-align: start;
`;

const StyledParsedExcelContainer = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 100%;
`;

const StyledAddExcelBackupForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 100%;
`;

const StyledConvertIcon = styled(FaArrowRightArrowLeft)`
    color: #447bba;
`;

const StyledTestSuiteNotFoundArticle = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProjectPage = () => {
    
    const [project, setProject] = useState([]);
    const [testSuitesState, setTestSuitesState] = useState([]);
    const [parsedExcelBackupStatus, setParsedExcelBackupStatus] = useState(null);
    const [projectRequestStatus, setprojectRequestStatus] = useState(null);
    const [deleteTestSuiteStatus, setDeleteTestSuiteStatus] = useState(null);
    const {projectId} = useParams();
    const [loading, setLoading] = useState(true);
    const {setError} = useError();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterTag, setFilterTag] = useState("");
    const navigate = useNavigate();
    const [addExcelFileModalIsOpen, setaddExcelFileModalIsOpen] = useState(false);
    const [excelFile, setExcelFile] = useState(null);

    const handleOpenAddExcelFileModal = () => {
        setaddExcelFileModalIsOpen(true);
    }
    const handleCloseAddExcelFileModal = () => setaddExcelFileModalIsOpen(false);
    const addExcelFile = (e) => setExcelFile(e.target.files[0]);

    const token = CookieService.getCookie("token");

    useEffect(() => {
        RequestService.getAuthorizedRequest(`${Routes.PROJECTS_ROUTE}/${projectId}`, token)
            .then(res => {
                setProject(res.data);
                setTestSuitesState(res.data.testSuites);
                setprojectRequestStatus(res.status)
                setLoading(false);
            })
            .catch(err => {
                setError(true);
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

    const handleLoadExcelBackup = () => {
        RequestService.getAuthorizedRequestWithBlob(`${Routes.LOAD_EXCEL_BACKUP_ROUTE}?projectId=${projectId}`, token)
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `project_${projectId}_backup.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleParseExcelBackup = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("excelFile", excelFile);
        formData.append("projectId", projectId);

        RequestService.postAuthorizedRequestWithMultipartData(Routes.LOAD_EXCEL_BACKUP_ROUTE, formData, token)
            .then(res => {
                setTestSuitesState(res.data.testSuites);
                setParsedExcelBackupStatus(res.status);
                setaddExcelFileModalIsOpen(false);
                setLoading(false);
            })
            .catch(err => {
                setParsedExcelBackupStatus(err.status);
            });
    }

    const createTestSuiteButtonConfig = {
        buttonName: "Create test-suite +",
        fontColor: "white",
        fontSize: "15px",
        onClick: handleOpenCreateTestSuitePage
    }

    const convertAndLoadExcelBackupButton = {
        buttonName: "Load excel",
        fontColor: "white",
        fontSize: "15px",
        onClick: handleLoadExcelBackup
    }

    const confirmParsedAddedExcelFileButton = {
        buttonName: "Parse excel",
        fontColor: "white",
        fontSize: "15px",
        onClick: handleOpenAddExcelFileModal
    }

    const convertAndParseExcelBackupButton = {
        buttonName: "Confirm parsed",
        fontColor: "white",
        minWidth: "100%",
        onClick: handleParseExcelBackup
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
    
    const filteredTestSuites = testSuitesState.filter(testSuite => {
        const matchesSearch = testSuite.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = filterTag !== "" 
             ? testSuite.tag.toLowerCase().includes(TagFactory.getTag(filterTag).toLowerCase())
             : true;

        return matchesSearch && matchesTag;
    })
    
    const deleteTestSuite = (testSuite) => {
        
        RequestService.deleteAuthorizedRequest(`${Routes.SUITE_ROUTE}/${testSuite.id}/delete`, token)
            .then(res => {
                setDeleteTestSuiteStatus(res.status);
            
                setTestSuitesState(suites => suites.filter(suite => suite.id !== testSuite.id));
            })
            .catch(err => {
                setDeleteTestSuiteStatus(err.status);
            });
                    
    }

    const navigateToUpdateTestSuitePage = (testSuite) => {
        navigate(`${Routes.MAIN_PAGE_ROUTE}/${projectId}/${testSuite.id}/update`);
    }

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
                            <Input placeholder={"Search test-suite"} minWidthPercent={"auto"} onChange={onChangeSearch} value={searchQuery} margin={"0px 0px 0px 0px"}/>
                            <StyledArticleFilterByTag>
                                <label>Filter by tag:</label>
                                <Dropdown onChange={onChangeFilterByTag} selectConfig={filterByTagDropdownConfig}>
                                    <option>...</option>
                                    <option>SMOKE</option>
                                    <option>CRITICAL PATH</option>
                                </Dropdown>
                            </StyledArticleFilterByTag>
                            <StyledArticleConvertControllers>
                                <Button buttonConfig={convertAndLoadExcelBackupButton} />
                                <StyledConvertIcon />
                                <Button buttonConfig={confirmParsedAddedExcelFileButton} />
                            </StyledArticleConvertControllers>
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
                        
                        {   
                            
                            filteredTestSuites.length > 0 
                            ? <StyledMainGrid>
                                {
                                    filteredTestSuites.map((testSuite) => 
                                        <TestSuite 
                                            key={testSuite.id} 
                                            testSuite={testSuite} 
                                            loading={loading} 
                                            projectId={projectId} 
                                            onDelete={() => deleteTestSuite(testSuite)}
                                            onUpdate={() => navigateToUpdateTestSuitePage(testSuite)}
                                        />
                                    )
                                }
                            </StyledMainGrid>
                            : <StyledTestSuiteNotFoundArticle>Test-suites not found</StyledTestSuiteNotFoundArticle>
                            
                        }
                        
                    </StyledSectionsWrapper>
                </StyledTestSuitesContainer>
            </LayoutWrapperWithHeader>
            <Modal isOpen={addExcelFileModalIsOpen} closeModal={handleCloseAddExcelFileModal}>
                <p>Add excel file to backup: </p>
                <StyledParsedExcelContainer>
                    <StyledAddExcelBackupForm>
                        <Input margin={"5px 0 5px 0"} type='file' onChange={addExcelFile}/>
                        <Button buttonConfig={convertAndParseExcelBackupButton} />
                        {
                            parsedExcelBackupStatus >= 300 ? <Notification $status={parsedExcelBackupStatus} /> : ""
                        }
                    </StyledAddExcelBackupForm>
                </StyledParsedExcelContainer>
            </Modal>
        </MainWrapper>
    )
}

export default ProjectPage;