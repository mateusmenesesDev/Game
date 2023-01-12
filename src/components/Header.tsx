import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gameFetch } from '../api/game';
import { IGame } from '../types/IGames';
import { GameImage } from './GameImage';
import { Theme } from './Theme';

export function Header() {
  const [random, setRandom] = useState(1);
  const [searchGames, setSearchGames] = useState<IGame[]>([]);
  const [input, setInput] = useState('');

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (input === '') setSearchGames([]);
      if (input !== '') setSearchGames(await gameFetch.getGame(input));
      // Send Axios request here
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  // function handleChange(event: ChangeEvent<HTMLInputElement>) {
  //   setInput(event.target.value);
  // }

  // async function getGame(game: string) {
  //   if (input !== "") {
  //     setSearchGames(await gameFetch.getGame(game));
  //   } else {
  //     setSearchGames([]);
  //   }
  // }
  // useEffect(() => {
  //     getGame(input);
  // }, [input]);

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
              <Link to={'list'}>Minha Lista</Link>
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
        <div className='hidden sm:block'>GAMENETZ</div>
      </div>
      <div className='flex gap-5'>
        <div className='group'>
          <input
            type='text'
            placeholder='Buscar'
            className='input input-bordered w-full max-w-xs'
            onChange={handleChange}
            value={input}
          />
          {searchGames.length > 0 && (
            <div className='relative hidden group-focus-within:block hover:block'>
              <div className='text-xs md:text-sm bg-base-300 border border-slate-600 max-h-52 overflow-auto absolute w-full z-50 mt-2'>
                {searchGames.map((game) => (
                  <Link to={`detail/${game.id}`} key={game.id}>
                    <div
                      className='border-b flex gap-2 hover:bg-base-100'
                      key={game.id}
                    >
                      {game.cover && (
                        <div className='w-16 h-24'>
                          <GameImage ImageId={game.cover.image_id} />
                        </div>
                      )}
                      <div className='flex-1'>{game.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <Theme />
      </div>
    </header>
  );
}
