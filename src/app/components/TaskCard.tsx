'use client';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CheckIcon from '@mui/icons-material/Check';
import {
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';

const TaskCard = () => {

  const [expanded, setExpanded] = useState(false);

  const handleClose = () => {
    setExpanded(!expanded);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 400 }}
      onClick={handleExpandClick}>
      <CardHeader
        avatar={
          <CheckIcon fontSize='large' color='success' />
        }
        title='Shrimp and Chorizo Paella'
        subheader='Due Date: September 14, 2016'
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
            Shrimp and Chorizo Paella
          </Typography>
          <Typography variant='subtitle1'>
            Due Date: September 14, 2016
          </Typography>
          <Typography variant='subtitle1'>
            Assigned to employee: Jonh Doe
          </Typography>
          <Typography variant='subtitle1'>
            Department: HR dept
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant='subtitle1'>
            Description:
          </Typography>
          <DialogContentText>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default TaskCard;
