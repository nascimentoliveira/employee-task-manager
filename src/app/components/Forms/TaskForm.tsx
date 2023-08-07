import { Box, SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import SelectEmployee from './SelectEmployee';

export interface TaskData {
  title: string;
  description?: string;
  assignee_id: number;
  due_date?: Date | null;
}

interface TaskFormProps {
  form: TaskData;
  setForm: Dispatch<SetStateAction<TaskData>>;
}

const TaskForm = ({ form, setForm }: TaskFormProps) => {

  const handleChange = (event: SelectChangeEvent<number>, child: ReactNode) => {
    const assigneeId = event.target.value as number;
    setForm((prevData) => ({ ...prevData, assignee_id: assigneeId }));
  };

  return (
    <div style={{ padding: '15px' }}>
      <Box mb={2}>
        <TextField
          label='Title'
          multiline
          fullWidth
          required
          variant='standard'
          name='title'
          value={form.title}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setForm((prevData) => ({ ...prevData, title: event.target.value }));
            event.preventDefault();
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label='Description'
          multiline
          fullWidth
          variant='standard'
          name='description'
          value={form.description}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setForm((prevData) => ({ ...prevData, description: event.target.value }));
            event.preventDefault();
          }}
        />
      </Box>
      <Box mb={2}>
        <SelectEmployee
          value={form.assignee_id}
          onChange={handleChange}
        />
      </Box>
      <Box
        mb={2}
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Due date'
            onChange={(newValue: Date | null) => setForm({ ...form, due_date: newValue })}
          />
        </LocalizationProvider>
      </Box>
    </div>
  );
}

export default TaskForm;
