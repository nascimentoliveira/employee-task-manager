'use client';
import { useState } from 'react';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Fab, Zoom, useTheme } from '@mui/material';
import { SxProps } from '@mui/system';
import AddTaskIcon from '@mui/icons-material/AddTask';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DomainAddIcon from '@mui/icons-material/DomainAdd';

import MenuSections from './components/MenuSections';
import styles from './page.module.css';
import TabsENUM from './utils/TabsENUM';
import TaskPanel from './components/Panel/TaskPanel';
import EmployeePanel from './components/Panel/EmployeePanel';
import DepartmentPanel from './components/Panel/DepartmentPanel';
import AddTaskForm from './components/Forms/AddTaskForm';
import AddEmployeeForm from './components/Forms/AddEmployeeForm';
import AddDepartmentForm from './components/Forms/AddDepartmentForm';

const HomePage = () => {

  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<string>(TabsENUM.TASKS);
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleAddClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenAddForm(!openAddForm);
  };

  const tabPanelStyle = {
    height: '100%',
    width: '100%',
    paddingTop: '10px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': { width: 10, WebkitAppearance: 'none' },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 8,
      border: '2px solid',
      borderColor: '#E7EBF0',
      backgroundColor: 'rgba(0 0 0 / 0.5)',
    },
  };

  const boxPanelStyle = {
    display: 'grid',
    p: 2,
    gap: 2,
    placeItems: 'center',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)',
    },
  };

  const fabStyle = {
    position: 'absolute',
    bottom: 35,
    right: 35,
  };

  const fabs = [
    {
      color: 'primary' as 'primary',
      sx: fabStyle as SxProps,
      icon: <AddTaskIcon />,
      label: TabsENUM.TASKS,
    },
    {
      color: 'primary' as 'primary',
      sx: fabStyle as SxProps,
      icon: <GroupAddIcon />,
      label: TabsENUM.EMPLOYEES,
    },
    {
      color: 'primary' as 'primary',
      sx: fabStyle as SxProps,
      icon: <DomainAddIcon />,
      label: TabsENUM.DEPARTMENTS,
    },
  ];

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <TabContext value={currentTab}>
          <MenuSections
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <TabPanel value={TabsENUM.TASKS} sx={tabPanelStyle}>
            <Box sx={boxPanelStyle}>
              <TaskPanel refresh={refresh} setRefresh={setRefresh} />
            </Box>
          </TabPanel>
          <TabPanel value={TabsENUM.EMPLOYEES} sx={tabPanelStyle}>
            <Box sx={boxPanelStyle}>
              <EmployeePanel refresh={refresh} setRefresh={setRefresh} />
            </Box>
          </TabPanel>
          <TabPanel value={TabsENUM.DEPARTMENTS} sx={tabPanelStyle}>
            <Box sx={boxPanelStyle}>
              <DepartmentPanel refresh={refresh} setRefresh={setRefresh} />
            </Box>
          </TabPanel>
          {fabs.map(fab => (
            <Zoom
              key={fab.color}
              in={currentTab === fab.label}
              timeout={transitionDuration}
              style={{
                transitionDelay: `${currentTab === fab.label ? transitionDuration.exit : 0}ms`,
              }}
              unmountOnExit
            >
              <Fab
                sx={fab.sx}
                color={fab.color}
                onClick={handleAddClick}
              >
                {fab.icon}
              </Fab>
            </Zoom>
          ))}
          {(openAddForm && currentTab === TabsENUM.TASKS) &&
            <AddTaskForm
              openAddForm={openAddForm}
              setOpenAddForm={setOpenAddForm}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          }
          {(openAddForm && currentTab === TabsENUM.EMPLOYEES) &&
            <AddEmployeeForm
              openAddForm={openAddForm}
              setOpenAddForm={setOpenAddForm}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          }
          {(openAddForm && currentTab === TabsENUM.DEPARTMENTS) &&
            <AddDepartmentForm
              openAddForm={openAddForm}
              setOpenAddForm={setOpenAddForm}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          }
        </TabContext >
      </div>
    </main>
  );
}

export default HomePage;
