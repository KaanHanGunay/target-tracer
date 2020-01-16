import { Component, OnInit } from '@angular/core';
import { Tab } from 'app/components/tabs/tab.model';
import { TabService } from 'app/components/tabs/tab.service';

@Component({
  selector: 'jhi-query-tab',
  templateUrl: './query-tab.component.html',
  styleUrls: ['./query-tab.component.scss']
})
export class QueryTabComponent implements OnInit {
  tabs = new Array<Tab>();
  selectedTab?: number;
  constructor(private tabService: TabService) {}

  ngOnInit() {
    this.tabService.tabSub.subscribe((tabs: Tab[]) => {
      this.tabs = tabs;
      this.selectedTab = tabs.findIndex((tab: Tab) => tab.active!);
    });
  }

  removeTab(index: number): void {
    this.tabService.removeTab(index);
  }
}
