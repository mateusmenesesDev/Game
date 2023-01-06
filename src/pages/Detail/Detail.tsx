import {
  IBasicGameApi,
  IBasicMediaGameApi,
  IDetaiGame,
  IGame,
} from "../../types/IGames";
import { GameImage } from "../../components/Genres/GameCarousel/GameImage";
import { Placeholder } from "../../components/utils/Placeholder";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Tabs } from "./components/Tabs";
import { Context } from "../../contexts/Context";
import { generateRandom } from "../../utils/generateRandom";
import { gameFetch } from "../../api/game";

export function Detail() {
  const [newGame, setNewGame] = useState(false);
  const [detailGame, setDetailGame] = useState<IDetaiGame>();
  const { gameId } = useParams();
  const { games } = useContext(Context);

  async function fetchGameData() {
    setNewGame(true);
    let game: IGame;
    if (gameId?.startsWith("random")) {
      game = games[generateRandom(499)];
    } else {
      const request = await gameFetch.getGame(gameId);
      game = request[0];
    }
    const company = await gameFetch.getCompany(game);
    setDetailGame({ game, company });
    setNewGame(false);
  }

  useEffect(() => {
    fetchGameData();
  }, [gameId, games]);

  return detailGame?.game && newGame === false ? (
    <div className="lg:grid grid-cols-2 items-center ">
      <div className="col-span-1 row-span-1 justify-self-end">
        <div className="flex flex-col items-center mb-10">
          <div className="indicator max-w-[310px]">
            {detailGame.game.rating && (
              <span className="indicator-item indicator-start badge bg-red-700 w-14 h-14 font-bold border-none">
                {Math.floor(detailGame.game.rating)}/100
              </span>
            )}
            <div className="grid bg-base-300 place-items-center">
              {detailGame.game.cover && (
                <GameImage ImageId={detailGame.game.cover.image_id} />
              )}
            </div>
          </div>
          <h3 className="font-bold text-lg flex-1">{detailGame.game.name}</h3>
          <div className="flex gap-2 flex-wrap justify-center my-3">
            {detailGame.company && <h3>{detailGame.company.name}</h3>}
            {new Date(
              detailGame.game.first_release_date * 1000
            ).toLocaleDateString() !== "Invalid Date" &&
              new Date(
                detailGame.game.first_release_date * 1000
              ).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <Tabs detailGame={detailGame.game} setNewGame={setNewGame} />
      </div>
      <div className="mt-4 px-2 row-start-1 col-start-2 lg:pr-24 lg:max-w-[500px]">
        {detailGame.game.summary}
      </div>
    </div>
  ) : (
    <Placeholder quantify={1} />
  );
}
