import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MeshBasicMaterial, Mesh, BoxBufferGeometry, Color } from 'three';
import { Subject } from 'rxjs';
import { ThreeService } from '../_services/three.service';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';

@Component({
  selector: 'app-mj',
  templateUrl: './mj.component.html',
  styleUrls: ['./mj.component.scss']
})
export class MjComponent implements OnInit, AfterViewInit, OnDestroy {

  destroy$ = new Subject<void>();

  helmet: any;

  constructor(
    private elementRef: ElementRef,
    private threeService: ThreeService
  ) { }

  ngOnInit(): void {

    const loader = new ColladaLoader();

    loader.load( 'assets/dragon/Dragon 2.5_dae.dae', gltf =>  {
      this.helmet = gltf.scene;
      this.threeService.scene.add( this.helmet );
    });

    this.threeService.scene.background = new Color( 0xdfffdf );

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
    if (this.helmet) {
      this.helmet.rotation.y += 0.007;
    }

    this.threeService.render();
    requestAnimationFrame(this.animate);
  }

}
