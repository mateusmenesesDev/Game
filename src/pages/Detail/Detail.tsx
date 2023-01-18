import { IDetaiGame } from '../../types/IGames';
import { GameImage } from '../../components/GameImage';
import { Placeholder } from '../../components/utils/Placeholder';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Tabs } from './components/Tabs';
import { Context } from '../../contexts/Context';
import { generateRandom } from '../../utils/generateRandom';
import { gameFetch } from '../../api/game';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebase';
import { useAuth } from '../../contexts/Auth';

export function Detail() {
  const [newGame, setNewGame] = useState(false);
  const [detailGame, setDetailGame] = useState<IDetaiGame>();
  const [rating, setRating] = useState(0);
  const [type, setType] = useState('');
  const { gameId } = useParams();
  const { games, setUserList, userList } = useContext(Context);
  const { user } = useAuth();

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

  function addGameToList() {
    if (!userList && detailGame) {
      setUserList([{ ...detailGame, rating, type }]);
      return;
    }
    const gameInList = userList
      ? userList?.some((item) => item.game.id === detailGame?.game.id)
      : false;
    if (!gameInList && detailGame) {
      setUserList([...userList, { ...detailGame, rating, type }]);
    } else {
      alert('Jogo já está na sua lista!');
    }
  }

  async function updateFirestore() {
    const users = await getDocs(collection(db, 'users'));
    console.log('🚀 ~ file: Detail.tsx:75 ~ updateFirestore ~ users', users);
    console.log(userList, 't');
    users.forEach((userDB) => {
      if (userDB.data().email === user?.email) {
        const userDocRef = doc(db, 'users', userDB.id);
        updateDoc(userDocRef, {
          gameList: userList,
        });
      }
    });
  }

  useEffect(() => {
    if (gameId?.startsWith('random')) {
      fetchRandomGameData();
    } else {
      fetchGameData();
    }
  }, [gameId]);

  useEffect(() => {
    if (userList !== undefined) updateFirestore();
  }, [userList]);

  return detailGame?.game && newGame === false ? (
    <div className='lg:grid grid-cols-2 items-center '>
      <div className='col-span-1 row-span-1 justify-self-end'>
        <div className='flex flex-col items-center mb-10'>
          <div className='indicator max-w-[310px]'>
            {detailGame.game.rating && (
              <span className='indicator-item indicator-start badge bg-red-700 w-14 h-14 font-bold border-none'>
                {Math.floor(detailGame.game.rating)}/100
              </span>
            )}
            <label
              htmlFor='my-modal'
              className='indicator-item indicator-end badge w-6 h-6 font-bold border-none hover:scale-150'
            >
              +
            </label>
            <input type='checkbox' id='my-modal' className='modal-toggle' />
            <div className='modal'>
              <div className='modal-box'>
                <h3 className='font-bold text-lg'>{detailGame.game.name}</h3>
                <div>
                  <select
                    className='select select-bordered w-full max-w-xs'
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    <option disabled selected>
                      Nota
                    </option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                  <select
                    className='select select-bordered w-full max-w-xs'
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option disabled selected>
                      Type
                    </option>
                    <option value='Completed'>Completed</option>
                    <option value='Playing'>Playing</option>
                    <option value='Dropped'>Dropped</option>
                    <option value='Plan to Play'>Plan to Play</option>
                  </select>
                </div>
                <div className='modal-action'>
                  <label
                    htmlFor='my-modal'
                    className='btn'
                    onClick={addGameToList}
                  >
                    Salvar
                  </label>
                  <label htmlFor='my-modal' className='btn'>
                    Fechar
                  </label>
                </div>
              </div>
            </div>

            <div className='w-full'>
              {detailGame.game.cover && (
                <GameImage ImageId={detailGame.game.cover.image_id} />
              )}
            </div>
          </div>

          <h3 className='font-bold text-lg flex-1'>{detailGame.game.name}</h3>
          <div className='flex gap-2 flex-wrap justify-center my-3'>
            {detailGame.company && <h3>{detailGame.company.name}</h3>}
            {new Date(
              detailGame.game.first_release_date * 1000
            ).toLocaleDateString() !== 'Invalid Date' &&
              new Date(
                detailGame.game.first_release_date * 1000
              ).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className='col-span-2'>
        <Tabs detailGame={detailGame.game} />
      </div>
      <div className='mt-4 px-2 row-start-1 col-start-2 lg:pr-24 lg:max-w-[500px]'>
        {detailGame.game.summary}
      </div>
    </div>
  ) : (
    <Placeholder quantify={1} />
  );
}
