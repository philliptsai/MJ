import { Injectable } from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, WebGLMultisampleRenderTarget, HemisphereLight,
  DirectionalLight } from 'three';
import { WindowSizeService } from './window-size.service';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable({
  providedIn: 'root'
})
export class ThreeService {

  scene: Scene = new Scene();
  camera: PerspectiveCamera = new PerspectiveCamera(50, 1, 0.1, 2000);
  renderer: WebGLRenderer = null;
  composer: EffectComposer = null;
  orbitControl: OrbitControls = null;

  constructor(
    private windowSizeService: WindowSizeService
  ) {
    const canvas = document.createElement( 'canvas' );
    const context = canvas.getContext( 'webgl2', { alpha: false } );
    this.renderer = new WebGLRenderer( { canvas, context } );
    this.composer = new EffectComposer(
      this.renderer,
      new WebGLMultisampleRenderTarget(
        this.windowSizeService.windowSize$.getValue().width,
        this.windowSizeService.windowSize$.getValue().height
      )
    );
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.orbitControl = new OrbitControls(this.camera, this.renderer.domElement);

    const hemiLight = new HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 1, 0, 1 );
    hemiLight.groundColor.setHSL( 1, 1, 1 );
    hemiLight.position.set( 0, 10, 0 );
    this.scene.add( hemiLight );

    const dirLight = new DirectionalLight( 0xffffff, 1.5 );
    dirLight.color.setHSL( 0.1, 0, 1 );
    dirLight.position.set( 1, 1, 1 );
    dirLight.position.multiplyScalar( 5 );
    this.scene.add( dirLight );

    this.windowSizeService.windowSize$.subscribe((size) => {
      this.camera.aspect = size.width / size.height;
      this.camera.updateProjectionMatrix();
      this.renderer?.setSize(size.width, size.height);
      this.composer?.setSize(size.width, size.height);
    });
  }

  render = () => {
    this.orbitControl.update();
    this.composer.render();
  }
}
