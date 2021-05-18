import { Component, OnInit } from '@angular/core';
import { WindowSizeService } from './_services/window-size.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private windowSizeService: WindowSizeService,
  ) {}

  ngOnInit(): void {

    window.addEventListener('resize', () => {
      this.windowSizeService.windowSize$.next({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
  }
}
