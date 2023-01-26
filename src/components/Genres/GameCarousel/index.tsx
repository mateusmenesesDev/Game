import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Mousewheel } from 'swiper';
import { IBasicGameApi } from '../../../types/IGames';
import { GameImage } from '../../GameImage';
import { useContext } from 'react';
import { Context } from '../../../contexts/Context';
import { Link } from 'react-router-dom';

type Props = {
  genre: IBasicGameApi;
};

export function GameCarousel({ genre }: Props) {
  const { games } = useContext(Context);
  const gamesByGenre = games.filter((game) => game.genres?.includes(genre.id));
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        navigation={true}
        spaceBetween={10}
        mousewheel={{ forceToAxis: true }}
        modules={[Navigation, Mousewheel]}
        breakpoints={{
          768: { slidesPerGroup: 2, slidesPerView: 'auto' },
          1024: { slidesPerGroup: 3, slidesPerView: 'auto' },
          1440: { slidesPerGroup: 4, slidesPerView: 'auto' },
        }}
        className='pb-10 pt-2'
      >
        {gamesByGenre.map((game) => (
          <SwiperSlide
            key={game.id}
            className='first:ml-4 md:first:ml-8 w-[310px] h-auto max-h-[440px] transition-all cursor-pointer lg:mt-6 lg:hover:scale-105 '
          >
            <Link to={`detail/${game.id}`}>
              <GameImage ImageId={game.cover.image_id} rounded hover />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
