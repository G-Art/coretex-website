import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    setTheme('bs4'); // bs3 or 'bs4'
  }

  ngOnInit(): void {
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        if (child) {
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data.title) {
            return child.snapshot.data.title;
          }
          return appTitle;
        }
        return null;
      })
    ).subscribe((ttl: string) => {
      this.titleService.setTitle(ttl);
    });
  }


}
