import React from 'react';
import '../Css/Dashboard.css'
import Container from '@mui/material/Container';
import Notes from '../components/Notes';
function Dashboard(){
return (
    <>
    <Container>
        <h1 className="notes_title">Dormakaba Notes</h1>
        <Notes></Notes>
    </Container>
    

    </>
)
}
export default Dashboard;