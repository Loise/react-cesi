import React, { useEffect, useState } from 'react';
import axios from 'axios';

import StudentCard from '../components/StudentCard'
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Home() {
    const [students, setStudents] = useState([])

    const [studentAverage, setStudentAverage] = useState("");

    const [errorMessage, setErrorMessage] = useState(null);

    const fetchData = async () => {
        const url = "http://localhost:3000/student/"
        try {
            let dataTmp = await axios.get(url);
            setStudents(dataTmp.data);
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const fetchAverage = async () => {
        const url = "http://localhost:3000/student/average"
        try {
            let dataTmp = await axios.get(url);
            setStudentAverage(dataTmp.data);
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        Promise.all([fetchData(), fetchAverage()])
    }, [])

    const deleteStudent = async (id) => {
        const url = `http://localhost:3000/student/${id}`
        try {
            await axios.delete(url);
            await fetchData();
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <>
            <h1>Home page</h1>
            <b>{studentAverage}</b><br /><br />
            <Snackbar open={errorMessage !== null} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
                <Alert severity="error" variant="filled">{errorMessage}</Alert>
            </Snackbar>
            <Grid container spacing={2}>
                {
                    students.map((s) => <Grid item xs={3}><StudentCard student={s} deleteStudent={deleteStudent} /></Grid>)
                }
            </Grid>

        </>
    )
}

export default Home;