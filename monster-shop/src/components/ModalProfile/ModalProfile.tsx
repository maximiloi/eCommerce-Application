import { useState } from 'react';
import { Modal, Fade, Backdrop, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export interface ModalProfileProps {
  onClose: () => void;
  fullName: string;
  textCreatorArray: string[];
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  border: '1px solid grey',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

function renderText(text: string, index: number) {
  const lastChar = text.charAt(text.length - 1);

  if (lastChar === ':') {
    return <h5 key={index}>{text}</h5>;
  }
  return <p key={index}>{text}</p>;
}

function ModalProfile({
  onClose,
  fullName,
  textCreatorArray,
}: ModalProfileProps) {
  const [open] = useState(true);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {fullName}
          </Typography>
          {textCreatorArray.map((text, index) => renderText(text, index))}
        </Box>
      </Fade>
    </Modal>
  );
}

ModalProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
  fullName: PropTypes.string.isRequired,
  textCreatorArray: PropTypes.string.isRequired,
};

export default ModalProfile;
