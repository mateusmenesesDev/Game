import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Context } from '../contexts/Context';
import { IBasicGameApi, IBasicImageGameApi } from '../types/IGames';
import { GameImage } from '../components/Genres/GameCarousel/GameImage';
import { Placeholder } from '../components/utils/Placeholder';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

export function Detail() {
  const [company, setCompany] = useState<IBasicGameApi[]>([]);
  const [tab, setTab] = useState<number>(1);
  const [plataformsLogos, setPlataformsLogos] = useState<
    IBasicImageGameApi[] | []
  >([]);
  const { games } = useContext(Context);
  const { gameId } = useParams();
  const detailGame = games.find((game) => game.id === Number(gameId));
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
  useEffect(() => {
    if (detailGame !== undefined) {
      getCompany();
      getPlataformsLogos();
    }
  }, [detailGame]);

  return detailGame !== undefined ? (
    <div className=''>
      <div className='flex flex-col items-center mb-10'>
        <div className='w-1/2 max-w-[310px] flex-1'>
          <div className='badge bg-red-700 w-10 h-10 relative top-7 right-4 font-bold sm:w-14 sm:h-14 sm:top-9'>
            {Math.floor(detailGame.rating)}
          </div>
          <GameImage ImageId={detailGame.cover.image_id} />
        </div>
        <h3 className='font-bold text-lg flex-1'>{detailGame.name}</h3>
        <div className='flex gap-2 flex-wrap justify-center my-3'>
          {company.length > 0 && <h3>{company[0].name}</h3>}
          {new Date(detailGame.first_release_date * 1000).toLocaleDateString()}
        </div>
        <div className='flex gap-5 px-3 bg-secondary rounded-lg'>
          {plataformsLogos.map(({ image_id }) => (
            <div key={image_id} className='w-[30px] '>
              <GameImage ImageId={image_id} />
            </div>
          ))}
        </div>
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
            <Swiper navigation={true} modules={[Navigation]} className={''}>
              {detailGame.screenshots.map(({ image_id }) => (
                <SwiperSlide key={image_id}>
                  <GameImage ImageId={image_id} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={`${tab === 2 ? 'block' : 'hidden'}`}>teste2</div>
          <div className={`${tab === 3 ? 'block' : 'hidden'}`}>teste3</div>
        </div>
      </div>
      <div className='mt-3'>{detailGame.summary}</div>
    </div>
  ) : (
    <Placeholder quantify={1} />
  );
}
