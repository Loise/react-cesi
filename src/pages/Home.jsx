import React, { useEffect, useState } from 'react';

import StudentCard from '../components/StudentCard'
import Grid from '@mui/material/Grid';
import { fetch } from '../tools/api'
function Home(props) {
    const {setErrorMessage} = props;
    const [students, setStudents] = useState([])

    const [studentAverage, setStudentAverage] = useState("");

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

    return (
        <>
            <h1>Home page</h1>
            <b>{studentAverage}</b><br /><br />
            <Grid container spacing={2}>
                {
                    students.map((s) => <Grid item xs={3}><StudentCard {...props} student={s} deleteStudent={deleteStudent} /></Grid>)
                }
            </Grid>

        </>
    )
}

export default Home;