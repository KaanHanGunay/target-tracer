import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'target-tt',
        loadChildren: () => import('./target-tt/target-tt.module').then(m => m.TargettracerTargetTtModule)
      },
      {
        path: 'target-logs-tt',
        loadChildren: () => import('./target-logs-tt/target-logs-tt.module').then(m => m.TargettracerTargetLogsTtModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class TargettracerEntityModule {}
