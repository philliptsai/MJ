import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, BoxBufferGeometry, Color } from 'three';
import { WindowSizeService } from 'src/app/_services/window-size.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThreeService } from '../_services/three.service';

@Component({
  selector: 'app-mj',
  templateUrl: './mj.component.html',
  styleUrls: ['./mj.component.scss']
})
export class MjComponent implements OnInit, AfterViewInit, OnDestroy {

  destroy$ = new Subject<void>();

  /** three variables */
  geometry: BoxBufferGeometry = null;
  material: MeshBasicMaterial = null;
  mesh: Mesh = null;

  constructor(
    private windowSizeService: WindowSizeService,
    private elementRef: ElementRef,
    private threeService: ThreeService
  ) { }

  ngOnInit(): void {

    this.threeService.scene.background = new Color( 0xffffff );

    this.geometry = new BoxBufferGeometry();
    this.material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.mesh = new Mesh(this.geometry, this.material);

    this.threeService.scene.add(this.mesh);
    this.threeService.camera.position.z = 5;
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.appendChild(this.threeService.renderer.domElement);
    this.animate();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  animate = () => {
    this.mesh.rotation.x += 0.02;
    this.mesh.rotation.y += 0.03;

    this.threeService.render();
    requestAnimationFrame(this.animate);
  }

}
