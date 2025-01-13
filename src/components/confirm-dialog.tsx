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
import React, { useEffect, useRef, useState } from 'react';

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

type SELECTED_BUTTON = 'action' | 'cancel' | undefined;

const ConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions>(defaultOptions);
  const refTextarea = useRef<HTMLTextAreaElement | null>(null);
  const Icon = iconTypes[options.icon].icon || InfoIcon;

  // hooksから呼ぶためにイベントリスナー登録
  useEffect(() => {
    const handleEvent = (event: CustomEvent<ConfirmDialogOptions>) => {
      setIsOpen(true);
      setOptions({ ...defaultOptions, ...event.detail });
    };
    document.addEventListener(CONFIRM_DIALOG_EVENT, handleEvent as EventListener);
    return () => {
      document.removeEventListener(CONFIRM_DIALOG_EVENT, handleEvent as EventListener);
    };
  }, []);

  // アニメーションフラグ（閉じれないことを伝えるためにぶるっとする）
  const [isPersistentAnimation, setIsPersistentAnimation] = useState(false);

  // ダイアログを閉じる時のイベント
  const handleCloseDialog = () => {
    if (options.persistent) {
      setIsPersistentAnimation(true);
      setTimeout(() => {
        setIsPersistentAnimation(false);
      }, 50);
      return;
    }
    handleClickCancel();
  };

  // 押したボタンによって、戻り値（resolveの引数も変更する）
  const [selected, setSelected] = useState<SELECTED_BUTTON>();

  const handleClickAction = () => {
    setIsOpen(false);
    setSelected('action');
  };

  const handleClickCancel = () => {
    setIsOpen(false);
    setSelected('cancel');
  };

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === 'enter') {
      if (isOpen && options.showInput) {
        refTextarea.current?.focus();
      }
    } else if (e.animationName === 'exit') {
      switch (selected) {
        case 'action':
          options.resolve?.({
            isAction: true,
            isCancel: false,
            text: refTextarea.current?.value || '',
          });
          return;
        case 'cancel':
          options.resolve?.({
            isAction: false,
            isCancel: true,
            text: '',
          });
          return;
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent
          className={cn(
            'w-[360px] sm:w-[400px] transition-transform ease-in-out [transition-duration:25ms]',
            isPersistentAnimation && 'scale-[1.02] transform'
          )}
          onEscapeKeyDown={handleCloseDialog}
          onPointerDownOutside={handleCloseDialog}
          onAnimationEnd={handleAnimationEnd}
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
                ref={refTextarea}
                className="min-h-[16px] resize-none"
                placeholder={options.inputPlaceholder}
                rows={options.inputRows}
              />
            </div>
          )}

          <DialogFooter className="flex justify-end">
            {!options.actionOnly && (
              <Button
                className="rounded-full"
                variant="ghost"
                onClick={handleClickCancel}
              >
                キャンセル
              </Button>
            )}
            <Button
              className={cn('rounded-full', options.actionLabel === 'OK' && 'sm:w-20')}
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
