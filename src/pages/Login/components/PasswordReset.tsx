import React, { useRef, useState } from 'react';
import Alert from '../../../components/Alert';
import { useAuth } from '../../../contexts/Auth';

export default function PasswordReset() {
  const emailResetRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  async function handlePasswordReset() {
    setMessage('');
    if (emailResetRef.current) {
      setError('');
      try {
        setLoading(true);
        await resetPassword(emailResetRef.current.value);
        setMessage('Check your inbox for further instructions');
      } catch (error) {
        setLoading(false);
        setMessage('Failed to reset password');
      }
    }
  }
  return (
    <>
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative'>
          {message && <Alert message={message} />}
          {error && <Alert error={error} />}
          <label
            htmlFor='my-modal-3'
            className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <p className='text-lg font-bold'>Password Reset</p>
          <div>
            <input
              required
              type='email'
              placeholder='Email Address'
              className='input input-bordered block mb-2'
              ref={emailResetRef}
            />
            <button
              className='btn'
              disabled={loading}
              onClick={handlePasswordReset}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
