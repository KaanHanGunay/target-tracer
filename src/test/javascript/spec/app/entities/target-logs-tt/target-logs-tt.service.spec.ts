import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { TargetLogsTtService } from 'app/entities/target-logs-tt/target-logs-tt.service';
import { ITargetLogsTt, TargetLogsTt } from 'app/shared/model/target-logs-tt.model';

describe('Service Tests', () => {
  describe('TargetLogsTt Service', () => {
    let injector: TestBed;
    let service: TargetLogsTtService;
    let httpMock: HttpTestingController;
    let elemDefault: ITargetLogsTt;
    let expectedResult: ITargetLogsTt | ITargetLogsTt[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TargetLogsTtService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new TargetLogsTt(0, currentDate, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            day: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TargetLogsTt', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            day: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            day: currentDate
          },
          returnedFromService
        );
        service
          .create(new TargetLogsTt())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TargetLogsTt', () => {
        const returnedFromService = Object.assign(
          {
            day: currentDate.format(DATE_FORMAT),
            isSuccess: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            day: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TargetLogsTt', () => {
        const returnedFromService = Object.assign(
          {
            day: currentDate.format(DATE_FORMAT),
            isSuccess: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            day: currentDate
          },
          returnedFromService
        );
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TargetLogsTt', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
