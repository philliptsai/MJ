import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, BoxBufferGeometry, Color } from 'three';
import { WindowSizeService } from 'src/app/_services/window-size.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mj',
  templateUrl: './mj.component.html',
  styleUrls: ['./mj.component.scss']
})
export class MjComponent implements OnInit, AfterViewInit, OnDestroy {

  destroy$ = new Subject<void>();

  /** three variables */
  scene: Scene = new Scene();
  camera: PerspectiveCamera = new PerspectiveCamera(50, 1, 0.1, 2000);
  renderer: WebGLRenderer = new WebGLRenderer();
  geometry: BoxBufferGeometry = null;
  material: MeshBasicMaterial = null;
  mesh: Mesh = null;

  constructor(
    private windowSizeService: WindowSizeService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {

    this.windowSizeService.windowSize$.pipe(takeUntil(this.destroy$)).subscribe((size) => {
      this.camera.aspect = size.width / size.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(size.width, size.height);
    });

    this.scene.background = new Color( 0xffffff );

    this.geometry = new BoxBufferGeometry();
    this.material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.mesh = new Mesh(this.geometry, this.material);

    this.scene.add(this.mesh);
    this.camera.position.z = 5;
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  animate = () => {
    this.mesh.rotation.x += 0.02;
    this.mesh.rotation.y += 0.03;

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  }

}
