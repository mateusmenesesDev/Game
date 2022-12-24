import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Mousewheel } from 'swiper';
import { IGameGenre } from '../../../types/IGames';
import { GameImage } from './GameImage';
import { useContext } from 'react';
import { Context } from '../../../contexts/Context';
import { Link } from 'react-router-dom';

type Props = {
  genre: IGameGenre;
};

export function GameCarousel({ genre }: Props) {
  const { games } = useContext(Context);
  const gamesByGenre = games.filter((game) => game.genres?.includes(genre.id));
  return (
    <Swiper
      slidesPerView={2}
      navigation={true}
      spaceBetween={10}
      mousewheel={{ forceToAxis: true }}
      modules={[Navigation, Mousewheel]}
      breakpoints={{
        768: { slidesPerGroup: 2, slidesPerView: 3 },
        1024: { slidesPerGroup: 3, slidesPerView: 4 },
        1440: { slidesPerGroup: 4, slidesPerView: 5 },
      }}
      className='mb-4 pb-5'
    >
      {gamesByGenre.map((game) => (
        <SwiperSlide
          key={game.id}
          className='first:ml-4 md:first:ml-8 max-w-[310px] h-auto max-h-[440px] transition-all cursor-pointer lg:mt-6 lg:hover:scale-105 '
        >
          {game.screenshots !== undefined && (
            <Link to={`detail/${game.id}`}>
              <GameImage ImageId={game.cover.image_id} hover />
            </Link>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
