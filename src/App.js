import { gql, useQuery } from '@apollo/client'
import Persons from './components/Persons'

const ALL_PERSONS = gql`
query {
  allPersons {
    name
    phone
    id
  }
}
`

const App = () => {
    const result = useQuery(ALL_PERSONS)

    if (result.loading) {
        // the query has not received a response yet
        return <div>loading...</div>
    }

    return (
        <Persons persons={result.data.allPersons}/>
    )
}

export default App;