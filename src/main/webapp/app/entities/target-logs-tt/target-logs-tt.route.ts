import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITargetLogsTt, TargetLogsTt } from 'app/shared/model/target-logs-tt.model';
import { TargetLogsTtService } from './target-logs-tt.service';
import { TargetLogsTtComponent } from './target-logs-tt.component';
import { TargetLogsTtDetailComponent } from './target-logs-tt-detail.component';
import { TargetLogsTtUpdateComponent } from './target-logs-tt-update.component';

@Injectable({ providedIn: 'root' })
export class TargetLogsTtResolve implements Resolve<ITargetLogsTt> {
  constructor(private service: TargetLogsTtService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITargetLogsTt> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((targetLogs: HttpResponse<TargetLogsTt>) => {
          if (targetLogs.body) {
            return of(targetLogs.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TargetLogsTt());
  }
}

export const targetLogsRoute: Routes = [
  {
    path: '',
    component: TargetLogsTtComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'targettracerApp.targetLogs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TargetLogsTtDetailComponent,
    resolve: {
      targetLogs: TargetLogsTtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'targettracerApp.targetLogs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TargetLogsTtUpdateComponent,
    resolve: {
      targetLogs: TargetLogsTtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'targettracerApp.targetLogs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TargetLogsTtUpdateComponent,
    resolve: {
      targetLogs: TargetLogsTtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'targettracerApp.targetLogs.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
