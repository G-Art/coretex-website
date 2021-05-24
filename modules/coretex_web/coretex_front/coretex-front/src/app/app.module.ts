import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {DefaultLayoutComponent} from './layouts/default-layout/default-layout.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {SharedModule} from './shared.module';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    HomePageComponent,
    NavbarComponent,
    AboutPageComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
