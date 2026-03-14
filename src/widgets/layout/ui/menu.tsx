import { useWindowSize } from '@/shared/hooks/use-window-size';
import { Button } from '@/shared/ui/button';
import { DialogDescription, DialogTitle } from '@/shared/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import Logo from '@/widgets/layout/ui/logo';
import NavList from '@/widgets/layout/ui/nav-list';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const DEBOUNCED_DELAY = 100;
  const { width } = useWindowSize(DEBOUNCED_DELAY);

  const TABLET_WIDTH = 1024;
  if (isOpen && width >= TABLET_WIDTH) {
    setIsOpen(false);
  }

  return (
    <>
      <div className="hidden lg:flex lg:items-center lg:gap-x-8">
        <Logo />
        <NavList />
      </div>

      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="メニュー">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-fit gap-y-10 p-8"
            showCloseButton={false}
            side="left"
          >
            <VisuallyHidden>
              <DialogTitle>ナビメニュー</DialogTitle>
              <DialogDescription>ナビメニュー</DialogDescription>
            </VisuallyHidden>

            <Logo onClick={() => setIsOpen(false)} />
            <NavList onClick={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
