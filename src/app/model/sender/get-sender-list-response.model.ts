import { Sender } from './sender.model';

export interface GetSenderListResponse {
  status: boolean;
  errorMessage: string;
  data?: Sender[];
}
