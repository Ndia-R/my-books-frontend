import { Separator } from '@/components/ui/separator';
import { APP_TITLE } from '@/constants/constants';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="m-4 flex h-10 items-center">
        <h1 className="text-lg font-bold sm:text-xl">ランキング</h1>
      </div>

      <Separator className="bg-foreground/10 my-4" />

      <section className="p-4">
        <p>準備中...</p>
      </section>
    </>
  );
}
