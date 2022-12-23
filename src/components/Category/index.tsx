import axios from 'axios';
import { useEffect, useState } from 'react';
import { IGame, IGameGenre } from '../../types/IGames';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Category.css';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import { Placeholder } from '../utils/Placeholder';

export function Category() {
  const [games, setGames] = useState<IGame[]>([]);
  const [genres, setGenres] = useState<IGameGenre[]>([]);
  async function getGamesAndGenres() {
    const { data } = await axios.get('.netlify/functions/gameApi');
    setGenres(data.genres);
    setGames(data.games);
  }
  useEffect(() => {
    getGamesAndGenres();
  }, []);
  return (
    <div className=''>
      {games.length > 0 ? (
        genres.map((genre) => (
          <div key={genre.id}>
            <h3
              key={genre.id}
              className='font-bold text-lg lg:text-3xl ml-4 md:ml-8'
            >
              {genre.name}
            </h3>
            <Swiper
              slidesPerView={2}
              navigation={true}
              spaceBetween={10}
              modules={[Navigation]}
              breakpoints={{
                768: { slidesPerGroup: 2, slidesPerView: 3 },
                1024: { slidesPerGroup: 3, slidesPerView: 4 },
                1440: { slidesPerGroup: 4, slidesPerView: 5 },
              }}
              className='mb-4 pb-5'
            >
              {games
                .filter((game) => game.genres?.includes(genre.id))
                .map((game) => (
                  <SwiperSlide
                    key={game.id}
                    className='first:ml-4 md:first:ml-8 max-w-[310px] h-auto max-h-[440px] transition-all cursor-pointer lg:mt-6 lg:hover:scale-105 '
                  >
                    {game.screenshots !== undefined && (
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg`}
                        alt=''
                        className='h-full min-w-full rounded-md transition-all hover:border-4'
                      />
                    )}
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        ))
      ) : (
        <Placeholder quantify={16} />
      )}
    </div>
  );
}
