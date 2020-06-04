export interface WysiwigModalData {
  value: QuillData;
  onConfirm: (data: QuillData) => void;
}

export interface QuillData {
  html: string;
  quill: any;
}
