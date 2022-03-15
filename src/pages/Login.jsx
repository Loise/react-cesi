import Paper from '@mui/material/Paper';
import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import { useNavigate } from "react-router-dom";
import { fetch } from '../tools/api'
const useStyles = makeStyles({
    root: {
        width: "60%",
        margin: "auto"
    },
});

function Login(props) {
    const {setErrorMessage} = props;
    let navigate = useNavigate();

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const classes = useStyles();

    const login = async () => {
        const url = "/user/login/"
        try {
            let res = await fetch('post', url, '', {
                email: mail,
                password
            });
            let token = res.accessToken;
            localStorage.setItem('token', token);
            navigate('/')
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <Paper>
            <h1>Login page</h1>
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