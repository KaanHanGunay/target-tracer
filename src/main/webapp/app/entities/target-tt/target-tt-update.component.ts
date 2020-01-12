import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITargetTt, TargetTt } from 'app/shared/model/target-tt.model';
import { TargetTtService } from './target-tt.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-target-tt-update',
  templateUrl: './target-tt-update.component.html'
})
export class TargetTtUpdateComponent implements OnInit {
  isSaving = false;

  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    successCount: [],
    dayCount: [],
    userId: []
  });

  constructor(
    protected targetService: TargetTtService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ target }) => {
      this.updateForm(target);

      this.userService
        .query()
        .pipe(
          map((res: HttpResponse<IUser[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUser[]) => (this.users = resBody));
    });
  }

  updateForm(target: ITargetTt): void {
    this.editForm.patchValue({
      id: target.id,
      name: target.name,
      successCount: target.successCount,
      dayCount: target.dayCount,
      userId: target.userId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const target = this.createFromForm();
    if (target.id !== undefined) {
      this.subscribeToSaveResponse(this.targetService.update(target));
    } else {
      this.subscribeToSaveResponse(this.targetService.create(target));
    }
  }

  private createFromForm(): ITargetTt {
    return {
      ...new TargetTt(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      successCount: this.editForm.get(['successCount'])!.value,
      dayCount: this.editForm.get(['dayCount'])!.value,
      userId: this.editForm.get(['userId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITargetTt>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
