import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITargetTt, TargetTt } from 'app/shared/model/target-tt.model';
import { TargetTtService } from './target-tt.service';
import { TargetTtComponent } from './target-tt.component';
import { TargetTtDetailComponent } from './target-tt-detail.component';
import { TargetTtUpdateComponent } from './target-tt-update.component';

@Injectable({ providedIn: 'root' })
export class TargetTtResolve implements Resolve<ITargetTt> {
  constructor(private service: TargetTtService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITargetTt> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((target: HttpResponse<TargetTt>) => {
          if (target.body) {
            return of(target.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TargetTt());
  }
}

export const targetRoute: Routes = [
  {
    path: '',
    component: TargetTtComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'targettracerApp.target.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TargetTtDetailComponent,
    resolve: {
      target: TargetTtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'targettracerApp.target.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TargetTtUpdateComponent,
    resolve: {
      target: TargetTtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'targettracerApp.target.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TargetTtUpdateComponent,
    resolve: {
      target: TargetTtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'targettracerApp.target.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
