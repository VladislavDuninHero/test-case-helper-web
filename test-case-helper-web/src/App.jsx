import LoginPage from './components/login/LoginPage.jsx'
import ProjectsPage from './components/projects/ProjectsPage.jsx';

import GlobalStyle from './components/styled/GlobalStyles.jsx'

import { BrowserRouter, Routes, Route } from 'react-router';

import SuitesPage from './components/suites/SuitesPage.jsx';
import CasesPage from './components/cases/CasesPage.jsx';
import NotFound from './components/errors/NotFound.jsx';
import Project from './components/projects/Project.jsx';
import TestSuite from './components/suites/TestSuite.jsx';
import TestCase from './components/cases/TestCase.jsx';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/projects" element={<ProjectsPage />}/>
        <Route path="/projects/:projectId" element={<Project />}/>
        <Route path="/projects/:projectId/suites" element={<SuitesPage />}/>
        <Route path="/projects/:projectId/suites/:suiteId" element={<TestSuite />}/>
        <Route path="/projects/:projectId/suites/:suiteId/cases" element={<CasesPage />}/>
        <Route path="/projects/:projectId/suites/:suiteId/cases/:caseId" element={<TestCase />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
