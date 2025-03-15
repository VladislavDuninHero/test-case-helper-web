import LoginPage from './components/login/LoginPage.jsx'

import GlobalStyle from './components/styled/GlobalStyles.jsx'

import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
