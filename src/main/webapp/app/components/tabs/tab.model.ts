import { Type } from '@angular/core';
import { TabData } from 'app/components/tabs/tab-data';

export class Tab {
  public id?: number;
  public title?: string;
  public tabData?: TabData;
  public active?: boolean;
  public component?: Type<any>;

  constructor(component?: Type<any>, title?: string, tabData?: TabData) {
    this.tabData = tabData;
    this.component = component;
    this.title = title;
  }
}
