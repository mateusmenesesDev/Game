import { IDetaiGame } from '../../types/IGames';
import { Placeholder } from '../../components/utils/Placeholder';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../contexts/Context';
import { generateRandom } from '../../utils/generateRandom';
import { gameFetch } from '../../api/game';
import { useAuth } from '../../contexts/Auth';
import { firestore } from '../../services/firebase/firestore';
import { AiFillStar } from 'react-icons/ai';
import Modal from './components/Modal';
import ModalAddGame from '../../components/Modal/ModalGame/ModalAddGame';

type Modal = 'screenshots' | 'videos' | 'similar games' | undefined;

export function Detail() {
  const [newGame, setNewGame] = useState(false);
  const [cover, setCover] = useState('');
  const [mainScreenshot, setMainScreenshoot] = useState('');
  const [detailGame, setDetailGame] = useState<IDetaiGame>();
  const { gameId } = useParams();
  const { games, userList } = useContext(Context);
  const { user } = useAuth();
  const [modal, setModal] = useState<Modal>();
  const [modalAddGame, setModalAddGame] = useState(false);

  async function fetchGameData() {
    setNewGame(true);
    let game;
    const gameInContext = games.find((game) => game.id === Number(gameId));
    if (gameInContext !== undefined) {
      game = games.find((game) => game.id === Number(gameId));
    } else {
      const request = await gameFetch.getGame(gameId);
      game = request[0];
    }
    const company = await gameFetch.getCompany(game);
    setDetailGame({ game, company });
    setNewGame(false);
  }

  async function fetchRandomGameData() {
    setNewGame(true);
    let game;
    if (games.length === 0) {
      const request = await gameFetch.getGame(String(generateRandom(499)));
      game = request[0];
    } else {
      game = games[generateRandom(499)];
    }
    const company = await gameFetch.getCompany(game);
    setDetailGame({ game, company });
    setNewGame(false);
  }

  useEffect(() => {
    if (gameId?.startsWith('random')) {
      fetchRandomGameData();
    } else {
      fetchGameData();
    }
  }, [gameId]);

  useEffect(() => {
    if (user) {
      firestore.updateFirestore(user, userList);
    }
  }, [userList]);

  useEffect(() => {
    if (detailGame) {
      setCover(
        `https://images.igdb.com/igdb/image/upload/t_cover_big/${detailGame.game.cover.image_id}.png`
      );
      setMainScreenshoot(
        `https://images.igdb.com/igdb/image/upload/t_1080p/${detailGame.game.screenshots[0].image_id}.png`
      );
    }
  }, [detailGame]);

  return detailGame?.game && newGame === false ? (
    <div>
      {modal && (
        <Modal
          handleClose={() => setModal(undefined)}
          game={detailGame.game}
          type={modal}
        />
      )}
      {modalAddGame && (
        <ModalAddGame
          detailGame={detailGame}
          setModal={() => setModalAddGame(false)}
        />
      )}
      <div className='h-[50vh] w-screen'>
        <picture>
          <source srcSet={mainScreenshot} media='(min-width:550px)' />
          <img
            src={cover}
            alt='game cover'
            className='h-full w-full lg:object-cover'
          />
        </picture>
      </div>
      <div className='absolute lg:max-h-[400px] top-[51vh] w-full p-5 rounded-t-3xl bg-transparent backdrop-blur-md lg:flex gap-10'>
        <div>
          <div className='hidden lg:block relative bottom-[20vh] h-[533px] w-[400px] '>
            <img
              src={cover}
              alt='game cover'
              className=' rounded-xl w-full h-full shadow-lg'
            />
          </div>
        </div>
        <div className='flex-1 lg:pr-10'>
          <div className='flex flex-col'>
            <div className='flex gap-5 items-center'>
              <div className='flex items-center gap-1'>
                <AiFillStar className='text-yellow-300' />
                <div className='text-yellow-300 font-bold drop-shadow-[0_10px_10px_rgba(0,0,0,0.70)]'>
                  {Math.floor(detailGame.game.rating)}
                </div>
              </div>
              <div className='drop-shadow-[0_10px_10px_rgba(0,0,0,0.70)] text-white'>
                {'('}
                {detailGame.game.total_rating_count}
                {' ratings)'}
              </div>
            </div>
            <div className='text-3xl text-white font-bold mb-2 drop-shadow-[0_10px_10px_rgba(0,0,0,0.70)]'>
              {detailGame.game.name}
            </div>
            <div className='hidden md:block pt-6 lg:order-3 mt-12'>
              {detailGame.game.summary}
            </div>
            <div className='lg:flex items-center justify-between mt-4 lg:mt-16'>
              <button
                className='btn w-full lg:max-w-[187px] btn-primary'
                onClick={() => setModalAddGame(true)}
              >
                Add to List
              </button>
              <div className='flex justify-center gap-5 mt-5 lg:mt-0'>
                <div
                  className='btn btn-xs md:btn-sm btn-outline'
                  onClick={() => setModal('screenshots')}
                >
                  Screenshots
                </div>
                <div
                  className='btn btn-xs md:btn-sm btn-outline'
                  onClick={() => setModal('videos')}
                >
                  Vídeos
                </div>
                <div
                  className='btn btn-xs md:btn-sm btn-outline'
                  onClick={() => setModal('similar games')}
                >
                  Similar Games
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Placeholder quantify={1} />
  );
}
