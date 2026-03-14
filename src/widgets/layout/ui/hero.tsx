import { useAuth } from '@/entities/user';
import SearchInput from '@/features/book-search/ui/search-input';
import mainVisualImage from '@/shared/assets/main-visual.webp';
import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui/button';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export default function Hero() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative flex items-center sm:h-125">
      <div className="absolute top-10 right-0 overflow-hidden sm:right-8">
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 100 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <img
            className="w-100 opacity-30 md:opacity-50 lg:w-112.5 lg:opacity-80"
            src={mainVisualImage}
            alt=""
            aria-hidden="true"
          />
        </motion.div>
      </div>

      <div className="z-0 flex w-3/4 flex-col gap-y-6 lg:w-3/5">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <h1 className="font-title text-5xl font-bold drop-shadow-lg sm:text-6xl xl:text-7xl">
            Let’s search for <span className="text-primary">Books</span> to
            discover new knowledge.
            <span className="sr-only" lang="ja">
              新たな知識を発見するために、本を探しましょう。
            </span>
          </h1>
        </motion.div>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="text-muted-foreground text-sm drop-shadow-lg sm:text-base">
            本の探索サイトへようこそ。多様なコレクションから、新しい知識を発見しましょう。厳選された書籍で、あなたの次の読書を見つけてください。知識の旅に一緒に出かけましょう。
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col gap-y-4">
            <SearchInput />

            {!isAuthenticated && (
              <Link
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'mb-8 w-48 sm:w-64'
                )}
                to="/settings/plan"
              >
                今すぐ始める
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
