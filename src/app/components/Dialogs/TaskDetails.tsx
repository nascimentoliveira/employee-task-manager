'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { format } from 'date-fns';
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
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';

import api from '../../utils/api';
import { Task } from '../../types/TaskType';
import TaskForm, { TaskData } from '../Forms/TaskForm';

interface TaskDetailsProps {
  task: Task;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const DepartmentDetails = ({
  task,
  expanded,
  setExpanded,
  refresh,
  setRefresh,
  setLoading,
}: TaskDetailsProps) => {

  const [editMode, setEditMode] = useState<boolean>(false);
  const [form, setForm] = useState<TaskData>({
    title: task.title,
    description: task.description || '',
    assignee_id: task.assignee.id,
    due_date: task.due_date,
  });

  const handleClose = () => {
    if (editMode) {
      setExpanded(!expanded);
      setEditMode(false);
      setForm({
        title: task.title,
        description: task.description || '',
        assignee_id: task.assignee.id,
        due_date: task.due_date,
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
      await api.put(`/tasks/${task.id}`, form);
      setEditMode(false);
      setLoading(false);
      setRefresh(!refresh);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error updating task!',
      });
      console.error('Error updating task!:', error);
      setLoading(false);
    }
  };

  const handleCancelClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setEditMode(!editMode);
    setForm({
      title: task.title,
      description: task.description,
      assignee_id: task.assignee.id,
      due_date: task.due_date,
    });
  };

  const handleDeleteClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setExpanded(!expanded);
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Are you sure you want to remove the task ${task.title}?`,
      confirmButtonText: 'DELETE',
      showCancelButton: true,
      cancelButtonText: 'BACK',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await api.delete(`/tasks/${task.id}`);
          setLoading(false);
          setRefresh(!refresh);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error removing the task ${task.title}!`,
          });
          console.error(`Error removing the task ${task.title}:`, error);
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
        <TaskForm
          form={form}
          setForm={setForm}
        />
      ) : (
        <>
          <DialogTitle>
            <Typography variant='h5'>
              {task.title}
            </Typography>
            {task.due_date &&
              <Typography variant='subtitle1'>
                Due Date: {format(new Date(task.due_date), 'MMMM d, yyyy')}
              </Typography>
            }
            <Typography variant='subtitle1'>
              Assigned to employee: {task.assignee.lastName}, {task.assignee.firstName}
            </Typography>
            <Typography variant='subtitle1'>
              Department: {task.assignee.department.name}
            </Typography>
          </DialogTitle>
          {task.description &&
            <DialogContent>
              <Typography variant='subtitle1'>
                Description:
              </Typography>
              <DialogContentText>
                {task.description}
              </DialogContentText>
            </DialogContent>
          }
        </>
      )}
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DepartmentDetails;
