'use client';
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';

import api from '../../utils/api';
import DepartmentForm, { DepartmentData } from './DepartmentForm';
import { AddFormProps } from '../../types/AddFormProps';

const AddDepartmentForm = ({ openAddForm, setOpenAddForm, refresh, setRefresh }: AddFormProps) => {

  const [form, setForm] = useState<DepartmentData>({
    name: '',
  });

  const handleClose = () => {
    setOpenAddForm(!openAddForm);
  };

  const handleConfirmClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await api.post(`/departments`, form);
      setRefresh(!refresh);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error adding new department!',
      });
      console.error('Error updating department:', error);
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
          New Department
        </Typography>
      </DialogTitle>
      <DepartmentForm
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

export default AddDepartmentForm;
