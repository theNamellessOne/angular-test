import { Sender } from './../model/sender/sender.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, AUTH_TOKEN } from '../constants';
import { Observable, Subject, tap } from 'rxjs';
import { GetSenderListResponse } from '../model/sender/get-sender-list-response.model';
import { SaveSenderResponse } from '../model/sender/save-sender-response.model';

@Injectable({
  providedIn: 'root',
})
export class SenderService {
  private get_sender_list = API_URL + 'GetSenderList';
  private save_sender = API_URL + 'SaveSender';
  private auth_header = new HttpHeaders({ Authorization: AUTH_TOKEN });

  constructor(private http: HttpClient) {}

  private _shouldRefresh = new Subject<void>();
  get shouldRefresh() {
    return this._shouldRefresh;
  }

  getSenderList(): Observable<GetSenderListResponse> {
    return this.http.get<GetSenderListResponse>(this.get_sender_list, {
      headers: this.auth_header,
    });
  }

  saveSender(sender: Sender): Observable<SaveSenderResponse> {
    return this.http
      .post<SaveSenderResponse>(this.save_sender, sender, {
        headers: this.auth_header,
      })
      .pipe(tap(() => this._shouldRefresh.next()));
  }
}
