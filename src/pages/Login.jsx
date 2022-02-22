import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles({
    root: {
        width: "60%",
        margin: "auto"
    },
});

function Login() {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState(null);

    const login = async () => {
        const url = "http://localhost:3000/user/login"
        try {
            let res = await axios.post(url, {
                email: mail,
                password
            })
            console.log(res.data);
        } catch (e) {
            setErrorMessage(e.message)
        }

    }
    return (
        <Paper>
            <h1>Login page</h1>
            <Snackbar open={errorMessage !== null} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
                <Alert severity="error" variant="filled">{errorMessage}</Alert>
            </Snackbar>
            <div className={classes.root}>
                <TextField
                    required
                    label="Mail"
                    value={mail}
                    fullWidth={true}
                    onChange={(event) => setMail(event.target.value)}
                />
                <TextField
                    required
                    label="Password"
                    value={password}
                    fullWidth={true}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button variant="contained" fullWidth={true} onClick={login}>
                    Se connecter
                </Button>
            </div>
        </Paper>
    )
}

export default Login;