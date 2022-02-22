import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete'

import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    root: {
      backgroundColor: (props) => props.color
    },
  });

export default function StudentCard(props) {
    const {student, deleteStudent} = props;
    const classes = useStyles({color: student.color});

    return (
        <Card>
            <CardContent className={classes.root}>
                <h2>{student.name}</h2>
                <b>{student.age}</b>
            </CardContent>
            <CardActions>
                <Button endIcon={<DeleteIcon />} onClick={() => deleteStudent(student._id)}></Button>
            </CardActions>
        </Card>
    )
}