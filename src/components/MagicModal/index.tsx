import React, { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

interface MagicModalProps {
  open: boolean;
  onClose: () => void;
}

const MagicModal: React.FC<MagicModalProps> = ({ open, onClose }) => {
  const [step, setStep] = useState(1);

  const onNext = () => {
    setStep((prevStep) => (prevStep < 4 ? prevStep + 1 : 1));
  };

  const getContent = () => {
    switch (step) {
      case 1:
        return 'Conteúdo da Etapa 1';
      case 2:
        return 'Conteúdo da Etapa 2';
      case 3:
        return 'Conteúdo da Etapa 3';
      case 4:
        return 'Conteúdo da Etapa 4';
      default:
        return 'Conteúdo da Etapa 1';
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'black',
          color: 'white',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Modal - Etapa {step}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {getContent()}
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '100px',
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: 150,
              backgroundColor: '#564d4d',
              color: 'white',
              '&:hover': {
                backgroundColor: '#831010',
              },
            }}
            onClick={onClose}
          >
            Fechar
          </Button>
          <Button
            variant="contained"
            sx={{
              width: 150,
              backgroundColor: '#e50914',
              color: 'white',
              '&:hover': {
                backgroundColor: '#b00610',
              },
            }}
            onClick={onNext}
          >
            Continuar
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default MagicModal;
