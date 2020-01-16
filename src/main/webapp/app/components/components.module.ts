import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentContainerDirective } from './tabs/content-container.directive';
import { TargettracerSharedModule } from 'app/shared/shared.module';
import { TabContentComponent } from './tabs/tab-content/tab-content.component';
import { QueryTabComponent } from './query-tab/query-tab.component';
import { QueryMainTabComponent } from './query-tab/query-main-tab/query-main-tab.component';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { QueryResultTabComponent } from './query-tab/query-result-tab/query-result-tab.component';
import { SecondRouterOutletModule } from 'app/components/second-router-outlet/second-router-outlet.module';

@NgModule({
  imports: [
    TargettracerSharedModule,
    CommonModule,
    SecondRouterOutletModule,
    RouterModule.forChild([
      {
        path: 'tabs',
        component: QueryTabComponent,
        data: { authorities: ['ROLE_ADMIN'], pageTitle: 'targettracerApp.components.query-tab.title' },
        canActivate: [UserRouteAccessService]
      },
      {
        path: 'second-router',
        loadChildren: () => import('./second-router-outlet/second-router-outlet.module').then(m => m.SecondRouterOutletModule),
        data: { authorities: ['ROLE_ADMIN'], pageTitle: 'targettracerApp.components.second-router.title' },
        canActivate: [UserRouteAccessService]
      }
    ])
  ],
  declarations: [ContentContainerDirective, TabContentComponent, QueryTabComponent, QueryMainTabComponent, QueryResultTabComponent],
  entryComponents: [QueryMainTabComponent, QueryResultTabComponent]
})
export class ComponentsModule {}
