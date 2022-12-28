import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { IBasicGameApi, IBasicImageGameApi, IGame } from '../types/IGames';
import { GameImage } from '../components/Genres/GameCarousel/GameImage';
import { Placeholder } from '../components/utils/Placeholder';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Detail() {
  const [company, setCompany] = useState<IBasicGameApi[]>([]);
  const [newGame, setNewGame] = useState(false);
  const [tab, setTab] = useState<number>(1);
  const [detailGame, setDetailGame] = useState<IGame>();
  const [plataformsLogos, setPlataformsLogos] = useState<
    IBasicImageGameApi[] | []
  >([]);
  const { gameId } = useParams();
  async function getCompany() {
    const companyId = detailGame?.involved_companies[0].company;
    const { data } = await axios.get(
      `/.netlify/functions/gamePublisher?companyId=${companyId}`
    );
    setCompany(data.company);
  }
  async function getPlataformsLogos() {
    if (detailGame !== undefined) {
      const logoIds = detailGame.platforms.map(
        ({ platform_logo }) => platform_logo
      );
      const logos: IBasicImageGameApi[] = await Promise.all(
        logoIds.map(async (id) => {
          const { data } = await axios.get(
            `/.netlify/functions/gamePlataform?logoId=${id}`
          );
          return data;
        })
      );
      setPlataformsLogos(logos);
    }
  }
  async function getGame() {
    console.log('entrei');
    const { data } = await axios.get(
      `/.netlify/functions/getGame?gameId=${gameId}`
    );
    setDetailGame(data[0]);
  }

  useEffect(() => {
    if (newGame) {
      setNewGame(false);
      window.location.reload();
    }
    getGame();
  }, [newGame]);

  useEffect(() => {
    if (detailGame != undefined) {
      getCompany();
      getPlataformsLogos();
    }
  }, [detailGame]);

  return detailGame !== undefined ? (
    <div className=''>
      <div className='flex flex-col items-center mb-10'>
        <div className='w-1/2 max-w-[310px] flex-1'>
          <div className='badge bg-red-700 w-14 h-14 relative top-10 right-4 font-bold sm:w-16 sm:h-16 sm:top-12'>
            {Math.floor(detailGame.rating)}/100
          </div>
          <GameImage ImageId={detailGame.cover.image_id} />
        </div>
        <h3 className='font-bold text-lg flex-1'>{detailGame.name}</h3>
        <div className='flex gap-2 flex-wrap justify-center my-3'>
          {company.length > 0 && <h3>{company[0].name}</h3>}
          {new Date(detailGame.first_release_date * 1000).toLocaleDateString()}
        </div>
        {plataformsLogos.length > 0 && (
          <div className='flex gap-5 mx-6 px-5 py-1 bg-primary rounded-lg flex-wrap justify-center'>
            {plataformsLogos.map(({ image_id }) => (
              <div key={image_id} className='w-[30px] '>
                <GameImage ImageId={image_id} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <div className='tabs tabs-boxed  justify-around'>
          <a
            className={`tab  ${tab === 1 ? 'tab-bordered' : null} rounded-none`}
            onClick={() => setTab(1)}
          >
            Imagens
          </a>
          <a
            className={`tab ${tab === 2 ? 'tab-bordered' : null} rounded-none`}
            onClick={() => setTab(2)}
          >
            Vídeo
          </a>
          <a
            className={`tab ${tab === 3 ? 'tab-active' : null} rounded-none`}
            onClick={() => setTab(3)}
          >
            Sugestões
          </a>
        </div>
        <div>
          <div className={`${tab === 1 ? 'block' : 'hidden'} mt-1`}>
            <Swiper navigation={true} modules={[Navigation]}>
              {detailGame.screenshots.map(({ image_id }) => (
                <SwiperSlide key={image_id}>
                  <GameImage ImageId={image_id} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={`${tab === 2 ? 'block' : 'hidden'} mt-1`}>
            <iframe
              className='w-full h-44'
              allowFullScreen={true}
              src={`https://www.youtube.com/embed/LW5NwaUXgIA`}
            ></iframe>
          </div>
          <div className={`${tab === 3 ? 'block' : 'hidden'} mt-1`}>
            <Swiper navigation={true} modules={[Navigation]} slidesPerView={2}>
              {detailGame.similar_games.map((game) => (
                <SwiperSlide
                  className='max-h-[220px] max-w-[160px]'
                  key={game.id}
                >
                  <Link
                    onClick={() => setNewGame(true)}
                    to={`/detail/${game.id}`}
                  >
                    <GameImage ImageId={game.cover.image_id} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className='mt-4'>{detailGame.summary}</div>
    </div>
  ) : (
    <Placeholder quantify={1} />
  );
}
