import { CONFIRM_DIALOG_EVENT } from '@/components/confirm-dialog';

// 確認ダイアログの引数
export type ConfirmDialogOptions = {
  icon: string; // アイコンの種類（「''」「'i'」「'?'」「'!'」「'c'」）
  title: string; // タイトル
  message?: string; // メッセージ
  actionLabel?: string; // アクションボタンの文字（デフォルト「OK」）
  actionOnly?: boolean; // 「キャンセル」ボタンをなくす
  persistent?: boolean; // 永続化するか（要素外クリック、ESCキーでも閉じないようにするか）
  showInput?: boolean; // 入力欄を表示するか
  inputLabel?: string; // 入力欄のラベル
  inputPlaceholder?: string; // 入力欄のプレースホルダー
  inputRows?: number; // 入力欄の行数
  resolve?: (value: ConfirmDialogResult) => void;
};

// 確認ダイアログの戻り値
export type ConfirmDialogResult = {
  isAction: boolean;
  isCancel: boolean;
  text: string;
};

export const useConfirmDialog = () => {
  const confirmDialog = (options: ConfirmDialogOptions): Promise<ConfirmDialogResult> => {
    return new Promise((resolve) => {
      const event = new CustomEvent(CONFIRM_DIALOG_EVENT, {
        detail: { ...options, resolve },
      });
      document.dispatchEvent(event);
    });
  };
  return { confirmDialog };
};
