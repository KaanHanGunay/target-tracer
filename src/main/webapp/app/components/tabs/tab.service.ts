import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab } from 'app/components/tabs/tab.model';
import { TabData } from 'app/components/tabs/tab-data';
import { QueryMainTabComponent } from 'app/components/query-tab/query-main-tab/query-main-tab.component';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  public tabs: Tab[] = [new Tab(QueryMainTabComponent, 'Main Tab', new TabData())];

  public tabSub = new BehaviorSubject<Tab[]>(this.tabs);

  public removeTab(index: number): void {
    const activeTabIndex = this.tabs.indexOf(this.tabs.find((t: Tab) => t.active === true)!);

    this.tabs.splice(index, 1);
    if (index === activeTabIndex) {
      this.tabs[index - 1].active = true;
    } else if (index > activeTabIndex) {
      this.tabs[activeTabIndex].active = true;
    } else {
      this.tabs[index].active = true;
    }

    this.tabSub.next(this.tabs);
  }

  public addTab(tab: Tab): void {
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].active) {
        this.tabs[i].active = false;
      }
    }
    tab.id = this.tabs.length + 1;
    tab.active = true;
    this.tabs.push(tab);
    this.tabSub.next(this.tabs);
  }
}
