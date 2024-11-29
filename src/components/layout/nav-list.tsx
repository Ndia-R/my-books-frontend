import Logo from '@/components/layout/logo';
import MenuList from '@/components/layout/menu-list';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useWindowSize } from '@/hooks/use-window-size';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';

export default function NavList() {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize(100);

  if (isOpen && width >= 768) {
    setIsOpen(false);
  }

  return (
    <div>
      <div className="hidden md:flex md:items-center md:gap-x-8">
        <Logo />
        <MenuList />
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="rounded-full md:hidden" variant="ghost" size="icon">
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
