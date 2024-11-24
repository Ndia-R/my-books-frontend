import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ConfirmDialogOptions } from '@/hooks/use-confirm-dialog';
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  HelpCircleIcon,
  InfoIcon,
  LucideProps,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/util';
import { useEffect, useRef, useState } from 'react';

type IconType = {
  [key: string]: {
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >;
    variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    color: string;
  };
};

const iconTypes: IconType = {
  ['']: { icon: InfoIcon, variant: 'default', color: '' },
  ['i']: { icon: InfoIcon, variant: 'default', color: '' },
  ['?']: { icon: HelpCircleIcon, variant: 'default', color: '' },
  ['!']: { icon: AlertTriangleIcon, variant: 'destructive', color: 'text-destructive' },
  ['c']: { icon: CheckCircle2Icon, variant: 'default', color: '' },
};

const defaultOptions: ConfirmDialogOptions = {
  icon: '',
  title: '',
  message: '',
  actionLabel: 'OK',
  actionOnly: false,
  persistent: false,
  showInput: false,
  inputLabel: '',
  inputPlaceholder: '',
  inputRows: 1,
};

export const CONFIRM_DIALOG_EVENT = 'CONFIRM_DIALOG_EVENT';

const ConfirmDialog = () => {
  const [options, setOptions] = useState<ConfirmDialogOptions>(defaultOptions);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEvent = (event: CustomEvent<ConfirmDialogOptions>) => {
      setIsOpen(true);
      setOptions((prev) => ({ ...prev, ...event.detail }));
    };
    document.addEventListener(CONFIRM_DIALOG_EVENT, handleEvent as EventListener);
    return () => {
      document.removeEventListener(CONFIRM_DIALOG_EVENT, handleEvent as EventListener);
    };
  }, []);

  const Icon = iconTypes[options.icon].icon || InfoIcon;

  const refTextarea = useRef<HTMLTextAreaElement | null>(null);

  // アニメーションフラグ（閉じれないことを伝えるためにぶるっとする）
  const [isPersistentAnimation, setIsPersistentAnimation] = useState(false);

  // ダイアログを閉じる時のイベント
  const handleCloseDialog = () => {
    if (options.persistent) {
      setIsPersistentAnimation(true);
      return;
    }
    handleClickCancel();
  };

  // アニメーション終了イベント
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === 'transform') {
      setIsPersistentAnimation(false);
    }
  };

  // アクションボタン
  const handleClickAction = () => {
    setIsOpen(false);
    options.resolve?.({
      isAction: true,
      isCancel: false,
      text: refTextarea.current?.value || '',
    });
  };

  // キャンセルボタン
  const handleClickCancel = () => {
    setIsOpen(false);
    options.resolve?.({
      isAction: false,
      isCancel: true,
      text: '',
    });
  };

  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent
          className={cn(
            'w-[400px] transition-transform ease-in-out [transition-duration:25ms]',
            isPersistentAnimation && 'scale-[1.02] transform'
          )}
          onTransitionEnd={handleTransitionEnd}
          onEscapeKeyDown={handleCloseDialog}
          onPointerDownOutside={handleCloseDialog}
        >
          <DialogHeader>
            <DialogTitle className="my-2 flex items-center">
              <Icon className={cn('mr-3 min-w-fit', iconTypes[options.icon].color)} />
              <p className=" leading-6">{options.title}</p>
            </DialogTitle>
            {options.message && (
              <DialogDescription className="pt-2">{options.message}</DialogDescription>
            )}
          </DialogHeader>

          {options.showInput && (
            <div className="mb-4 grid w-full items-center gap-1.5">
              <p className="text-xs">{options.inputLabel}</p>
              <Textarea
                className="min-h-[16px] resize-none"
                placeholder={options.inputPlaceholder}
                rows={options.inputRows}
                ref={refTextarea}
              />
            </div>
          )}
          <DialogFooter className="flex justify-end">
            {!options.actionOnly && (
              <Button variant="ghost" onClick={handleClickCancel}>
                キャンセル
              </Button>
            )}
            <Button
              variant={iconTypes[options.icon].variant || 'default'}
              onClick={handleClickAction}
            >
              {options.actionLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { ConfirmDialog };
