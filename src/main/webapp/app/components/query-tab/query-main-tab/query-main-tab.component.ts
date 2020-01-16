import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { TabService } from 'app/components/tabs/tab.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tab } from 'app/components/tabs/tab.model';
import { QueryResultTabComponent } from 'app/components/query-tab/query-result-tab/query-result-tab.component';
import { TabData } from 'app/components/tabs/tab-data';

@Component({
  selector: 'jhi-query-main-tab',
  templateUrl: './query-main-tab.component.html',
  styleUrls: ['./query-main-tab.component.scss']
})
export class QueryMainTabComponent implements OnInit {
  queryForm?: FormGroup;
  tabService?: TabService;

  constructor(@Inject(forwardRef(() => TabService)) tabService: any) {
    this.tabService = tabService;
  }

  ngOnInit(): void {
    this.queryForm = new FormGroup({
      parameter: new FormControl(null, [Validators.required])
    });
  }
  onClick(): void {
    // Form ile herhangi bir etkileşime girilmediyse click yapma
    if (this.queryForm!.untouched) {
      return;
    }

    this.tabService!.addTab(new Tab(QueryResultTabComponent, 'Result', new TabData(this.queryForm!.get('parameter')!.value)));
  }
}
