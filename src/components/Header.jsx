import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles({
    navlink: {
      color: (props) => props.color || "white",
      margin: "20px",
      textDecoration: "none"
    },
  });

export default function Header(props) {
    const classes = useStyles({color: props.color});
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    useEffect(() => {
        /*
        retrieve profile of user logged (if is logged)
        */
    }, [])

    return (
        <AppBar position="static" >
            <Toolbar>
                <NavLink to="/" className={classes.navlink}>Home page</NavLink>
                {
                    token ? 
                    <>
                        <p>{/*nom de l'utilisateur*/}</p>
                        <p className={classes.navlink} onClick={logout}>Logout</p>
                    </>
                    
                    :
                    <NavLink to="/login" className={classes.navlink}>Login page</NavLink>
                }
            </Toolbar>
        </AppBar>
    )
}