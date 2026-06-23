import * as THREE from 'three';

export class GrassTile {
    constructor(x, z) {
        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1),
            new THREE.MeshStandardMaterial({ color: 0x44aa44 })
        );
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.position.set(x, 0, z);
        this.mesh.receiveShadow = true;
        this.isCut = false;
    }

    cut() {
        if (!this.isCut) {
            this.isCut = true;
            this.mesh.material.color.set(0x8B4513); // Change to dirt color
        }
    }
}