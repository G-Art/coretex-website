import { NgModule } from '@angular/core';
import {SetupInfoComponent} from '../setup-info/setup-info.component';
import {StartRoutingModule} from './start-routing.module';
import {StartPageComponent} from '../start-page.component';
import {SharedModule} from '../../../shared.module';
import {BuildInfoComponent} from '../build-info/build-info.component';
import {InfoDirective} from './info.directive';
import {ItemsInfoComponent} from '../items-info/items-info.component';
import {JourneyInfoComponent} from '../journey-info/journey-info.component';
import {JourneyWebModuleInfoComponent} from '../journey-info/journey-web-module-info/journey-web-module-info.component';
import {JourneyUpdateItemInfoComponent} from '../journey-info/journey-update-item-info/journey-update-item-info.component';


@NgModule({
  declarations: [
    SetupInfoComponent,
    BuildInfoComponent,
    ItemsInfoComponent,
    JourneyInfoComponent,
    StartPageComponent,
    JourneyWebModuleInfoComponent,
    JourneyUpdateItemInfoComponent,
    InfoDirective
  ],
  imports: [
    SharedModule,
    StartRoutingModule
  ]
})
export class StartModule { }
