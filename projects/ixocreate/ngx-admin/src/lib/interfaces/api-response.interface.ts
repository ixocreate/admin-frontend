export interface APIErrorElement {
  code: string;
  data: APIErrorMessages;
}

export interface APIErrorMessages {
  title: string;
  messages: string[];
}

export interface APIResponse {
  success: boolean;
  result?: any;
  errorCode?: string;
  errorMessages?: string[];
}
