import Tab from './components/Tab';
import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/Auth';
import { useNavigate } from 'react-router-dom';
import PasswordReset from './components/PasswordReset';
import Alert from '../../components/Alert';

export default function Login() {
  const { signup, signin, signinGoogle } = useAuth();
  const [tab, setTab] = useState(1);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');
    if (emailRef.current && passwordRef.current) {
      if (tab === 2) {
        try {
          setLoading(true);
          await signup(emailRef.current.value, passwordRef.current.value);
          setMessage('Check your email for confirm your access');
        } catch (error: any) {
          if (error.code === 'auth/weak-password') setError('Weak Password');
          if (error.code === 'auth/email-already-in-use')
            setError('Email already exist');
        }
      } else {
        try {
          setMessage('');
          setLoading(true);
          const user = await signin(
            emailRef.current.value,
            passwordRef.current.value
          );
          if (user && user.user.emailVerified) {
            navigate(-1);
          } else {
            setMessage('Check your email for confirm your access');
          }
        } catch (error: any) {
          if (error.code === 'auth/wrong-password') setError('Wrong Password');
          if (error.code === 'auth/user-not-found') setError('Email not found');
          console.log(error.code);
        }
      }
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col place-items-center items-center gap-5 bg-base-300 max-w-sm mx-auto mt-48'>
      <Tab tab={tab} setTab={setTab} />
      {error && <Alert error={error} />}
      {message && <Alert message={message} />}
      <form
        className='flex flex-col place-items-center gap-2'
        onSubmit={handleSubmit}
      >
        <input
          required
          type='email'
          placeholder='Email Address'
          className='input input-bordered'
          ref={emailRef}
        />
        <input
          required
          type='password'
          placeholder='Password'
          className='input input-bordered'
          ref={passwordRef}
        />
        {tab === 1 && (
          <label
            htmlFor='my-modal-3'
            className='self-start text-secondary cursor-pointer'
          >
            Forgot Password?
          </label>
        )}
        <button
          disabled={loading}
          className='bg-primary text-white w-full py-4 rounded-md'
        >
          {tab === 1 ? 'Login' : 'Signup'}
        </button>
      </form>
      <div>
        <p>Or login with:</p>
        <button onClick={signinGoogle}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 488 512'
            className='w-4'
          >
            <path
              fill='white'
              d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
            />
          </svg>
        </button>
      </div>
      <PasswordReset />
    </div>
  );
}
