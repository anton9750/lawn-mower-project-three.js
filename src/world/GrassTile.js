// src/world/GrassTile.js
import * as THREE from 'three';

export class GrassTile {
  constructor(x, z) {
    this.mesh = new THREE.Mesh(); // We don't actually use this mesh anymore for rendering
    this.mesh.position.set(x, 0, z);
    this.isCut = false;
  }

  cut() {
    if (!this.isCut) {
      this.isCut = true;
    }
  }
}