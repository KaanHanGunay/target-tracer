import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TargettracerSharedModule } from 'app/shared/shared.module';
import { TargetTtComponent } from './target-tt.component';
import { TargetTtDetailComponent } from './target-tt-detail.component';
import { TargetTtUpdateComponent } from './target-tt-update.component';
import { TargetTtDeleteDialogComponent } from './target-tt-delete-dialog.component';
import { targetRoute } from './target-tt.route';

@NgModule({
  imports: [TargettracerSharedModule, RouterModule.forChild(targetRoute)],
  declarations: [TargetTtComponent, TargetTtDetailComponent, TargetTtUpdateComponent, TargetTtDeleteDialogComponent],
  entryComponents: [TargetTtDeleteDialogComponent]
})
export class TargettracerTargetTtModule {}
