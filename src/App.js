import { useQuery, useApolloClient } from '@apollo/client'
import {useState} from 'react';

//import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AppBar, Container, Drawer } from '@mui/material';
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from "./components/PhoneForm";
import SignIn from './components/SignIn';

import {ALL_PERSONS} from './queries'

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
    const result = useQuery(ALL_PERSONS);
    const client = useApolloClient()

    if (result.loading) {
        // the query has not received a response yet
        return <div>loading...</div>
    }

    const notify = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    if (!token) {
        return (
        <>
            <Notify errorMessage={errorMessage} />
            <SignIn setToken={setToken} setError={notify}></SignIn>
        </>
        )
    }

    return (
        <div>
            <AppBar></AppBar>
            <Drawer></Drawer>
            <Container maxWidth="sm">
                <Notify errorMessage={errorMessage}/>
                <Button variant="contained" onClick={logout}>logout</Button>
                <Persons persons={result.data.allPersons}/>
                <PersonForm setError={notify}/>
                <PhoneForm setError={notify}/>
            </Container>
        </div>
    )
}

export default App;