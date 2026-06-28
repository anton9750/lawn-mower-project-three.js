import * as THREE from 'three';

export class Lake {
    constructor(x, z, radius) {
        this.group = new THREE.Group();
        const geometry = new THREE.CircleGeometry(radius, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x0077be, transparent: true, opacity: 0.8 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.position.set(x, 0.05, z);
        this.group.add(this.mesh);
        this.radius = radius;
        this.position = new THREE.Vector3(x, 0, z);
    }
}