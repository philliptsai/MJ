import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElementSizeInterface } from 'src/app/_interfaces/element-size.interface';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {

  windowSize$: BehaviorSubject<ElementSizeInterface> = new BehaviorSubject({
    width: window.innerWidth,
    height: window.innerHeight
  });
}
