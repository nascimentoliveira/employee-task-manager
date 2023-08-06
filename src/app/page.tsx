'use client';
import { useState } from 'react';
import { TabContext, TabPanel } from '@mui/lab';

import MenuSections from './components/MenuSections';
import styles from './page.module.css';
import TabsENUM from './utils/TabsENUM';
import TaskPanel from './components/TaskPanel';
import EmployeePanel from './components/EmployeePanel';
import DepartmentPanel from './components/DepartmentPanel';
import { Box } from '@mui/material';

const HomePage = () => {

  const [currentTab, setCurrentTab] = useState(TabsENUM.TASKS);
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
              <TaskPanel />
            </Box>
          </TabPanel>
          <TabPanel value={TabsENUM.EMPLOYEES} sx={tabPanelStyle}>
            <Box sx={boxPanelStyle}>
              <EmployeePanel />
            </Box>
          </TabPanel>
          <TabPanel value={TabsENUM.DEPARTMENTS} sx={tabPanelStyle}>
            <Box sx={boxPanelStyle}>
              <DepartmentPanel />
            </Box>
          </TabPanel>
        </TabContext >
      </div>
    </main>
  );
}

export default HomePage;
