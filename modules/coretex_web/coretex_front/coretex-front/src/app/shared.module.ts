import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoBoxComponent} from './components/info-box/info-box.component';
import {VerticalNavBarComponent} from './components/vertical-nav-bar/vertical-nav-bar.component';
import {LoaderComponent} from './components/loader/loader.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {StepperComponent} from './components/stepper/stepper.component';
import {AccordionModule} from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [
    InfoBoxComponent,
    VerticalNavBarComponent,
    LoaderComponent,
    StepperComponent
  ],
  imports: [
    AlertModule,
    TabsModule,
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    CollapseModule,
    CdkStepperModule,
    AccordionModule
  ],
  exports: [
    AlertModule,
    TabsModule,
    CollapseModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    InfoBoxComponent,
    VerticalNavBarComponent,
    LoaderComponent,
    CdkStepperModule,
    StepperComponent,
    AccordionModule
  ]
})
export class SharedModule {
}
