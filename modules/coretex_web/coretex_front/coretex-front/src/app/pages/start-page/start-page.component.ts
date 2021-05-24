import {Component, ComponentFactoryResolver, OnInit, Type, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {SetupInfoComponent} from './setup-info/setup-info.component';
import {BuildInfoComponent} from './build-info/build-info.component';
import {InfoDirective} from './start/info.directive';
import {ItemsInfoComponent} from './items-info/items-info.component';
import {JourneyInfoComponent} from './journey-info/journey-info.component';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  // @ts-ignore
  @ViewChild(InfoDirective, {static: true}) infoDirective: InfoDirective;

  public startNavMenu: Map<string, string>;
  private infosMap: Map<string, Type<any>>;
  infoBlock: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver) {
    this.infosMap = new Map<string, Type<any>>(
      [
        ['setup', SetupInfoComponent],
        ['build', BuildInfoComponent],
        ['items', ItemsInfoComponent],
        ['journey', JourneyInfoComponent]
      ]
    );
    this.startNavMenu = new Map([
      ['setup', 'Setup'],
      ['build', 'Build'],
      ['items', 'Items'],
      ['journey', 'Journey']
    ]);

    this.infoBlock = 'setup';
  }

  ngOnInit(): void {
    if (!this.activatedRoute.snapshot.queryParamMap.has('prop')) {
      this.router.navigate(['.'], {
        relativeTo: this.activatedRoute,
        queryParams: {prop: this.infoBlock},
        replaceUrl: true
      });
    }
    this.activatedRoute
      .queryParams
      .pipe(filter(params => params.prop))
      .subscribe(params => {
          this.infoBlock = params.prop;
          this.loadComponent();
        }
      );
  }


  loadComponent(): void {
    const viewContainerRef = this.infoDirective.viewContainerRef;
    if (this.infosMap.has(this.infoBlock)) {
      const comp = this.infosMap.get(this.infoBlock);
      // @ts-ignore
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(comp);

      viewContainerRef.clear();
      viewContainerRef.createComponent<any>(componentFactory);
    }else {
      viewContainerRef.clear();
    }
  }
}
