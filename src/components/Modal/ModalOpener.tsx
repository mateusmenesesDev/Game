import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';

type Props = {
  children: React.ReactNode;
};
export default function ModalOpener({ children }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <label
        htmlFor='my-modal'
        className='indicator-item indicator-end badge w-6 h-6 font-bold border-none hover:scale-150'
        onClick={() => {
          if (!user) navigate('/login');
        }}
      >
        {children}
      </label>
      <input type='checkbox' id='my-modal' className='modal-toggle' />
    </>
  );
}
