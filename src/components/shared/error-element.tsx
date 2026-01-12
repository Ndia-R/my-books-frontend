import { HttpError } from '@/types/infrastructure/http';

type Props = {
  error?: unknown;
};

export default function ErrorElement({ error }: Props) {
  // HttpError の場合は詳細情報を表示
  if (error instanceof HttpError) {
    // 401は自動リダイレクトされるため、ここには到達しないはず
    // ただし、万が一のために表示を用意
    if (error.status === 401) {
      return (
        <div className="flex h-24 w-full flex-col items-center justify-center">
          <p>認証が必要です。ログイン画面に移動しています...</p>
        </div>
      );
    }

    return (
      <div className="flex h-24 w-full flex-col items-center justify-center">
        <p className="font-semibold">エラーが発生しました</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  // 一般的なエラー
  return (
    <div className="flex h-24 w-full items-center justify-center">
      <p>読み込みエラー</p>
    </div>
  );
}
