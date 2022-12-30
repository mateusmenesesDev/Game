import axios from 'axios';
import { IBasicGameApi, IBasicMediaGameApi, IGame } from '../../types/IGames';
import { GameImage } from '../../components/Genres/GameCarousel/GameImage';
import { Placeholder } from '../../components/utils/Placeholder';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Tabs } from './components/Tabs';
import { Context } from '../../contexts/Context';
import { generateRandom } from '../../utils/generateRandom';

export function Detail() {
  const [company, setCompany] = useState<IBasicGameApi[]>([]);
  const [newGame, setNewGame] = useState(false);
  const [detailGame, setDetailGame] = useState<IGame>();
  const [plataformsLogos, setPlataformsLogos] = useState<
    IBasicMediaGameApi[] | []
  >([]);
  const { gameId } = useParams();
  const { games } = useContext(Context);

  async function getGame() {
    const { data } = await axios.get(
      `/.netlify/functions/getGame?gameId=${gameId}`
    );
    setDetailGame(data[0]);
  }
  async function getCompany() {
    const companyId = detailGame?.involved_companies[0]?.company;
    const { data } = await axios.get(
      `/.netlify/functions/gamePublisher?companyId=${companyId}`
    );
    setCompany(data.company);
  }
  async function getPlataformsLogos() {
    if (detailGame?.platforms !== undefined) {
      const logoIds = detailGame.platforms.map(
        ({ platform_logo }) => platform_logo
      );
      const logos: IBasicMediaGameApi[] = await Promise.all(
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
    if (newGame) {
      setNewGame(false);
      window.location.reload();
    }
    if (gameId?.startsWith('random')) {
      const randomGameIndex = generateRandom(499);
      setDetailGame(games[randomGameIndex]);
    } else {
      getGame();
    }
  }, [newGame, gameId, games]);

  useEffect(() => {
    if (detailGame != undefined) {
      getCompany();
      if (detailGame.platforms !== undefined) {
        getPlataformsLogos();
      }
    }
  }, [detailGame]);

  return detailGame !== undefined ? (
    <div className='lg:grid grid-cols-2 items-center '>
      <div className='col-span-1 row-span-1 justify-self-end'>
        <div className='flex flex-col items-center mb-10'>
          <div className='indicator max-w-[310px]'>
            <span className='indicator-item indicator-start badge bg-red-700 w-14 h-14 font-bold border-none'>
              {Math.floor(detailGame.rating)}/100
            </span>
            <div className='grid bg-base-300 place-items-center'>
              <GameImage ImageId={detailGame.cover.image_id} />
            </div>
          </div>
          <h3 className='font-bold text-lg flex-1'>{detailGame.name}</h3>
          <div className='flex gap-2 flex-wrap justify-center my-3'>
            {company.length > 0 && <h3>{company[0].name}</h3>}
            {new Date(
              detailGame.first_release_date * 1000
            ).toLocaleDateString()}
          </div>
          {plataformsLogos.length > 0 && (
            <div className='flex gap-5 mx-6 px-5 py-1 bg-primary rounded-lg flex-wrap justify-center'>
              {plataformsLogos.map(({ image_id }) => (
                <div key={image_id} className='w-[50px]'>
                  <GameImage ImageId={image_id} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='col-span-2'>
        <Tabs detailGame={detailGame} setNewGame={setNewGame} />
      </div>
      <div className='mt-4 px-2 row-start-1 col-start-2 lg:pr-24 lg:max-w-[500px]'>
        {detailGame.summary}
      </div>
    </div>
  ) : (
    <Placeholder quantify={1} />
  );
}
