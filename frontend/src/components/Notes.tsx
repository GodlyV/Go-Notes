import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import CardHeader from '@mui/material/CardHeader';
import {positions} from '@mui/system';
function Notes() {
  const fetchData: () => any = async () => {
    const URL = `http://localhost:3001/notes`;
    const response = await axios.get(URL);
    return response;
  };
  const { data, refetch, isLoading, isError, isSuccess } = useQuery(
    ["getNotes"],
    fetchData,
    { enabled: true }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  if (isSuccess) {
    console.log(data)
    return (
      <>
      <div className="w-full mt-10">
        <Grid container spacing={1}>
          {data.data.map((note: any) => (
             <Card 
              variant="outlined"
              id={note.nId}
              key={note.nId}
              sx={{
                width: 225,
                height: 225,
                position: "relative",
                margin: "20px",
            }}
             >
              <CardHeader key={note.nId} titleTypographyProps={{variant:'h6'}} title={note.title}></CardHeader>
               <CardContent>
                <Typography variant="body2">{note.text}</Typography>
               </CardContent>
               <CardActions sx={{bottom: 'absolute'}}>
               <Button size="small">Learn More</Button>
               </CardActions>
             </Card>
          ))}
        </Grid>
      </div>
      </>
    );
  }
  return <div>Nothing</div>
}
export default Notes;