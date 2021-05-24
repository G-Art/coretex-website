import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vertical-nav-bar',
  templateUrl: './vertical-nav-bar.component.html',
  styleUrls: ['./vertical-nav-bar.component.scss']
})
export class VerticalNavBarComponent implements OnInit {

  @Input() listItem: Map<string, string>;

  constructor() {
    this.listItem = new Map<string, string>();
  }

  ngOnInit(): void {
  }

  item(): Array<string>{
    return Array.from(this.listItem.keys());
  }

}
