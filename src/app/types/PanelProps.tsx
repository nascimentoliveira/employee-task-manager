import { Dispatch, SetStateAction } from 'react';

export interface PanelProps {
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};
