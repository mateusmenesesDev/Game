import 'swiper/css';
import 'swiper/css/navigation';
import './Genre.css';

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
          <LazyLoad height={300} offset={200} once key={genre.id}>
            <div>
              <h3
                key={genre.id}
                className='font-bold text-lg lg:text-3xl ml-4 md:ml-8'
              >
                {genre.name}
              </h3>
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
