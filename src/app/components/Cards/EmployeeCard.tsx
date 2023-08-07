'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { Avatar, Card, CardHeader } from '@mui/material';

import { Employee } from '../../types/EmployeeType';
import EmployeeDetails from '../Dialogs/EmployeeDetails';
import getColor from '../../utils/getColor';

interface EmployeeCardProps {
  employee: Employee;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const EmployeeCard = ({ employee, refresh, setRefresh, setLoading }: EmployeeCardProps) => {

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 400 }}
      onClick={handleExpandClick}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: getColor(employee.id) }}>
            {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
          </Avatar>
        }
        title={`${employee.lastName}, ${employee.firstName}`}
        subheader={employee.department.name}
      />
      <EmployeeDetails
        employee={employee}
        expanded={expanded}
        setExpanded={setExpanded}
        refresh={refresh}
        setRefresh={setRefresh}
        setLoading={setLoading}
      />
    </Card>
  );
}

export default EmployeeCard;
