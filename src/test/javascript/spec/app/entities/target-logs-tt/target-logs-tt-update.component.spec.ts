import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TargettracerTestModule } from '../../../test.module';
import { TargetLogsTtUpdateComponent } from 'app/entities/target-logs-tt/target-logs-tt-update.component';
import { TargetLogsTtService } from 'app/entities/target-logs-tt/target-logs-tt.service';
import { TargetLogsTt } from 'app/shared/model/target-logs-tt.model';

describe('Component Tests', () => {
  describe('TargetLogsTt Management Update Component', () => {
    let comp: TargetLogsTtUpdateComponent;
    let fixture: ComponentFixture<TargetLogsTtUpdateComponent>;
    let service: TargetLogsTtService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TargettracerTestModule],
        declarations: [TargetLogsTtUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TargetLogsTtUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TargetLogsTtUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TargetLogsTtService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TargetLogsTt(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TargetLogsTt();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
