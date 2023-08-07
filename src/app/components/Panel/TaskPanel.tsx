'use client';
import { useEffect, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

import TaskCard from '../Cards/TaskCard';
import api from '../../utils/api';
import { Task } from '../../types/TaskType';
import { PanelProps } from '../../types/PanelProps';

const TaskPanel = ({ refresh, setRefresh }: PanelProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.data);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error fetching tasks!',
        confirmButtonText: 'Try again',
      }).then((result) => {
        if (result.isConfirmed) {
          fetchData();
        }
      });
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Backdrop
          sx={{ color: '#fff' }}
          open={loading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        tasks.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            refresh={refresh}
            setRefresh={setRefresh}
            setLoading={setLoading}
          />
        ))
      )}
    </>
  );
}

export default TaskPanel;
