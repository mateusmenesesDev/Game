import Tab from './components/Tab';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/firebase/firebase';
import { Context } from '../../contexts/Context';
import { useContext, useEffect } from 'react';

export default function Login() {
  const { setUser } = useContext(Context);

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    const sign = await signInWithPopup(auth, provider);
    setUser(sign.user);
    localStorage.setItem('user', JSON.stringify(sign.user));
    location.reload();
  }

  useEffect(() => {
    const newUser = localStorage.getItem('user');
    if (newUser) setUser(JSON.parse(newUser));
  }, []);

  return (
    <div className='flex flex-col place-items-center items-center gap-5 bg-base-300 max-w-sm mx-auto mt-48'>
      <Tab />
      <form className='flex flex-col place-items-center gap-2'>
        <input
          required
          type='email'
          placeholder='Email Address'
          className='input input-bordered'
        />
        <input
          required
          type='password'
          placeholder='Password'
          className='input input-bordered'
        />
        <a href='' className='self-start text-secondary'>
          Forgot Password?
        </a>
        <button className='bg-primary w-full py-4 rounded-md text-white'>
          Login
        </button>
      </form>
      <div>
        <p>Or login with:</p>
        <button onClick={handleGoogleSignIn}>
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
    </div>
  );
}
