import { useRef, useState } from 'react';

export const VALIDATION_RULES = {
  email: {
    required: 'メールアドレスは必須です。',
    invalid: '無効なメールアドレスです。',
    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    required: 'パスワードは必須です。',
    minLength: 'パスワードは3文字以上で設定してください。',
    min: 3,
  },
  confirmPassword: {
    confirm: '新しいパスワードと確認用パスワードが一致していません。',
  },
  name: {
    required: 'ユーザー名は必須です。',
  },
} as const;

export const useFieldValidation = <
  T extends HTMLInputElement = HTMLInputElement,
>() => {
  const ref = useRef<T | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = {
    email: () => {
      setErrorMessage('');
      const value = ref.current?.value || '';

      if (!value) {
        setErrorMessage(VALIDATION_RULES.email.required);
        return false;
      }

      if (!VALIDATION_RULES.email.pattern.test(value)) {
        setErrorMessage(VALIDATION_RULES.email.invalid);
        return false;
      }

      return true;
    },

    password: () => {
      setErrorMessage('');
      const value = ref.current?.value || '';

      if (!value) {
        setErrorMessage(VALIDATION_RULES.password.required);
        return false;
      }

      if (value.length < VALIDATION_RULES.password.min) {
        setErrorMessage(VALIDATION_RULES.password.minLength);
        return false;
      }

      return true;
    },

    confirmPassword: (password: string) => {
      setErrorMessage('');
      const value = ref.current?.value || '';

      if (value !== password) {
        setErrorMessage(VALIDATION_RULES.confirmPassword.confirm);
        return false;
      }

      return true;
    },

    name: () => {
      setErrorMessage('');
      const value = ref.current?.value || '';

      if (!value) {
        setErrorMessage(VALIDATION_RULES.name.required);
        return false;
      }

      return true;
    },

    custom: (validationFn: (value: string) => string | null) => {
      setErrorMessage('');
      const value = ref.current?.value || '';
      const error = validationFn(value);

      if (error) {
        setErrorMessage(error);
        return false;
      }

      return true;
    },
  };

  return {
    ref,
    errorMessage,
    validate,
    setValue: (value: string) => {
      if (ref.current) {
        ref.current.value = value;
      }
    },
    getValue: () => ref.current?.value || '',
  };
};
