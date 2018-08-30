export interface InputModalData {
  confirmBtnTitle?: string;
  confirmBtnType?: string;
  confirmBtnIcon?: string;
  cancelBtnTitle?: string;
  title: string;
  text: string;
  onConfirm: (value) => void;
}
