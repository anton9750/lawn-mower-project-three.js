// src/world/Lawn.js
import * as THREE from 'three';

export class Lawn {
  constructor(width = 20, depth = 20) {
    this.width = width;
    this.depth = depth;
    this.group = new THREE.Group();
    this.tiles = [];
    this.instancedMesh = null;
  }

  init() {
    this.tiles = [];
    this.group.clear();

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshStandardMaterial({ 
      roughness: 0.9,
      metalness: 0.0
    });

    const total = this.width * this.depth;
    this.instancedMesh = new THREE.InstancedMesh(geometry, material, total);
    this.instancedMesh.receiveShadow = true;

    const dummy = new THREE.Object3D();
    let index = 0;

    for (let x = -Math.floor(this.width/2); x < Math.floor(this.width/2); x++) {
      for (let z = -Math.floor(this.depth/2); z < Math.floor(this.depth/2); z++) {
        const worldX = x + 0.5;
        const worldZ = z + 0.5;

        this.tiles.push({
          x: worldX,
          z: worldZ,
          isCut: false,
          index: index
        });

        dummy.position.set(worldX, 0.05, worldZ);
        dummy.rotation.x = -Math.PI / 2;
        dummy.updateMatrix();

        this.instancedMesh.setMatrixAt(index, dummy.matrix);
        
        // Darker green grass
        this.instancedMesh.setColorAt(index, new THREE.Color(0x103D10));

        index++;
      }
    }

    this.group.add(this.instancedMesh);
  }

  cutAt(mowerPos, radius = 0.9) {
    let needsUpdate = false;

    this.tiles.forEach(tile => {
      if (tile.isCut) return;

      const dx = tile.x - mowerPos.x;
      const dz = tile.z - mowerPos.z;

      if (dx*dx + dz*dz < radius * radius) {
        tile.isCut = true;

        // Dark brown soil
        const soilColor = new THREE.Color(0x5C4033);
        
        this.instancedMesh.setColorAt(tile.index, soilColor);

        // Lower the cut area slightly
        const matrix = new THREE.Matrix4();
        this.instancedMesh.getMatrixAt(tile.index, matrix);
        const pos = new THREE.Vector3().setFromMatrixPosition(matrix);
        pos.y = 0.015;
        matrix.setPosition(pos);
        this.instancedMesh.setMatrixAt(tile.index, matrix);

        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      this.instancedMesh.instanceMatrix.needsUpdate = true;
      if (this.instancedMesh.instanceColor) {
        this.instancedMesh.instanceColor.needsUpdate = true;
      }
    }
  }

  getCutPercentage() {
    if (!this.tiles.length) return 0;
    const cutCount = this.tiles.filter(t => t.isCut).length;
    return Math.floor((cutCount / this.tiles.length) * 100);
  }
}