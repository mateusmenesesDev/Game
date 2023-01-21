import "swiper/css";
import "swiper/css/navigation";
import "./Genre.css";

import { Placeholder } from "../utils/Placeholder";
import { useContext } from "react";
import { GameCarousel } from "./GameCarousel";
import { Context } from "../../contexts/Context";

export function Genres() {
  const { genres } = useContext(Context);
  return (
    <div>
      {genres.length > 0 ? (
        genres.map((genre) => (
          <div key={genre.id}>
            <h3
              key={genre.id}
              className="font-bold text-lg lg:text-3xl ml-4 md:ml-8"
            >
              {genre.name}
            </h3>
            <GameCarousel genre={genre} />
          </div>
        ))
      ) : (
        <Placeholder quantify={16} />
      )}
    </div>
  );
}
