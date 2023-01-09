import { GameImage } from "../../components/GameImage";

export default function ListGameData({ item }: any) {
  return (
    <div
      className="grid place-items-center bg-base-300 grid-cols-3 text-sm md:text-base"
      key={item.detailGame.game.id}
    >
      <div className="w-24 lg:w-52">
        <GameImage ImageId={item.detailGame.game.cover.image_id} />
      </div>
      <div className="flex justify-between w-full">
        <div>
          <p>{item.detailGame.game.name}</p>
          <p>{item.rating}/10</p>
        </div>
      </div>
      <div className="flex gap-10">
        <div>{item.type}</div>
        <div>Editar</div>
      </div>
    </div>
  );
}
