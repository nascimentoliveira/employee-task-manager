import { Box, TextField } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface DepartmentData {
  name: string;
}

interface DepartmentFormProps {
  form: DepartmentData;
  setForm: Dispatch<SetStateAction<DepartmentData>>;
}

const DepartmentForm = ({ form, setForm }: DepartmentFormProps) => {
  return (
    <div style={{ padding: '15px' }}>
      <Box mb={2}>
        <TextField
          label='Name'
          multiline
          fullWidth
          required
          variant='standard'
          name='name'
          value={form.name}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setForm((prevData) => ({ ...prevData, name: event.target.value }));
            event.preventDefault();
          }}
        />
      </Box>
    </div>
  );
}

export default DepartmentForm;
