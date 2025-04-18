import { Separator } from '@/components/ui/separator';
import { usePageTitle } from '@/hooks/use-page-title';

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  usePageTitle(title);

  return (
    <>
      <div className="m-4 flex h-10 items-center">
        <h1>ランキング</h1>
      </div>

      <Separator className="bg-foreground/10 my-4" />
    </>
  );
}
