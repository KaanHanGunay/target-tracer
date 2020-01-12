import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { ITargetLogsTt, TargetLogsTt } from 'app/shared/model/target-logs-tt.model';
import { TargetLogsTtService } from './target-logs-tt.service';
import { ITargetTt } from 'app/shared/model/target-tt.model';
import { TargetTtService } from 'app/entities/target-tt/target-tt.service';

@Component({
  selector: 'jhi-target-logs-tt-update',
  templateUrl: './target-logs-tt-update.component.html'
})
export class TargetLogsTtUpdateComponent implements OnInit {
  isSaving = false;

  targets: ITargetTt[] = [];
  dayDp: any;

  editForm = this.fb.group({
    id: [],
    day: [],
    isSuccess: [],
    targetId: []
  });

  constructor(
    protected targetLogsService: TargetLogsTtService,
    protected targetService: TargetTtService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ targetLogs }) => {
      this.updateForm(targetLogs);

      this.targetService
        .query()
        .pipe(
          map((res: HttpResponse<ITargetTt[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ITargetTt[]) => (this.targets = resBody));
    });
  }

  updateForm(targetLogs: ITargetLogsTt): void {
    this.editForm.patchValue({
      id: targetLogs.id,
      day: targetLogs.day,
      isSuccess: targetLogs.isSuccess,
      targetId: targetLogs.targetId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const targetLogs = this.createFromForm();
    if (targetLogs.id !== undefined) {
      this.subscribeToSaveResponse(this.targetLogsService.update(targetLogs));
    } else {
      this.subscribeToSaveResponse(this.targetLogsService.create(targetLogs));
    }
  }

  private createFromForm(): ITargetLogsTt {
    return {
      ...new TargetLogsTt(),
      id: this.editForm.get(['id'])!.value,
      day: this.editForm.get(['day'])!.value,
      isSuccess: this.editForm.get(['isSuccess'])!.value,
      targetId: this.editForm.get(['targetId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITargetLogsTt>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ITargetTt): any {
    return item.id;
  }
}
