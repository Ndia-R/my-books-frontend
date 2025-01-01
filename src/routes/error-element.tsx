import { useAsyncError } from 'react-router-dom';

export default function ErrorElement() {
  const error = useAsyncError();
  console.error(error);
  return (
    <div className="flex h-24 w-full items-center justify-center">
      <p>読み込みエラー</p>
    </div>
  );
}
