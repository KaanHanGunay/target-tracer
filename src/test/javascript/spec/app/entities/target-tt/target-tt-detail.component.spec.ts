import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TargettracerTestModule } from '../../../test.module';
import { TargetTtDetailComponent } from 'app/entities/target-tt/target-tt-detail.component';
import { TargetTt } from 'app/shared/model/target-tt.model';

describe('Component Tests', () => {
  describe('TargetTt Management Detail Component', () => {
    let comp: TargetTtDetailComponent;
    let fixture: ComponentFixture<TargetTtDetailComponent>;
    const route = ({ data: of({ target: new TargetTt(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TargettracerTestModule],
        declarations: [TargetTtDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TargetTtDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TargetTtDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load target on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.target).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
