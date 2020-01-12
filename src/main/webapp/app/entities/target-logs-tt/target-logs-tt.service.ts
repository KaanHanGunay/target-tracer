import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITargetLogsTt } from 'app/shared/model/target-logs-tt.model';

type EntityResponseType = HttpResponse<ITargetLogsTt>;
type EntityArrayResponseType = HttpResponse<ITargetLogsTt[]>;

@Injectable({ providedIn: 'root' })
export class TargetLogsTtService {
  public resourceUrl = SERVER_API_URL + 'api/target-logs';

  constructor(protected http: HttpClient) {}

  create(targetLogs: ITargetLogsTt): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(targetLogs);
    return this.http
      .post<ITargetLogsTt>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(targetLogs: ITargetLogsTt): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(targetLogs);
    return this.http
      .put<ITargetLogsTt>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITargetLogsTt>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITargetLogsTt[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(targetLogs: ITargetLogsTt): ITargetLogsTt {
    const copy: ITargetLogsTt = Object.assign({}, targetLogs, {
      day: targetLogs.day && targetLogs.day.isValid() ? targetLogs.day.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.day = res.body.day ? moment(res.body.day) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((targetLogs: ITargetLogsTt) => {
        targetLogs.day = targetLogs.day ? moment(targetLogs.day) : undefined;
      });
    }
    return res;
  }
}
