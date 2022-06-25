import * as React from 'react';
import {useState} from 'react'
import {useQuery} from '@apollo/client'
import {FIND_PERSON} from '../../queries'
import Title from './Title';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

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
        <React.Fragment>
            <Title>Persons</Title>
            <Table size="small">
                {/* Header */}
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>

                {/* Body */}
                <TableBody>
                    {persons.map(p =>
                        <TableRow key={p.name}>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>{p.phone}</TableCell>
                            <TableCell>
                                <Button variant="contained"
                                        onClick={() => setNameToSearch(p.name)}>
                                show address</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default Persons;
