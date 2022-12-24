import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Context } from '../contexts/Context';
import { IBasicGameApi } from '../types/IGames';
import { GameImage } from '../components/Genres/GameCarousel/GameImage';
import { Placeholder } from '../components/utils/Placeholder';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

export function Detail() {
  const [company, setCompany] = useState<IBasicGameApi[]>([]);
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
  useEffect(() => {
    if (detailGame !== undefined) getCompany();
    console.log(gameId);
  }, [detailGame]);

  return detailGame !== undefined ? (
    <div className=''>
      <div className='flex flex-col items-center'>
        <div className='w-1/2 max-w-[310px] flex-1'>
          <GameImage ImageId={detailGame.cover.image_id} />
        </div>
        <h3 className='font-bold text-lg flex-1'>{detailGame.name}</h3>
        {company.length > 0 && <h3>{company[0].name}</h3>}
      </div>
      <Swiper navigation={true} modules={[Navigation]} className={''}>
        {detailGame.screenshots.map((screenshot) => (
          <SwiperSlide key={screenshot.id}>
            <GameImage ImageId={screenshot.image_id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : (
    <Placeholder quantify={1} />
  );
}
