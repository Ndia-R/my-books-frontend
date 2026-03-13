import notFoundImage from '@/assets/not-found.webp';
import { APP_TITLE } from '@/constants/constants';
import { Link } from 'react-router';

type Props = {
  title: string;
};

export default function NotFound({ title }: Props) {
  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="flex h-[calc(100vh-64px-140px)] flex-col items-center justify-center gap-y-4 sm:h-[calc(100vh-64px-72px)]">
        <img
          className="opacity-50"
          src={notFoundImage}
          alt=""
          aria-hidden="true"
        />
        <h1 className="text-4xl font-bold">404 Not Found</h1>
        <p>お探しのページは見つかりませんでした。</p>
        <Link className="text-primary underline" to="/">
          ホームに戻る
        </Link>
      </div>
    </>
  );
}
