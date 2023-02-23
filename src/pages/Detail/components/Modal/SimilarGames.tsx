import React from 'react';
import { Link } from 'react-router-dom';
import { Mousewheel, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  items: {
    cover: { id: number; image_id: string };
    id: number;
  }[];
  setModal: () => void;
};

export default function SimilarGames({ items, setModal }: Props) {
  return (
    <Swiper
      slidesPerView={2}
      navigation={true}
      mousewheel={{ forceToAxis: true }}
      modules={[Navigation, Mousewheel]}
      loop={true}
      loopFillGroupWithBlank={false}
      spaceBetween={10}
      className='w-full py-5'
      breakpoints={{
        600: { slidesPerGroup: 2, slidesPerView: 3 },
        1024: { slidesPerGroup: 3, slidesPerView: 4 },
        1440: { slidesPerGroup: 3, slidesPerView: 4 },
      }}
    >
      {items.map((game) => (
        <SwiperSlide
          key={game.id}
          className='max-w-[400px] border-2 rounded-lg object-cover'
        >
          <Link onClick={setModal} to={`/detail/${game.id}`}>
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.png`}
              alt=''
              className={`rounded-md w-full h-full`}
              loading='lazy'
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
