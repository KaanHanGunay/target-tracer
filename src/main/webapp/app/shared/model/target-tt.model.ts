export interface ITargetTt {
  id?: number;
  name?: string;
  successCount?: number;
  dayCount?: number;
  userId?: number;
}

export class TargetTt implements ITargetTt {
  constructor(public id?: number, public name?: string, public successCount?: number, public dayCount?: number, public userId?: number) {}
}
