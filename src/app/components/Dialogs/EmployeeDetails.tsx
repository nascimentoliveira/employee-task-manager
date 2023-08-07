'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import Swal from 'sweetalert2';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';

import { Employee } from '../../types/EmployeeType';
import api from '../../utils/api';
import EmployeeForm, { EmployeeData } from '../Forms/EmployeeForm';

interface EmployeeDetailsProps {
  employee: Employee;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const EmployeeDetails = ({
  employee,
  expanded,
  setExpanded,
  refresh,
  setRefresh,
  setLoading,
}: EmployeeDetailsProps) => {

  const [editMode, setEditMode] = useState<boolean>(false);
  const [form, setForm] = useState<EmployeeData>({
    firstName: employee.firstName,
    lastName: employee.lastName,
    phone: employee.phone,
    email: employee.email,
    department_id: employee.department.id,
  });

  const handleClose = () => {
    if (editMode) {
      setExpanded(!expanded);
      setEditMode(false);
      setForm({
        firstName: employee.firstName,
        lastName: employee.lastName,
        phone: employee.phone,
        email: employee.email,
        department_id: employee.department.id,
      });
    }
  };

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setEditMode(!editMode);
  };

  const handleConfirmClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      setLoading(true);
      await api.put(`/employees/${employee.id}`, form);
      setEditMode(false);
      setLoading(false);
      setRefresh(!refresh);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error updating employee!',
      });
      console.error('Error updating employee!:', error);
      setLoading(false);
    }
  };

  const handleCancelClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setEditMode(!editMode);
    setForm({
      firstName: employee.firstName,
      lastName: employee.lastName,
      phone: employee.phone,
      email: employee.email,
      department_id: employee.department.id,
    });
  };

  const handleDeleteClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setExpanded(!expanded);
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Are you sure you want to remove the ${employee.firstName}?`,
      confirmButtonText: 'DELETE',
      showCancelButton: true,
      cancelButtonText: 'BACK',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await api.delete(`/employees/${employee.id}`);
          setLoading(false);
          setRefresh(!refresh);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error removing ${employee.firstName}!`,
          });
          console.error(`Error removing ${employee.firstName}:`, error);
          setLoading(false);
        }
      }
    });
  };

  return (
    <Dialog
      open={expanded}
      keepMounted
      scroll={'paper'}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': { minWidth: '500px', maxWidth: '700px' }
      }}
    >
      <DialogActions>
        {editMode ? (
          <>
            <IconButton
              size='small'
              onClick={(event) => handleConfirmClick(event)}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              size='small'
              onClick={(event) => handleCancelClick(event)}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              size='small'
              onClick={(event) => handleEditClick(event)}
            >
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton
              size='small'
              onClick={(event) => handleDeleteClick(event)}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        )}
      </DialogActions>
      {editMode ? (
        <EmployeeForm
          form={form}
          setForm={setForm}
        />
      ) : (
        <>
          <DialogTitle>
            <Typography variant='h5'>
              {employee.lastName}, {employee.firstName}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant='subtitle1'>
              Department: {employee.department.name}
            </Typography>
            <Typography variant='subtitle1'>
              Email: {employee.email}
            </Typography>
            {employee.phone &&
              <Typography variant='subtitle1'>
                Phone: {employee.phone}
              </Typography>
            }
          </DialogContent>
        </>
      )}
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmployeeDetails;
