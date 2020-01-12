import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITargetTt } from 'app/shared/model/target-tt.model';
import { TargetTtService } from './target-tt.service';
import { TargetTtDeleteDialogComponent } from './target-tt-delete-dialog.component';

@Component({
  selector: 'jhi-target-tt',
  templateUrl: './target-tt.component.html'
})
export class TargetTtComponent implements OnInit, OnDestroy {
  targets?: ITargetTt[];
  eventSubscriber?: Subscription;

  constructor(protected targetService: TargetTtService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.targetService.query().subscribe((res: HttpResponse<ITargetTt[]>) => {
      this.targets = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTargets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITargetTt): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTargets(): void {
    this.eventSubscriber = this.eventManager.subscribe('targetListModification', () => this.loadAll());
  }

  delete(target: ITargetTt): void {
    const modalRef = this.modalService.open(TargetTtDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.target = target;
  }
}
