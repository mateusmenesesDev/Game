type Props = {
  ImageId: string | undefined;
  hover?: boolean;
  rounded?: boolean;
};

export function GameImage({ ImageId, hover = false, rounded }: Props) {
  return (
    <picture>
      <source
        srcSet={`https://images.igdb.com/igdb/image/upload/t_720p/${ImageId}.png`}
        media="(min-width: 768px)"
      />
      <img
        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${ImageId}.png`}
        alt=""
        className={`h-full w-full ${rounded ? "rounded-md" : ""} ${
          hover ? "transition-all hover:border-4" : ""
        } `}
        loading="lazy"
      />
    </picture>
  );
}
