import {useQuery} from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import {ALL_PERSONS} from './queries'

const App = () => {
    const result = useQuery(ALL_PERSONS, {
        // Set the query to poll every two seconds
        pollInterval: 2000
    })

    if (result.loading) {
        // the query has not received a response yet
        return <div>loading...</div>
    }

    return (
        <div>
            <Persons persons={result.data.allPersons}/>
            <PersonForm />
        </div>
    )
}

export default App;