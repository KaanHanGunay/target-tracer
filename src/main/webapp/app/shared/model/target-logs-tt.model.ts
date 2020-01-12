import { Moment } from 'moment';

export interface ITargetLogsTt {
  id?: number;
  day?: Moment;
  isSuccess?: boolean;
  targetId?: number;
}

export class TargetLogsTt implements ITargetLogsTt {
  constructor(public id?: number, public day?: Moment, public isSuccess?: boolean, public targetId?: number) {
    this.isSuccess = this.isSuccess || false;
  }
}
