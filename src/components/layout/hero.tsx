import imgUrl from '@/assets/main-visual.png';
import SearchInput from '@/components/search-input';

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
      <div className="z-10 flex w-3/4 flex-col justify-between lg:w-3/5">
        <div>
          <div className="delay-0 duration-500 animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-both">
            <h1 className="w-fit text-5xl font-bold sm:text-6xl xl:text-7xl">{TITLE}</h1>
          </div>
          <div className="delay-150 duration-500 animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-both">
            <p className="my-6 w-full break-words text-sm text-muted-foreground">
              {MESSAGE}
            </p>
          </div>
        </div>
        <div className="delay-300 duration-500 animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-both">
          <div className="flex h-full max-w-96 items-center">
            <SearchInput />
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-10 w-[400px] opacity-25 sm:right-5 sm:w-[400px] lg:w-[450px] lg:opacity-100">
        <div className="delay-500 duration-500 animate-in fade-in-0 slide-in-from-right-10 fill-mode-both">
          <img src={imgUrl} alt="main-visual-image" />
        </div>
      </div>
    </div>
  );
}
