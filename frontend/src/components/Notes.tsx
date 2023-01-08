import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import CardHeader from '@mui/material/CardHeader';
import NoteModal from './NoteModal';

export interface NoteProps{
  nId: number;
  uId:number;
  title: string;
  text: string;
  //createdAt: Date;
}
export interface NoteModalProps{
  open: boolean;
  note: NoteProps;
  handleClose:() => void,
}
function Notes() {

  const [selected,setSelected] = useState<NoteProps>();
  const [open, setOpen] = useState(false);
  const handleOpen = (note: NoteProps) => {
    setSelected(note);
    setOpen(true);
  };
  const handleClose = () => {
    setSelected(undefined);
    setOpen(false);
  };
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
    console.log(data);
    return (
      <>
      <div className="w-full mt-10">
        <Grid container spacing={1}>
          {data.data.map((note: any) => (
            <div onClick={()=>handleOpen(note)}>
              <Card 
                variant="outlined"
                id={note.nId}
                key={note.nId}
                sx={{
                  width: 225,
                  height: "90%",
                  display:"flex",
                  flexDirection: "column",
                  position: "relative",
                  margin: "20px",
              }}
              >
                <CardHeader titleTypographyProps={{variant:'h6'}} title={note.title}></CardHeader>
                <CardContent>
                  <Typography variant="body2">{note.text}</Typography>
                </CardContent>
                <CardActions disableSpacing sx={{mt: "auto"}}>
                </CardActions>
              </Card>
            </div>
              
          ))}
        </Grid>
      </div>
      <NoteModal open={open} note={selected} onClose={handleClose}></NoteModal>
      </>
    );
  }
  return <div>Nothing</div>
}
export default Notes;