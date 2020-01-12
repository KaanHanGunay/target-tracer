import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITargetLogsTt } from 'app/shared/model/target-logs-tt.model';

@Component({
  selector: 'jhi-target-logs-tt-detail',
  templateUrl: './target-logs-tt-detail.component.html'
})
export class TargetLogsTtDetailComponent implements OnInit {
  targetLogs: ITargetLogsTt | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ targetLogs }) => {
      this.targetLogs = targetLogs;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
