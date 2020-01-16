import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { TargettracerSharedModule } from 'app/shared/shared.module';
import { TargettracerCoreModule } from 'app/core/core.module';
import { TargettracerAppRoutingModule } from './app-routing.module';
import { TargettracerHomeModule } from './home/home.module';
import { TargettracerEntityModule } from './entities/entity.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    FlexLayoutModule,
    TargettracerSharedModule,
    TargettracerCoreModule,
    TargettracerHomeModule,
    TargettracerEntityModule,
    TargettracerAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class TargettracerAppModule {}
