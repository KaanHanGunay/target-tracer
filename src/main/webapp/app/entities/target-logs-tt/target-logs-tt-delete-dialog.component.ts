import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITargetLogsTt } from 'app/shared/model/target-logs-tt.model';
import { TargetLogsTtService } from './target-logs-tt.service';

@Component({
  templateUrl: './target-logs-tt-delete-dialog.component.html'
})
export class TargetLogsTtDeleteDialogComponent {
  targetLogs?: ITargetLogsTt;

  constructor(
    protected targetLogsService: TargetLogsTtService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.targetLogsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('targetLogsListModification');
      this.activeModal.close();
    });
  }
}
