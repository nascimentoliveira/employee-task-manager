import { Box, SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';

import SelectDepartment from './SelectDepartment';

export interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department_id: number;
}

interface EmployeeFormProps {
  form: EmployeeData;
  setForm: Dispatch<SetStateAction<EmployeeData>>;
}

const EmployeeForm = ({ form, setForm }: EmployeeFormProps) => {

  const handleChange = (event: SelectChangeEvent<number>, child: ReactNode) => {
    const departmentId = event.target.value as number;
    setForm((prevData) => ({ ...prevData, department_id: departmentId }));
  };

  return (
    <div style={{ padding: '15px' }}>
      <Box mb={2}>
        <TextField
          label='First name'
          multiline
          fullWidth
          required
          variant='standard'
          name='firstName'
          value={form.firstName}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setForm((prevData) => ({ ...prevData, firstName: event.target.value }));
            event.preventDefault();
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label='Last name'
          multiline
          fullWidth
          required
          variant='standard'
          name='lastName'
          value={form.lastName}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setForm((prevData) => ({ ...prevData, lastName: event.target.value }));
            event.preventDefault();
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label='E-mail'
          multiline
          fullWidth
          required
          variant='standard'
          name='email'
          value={form.email}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setForm((prevData) => ({ ...prevData, email: event.target.value }));
            event.preventDefault();
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label='Phone'
          multiline
          fullWidth
          variant='standard'
          name='phone'
          value={form.phone}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setForm((prevData) => ({ ...prevData, phone: event.target.value }));
            event.preventDefault();
          }}
        />
      </Box>
      <Box mb={2}>
        <SelectDepartment
          value={form.department_id}
          onChange={handleChange}
        />
      </Box>
    </div>
  );
}

export default EmployeeForm;
