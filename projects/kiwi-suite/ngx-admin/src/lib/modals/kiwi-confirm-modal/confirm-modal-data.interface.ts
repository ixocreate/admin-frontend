export interface ConfirmModalData {
  confirmBtnTitle?: string;
  confirmBtnType?: string;
  confirmBtnIcon?: string;
  cancelBtnTitle?: string;
  title: string;
  text: string;
  onConfirm: () => void;
}
