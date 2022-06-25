import * as React from 'react';
import {useEffect, useState} from 'react'
import { useMutation } from '@apollo/client'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import SaveIcon from '@material-ui/icons/Save';

import Title from './Title';
import { EDIT_NUMBER } from '../../queries'

const PhoneForm = ({ setError }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [ changeNumber, result ] = useMutation(EDIT_NUMBER);

    const submit = (event) => {
        event.preventDefault();

        changeNumber({ variables: { name, phone } })

        setName('')
        setPhone('')
    }

    useEffect(() => {
        if (result.data && result.data.editNumber === null) setError('person not found')

    }, [result.data]) // eslint-disable-line

    return (
        <React.Fragment>
            <Title>Change Number</Title>

            <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                    <TextField
                        required
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                        id="name"
                        label="Name"
                        fullWidth
                        variant="standard"
                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <TextField
                        required
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                        id="phone"
                        label="Phone"
                        fullWidth
                        variant="standard"
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
                            Change Number
                        </Button>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default PhoneForm