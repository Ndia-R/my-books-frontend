import { buttonVariants } from '@/shared/ui/button';
import { LockIcon } from 'lucide-react';
import { Link } from 'react-router';

type Props = {
  bookId: string;
};

export default function BookReadPaywall({ bookId }: Props) {
  return (
    <div className="flex flex-col items-center gap-y-6 py-12 text-center">
      <LockIcon className="text-muted-foreground size-10" />
      <h2 className="text-xl font-bold">試し読みはここまでです</h2>
      <p className="text-muted-foreground">
        続きを読むには有料会員への登録が必要です
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          className={buttonVariants({ variant: 'default' })}
          to="/settings/plan"
        >
          プランを見る
        </Link>
        <Link
          className={buttonVariants({ variant: 'outline' })}
          to={`/books/${bookId}`}
        >
          書籍の詳細に戻る
        </Link>
      </div>
    </div>
  );
}
