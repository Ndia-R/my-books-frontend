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
      <div className="animate-fadeInUp-4 delay-0">
        <div className="w-20 text-center">
          <p className="text-xl font-bold">
            <CountUpNumber end={profileCounts.favoriteCount} delay={300} />
          </p>
          <p className="text-sm">お気に入り</p>
        </div>
      </div>
      <div className="animate-fadeInUp-4 delay-100">
        <div className="w-20 text-center">
          <p className="text-xl font-bold">
            <CountUpNumber end={profileCounts.myListCount} delay={400} />
          </p>
          <p className="text-sm">マイリスト</p>
        </div>
      </div>
      <div className="animate-fadeInUp-4 delay-200">
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
