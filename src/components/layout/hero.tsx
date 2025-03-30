import mainVisualImage from '@/assets/main-visual.webp';
import SearchInput from '@/components/search-input';

export default function Hero() {
  return (
    <div className="relative flex h-[500px] items-center">
      <div className="absolute top-10 right-0 overflow-hidden sm:right-8">
        <div className="animate-in fade-in-0 slide-in-from-right-10 fill-mode-both delay-500 duration-500">
          <img
            className="w-[400px] opacity-25 lg:w-[450px] lg:opacity-100"
            src={mainVisualImage}
            alt="main-visual-image"
          />
        </div>
      </div>

      <div className="flex w-3/4 flex-col gap-y-6 lg:w-3/5">
        <div className="animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-both delay-0 duration-500">
          <h1 className="text-5xl font-bold sm:text-6xl xl:text-7xl">
            Let’s search for <span className="text-primary">Books</span> to
            discover new knowledge.
            <span className="sr-only" lang="ja">
              新たな知識を発見するために、本を探しましょう。
            </span>
          </h1>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-both delay-150 duration-500">
          <p className="text-muted-foreground text-sm">
            本の探索サイトへようこそ。多様なコレクションから、新しい知識を発見しましょう。厳選された書籍で、あなたの次の読書を見つけてください。知識の旅に一緒に出かけましょう。
          </p>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-both delay-300 duration-500">
          <SearchInput />
        </div>
      </div>
    </div>
  );
}
