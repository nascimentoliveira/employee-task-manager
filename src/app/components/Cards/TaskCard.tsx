'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { format } from 'date-fns';
import { Card, CardHeader } from '@mui/material';

import { Task } from '../../types/TaskType';
import TaskDetails from '../Dialogs/TaskDetails';

interface TaskCardProps {
  task: Task;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const TaskCard = ({ task, refresh, setRefresh, setLoading }: TaskCardProps) => {

  const [expanded, setExpanded] = useState<boolean>(false);

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
        title={task.title}

        subheader={task.due_date && `Due Date: ${format(new Date(task.due_date), 'MMMM d, yyyy')}`}
      />
      <TaskDetails
        task={task}
        expanded={expanded}
        setExpanded={setExpanded}
        refresh={refresh}
        setRefresh={setRefresh}
        setLoading={setLoading}
      />
    </Card>
  );
}

export default TaskCard;
