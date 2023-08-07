'use client';
import { useEffect, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

import { Department } from '../types/DepartmentType';
import DepartmentCard from './DepartmentsCard';
import api from '../utils/api';

const DepartmentPanel = () => {

  const [departments, setDepartments] = useState<Department[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/departments');
      setDepartments(response.data.data);
      console.log(response.data.data)
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error fetching data!',
        confirmButtonText: 'Try again',
      }).then((result) => {
        if (result.isConfirmed) {
          fetchData();
        }
      });
      console.error('Error fetching data:', error);
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
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        departments.map((department, index) => (
          <DepartmentCard
            key={index}
            department={department}
            refresh={refresh}
            setRefresh={setRefresh}
            setLoading={setLoading}
          />
        ))
      )}
    </>
  );
}

export default DepartmentPanel;
