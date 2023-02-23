import { Mousewheel, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  items: {
    id: number;
    image_id?: string;
    video_id?: string;
  }[];
};

export default function GameGalery({ items }: Props) {
  return (
    <>
      {items[0].video_id ? (
        <Swiper
          slidesPerView={1}
          navigation={true}
          mousewheel={{ forceToAxis: true }}
          modules={[Navigation, Mousewheel]}
        >
          {items.map((item) => (
            <SwiperSlide
              key={item.id}
              className='h-[200px] md:h-[400px] min-w-[60vw] lg:h-[550px]'
            >
              <iframe
                className='w-full min-h-full rounded-xl'
                allowFullScreen={true}
                src={`https://www.youtube.com/embed/${item.video_id}`}
              ></iframe>
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
