'use client';
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';

import api from '../../utils/api';
import TaskForm, { TaskData } from './TaskForm';
import { AddFormProps } from '../../types/AddFormProps';

const AddTaskForm = ({ openAddForm, setOpenAddForm, refresh, setRefresh }: AddFormProps) => {

  const [form, setForm] = useState<TaskData>({
    title: '',
    description: '',
    assignee_id: 0,
    due_date: null,
  });

  const handleClose = () => {
    setOpenAddForm(!openAddForm);
  };

  const handleConfirmClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await api.post(`/tasks`, form);
      setRefresh(!refresh);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error adding new task!',
      });
      console.error('Error adding new task:', error);
    }
    handleClose();
  };

  return (
    <Dialog
      open={openAddForm}
      keepMounted
      scroll={'paper'}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': { minWidth: '500px', maxWidth: '700px' }
      }}
    >
      <DialogTitle>
        <Typography variant='h5'>
          New task
        </Typography>
      </DialogTitle>
      <TaskForm
        form={form}
        setForm={setForm}
      />
      <DialogActions>
        <Button variant='contained' onClick={handleConfirmClick}>Send</Button>
        <Button variant='contained' onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTaskForm;
