'use client';
import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import api from '../../utils/api';
import { Department } from '../../types/DepartmentType';

interface SelectDepartmentProps {
  value: number;
  onChange: (event: SelectChangeEvent<number>, child: ReactNode) => void;
}

const SelectDepartment = ({ value, onChange }: SelectDepartmentProps) => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/departments');
      setDepartments(response.data.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error fetching departments!',
        confirmButtonText: 'Try again',
      }).then((result) => {
        if (result.isConfirmed) {
          fetchDepartments();
        }
      });
      console.error('Error fetching departments:', error);
    }
  };

  return (
    <FormControl variant='filled' sx={{ minWidth: 180 }} required>
      <InputLabel id='department-label'>Department</InputLabel>
      <Select
        labelId='department-label'
        value={value}
        onChange={onChange}
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
        }}
      >
        {departments.map((department) => (
          <MenuItem key={department.id} value={department.id}>
            {department.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectDepartment;
