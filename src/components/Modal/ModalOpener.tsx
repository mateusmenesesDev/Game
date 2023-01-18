import React from 'react';

type Props = {
  children: React.ReactNode;
};
export default function ModalOpener({ children }: Props) {
  return (
    <>
      <label
        htmlFor='my-modal'
        className='indicator-item indicator-end badge w-6 h-6 font-bold border-none hover:scale-150'
      >
        {children}
      </label>
      <input type='checkbox' id='my-modal' className='modal-toggle' />
    </>
  );
}
