'use client';
import { useEffect, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

import { Employee } from '../../types/EmployeeType';
import EmployeeCard from '../Cards/EmployeeCard';
import api from '../../utils/api';
import { PanelProps } from '../../types/PanelProps';

const EmployeePanel = ({ refresh, setRefresh }: PanelProps) => {

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/employees');
      setEmployees(response.data.data);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error fetching employees!',
        confirmButtonText: 'Try again',
      }).then((result) => {
        if (result.isConfirmed) {
          fetchData();
        }
      });
      console.error('Error fetching employees:', error);
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
        employees.map((employee, index) => (
          <EmployeeCard
            key={index}
            employee={employee}
            refresh={refresh}
            setRefresh={setRefresh}
            setLoading={setLoading}
          />
        ))
      )}
    </>
  );
}

export default EmployeePanel;
