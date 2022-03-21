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

    const [newLogin, setNewLogin] = useState("");
    const [newMessage, setNewMessage] = useState([])

    const [userName, setUserName] = useState("");
    const [isUserName, setIsUserName] = useState(false);


    const [roomName, setRoomName] = useState("default");

    useEffect(() => {

        socket.on("FromAPI", data => {
            setResponse(data);
        });

        socket.on("new login", data => {
            setNewLogin(data);
            setUserName(data);
            setIsUserName(true);
        });


    }, []);

    /*useEffect(() => {
        socket.on("new message", data => {
            setNewMessage([...newMessage, data]);
        });


        socket.on("default", data => {
            setNewMessage([...newMessage, data]);
        });
    }, [newMessage]);*/



    useEffect(() => {
        socket.on(roomName, data => {
            setNewMessage([...newMessage, data]);
        });
    }, [newMessage, roomName]);


    const fetchMessages = async () => {
        const url = "/message/"
        try {
            let dataTmp = await fetch('get', url, localStorage.getItem('token'));
            
            setNewMessage(dataTmp.map((m) => `${m.name} on ${m.room} : ${m.message} - ${new Date(m.created_at).toLocaleDateString()} ${new Date(m.created_at).toLocaleTimeString()}`));
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

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
        Promise.all([fetchData(), fetchAverage(), fetchMessages()])
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

    const sendMessage = async () => {
        socket.emit("chat message", { username: userName, roomname: roomName, msg: message })
        const url = `/message`
        try {
            //await fetch('post', url, localStorage.getItem('token'));
            console.log(localStorage.getItem('token'))
            await fetch('post', url, localStorage.getItem('token'), {name: userName,
                room: roomName,
                message: message });
            /*await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: userName,
                    room: roomName,
                    message: message })
            });*/

        } catch (error) {
            console.log(error)
            setErrorMessage(error.message)
        }
        setMessage("")
    }

    const joinRoom = () => {
        socket.emit("joinRoom", { username: userName, roomname: roomName })
    }


    return (
        <>
            <h1>Home page</h1>
            {
                isUserName ?
                    <>
                        <b>Join room :</b><br />
                        <input type="text" value={roomName} onChange={(event) => setRoomName(event.target.value)} /> <br />
                        <button type="button" onClick={joinRoom}>Join</button><br /><br />
                        <b>Send message :</b><br />
                        <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} /> <br />

                        <button type="button" onClick={sendMessage}>Send</button>
                    </>
                    :
                    <>
                        <b>What is your name:</b><br />
                        <input type="text" value={userName} onChange={(event) => setUserName(event.target.value)} />
                        <button type="button" onClick={() => setIsUserName(true)}>Save</button>
                    </>
            }

            <br /><br />
            <b>Last messages ({newMessage.length}):
                {newMessage.map((m) => <p>{m}</p>)}
            </b>
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
            <p>{newLogin}</p>

        </>
    )
}

export default Home;