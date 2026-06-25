import * as THREE from 'three';

export class Cloud {
    constructor(camera, x, z) {
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(1.5, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
        );
        this.mesh.position.set(x, 10, z);
        camera.add(this.mesh);
    }

    update(delta) {
        this.mesh.position.x += 1 * delta;
        if (this.mesh.position.x > 30) this.mesh.position.x = -30;
    }
}