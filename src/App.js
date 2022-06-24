import {useState} from 'react';
import SignIn from './components/SignIn';
import Layout from './components/dashboard/Layout';

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
            <Layout/>
        </div>
    )
}

export default App;