import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  col = '#f5f5f5';

  constructor() {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.col = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }, 1000);
  }

}
