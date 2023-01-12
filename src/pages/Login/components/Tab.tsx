import { useState } from 'react';

export default function Tab() {
  const [tab, setTab] = useState(1);
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
