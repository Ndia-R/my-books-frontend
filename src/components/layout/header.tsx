import LoginButton from '@/components/layout/login-button';
import NavList from '@/components/layout/nav-list';
import ThemeToggleButton from '@/components/layout/theme-toggle-button';
import SearchInput from '@/components/search-input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { cn } from '@/lib/util';
import { useState } from 'react';

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header
      className={cn('w-screen max-w-full bg-background/30 backdrop-blur-lg', className)}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="animate-fadeInDown-4">
          <div className="flex h-16 w-full items-center sm:gap-x-2">
            <NavList />
            <span className="flex-1"></span>
            <SearchInput />
            <Button onClick={() => setIsOpen(true)}>OPEN</Button>
            <LoginButton />
            <ThemeToggleButton />
          </div>
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-1/2 min-w-[360px] max-w-[600px] p-4 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold leading-10">レビュー</p>
              <p className="text-xs text-muted-foreground md:text-sm">
                素敵な感想を伝えましょう！
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="rounded-full"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            >
              閉じる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
