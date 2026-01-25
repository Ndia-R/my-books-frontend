import { APP_TITLE } from '@/constants/constants';
import { Link } from 'react-router';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="flex h-[calc(100vh-64px-140px)] flex-col items-center justify-center gap-y-4 sm:h-[calc(100vh-64px-72px)]">
        <h1 className="text-4xl font-bold">サブスクリプション</h1>
        <p>アクセス権限がありません。</p>
        <Link className="text-primary underline" to="/">
          ホームに戻る
        </Link>
      </div>
    </>
  );
}
