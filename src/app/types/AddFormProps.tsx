import { Dispatch, SetStateAction } from 'react';

export interface AddFormProps {
  openAddForm: boolean;
  setOpenAddForm: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};
