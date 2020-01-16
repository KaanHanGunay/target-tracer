export interface ITabData {
  entry?: string;
}

export class TabData implements ITabData {
  constructor(public entry?: string) {}
}
