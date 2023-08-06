'use client';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardMedia, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  IconButton, 
  Typography,
} from '@mui/material';

const DepartmentCard = () => {

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 400 }}
      onClick={handleExpandClick}>
      <CardHeader
        title='HR dept'
      />
      <CardMedia
        component='img'
        height='194'
        sx={{ objectFit: 'contain' }}
        image='/department.png'
        alt='department'
      />
      <Dialog
        open={expanded}
        keepMounted
        scroll={'paper'}
        onClose={handleClose}
      >
        <DialogActions>
          <IconButton>
            <ModeEditOutlineIcon />
          </IconButton>
          <IconButton>
            <DeleteForeverIcon />
          </IconButton>
        </DialogActions>
        <DialogTitle>
          <Typography variant='h5'>
            HR Dept
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default DepartmentCard;
