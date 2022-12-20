import { useEffect, useState } from 'react';
import axios from 'axios';
import { IGameGenre } from '../../types/IGames';

export function Category() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState<IGameGenre[]>([]);
  async function getGamesAndGenres() {
    const { data } = await axios.get('.netlify/functions/gameApi');
    setGenres(data.genres);
  }
  useEffect(() => {
    getGamesAndGenres();
  }, []);
  return (
    <div className='carousel rounded-box'>
      <div className='carousel-item'>
        <img src='https://placeimg.com/400/300/arch' alt='Burger' />
      </div>
      <div className='carousel-item'>
        <img src='https://placeimg.com/400/300/arch' alt='Burger' />
      </div>
      <div className='carousel-item'>
        <img src='https://placeimg.com/400/300/arch' alt='Burger' />
      </div>
      <div className='carousel-item'>
        <img src='https://placeimg.com/400/300/arch' alt='Burger' />
      </div>
      <div className='carousel-item'>
        <img src='https://placeimg.com/400/300/arch' alt='Burger' />
      </div>
      <div className='carousel-item'>
        <img src='https://placeimg.com/400/300/arch' alt='Burger' />
      </div>
      <div className='carousel-item'>
        <img src='https://placeimg.com/400/300/arch' alt='Burger' />
      </div>
    </div>
  );
}
