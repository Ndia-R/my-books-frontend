import imgUrl from '@/assets/main-visual.png';
import SearchBar from '@/components/search-bar';

export default function Hero() {
  const TITLE = (
    <>
      Let’s search for <span className="text-primary">Books</span> to discover new
      knowledge.
    </>
  );

  const MESSAGE =
    '本の探索サイトへようこそ。多様なコレクションから、新しい知識を発見しましょう。厳選された書籍で、あなたの次の読書を見つけてください。知識の旅に一緒に出かけましょう。';

  return (
    <div className="relative mb-8 flex h-[460px] w-full items-center gap-3 sm:mb-0 sm:gap-4 lg:h-[500px]">
      <div className="flex w-3/4 flex-col justify-between lg:w-3/5">
        <div>
          <h1 className="w-fit text-5xl font-bold sm:text-6xl xl:text-7xl">{TITLE}</h1>
          <p className="my-6 w-full break-words text-sm text-muted-foreground">
            {MESSAGE}
          </p>
        </div>
        <div className="flex h-full max-w-96 items-center">
          <SearchBar />
        </div>
      </div>
      <div className="absolute right-0 top-10 -z-10 w-[400px] opacity-40 sm:right-5 sm:w-[400px] lg:w-[450px] lg:opacity-100">
        <img src={imgUrl} alt="main-visual-image" />
      </div>
    </div>
  );
}
