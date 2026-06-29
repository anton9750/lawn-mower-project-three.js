import * as THREE from 'three';

export const TreeType = {
    OAK: 'oak',
    YEW: 'yew',
    WILLOW: 'willow',
    BIRCH: 'birch',
    PALM: 'palm'
};

export class Tree {
    constructor(x, z, type = TreeType.OAK) {
        this.type = type;
        this.group = new THREE.Group();
        this.group.position.set(x, 0.5, z);
        
        // --- RANDOM SCALE LOGIC ---
        // Generates a random scale between 0.4 and 0.8
        const randomScale = Math.random() * (0.8 - 0.4) + 0.4;
        this.group.scale.set(randomScale, randomScale, randomScale);
        
        this.createTree();
    }

    createTree() {
        this.group.clear();
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033 });

        if (this.type === TreeType.WILLOW || this.type === TreeType.YEW) {
            const trunk = new THREE.Mesh(
                new THREE.CylinderGeometry(0.2, 0.22, 1.8, 8),
                trunkMat
            );
            trunk.rotation.x = -0.55;
            this.group.add(trunk);

            const foliage = new THREE.Mesh(
                new THREE.ConeGeometry(1.1, 2.6, 8),
                new THREE.MeshStandardMaterial({ color: 0x228B22 })
            );
            foliage.position.set(0, 1.4, 0);
            this.group.add(foliage);
        } 
        else if (this.type === TreeType.BIRCH) {
            const trunk = new THREE.Mesh(
                new THREE.CylinderGeometry(0.18, 0.18, 1.6, 8),
                new THREE.MeshStandardMaterial({ color: 0xf5f5dc })
            );
            trunk.rotation.x = -0.4;
            this.group.add(trunk);

            const foliage = new THREE.Mesh(
                new THREE.ConeGeometry(0.9, 2.3, 8),
                new THREE.MeshStandardMaterial({ color: 0x228B22 })
            );
            foliage.position.set(0, 1.35, 0);
            this.group.add(foliage);
        } 
        else if (this.type === TreeType.PALM) {
            const trunk = new THREE.Mesh(
                new THREE.CylinderGeometry(0.3, 0.3, 3.2, 6),
                trunkMat
            );
            this.group.add(trunk);

            const crown = new THREE.Mesh(
                new THREE.SphereGeometry(1.1, 8, 8),
                new THREE.MeshStandardMaterial({ color: 0x1e8a1e })
            );
            crown.position.set(0, 3.2, 0);
            this.group.add(crown);
        } 
        else {
            // Default Oak
            const trunk = new THREE.Mesh(
                new THREE.CylinderGeometry(0.25, 0.25, 2.0, 8),
                trunkMat
            );
            trunk.rotation.x = -0.3;
            this.group.add(trunk);

            const foliage = new THREE.Mesh(
                new THREE.ConeGeometry(1.4, 2.6, 8),
                new THREE.MeshStandardMaterial({ color: 0x2e8b2e })
            );
            foliage.position.set(0, 1.8, 0);
            this.group.add(foliage);
        }
    }
}