import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from './layouts/default-layout/default-layout.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';

// @ts-ignore
const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomePageComponent,
        data: {title: 'CoreTex home'}
      },
      {
        path: 'about',
        component: AboutPageComponent,
        data: {title: 'About'}
      },
      {
        path: 'start',
        loadChildren: () => import('./pages/start-page/start/start.module').then(m => m.StartModule)
      },
    ]

  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
