import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondRouterOutletComponent } from 'app/components/second-router-outlet/second-router-outlet.component';
import { TargettracerSharedModule } from 'app/shared/shared.module';
import { SecondRMainComponent } from './second-r-main/second-r-main.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, TargettracerSharedModule, RouterModule],
  exports: [RouterModule],
  declarations: [SecondRouterOutletComponent, SecondRMainComponent]
})
export class SecondRouterOutletModule {}
