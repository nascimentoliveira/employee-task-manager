'use client';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import Swal from 'sweetalert2';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

import { Department } from '../types/DepartmentType';
import api from '../utils/api';

interface DepartmentCardProps {
  department: Department;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const DepartmentDetails = ({ 
  department,
  expanded, 
  setExpanded,
  refresh, 
  setRefresh,
  setLoading,
}: DepartmentCardProps) => {

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(department.name);

  const handleClose = () => {
    if (editMode) {
      setExpanded(!expanded);
      setEditMode(false);
      setEditedName(department.name);
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
      const body = {
        name: editedName,
      }
      await api.put(`/departments/${department.id}`, body);
      setEditMode(false);
      setLoading(false);
      setRefresh(!refresh);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error updating department!',
      });
      console.error('Error updating department!:', error);
      setLoading(false);
    }
  };

  const handleCancelClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setEditMode(!editMode);
    setEditedName(department.name);
  };

  const handleDeleteClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setExpanded(!expanded);
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Are you sure you want to remove the ${department.name}?`,
      confirmButtonText: 'DELETE',
      showCancelButton: true,
      cancelButtonText: 'BACK',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await api.delete(`/departments/${department.id}`);
          setLoading(false);
          setRefresh(!refresh);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error removing ${department.name}!`,
          });
          console.error(`Error removing ${department.name}:`, error);
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
        <div style={{ padding: '15px' }}>
          <TextField
            label='Name'
            multiline
            fullWidth
            variant='standard'
            value={editedName}
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEditedName(event.target.value)
            }
          />
        </div>
      ) : (
        <DialogTitle>
          <Typography variant='h5'>
            {department.name}
          </Typography>
        </DialogTitle>
      )}
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DepartmentDetails;
