import * as THREE from 'three';

export class Vortex {
    constructor() {
        this.group = new THREE.Group();
        const geometry = new THREE.TorusGeometry(1.5, 0.3, 16, 100);
        const material = new THREE.MeshBasicMaterial({ color: 0x800080 }); // Purple
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.x = Math.PI / 2;
        this.group.add(this.mesh);
    }

    update(delta) {
        this.mesh.rotation.z += delta * 2; // Swirling animation
    }
}