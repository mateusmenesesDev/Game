import { Mousewheel, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactPlayer from 'react-player'
import {useState} from 'react'
import { Swiper as SwiperType } from 'swiper/types'

type Props = {
  items: {
    id: number;
    image_id?: string;
    video_id?: string;
  }[];
};

export default function GameGalery({ items }: Props) {

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.activeIndex);
  };

  return (
    <>
      {items[0].video_id ? (
        <Swiper
          slidesPerView={1}
          navigation={true}
          onSlideChange={handleSlideChange}
          mousewheel={{ forceToAxis: true }}
          modules={[Navigation, Mousewheel]}
        >
          {items.map((item, i) => (
            <SwiperSlide
              key={item.id}
              className='h-[200px] md:h-[400px] min-w-[60vw] lg:h-[550px]'
            >
              <ReactPlayer playing={i === currentSlide} 	width="100%" height="100%" url={`https://www.youtube.com/watch?v=${item.video_id}`} /> 
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          slidesPerView={1}
          navigation={true}
          mousewheel={{ forceToAxis: true }}
          modules={[Navigation, Mousewheel]}
          loop={true}
          loopFillGroupWithBlank={false}
          spaceBetween={10}
          className='w-full py-5'
          breakpoints={{
            425: { slidesPerGroup: 1, slidesPerView: 2 },
            768: { slidesPerGroup: 2, slidesPerView: 3 },
            1440: { slidesPerGroup: 3, slidesPerView: 4 },
          }}
        >
          {items.map((item) => (
            <SwiperSlide
              key={item.id}
              className='max-h-[400px] max-w-[400px] border-2 rounded-lg object-cover'
            >
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_720p/${item.image_id}.png`}
                alt=''
                className={`sm: rounded-md w-full h-full`}
                loading='lazy'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
