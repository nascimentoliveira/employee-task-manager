'use client';
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';

import EmployeeForm, { EmployeeData } from './EmployeeForm';
import api from '../../utils/api';
import { AddFormProps } from '../../types/AddFormProps';

const AddEmployeeForm = ({ openAddForm, setOpenAddForm, refresh, setRefresh }: AddFormProps) => {

  const [form, setForm] = useState<EmployeeData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    department_id: 0,
  });

  const handleClose = () => {
    setOpenAddForm(!openAddForm);
  };

  const handleConfirmClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await api.post(`/employees`, form);
      setRefresh(!refresh);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error adding new employee!',
      });
      console.error('Error adding new employee:', error);
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
          New Employee
        </Typography>
      </DialogTitle>
      <EmployeeForm
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

export default AddEmployeeForm;
