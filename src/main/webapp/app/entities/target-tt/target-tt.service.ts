import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITargetTt } from 'app/shared/model/target-tt.model';

type EntityResponseType = HttpResponse<ITargetTt>;
type EntityArrayResponseType = HttpResponse<ITargetTt[]>;

@Injectable({ providedIn: 'root' })
export class TargetTtService {
  public resourceUrl = SERVER_API_URL + 'api/targets';

  constructor(protected http: HttpClient) {}

  create(target: ITargetTt): Observable<EntityResponseType> {
    return this.http.post<ITargetTt>(this.resourceUrl, target, { observe: 'response' });
  }

  update(target: ITargetTt): Observable<EntityResponseType> {
    return this.http.put<ITargetTt>(this.resourceUrl, target, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITargetTt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITargetTt[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
