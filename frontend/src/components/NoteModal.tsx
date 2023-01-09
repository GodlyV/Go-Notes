import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import { MyGlobalContext } from "../App";

interface IModalContentEditNotesProps{
    open: boolean;
    note: any;
    onClose:()=> void;
    isNewNote: boolean;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const NoteModal = ({ open ,note, onClose, isNewNote }: IModalContentEditNotesProps) => {
    const {refreshNumber, setRefreshNumber} = useContext(MyGlobalContext);
    const [title,setTitle] = useState(note.title);
    const [text,setText] = useState(note.text)
    //const [createdAt,setCreatedAt] = useState(note.createdAt);
    const handleClose = () => {
        onClose();
    };

    const handleInput = (event: any) => {
        if(event.target.id === "modal-title"){
            setTitle(event.target.value);
        }
        else if(title ==="" || title === undefined){
            setTitle(note.title);
        }

        if(event.target.id === "modal-text"){
            setText(event.target.value);
        }
        else if(text ==="" || text === undefined){
            setText(note.text);
        }

      };
    const handleSubmit = (event:any) => {
        console.log(text)
        if(title!=="" && text!=="" && title!==undefined && text!==undefined){
            if(isNewNote){
                addRefetch();
            }
            else{
                refetch();
            }
        }
        setTitle("");
        setText("");
        onClose();
    };

    const putNote: () => any = async () => {
        const URL = `http://localhost:3001/PUT/notes/${note.uid}/${note.nid}`;
        const response = await axios.put(URL, 
            {
                title: title,
                text: text,
            });
        return response;
    };
    const { data, refetch, isLoading, isError, isSuccess:putIsSuccess } = useQuery(
        ["putNotes"],
        putNote,
        { enabled: false }
      );

    const addNote: () => any = async () => {
        const URL = `http://localhost:3001/POST/notes/1`;
        const response = await axios.post(URL,
            {
                title: title,
                text: text,
            });
        return response;
    };
    const { data: addData, refetch: addRefetch, isSuccess: addIsSuccess } = useQuery(
        ["addNotes"],
        addNote,
        { enabled: false }
        );
    
    useMemo(() => {
        setRefreshNumber(refreshNumber + 1);
    }, [data, putIsSuccess, addIsSuccess, addData]);
    
    if(note){
        return (
            <Modal
                open={open}
                onClose={handleClose}
                key={note.nid}
        
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div>
                    <Stack spacing={2} sx={style} border='ActiveBorder'>
                        <form>
                            <Input sx={{ fontSize: 38, textAlign: 'center' }} disableUnderline name = "title"
                            id="modal-title" placeholder="Enter Title..."  onChange={event => handleInput(event)} defaultValue={note.title}/>

                            <Input style={{textAlign:'center'}} id="modal-text" defaultValue={note.text} placeholder="Enter Text..." disableUnderline 
                                name="text" onChange={event => handleInput(event)}/>
                            <Grid padding={3} container spacing={2}>
                                <Button sx={{marginLeft:"auto"}} variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
                                <Button sx={{marginRight:"auto"}} variant="outlined" onClick={handleSubmit}>Save</Button>
                            </Grid>
                        </form>
                    

                    </Stack>
                </div>
                
              </Modal>  
        )
    }
    return(
        <div></div>
    );
    
}
export default NoteModal;