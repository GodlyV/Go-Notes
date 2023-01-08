import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { useState } from "react";

interface IModalContentEditNotesProps{
    open: boolean;
    note: any;
    onClose:()=> void;
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

const NoteModal = ({ open ,note, onClose }: IModalContentEditNotesProps) => {
    const [title,setTitle] = useState("");
    const [text,setText] = useState("");
    //const [createdAt,setCreatedAt] = useState(note.createdAt);
    const handleClose = () => {
        onClose();
    }
    if(note){     
        return (
            <Modal
                open={open}
                onClose={handleClose}
                key={note.nId}
        
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Stack spacing={5} sx={style} border='ActiveBorder'>
                  <Input sx={{ fontSize: 50, textAlign: 'center' }} disableUnderline
                    id="modal-modal-title" defaultValue={note.title}/>

                  <Input id="modal-modal-description" defaultValue={note.text}sx={{ mt: 2 }} disableUnderline/>
                </Stack>
              </Modal>  
        )
    }
    return(
        <div></div>
    );
    
}
export default NoteModal;