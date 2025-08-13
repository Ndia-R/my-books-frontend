import { MessageSquareIcon } from 'lucide-react';

type Props = {
  count: number;
};

export default function ReviewCountIcon({ count }: Props) {
  return (
    <div className="text-muted-foreground flex items-center">
      <div className="flex size-8 items-center justify-center">
        <MessageSquareIcon className="size-4" />
      </div>
      <div className="flex min-w-4 justify-center text-sm">{count}</div>
    </div>
  );
}
