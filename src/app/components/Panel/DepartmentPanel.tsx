'use client';
import { useEffect, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

import { Department } from '../../types/DepartmentType';
import DepartmentCard from '../Cards/DepartmentCard';
import api from '../../utils/api';
import { PanelProps } from '../../types/PanelProps';

const DepartmentPanel = ({ refresh, setRefresh }: PanelProps) => {

  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/departments');
      setDepartments(response.data.data);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error fetching departments!',
        confirmButtonText: 'Try again',
      }).then((result) => {
        if (result.isConfirmed) {
          fetchData();
        }
      });
      console.error('Error fetching departments:', error);
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
