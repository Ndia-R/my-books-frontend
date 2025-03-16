import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { CONFIRM_DIALOG_EVENT, ConfirmDialogOptions } from '@/hooks/use-confirm-dialog';
import { cn } from '@/lib/util';
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  HelpCircleIcon,
  InfoIcon,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const ICON_TYPES = {
  ['']: InfoIcon,
  ['i']: InfoIcon,
  ['?']: HelpCircleIcon,
  ['!']: AlertTriangleIcon,
  ['c']: CheckCircle2Icon,
};

const DEFAULT_OPTION_VALUE: ConfirmDialogOptions = {
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

export default function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions>(DEFAULT_OPTION_VALUE);
  const refTextarea = useRef<HTMLTextAreaElement | null>(null);

  const iconKey = options.icon as keyof typeof ICON_TYPES;
  const Icon = ICON_TYPES[iconKey] ?? ICON_TYPES[''];

  // hooksから呼ぶためにイベントリスナー登録
  useEffect(() => {
    const handleEvent = (event: CustomEvent<ConfirmDialogOptions>) => {
      setIsOpen(true);
      setOptions({ ...DEFAULT_OPTION_VALUE, ...event.detail });
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
  const [selected, setSelected] = useState<'action' | 'cancel' | undefined>();

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
            <Icon
              className={cn('mr-3 min-w-fit', options.icon === '!' && 'text-destructive')}
            />
            <p className="leading-6">{options.title}</p>
          </DialogTitle>
          {options.message && (
            <DialogDescription className="pt-2 text-left">
              {options.message}
            </DialogDescription>
          )}
        </DialogHeader>

        {options.showInput && (
          <div className="mb-4 grid w-full items-center gap-1.5">
            <p className="text-xs">{options.inputLabel}</p>
            <Textarea
              ref={refTextarea}
              className="min-h-4 resize-none"
              placeholder={options.inputPlaceholder}
              rows={options.inputRows}
            />
          </div>
        )}

        <DialogFooter className="flex justify-end gap-y-4 sm:gap-y-0">
          {!options.actionOnly && (
            <Button
              className="min-w-24 rounded-full"
              variant="ghost"
              onClick={handleClickCancel}
            >
              キャンセル
            </Button>
          )}
          <Button
            className={cn('min-w-24 rounded-full')}
            variant={options.icon === '!' ? 'destructive' : 'default'}
            onClick={handleClickAction}
          >
            {options.actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
