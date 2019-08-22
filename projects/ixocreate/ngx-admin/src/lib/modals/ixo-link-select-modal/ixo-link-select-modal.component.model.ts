export interface LinkSelectModalData {
  value: any;
  selectedType?: string;
  onConfirm: (data: {type: string, target: string, value: any}) => void;
}
