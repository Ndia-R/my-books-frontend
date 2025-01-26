import CountUpNumber from '@/components/count-up-number';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useUser } from '@/hooks/use-user';
import { addMyList, removeMyList } from '@/lib/action/my-list';
import { getMyListInfo, getMyListInfoWithAuth } from '@/lib/data';
import { cn } from '@/lib/util';
import { MyListInfo } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ListCheckIcon, PlusIcon } from 'lucide-react';

const BUTTON_SIZE = { sm: 'size-6', md: 'size-8' };
const ICON_SIZE = { sm: 'size-3', md: 'size-4' };
const TEXT_SIZE = { sm: 'text-xs', md: 'text-sm' };

type Props = {
  bookId: string;
  size?: 'sm' | 'md';
  animation?: boolean;
};

export default function MyListButton({ bookId, size = 'md', animation = false }: Props) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const queryKey = ['getMyListInfo', bookId];
  const { data: myListInfo } = useQuery({
    queryKey,
    queryFn: () => (user ? getMyListInfoWithAuth(bookId) : getMyListInfo(bookId)),
  });

  const { mutate, variables, isPending } = useMutation({
    mutationFn: async (newMyListInfo: MyListInfo) => {
      if (newMyListInfo.isMyList) {
        await addMyList(bookId);
      } else {
        await removeMyList(bookId);
      }
    },
    onMutate: async (newMyListInfo: MyListInfo) => {
      await queryClient.cancelQueries({ queryKey });
      const previousMyListInfo = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, newMyListInfo);
      return { previousMyListInfo };
    },
    onSettled: (_newMyListInfo, error, _variables, context) => {
      if (error) {
        queryClient.setQueryData(queryKey, context?.previousMyListInfo);
      }
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleClick = () => {
    if (!user || !myListInfo) return;

    const newMyListInfo: MyListInfo = {
      ...myListInfo,
      isMyList: !myListInfo.isMyList,
      myListCount: myListInfo.isMyList
        ? myListInfo.myListCount - 1
        : myListInfo.myListCount + 1,
    };
    mutate(newMyListInfo);
  };

  const optimisticData = isPending ? variables : myListInfo;

  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              'rounded-full text-muted-foreground',
              BUTTON_SIZE[size],
              optimisticData?.isMyList && 'text-primary bg-transparent'
            )}
            variant="ghost"
            size="icon"
            onClick={handleClick}
          >
            {optimisticData?.isMyList ? (
              <ListCheckIcon className={ICON_SIZE[size]} />
            ) : (
              <PlusIcon className={ICON_SIZE[size]} />
            )}
          </Button>
        </TooltipTrigger>
        {user ? (
          <TooltipContent>
            {optimisticData?.isMyList ? 'マイリストから削除' : 'マイリストに追加'}
          </TooltipContent>
        ) : (
          <TooltipContent>
            ログインしてこの本を「マイリスト」に加えましょう
          </TooltipContent>
        )}
      </Tooltip>

      <p
        className={cn(
          'flex min-w-4 text-muted-foreground justify-center',
          TEXT_SIZE[size]
        )}
      >
        {animation ? (
          <CountUpNumber end={optimisticData?.myListCount || 0} />
        ) : (
          optimisticData?.myListCount
        )}
      </p>
    </div>
  );
}
