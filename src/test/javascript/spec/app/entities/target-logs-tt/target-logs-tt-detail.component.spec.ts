import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TargettracerTestModule } from '../../../test.module';
import { TargetLogsTtDetailComponent } from 'app/entities/target-logs-tt/target-logs-tt-detail.component';
import { TargetLogsTt } from 'app/shared/model/target-logs-tt.model';

describe('Component Tests', () => {
  describe('TargetLogsTt Management Detail Component', () => {
    let comp: TargetLogsTtDetailComponent;
    let fixture: ComponentFixture<TargetLogsTtDetailComponent>;
    const route = ({ data: of({ targetLogs: new TargetLogsTt(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TargettracerTestModule],
        declarations: [TargetLogsTtDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TargetLogsTtDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TargetLogsTtDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load targetLogs on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.targetLogs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
