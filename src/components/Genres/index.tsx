import 'swiper/css';
import 'swiper/css/navigation';
import './Genre.css';
<<<<<<< HEAD
=======

import { Placeholder } from '../utils/Placeholder';
import { useContext } from 'react';
import GameCarousel from './GameCarousel';
import { Context } from '../../contexts/Context';
import LazyLoad from 'react-lazyload';

// const GameCarousel = lazy(() => import('./GameCarousel'));
>>>>>>> 86b61a5363af1b699a00fcba9c75cffc92800f4e

import { Placeholder } from '../utils/Placeholder';
import { useContext } from 'react';
import { GameCarousel } from './GameCarousel';
import { Context } from '../../contexts/Context';
import LazyLoad from 'react-lazyload';
export function Genres() {
  const { genres } = useContext(Context);
  return (
    <div>
      {genres.length > 0 ? (
        genres.map((genre) => (
<<<<<<< HEAD
          <LazyLoad offset={200} height={300} once key={genre.id}>
=======
          <LazyLoad key={genre.id} height={400} offset={200} once>
>>>>>>> 86b61a5363af1b699a00fcba9c75cffc92800f4e
            <div>
              <h3
                key={genre.id}
                className='font-bold text-lg lg:text-3xl ml-4 md:ml-8'
              >
                {genre.name}
              </h3>
<<<<<<< HEAD
=======

>>>>>>> 86b61a5363af1b699a00fcba9c75cffc92800f4e
              <GameCarousel genre={genre} />
            </div>
          </LazyLoad>
        ))
      ) : (
        <Placeholder quantify={16} />
      )}
    </div>
  );
}
