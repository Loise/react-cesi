import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    navlink: {
      color: (props) => props.color || "white",
      margin: "20px",
      textDecoration: "none"
    },
  });

export default function Header(props) {
    const classes = useStyles({color: props.color});
    return (
        <AppBar position="static" >
            <Toolbar>
                <NavLink to="/" className={classes.navlink}>Home page</NavLink>
                <NavLink to="/login" className={classes.navlink}>Login page</NavLink>
            </Toolbar>
        </AppBar>
    )
}