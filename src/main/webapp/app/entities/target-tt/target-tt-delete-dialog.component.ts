import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITargetTt } from 'app/shared/model/target-tt.model';
import { TargetTtService } from './target-tt.service';

@Component({
  templateUrl: './target-tt-delete-dialog.component.html'
})
export class TargetTtDeleteDialogComponent {
  target?: ITargetTt;

  constructor(protected targetService: TargetTtService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.targetService.delete(id).subscribe(() => {
      this.eventManager.broadcast('targetListModification');
      this.activeModal.close();
    });
  }
}
