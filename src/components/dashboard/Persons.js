import {useState} from 'react'
import {useQuery} from '@apollo/client'
import {FIND_PERSON} from '../../queries'

const Person = ({ person, onClose }) => {
    return (
        <div>
            <h2>{person.name}</h2>
            <div>
                {person.address.street} {person.address.city}
            </div>
            <div>{person.phone}</div>
            <button onClick={onClose}>close</button>
        </div>
    )
}

const Persons = ({ persons }) => {
    const [nameToSearch, setNameToSearch] = useState(null)

    // the query is executed if nameToSearch has a value
    const result = useQuery(FIND_PERSON, {
        variables: { nameToSearch },
        skip: !nameToSearch,
    })

    if (nameToSearch && result.data) {
        // Render a person's address info
        return (
            <Person
                person={result.data.findPerson}
                onClose={() => setNameToSearch(null)}
            />
        )
    }
    // Render persons list
    return (
        <div>
            <h2>Persons</h2>
            {persons.map(p =>
                <div key={p.name}>
                    {p.name} {p.phone}
                    <button onClick={() => setNameToSearch(p.name)}>
                        show address
                    </button>
                </div>
            )}
        </div>
    )
}

export default Persons;
