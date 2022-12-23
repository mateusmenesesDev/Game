type Props = {
  quantify: number;
};

export function Placeholder({ quantify }: Props) {
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 xl:px-20'>
      {[...Array(quantify)].map((_x, i) => (
        <div
          key={i}
          className='w-full bg-primary drop-shadow-md rounded-lg lg:max-w-[305px] lg:h-[406px]'
        >
          <div className='animate-pulse w-full h-52 bg-base-200'></div>
          <div className='p-3 space-y-5'>
            <div className='animate-pulse w-2/3 h-6 bg-base-200'></div>
            <div className='flex space-x-4'>
              <div className='animate-pulse w-1/3 h-3 bg-base-200'></div>
              <div className='animate-pulse w-1/3 h-3 bg-base-200'></div>
              <div className='animate-pulse w-1/3 h-3 bg-base-200'></div>
            </div>
            <div className='space-y-3'>
              <div className='animate-pulse w-3/4 h-3 bg-base-200'></div>
              <div className='animate-pulse w-full h-3 bg-base-200'></div>
              <div className='animate-pulse w-2/3 h-3 bg-base-200'></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
