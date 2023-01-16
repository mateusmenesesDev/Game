import React from 'react';

type Props = {
  message: string;
  emailResetRef: React.RefObject<HTMLInputElement>;
  loading: boolean;
  handlePasswordReset: () => Promise<void>;
};
export default function PasswordReset({
  message,
  emailResetRef,
  loading,
  handlePasswordReset,
}: Props) {
  return (
    <>
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative'>
          {message && (
            <div className='alert alert-warning shadow-lg rounded-none'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='stroke-current flex-shrink-0 h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>{message}</span>
              </div>
            </div>
          )}
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
