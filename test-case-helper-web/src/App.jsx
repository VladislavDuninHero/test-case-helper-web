import LoginPage from './components/login/LoginPage.jsx'
import ProjectsPage from './components/projects/ProjectsPage.jsx';
import CreateProjectPage from './components/projects/CreateProjectPage.jsx';

import GlobalStyle from './components/styled/GlobalStyles.jsx'

import { BrowserRouter, Routes, Route } from 'react-router';

import SuitePage from './components/suites/SuitePage.jsx';
import NotFound from './components/errors/NotFound.jsx';
import ProjectPage from './components/projects/ProjectPage.jsx';
import TestCase from './components/cases/TestCase.jsx';
import CreateTestCasePage from './components/cases/CreateTestCasePage.jsx';
import CreateTestSuitePage from './components/suites/CreateTestSuitePage.jsx';
import UpdateTestSuitePage from './components/suites/UpdateTestSuitePage.jsx';

import AuthProvider from './service/auth/AuthProvider.jsx';
import UpdateProjectPage from './components/projects/UpdateProjectPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
          <Route path="/projects/create" element={<CreateProjectPage />} />
          <Route path="/projects/:projectId/update" element={<UpdateProjectPage />} />
          <Route path="/projects/:projectId/suite/create" element={<CreateTestSuitePage />} />
          <Route path="/projects/:projectId/:suiteId/update" element={<UpdateTestSuitePage />} />
          <Route path="/projects/:projectId/:suiteId" element={<SuitePage />} />
          <Route path="/projects/:projectId/:suiteId/case/create" element={<CreateTestCasePage />} />
          <Route path="/projects/:projectId/suites/:suiteId/case/:caseId" element={<TestCase />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
