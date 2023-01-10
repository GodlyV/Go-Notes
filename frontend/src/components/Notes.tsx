import React, { forwardRef, useContext, useEffect, useMemo, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import CardHeader from '@mui/material/CardHeader';
import NoteModal from './NoteModal';
import { MyGlobalContext } from '../App';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Zoom from '@mui/material/Zoom';



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
  isNewNote: boolean;
}

function Notes() {
  const {refreshNumber, setRefreshNumber} = useContext(MyGlobalContext);
  const [selected,setSelected] = useState<NoteProps>({nId:0,uId:0,title:"",text:""});
  const [uid,setUid] = useState(0);
  const [nid,setNid] = useState(0);
  const [open, setOpen] = useState(false);
  const [isNewNote,setIsNewNote] = useState(false);
  const handleOpen = (note: NoteProps) => {
    setSelected(note);
    setOpen(true);
  };
  const handleClose = () => {
    setSelected({nId:0,uId:0,title:"",text:""});
    setIsNewNote(false);
    setOpen(false);
  };
  const handleDelete = (uid:number,nid:number ) => {
    setUid(uid);
    setNid(nid);
    reDelete();
  };
  const handleAdd = () => {
    setOpen(true);
    setIsNewNote(true);
  };
  useEffect(() => {
    if(!open && nid !== 0 && uid !== 0 && nid !== undefined && uid !== undefined){
      reDelete();
      deleteNote();
    }
  },[uid,nid]);

  const fetchNote: () => any = async () => {
    const URL = `http://localhost:3001/GET/notes`;

    const response = await axios.get(URL,{
      params: {
        uid: 1,
    }});
    return response;
  };
  const { data:notesData, refetch:reGet, isSuccess:notesSuccess } = useQuery(
    ["getNotes"],
    fetchNote,
    { enabled: true }
  );

  const deleteNote: () => any = async () => {
    const URL = `http://localhost:3001/DELETE/notes/${uid}/${nid}`;
    const response = await axios.delete(URL);
    return response;
  };

  const { data:deleteData, refetch: reDelete, isSuccess:isDeleted } = useQuery(
    ["deleteNote"],
    deleteNote,
    { enabled: false }
  );

  useEffect(() =>{
    reGet();
  },[refreshNumber]);

  useMemo(() => {
      setRefreshNumber(refreshNumber+1);
  },[isDeleted,deleteData]);

  if (notesSuccess) {
    return (
      <>
      
      <div className="w-full mt-10" style={{backgroundColor: "" }}>
        <Grid container spacing={1} sx={{borderRadius: '22px', backgroundColor: "#c0cef0", alignItems:'center'}}>
        <div onClick={()=>handleAdd()}>
            <Card 
              variant="outlined"
              id={'newNote'}
              key={'newNote'}
              sx={{
                width: 225,
                height: 160,
                display:"center",
                flexDirection: "column",
                position: "relative",
                margin: "20px",
            }}
            >
              <CardActions sx={{marginLeft: "auto",marginRight:"auto"}}>
              <IconButton onClick={()=>handleAdd()} aria-label="add-Icon">
                <AddIcon id="add-button"></AddIcon>
                  </IconButton>
              </CardActions>
            </Card>
          </div>
          {notesData.data.map((note:any) => (
            
              <Card
                variant="outlined"
                key={`card${note.nid}`}
                id={`card${note.nid}`}
                sx={{
                  borderRadius:'8px',
                  padding:"10px",
                  width: 225,
                  height: "90%",
                  display:"flex",
                  flexDirection: "column",
                  position: "relative",
                  margin: "20px",
              }}
              >
                
                  <CardHeader id={`cardTitle${note.nid}`} key={`cardTitle${note.nid}`} titleTypographyProps={{variant:'h6'}} title={note.title}
                  action={
                    <IconButton onClick={()=>handleDelete(note.uid,note.nid)} aria-label="settings">
                      <DeleteOutlineIcon color="warning"></DeleteOutlineIcon>
                    </IconButton> 
                  }
                  ></CardHeader>

              <div onClick={()=>handleOpen(note)}>
                  <CardContent>
                    <Typography id={`cardText${note.nid}`} style={{wordWrap:"break-word"}} variant="body2">{note.text}</Typography>
                  </CardContent>
                  <CardActions disableSpacing sx={{mt: "auto"}}>
                  </CardActions>
                </div>

              </Card>
              
          ))}
        </Grid>
        
      </div>
      <NoteModal open={open} note={selected} onClose={handleClose} isNewNote={isNewNote}></NoteModal>
      </>
    );
  }
  return (
    <div>
      <div className="w-full mt-10">
        <Grid container spacing={1}>
          <div onClick={()=>handleAdd}>
            <Card 
              variant="outlined"
              id={'newNote'}
              key={'newNote'}
              sx={{
                width: 225,
                height: 160,
                display:"center",
                flexDirection: "column",
                position: "relative",
                margin: "20px",
            }}
            >
              <CardActions sx={{marginLeft: "auto",marginRight:"auto"}}>
              <IconButton onClick={()=>handleAdd} aria-label="add-Icon">
                <AddIcon></AddIcon>
                  </IconButton>
              </CardActions>
            </Card>
          </div>
        </Grid>
      </div>
        <NoteModal open={open} note={selected} onClose={handleClose} isNewNote={isNewNote}></NoteModal>

  </div>
  );
}
export default Notes;