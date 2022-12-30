import { useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GameImage } from '../../../components/Genres/GameCarousel/GameImage';
import { IGame } from '../../../types/IGames';
import { Link } from 'react-router-dom';

type Props = {
  detailGame: IGame;
  setNewGame: React.Dispatch<React.SetStateAction<boolean>>;
};
export function Tabs({ detailGame, setNewGame }: Props) {
  const [tab, setTab] = useState<number>(1);

  return (
    <>
      <div className=' text-white tabs tabs-boxed justify-center mb-2'>
        <a
          className={`tab ${tab === 1 ? 'tab-bordered' : null} rounded-none`}
          onClick={() => setTab(1)}
        >
          Imagens
        </a>
        {detailGame.videos !== undefined && (
          <a
            className={`tab  ${tab === 2 ? 'tab-bordered' : null} rounded-none`}
            onClick={() => setTab(2)}
          >
            Vídeo
          </a>
        )}
        <a
          className={`tab  ${tab === 3 ? 'tab-bordered' : null} rounded-none`}
          onClick={() => setTab(3)}
        >
          Sugestões
        </a>
      </div>
      <div>
        <div className={`${tab === 1 ? 'block' : 'hidden'}`}>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              500: { slidesPerGroup: 1, slidesPerView: 2 },
              1024: { slidesPerGroup: 2, slidesPerView: 3 },
            }}
          >
            {detailGame.screenshots &&
              detailGame.screenshots.map(({ image_id }) => (
                <SwiperSlide key={image_id} className='h-64 md:h-72 lg:h-96'>
                  <GameImage ImageId={image_id} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        {detailGame.videos != undefined && (
          <div
            className={`${
              tab === 2 ? 'block' : 'hidden'
            } flex justify-center mt-1 h-44 sm:h-80`}
          >
            <iframe
              className='w-full min-h-full max-w-[570px]'
              allowFullScreen={true}
              src={`https://www.youtube.com/embed/${detailGame.videos[0].video_id}`}
            ></iframe>
          </div>
        )}
        <div className={`${tab === 3 ? 'block' : 'hidden'}`}>
          <Swiper navigation={true} modules={[Navigation]} slidesPerView={2}>
            {detailGame.similar_games !== undefined &&
              detailGame.similar_games
                .filter((game) => game.cover !== undefined)
                .map((game) => (
                  <SwiperSlide
                    className='max-h-[220px] max-w-[160px] md:max-h-[400px] md:max-w-[300px]'
                    key={game.id}
                  >
                    <Link
                      onClick={() => setNewGame(true)}
                      to={`/detail/${game.id}`}
                    >
                      <GameImage ImageId={game.cover.image_id} hover />
                    </Link>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
