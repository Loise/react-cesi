import React, { useEffect, useState } from 'react';

import StudentCard from '../components/StudentCard'
import Grid from '@mui/material/Grid';
import { fetch } from '../tools/api'
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:3000";
const socket = socketIOClient(ENDPOINT);

function Home(props) {
    const { setErrorMessage } = props;
    const [students, setStudents] = useState([])

    const [studentAverage, setStudentAverage] = useState("");
    const [response, setResponse] = useState("");
    const [message, setMessage] = useState("");
    const [newMessage, setNewMessage] = useState([])
    useEffect(() => {
        
        socket.on("FromAPI", data => {
            setResponse(data);
        });
    }, []);



    const fetchData = async () => {
        const url = "/student/"
        try {
            let dataTmp = await fetch('get', url, '');
            setStudents(dataTmp);
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const fetchAverage = async () => {
        const url = "/student/average"
        try {
            let dataTmp = await fetch('get', url, '');
            setStudentAverage(dataTmp);
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        Promise.all([fetchData(), fetchAverage()])
    }, [])

    const deleteStudent = async (id) => {
        const url = `/student/${id}`
        try {
            await fetch('delete', url, localStorage.getItem('token'));
            await fetchData();
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const sendMessage = () => {
        socket.emit("chat message", message)
    }

    return (
        <>
            <h1>Home page</h1>
            <b>Send message to everyone :</b><br />
            <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
            <button type="button" onClick={sendMessage}>Send</button>
            <br /><br />
            <b>{studentAverage}</b>
            <br /><br />
            <Grid container spacing={2}>
                {
                    students.map((s) => <Grid item xs={3}><StudentCard {...props} student={s} deleteStudent={deleteStudent} /></Grid>)
                }
            </Grid>
            <p>
                It's <time dateTime={response}>{response}</time>
            </p>

        </>
    )
}

export default Home;