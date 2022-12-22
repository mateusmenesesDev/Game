import axios from 'axios';
import { useEffect, useState } from 'react';
import { IGame, IGameGenre } from '../../types/IGames';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Category.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper';

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
    <div className='pl-6'>
      {genres.map((genre) => (
        <div key={genre.id}>
          <h3 key={genre.id} className='font-bold text-lg mb-1 lg:text-3xl'>
            {genre.name}
          </h3>
          <Swiper
            slidesPerView={2}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              768: { slidesPerGroup: 2, slidesPerView: 3 },
              1024: { slidesPerGroup: 3, slidesPerView: 4 },
              1200: { slidesPerGroup: 5, slidesPerView: 6 },
            }}
            className='mb-16'
          >
            {games
              .filter((game) => game.genres?.includes(genre.id))
              .map((game) => (
                <SwiperSlide key={game.id} className=''>
                  {game.screenshots !== undefined && (
                    <div className='h-28 sm:h-36'>
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.screenshots[0].image_id}.jpg`}
                        alt=''
                        className='w-full max-w-[256px] h-full'
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
}
