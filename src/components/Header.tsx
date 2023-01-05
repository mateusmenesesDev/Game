import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Theme } from './Theme';

export function Header() {
  const [random, setRandom] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleKeyDown(event: any) {
    if (event.key === 'Enter') {
      navigate(`/detail/${search}`);
    }
  }
  return (
    <header className='px-4 py-6 flex gap-3 justify-between mb-12 sm:text-lg sm:px-10 md:px-12 lg:justify-around lg:px-0'>
      <div className='flex items-center gap-2'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-square btn-ghost'>
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
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-2 shadow  bg-base-300 rounded-box w-52'
          >
            <li className=''>
              <Link to={'/'}>Início</Link>
            </li>
            <li>
              <a>Minha Lista</a>
            </li>
            <li>
              <Link
                to={`detail/random${random}`}
                onClick={() => setRandom(random + 1)}
              >
                Random Game
              </Link>
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
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Theme />
      </div>
    </header>
  );
}