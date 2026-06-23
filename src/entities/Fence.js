import * as THREE from 'three';

export class Fence {
    constructor(size) {
        this.group = new THREE.Group();
        const fenceMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown wood color
        const segmentGeo = new THREE.BoxGeometry(1, 1, 0.2);
        
        const edge = size / 2;

        // Function to create a row of fence posts
        const createRow = (xStart, xEnd, zStart, zEnd, horizontal = true) => {
            const step = 1.2; // Space between posts
            if (horizontal) {
                for (let x = xStart; x <= xEnd; x += step) {
                    const post = new THREE.Mesh(segmentGeo, fenceMat);
                    post.position.set(x, 0.5, zStart);
                    this.group.add(post);
                }
            } else {
                for (let z = zStart; z <= zEnd; z += step) {
                    const post = new THREE.Mesh(segmentGeo, fenceMat);
                    post.rotation.y = Math.PI / 2;
                    post.position.set(xStart, 0.5, z);
                    this.group.add(post);
                }
            }
        };

        // Create the 4 sides
        createRow(-edge, edge, -edge, -edge, true);  // Top
        createRow(-edge, edge, edge, edge, true);    // Bottom
        createRow(-edge, -edge, -edge, edge, false); // Left
        createRow(edge, edge, -edge, edge, false);   // Right
    }
}