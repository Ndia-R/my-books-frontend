import Logo from '@/components/layout/logo';
import MenuList from '@/components/layout/menu-list';
import Button from '@/components/ui/button';
import Drawer from '@/components/ui/drawer';
import { useWindowSize } from '@/hooks/useWindowSize';
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
      <div className="hidden md:flex md:items-center md:gap-x-10">
        <Logo />
        <MenuList />
      </div>

      <div className="md:hidden">
        <Button
          className="rounded-full"
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
        >
          <MenuIcon className="size-5" />
        </Button>

        <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="p-8">
            <div className="mb-8" onClick={() => setIsOpen(false)}>
              <Logo />
            </div>
            <MenuList onClick={() => setIsOpen(false)} />
          </div>
        </Drawer>
      </div>
    </div>
  );
}
