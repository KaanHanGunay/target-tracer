import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITargetTt } from 'app/shared/model/target-tt.model';

@Component({
  selector: 'jhi-target-tt-detail',
  templateUrl: './target-tt-detail.component.html'
})
export class TargetTtDetailComponent implements OnInit {
  target: ITargetTt | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ target }) => {
      this.target = target;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
