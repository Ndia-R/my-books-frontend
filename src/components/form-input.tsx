import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useId, useState } from 'react';

type Props = React.ComponentPropsWithRef<typeof Input> & {
  label: string;
  errorMessage?: string;
};

export default function FormInput({
  label,
  errorMessage,
  className,
  id,
  name,
  type,
  ref,
  ...props
}: Props) {
  const [isShownPassword, setIsShownPassword] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputName = name ?? inputId;
  const inputType = type ?? 'text';

  const actualType =
    type === 'password' && isShownPassword ? 'text' : inputType;

  return (
    <div>
      <Label className="text-xs" htmlFor={inputId}>
        {label}
      </Label>
      <div className="relative">
        <Input
          ref={ref}
          className={cn(
            className,
            'border-foreground/20 my-2',
            errorMessage && 'border-destructive'
          )}
          type={actualType}
          id={inputId}
          name={inputName}
          {...props}
        />
        {inputType === 'password' && (
          <Button
            className="hover:text-foreground absolute top-0 right-0 hover:bg-transparent"
            variant="ghost"
            size="icon"
            aria-label={
              isShownPassword ? 'パスワードを非表示' : 'パスワードを表示'
            }
            type="button"
            onClick={() => setIsShownPassword(!isShownPassword)}
          >
            {isShownPassword ? (
              <EyeIcon className="size-4" />
            ) : (
              <EyeOffIcon className="size-4" />
            )}
          </Button>
        )}
      </div>

      {errorMessage && (
        <p className="text-destructive text-xs">{errorMessage}</p>
      )}
    </div>
  );
}
