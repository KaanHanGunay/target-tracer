import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TargettracerTestModule } from '../../../test.module';
import { TargetTtComponent } from 'app/entities/target-tt/target-tt.component';
import { TargetTtService } from 'app/entities/target-tt/target-tt.service';
import { TargetTt } from 'app/shared/model/target-tt.model';

describe('Component Tests', () => {
  describe('TargetTt Management Component', () => {
    let comp: TargetTtComponent;
    let fixture: ComponentFixture<TargetTtComponent>;
    let service: TargetTtService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TargettracerTestModule],
        declarations: [TargetTtComponent],
        providers: []
      })
        .overrideTemplate(TargetTtComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TargetTtComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TargetTtService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TargetTt(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.targets && comp.targets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
