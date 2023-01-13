import { SetStateAction, useState } from 'react';

type Props = {
  tab: number;
  setTab: React.Dispatch<SetStateAction<number>>;
};
export default function Tab({ tab, setTab }: Props) {
  return (
    <div className='tabs'>
      <a
        className={`tab ${tab === 1 && 'tab-bordered tab-active'}`}
        onClick={() => setTab(1)}
      >
        Login
      </a>
      <a
        className={`tab  ${tab === 2 && 'tab-bordered tab-active'}`}
        onClick={() => setTab(2)}
      >
        Register
      </a>
    </div>
  );
}
