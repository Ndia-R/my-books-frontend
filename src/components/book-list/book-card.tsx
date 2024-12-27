import { useAuth } from '@/auth/use-auth';
import FavoriteButton from '@/components/favorite-button';
import MyListButton from '@/components/my-list-button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Book } from '@/types/book';
import { Link } from 'react-router-dom';

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  const { user } = useAuth();
  return (
    <>
      <Card className="border-card-foreground/5 bg-card/70">
        <CardContent className="relative flex w-40 flex-col items-center px-3 pb-2 pt-6 sm:w-48 sm:px-4">
          <Link className="flex justify-center" to={`/book/${book.id}`}>
            <img
              className="h-44 rounded object-cover sm:h-52"
              src={book.imageUrl}
              alt={book.title}
            />
          </Link>
          <div className="mt-1 flex w-full items-center justify-between">
            <p className="text-xs text-muted-foreground">{book.publishedDate}</p>
            {user && (
              <div className="flex">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MyListButton size="sm" />
                  </TooltipTrigger>
                  <TooltipContent>マイリストに追加</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <FavoriteButton size="sm" book={book} />
                  </TooltipTrigger>
                  <TooltipContent>お気に入りに追加</TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
          <Link
            className="flex h-8 w-full items-center justify-center text-xs hover:text-primary sm:h-10 sm:text-sm"
            to={`/book/${book.id}`}
          >
            <p className="line-clamp-2 text-center">{book.title}</p>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
