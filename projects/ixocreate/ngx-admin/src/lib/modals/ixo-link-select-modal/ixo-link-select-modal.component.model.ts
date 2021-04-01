export interface LinkSelectModalData {
  value: any;
  allowedLinkTypes?: string[];
  selectedType?: string;
  onConfirm: (data: {type: string, target: string, value: any}) => void;
}
