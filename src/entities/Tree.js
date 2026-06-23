import * as THREE from 'three';

export class Tree {
    constructor(x, z) {
        // Tree trunk
        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 1),
            new THREE.MeshStandardMaterial({ color: 0x8B4513 })
        );
        // Tree leaves
        const leaves = new THREE.Mesh(
            new THREE.ConeGeometry(0.8, 1.5, 8),
            new THREE.MeshStandardMaterial({ color: 0x228B22 })
        );
        leaves.position.y = 1;
        
        this.group = new THREE.Group();
        this.group.add(trunk);
        this.group.add(leaves);
        this.group.position.set(x, 0.5, z);
    }
}