import Logo from '@/components/layout/logo';
import MenuList from '@/components/layout/menu-list';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useWindowSize } from '@/hooks/use-window-size';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';

export default function NavList() {
  const [isOpen, setIsOpen] = useState(false);

  const DEBOUNCED_DELAY = 100;
  const { width } = useWindowSize(DEBOUNCED_DELAY);

  const TABLET_WIDTH = 1024;
  if (isOpen && width >= TABLET_WIDTH) {
    setIsOpen(false);
  }

  return (
    <div>
      <div className="hidden lg:flex lg:items-center lg:gap-x-8">
        <Logo />
        <MenuList />
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="rounded-full lg:hidden" variant="ghost" size="icon">
            <MenuIcon className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-fit p-8" side="left">
          <div className="mb-8" onClick={() => setIsOpen(false)}>
            <Logo />
          </div>
          <MenuList onClick={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
