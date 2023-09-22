export interface SaveSenderResponse {
  status: boolean;
  errorMessage: string;
  data?: { message: string; idobject: string };
}
