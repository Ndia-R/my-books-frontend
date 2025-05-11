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
        <h1>ランキング</h1>
      </div>

      <Separator className="bg-foreground/10 my-4" />
    </>
  );
}
