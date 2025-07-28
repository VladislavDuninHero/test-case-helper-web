import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {ThemeProvider} from "styled-components";
import {lightTheme} from "./components/theme/theme.js";
import {UserProvider} from "./service/context/UserProvider.jsx";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={lightTheme}>
            <UserProvider>
                <App/>
            </UserProvider>
        </ThemeProvider>
    </StrictMode>,
)
