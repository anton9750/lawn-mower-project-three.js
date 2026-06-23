import * as THREE from 'three';

export class CollisionSystem {
    constructor(lawn, trees, fence) {
        this.lawn = lawn;
        this.trees = trees;
        this.fenceSegments = fence.group.children; 
    }

    constrain(position) {
        // 1. Check against Trees
        this.trees.forEach(tree => {
            const dist = position.distanceTo(tree.group.position);
            if (dist < 1) { 
                this.bounceBack(position, tree.group.position);
            }
        });

        // 2. Check against Fence segments
        this.fenceSegments.forEach(segment => {
            const worldPos = new THREE.Vector3();
            segment.getWorldPosition(worldPos);
            
            // Ignore Y for distance calculation so it doesn't matter if mower is slightly off
            const mowerPosXZ = new THREE.Vector3(position.x, 0, position.z);
            const fencePosXZ = new THREE.Vector3(worldPos.x, 0, worldPos.z);
            
            if (mowerPosXZ.distanceTo(fencePosXZ) < 0.8) {
                this.bounceBack(position, worldPos);
            }
        });

        // 3. FORCE Y POSITION: This keeps the mower on the grass
        position.y = 0.25; 
    }

    bounceBack(position, obstaclePosition) {
        const dir = position.clone().sub(obstaclePosition).normalize();
        // Set y to 0 in direction so it only pushes on the ground plane
        dir.y = 0; 
        position.add(dir.multiplyScalar(0.2)); 
    }
}