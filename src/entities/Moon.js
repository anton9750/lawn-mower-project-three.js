import * as THREE from 'three';

export class Moon {
    constructor(scene) {
        this.group = new THREE.Group();
        const geometry = new THREE.SphereGeometry(3, 32, 32); // Slightly larger
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.mesh = new THREE.Mesh(geometry, material);
        
        // North is typically positive Z or negative Z depending on your world setup.
        // Based on your image, let's place it far north at a high altitude.
        this.mesh.position.set(0, 20, -50); 
        this.group.add(this.mesh);
        
        scene.add(this.group);
    }
}