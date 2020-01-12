import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TargettracerSharedModule } from 'app/shared/shared.module';
import { TargetLogsTtComponent } from './target-logs-tt.component';
import { TargetLogsTtDetailComponent } from './target-logs-tt-detail.component';
import { TargetLogsTtUpdateComponent } from './target-logs-tt-update.component';
import { TargetLogsTtDeleteDialogComponent } from './target-logs-tt-delete-dialog.component';
import { targetLogsRoute } from './target-logs-tt.route';

@NgModule({
  imports: [TargettracerSharedModule, RouterModule.forChild(targetLogsRoute)],
  declarations: [TargetLogsTtComponent, TargetLogsTtDetailComponent, TargetLogsTtUpdateComponent, TargetLogsTtDeleteDialogComponent],
  entryComponents: [TargetLogsTtDeleteDialogComponent]
})
export class TargettracerTargetLogsTtModule {}
