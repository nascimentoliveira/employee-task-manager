import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddTaskIcon from '@mui/icons-material/AddTask';
import BusinessIcon from '@mui/icons-material/Business';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box, Tab, Tabs } from '@mui/material';

import { TabProps } from '../types/TabProps';
import TabsENUM from '../utils/TabsENUM';

const MenuSections = (tab: TabProps) => {

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    tab.setCurrentTab(newValue);
  };

  return (
    <Box sx={{
      width: '100%',
      bgcolor: '#fafafa',
      borderBottom: 1,
      borderColor: 'divider',
    }}
    >
      <Tabs
        value={tab.currentTab}
        onChange={handleChangeTab}
        variant='fullWidth'
        centered
        scrollButtons
        selectionFollowsFocus
      >
        <Tab icon={<TaskAltIcon />} label='TASKS' value={TabsENUM.TASKS} />
        <Tab icon={<GroupIcon />} label='EMPLOYEES' value={TabsENUM.EMPLOYEES} />
        <Tab icon={<BusinessIcon />} label='DEPARTMENTS' value={TabsENUM.DEPARTMENTS} />
      </Tabs>
    </Box>
  );
}

export default MenuSections;
