import { Injectable } from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, Color } from 'three';
import { WindowSizeService } from './window-size.service';

@Injectable({
  providedIn: 'root'
})
export class ThreeService {

  scene: Scene = new Scene();
  camera: PerspectiveCamera = new PerspectiveCamera(50, 1, 0.1, 2000);
  renderer: WebGLRenderer = new WebGLRenderer();

  constructor(
    private windowSizeService: WindowSizeService
  ) {
    this.windowSizeService.windowSize$.subscribe((size) => {
      this.camera.aspect = size.width / size.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(size.width, size.height);
    });
  }

  render = () => {
    this.renderer.render(this.scene, this.camera);
  }
}
