'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { Card, CardHeader, CardMedia } from '@mui/material';

import DepartmentDetails from '../Dialogs/DepartmentDetails';
import { Department } from '../../types/DepartmentType';

interface DepartmentCardProps {
  department: Department;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const DepartmentCard = ({ department, refresh, setRefresh, setLoading }: DepartmentCardProps) => {

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 400 }}
      onClick={handleExpandClick}>
      <CardHeader
        title={department.name}
      />
      <CardMedia
        component='img'
        height='194'
        sx={{ objectFit: 'contain' }}
        image='/department.png'
        alt='department'
      />
      <DepartmentDetails
        department={department}
        expanded={expanded}
        setExpanded={setExpanded}
        refresh={refresh}
        setRefresh={setRefresh}
        setLoading={setLoading}
      />
    </Card>
  );
}

export default DepartmentCard;
