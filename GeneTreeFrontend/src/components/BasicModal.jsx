import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import NewPersonForm from './NewPersonForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ onSave, personToEdit, onClose }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose(); // Chama onClose se foi passada como prop
  };

  const handleSave = (newPerson) => {
    onSave(newPerson);
    handleClose(); // Fecha o modal após salvar
  };

  // Abre o modal automaticamente apenas quando for edição
  React.useEffect(() => {
    if (personToEdit) {
      setOpen(true);
    }
  }, [personToEdit]);

  return (
    <div>
      <nav className='navBtnModal'>
        <Button id='btnModal' variant="contained" onClick={() => {
          setOpen(true);
          onClose(); // Garante que o personToEdit seja resetado
        }}>New Person</Button>
      </nav>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewPersonForm 
            onClose={handleClose} 
            onSave={handleSave} 
            personToEdit={personToEdit} // Passa a pessoa para edição
          />
        </Box>
      </Modal>
    </div>
  );
}