import { Link } from 'react-router-dom';
import { Theme } from './Theme';

export function Header() {
  return (
    <header className='px-4 py-6 flex gap-3 justify-between mb-16 sm:text-lg sm:px-10 md:px-12 lg:justify-around lg:px-0'>
      <div className='flex items-center gap-2'>
        <div className='dropdown'>
          <button className='btn btn-square btn-ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-5 h-5 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </button>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-2 shadow  bg-base-300 rounded-box w-52'
          >
            <li className=''>
              <Link to={'/'}>
                <a>Início</a>
              </Link>
            </li>
            <li>
              <a>Minha Lista</a>
            </li>
            <li>
              <a>Random Game</a>
            </li>
          </ul>
        </div>
        <div>GAMENETZ</div>
      </div>
      <div className='flex gap-5'>
        <input
          type='text'
          placeholder='Buscar'
          className='input input-bordered w-full max-w-xs'
        />
        <Theme />
      </div>
    </header>
  );
}
