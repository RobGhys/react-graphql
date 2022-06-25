import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import SaveIcon from '@material-ui/icons/Save';
import {useState} from 'react'
import {useMutation} from '@apollo/client'
import {ALL_PERSONS, CREATE_PERSON} from '../../queries'

import Title from './Title';

const PersonForm = ({ setError }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');

    const [ createPerson ] = useMutation(CREATE_PERSON, {
        refetchQueries: [ { query: ALL_PERSONS } ],
        onError: (error) => {
            setError(error.graphQLErrors[0].message);
        }
    })

    const submit = (event) => {
        event.preventDefault();

        createPerson({ variables: {name, phone, street, city } });

        setName('');
        setPhone('');
        setStreet('');
        setCity('');
    }

    return (
        <React.Fragment>
            <Title>Create new</Title>

            <form onSubmit={submit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="name"
                        label="Name"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="phone"
                        label="Phone Number"
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="street"
                        label="Street Name"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                        value={street}
                        onChange={({ target }) => setStreet(target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="city"
                        label="City"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                        value={city}
                        onChange={({ target }) => setCity(target.value)}
                    />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button color='secondary' sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                    <Button variant="contained" 
                            endIcon={<SaveIcon />}
                            type='submit'>
                        Save
                        </Button>
                </Box>
            </form>
        </React.Fragment>
    )
}

export default PersonForm;