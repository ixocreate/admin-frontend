export interface APIErrorElement {
  code: string;
  data: APIErrorMessages;
}

export interface APIErrorMessages {
  title: string;
  messages: Array<string>;
}

export interface APIResponse {
  success: Boolean;
  result?: any;
  errorCode?: string;
  errorMessages?: Array<string>;
}
