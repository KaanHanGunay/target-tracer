import { Component, Input, OnInit } from '@angular/core';
import { TabData } from 'app/components/tabs/tab-data';

@Component({
  selector: 'jhi-query-result-tab',
  templateUrl: './query-result-tab.component.html',
  styleUrls: ['./query-result-tab.component.scss']
})
export class QueryResultTabComponent implements OnInit {
  @Input() tabData: TabData = new TabData();

  constructor() {}

  ngOnInit(): void {}
}
