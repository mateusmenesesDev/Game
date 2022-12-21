import { useEffect, useState } from 'react';
import axios from 'axios';
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
    <div>
      {genres.map((genre) => (
        <div key={genre.id} className=''>
          <h3 key={genre.id} className='font-bold text-lg mb-2 px-3'>
            {genre.name}
          </h3>
          <Swiper
            slidesPerView={2}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              768: { slidesPerGroup: 3, slidesPerView: 4 },
              1024: { slidesPerGroup: 4, slidesPerView: 5 },
              1200: { slidesPerGroup: 5, slidesPerView: 6 },
            }}
          >
            {games
              .filter((game) => game.genres?.includes(genre.id))
              .map((game) => (
                <SwiperSlide key={game.id} className=''>
                  {game.screenshots !== undefined && (
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.screenshots[0].image_id}.jpg`}
                      alt=''
                      className='w-60 h-32'
                    />
                  )}
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
}
