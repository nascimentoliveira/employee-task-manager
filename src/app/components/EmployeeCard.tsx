'use client';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';

const EmployeeCard = () => {

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
          <Avatar sx={{ bgcolor: 'red' }}>
            JD
          </Avatar>
        }
        title='Doe, John'
        subheader='HR Dept'
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
            Doe, Jonh
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant='subtitle1'>
            Department: HR dept
          </Typography>
          <Typography variant='subtitle1'>
            Email: john.doe@example.com
          </Typography>
          <Typography variant='subtitle1'>
            Phone: (+1) 234-567-890
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default EmployeeCard;
