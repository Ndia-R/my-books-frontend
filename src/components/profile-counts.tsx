import CountUpNumber from '@/components/count-up-number';
import { getProfileCounts } from '@/lib/data';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function ProfileCounts() {
  const { data: profileCounts } = useSuspenseQuery({
    queryKey: ['getProfileCounts'],
    queryFn: () => getProfileCounts(),
  });

  return (
    <div className="flex justify-between pt-8">
      <div className="delay-0 duration-500 animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-both">
        <div className="w-20 text-center">
          <p className="text-xl font-bold">
            <CountUpNumber end={profileCounts.favoriteCount} delay={300} />
          </p>
          <p className="text-sm">お気に入り</p>
        </div>
      </div>
      <div className="delay-100 duration-500 animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-both">
        <div className="w-20 text-center">
          <p className="text-xl font-bold">
            <CountUpNumber end={profileCounts.bookmarkCount} delay={400} />
          </p>
          <p className="text-sm">マイリスト</p>
        </div>
      </div>
      <div className="delay-200 duration-500 animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-both">
        <div className="w-20 text-center">
          <p className="text-xl font-bold">
            <CountUpNumber end={profileCounts.reviewCount} delay={500} />
          </p>
          <p className="text-sm">レビュー</p>
        </div>
      </div>
    </div>
  );
}
