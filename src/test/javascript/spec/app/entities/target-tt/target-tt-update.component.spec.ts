import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TargettracerTestModule } from '../../../test.module';
import { TargetTtUpdateComponent } from 'app/entities/target-tt/target-tt-update.component';
import { TargetTtService } from 'app/entities/target-tt/target-tt.service';
import { TargetTt } from 'app/shared/model/target-tt.model';

describe('Component Tests', () => {
  describe('TargetTt Management Update Component', () => {
    let comp: TargetTtUpdateComponent;
    let fixture: ComponentFixture<TargetTtUpdateComponent>;
    let service: TargetTtService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TargettracerTestModule],
        declarations: [TargetTtUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TargetTtUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TargetTtUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TargetTtService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TargetTt(123);
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
        const entity = new TargetTt();
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
