import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles({
    navlink: {
        color: (props) => props.color || "white",
        margin: "20px",
        textDecoration: "none"
    },
    root: {
        width: "100%"
    },
    right: {
        textAlign: "right"
    }
});

export default function Header(props) {
    const classes = useStyles({ color: props.color });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [user, setUser] = useState(null);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    useEffect(() => {
        /*
        retrieve profile of user logged (if is logged)
        */
        const fetchProfile = async () => {
            const url = "http://localhost:3000/user/profile"
            let config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            try {
                let dataTmp = await axios.get(url, config);
                let user = dataTmp.data;
                console.log(user);
                setUser(user);

            } catch (error) {
                //setErrorMessage(error.message)
            }

        }
        if (token) fetchProfile();
    }, [token])

    return (
        <AppBar position="static" >
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center" className={classes.root}>
                    <Grid item xs={6}>
                        <NavLink to="/" className={classes.navlink}>Home page</NavLink>
                    </Grid>
                    <Grid item xs={6} container justifyContent="flex-end" alignItems="center">
                        {
                            token ?
                                <>
                                    {user && <p>{user.name}</p>}
                                    <p className={classes.navlink} onClick={logout}>Logout</p>
                                </>

                                :
                                <NavLink to="/login" className={classes.navlink}>Login page</NavLink>
                        }
                    </Grid>
                </Grid>


            </Toolbar>
        </AppBar>
    )
}