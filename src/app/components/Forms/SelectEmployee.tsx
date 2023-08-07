'use client';
import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import api from '../../utils/api';
import { Employee } from '../../types/EmployeeType';

interface SelectEmployeeProps {
  value: number;
  onChange: (event: SelectChangeEvent<number>, child: ReactNode) => void;
}

const SelectEmployee = ({ value, onChange }: SelectEmployeeProps) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error fetching employees!',
        confirmButtonText: 'Try again',
      }).then((result) => {
        if (result.isConfirmed) {
          fetchDepartments();
        }
      });
      console.error('Error fetching employees:', error);
    }
  };

  return (
    <FormControl variant='filled' sx={{ minWidth: 180 }} required>
      <InputLabel id='employee-label'>Employee</InputLabel>
      <Select
        labelId='employee-label'
        value={value}
        onChange={onChange}
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
        }}
      >
        {employees.map((employee) => (
          <MenuItem key={employee.id} value={employee.id}>
            {`${employee.firstName} ${employee.lastName}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectEmployee;
