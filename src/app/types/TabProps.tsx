import { Dispatch, SetStateAction } from 'react';

export type TabProps = {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
};
