import {useState} from 'react';
import SignIn from './components/SignIn';
import Layout from './components/dashboard/Layout';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Notify = ({errorMessage}) => {
    if (! errorMessage) return null

    return (
        <div style={{color: 'red'}}>
            {errorMessage}
        </div>
    )
}

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState(null);

    const notify = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    /* SignIn page */
    if (!token) {
        return (
        <>
            <ThemeProvider theme={theme}>
                <Notify errorMessage={errorMessage} />
                <SignIn setToken={setToken} 
                        setError={notify}></SignIn>
            </ThemeProvider>
        </>
        )
    }

    /* Content of the page when user is logged in */
    return (
        <>
            <ThemeProvider theme={theme}>
                <Layout 
                    setToken={setToken} 
                    token={token}/>
            </ThemeProvider>
        </>
    )
}

export default App;