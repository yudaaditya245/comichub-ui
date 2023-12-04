export function LatestComicsSkeleton() {
  const array = Array.from({ length: 18 });
  return (
    // <div className="mt-3 flex flex-col gap-8 p-5 max-w-5xl mx-auto">
    //   <div className="h-7 w-[60%] animate-pulse rounded bg-black/30"></div>
      <ul className="grid grid-cols-3 gap-x-4 gap-y-6 pb-2 md:grid-cols-6">
        {array.map((_, index) => (
          <li key={index} className="flex w-full flex-col gap-[0.65rem]">
            <div className="aspect-[3/4.5] animate-pulse rounded bg-green-600/30"></div>
            <div className="h-4 w-[80%] animate-pulse rounded bg-green-600/30"></div>
          </li>
        ))}
      </ul>
      // <div className="h-10 w-full animate-pulse rounded bg-black/30"></div>
    // </div>
  );
}

export function GroupComicsSkeleton() {
  const array = Array.from({ length: 6 });
  return (
    <ul className=" flex flex-shrink-0 flex-row gap-x-4 gap-y-6 overflow-x-hidden">
      {array.map((_, index) => (
        <li key={index} className="flex w-[30vw] flex-shrink-0 flex-col gap-2 md:w-[14vw] lg:w-[140px]">
          <div className="aspect-[3/4.5] animate-pulse rounded bg-green-600/30"></div>
          <div className="h-4 w-[80%] animate-pulse rounded bg-green-600/30"></div>
        </li>
      ))}
    </ul>
  );
}

export function SquareSkeleton() {
  return <div className="h-14 w-14 animate-pulse rounded-xl bg-green-600/30"></div>;
}
