import * as THREE from 'three';

export class Fence {
    constructor(size) {
        this.group = new THREE.Group();
        this.segments = []; // Store segments here
        const fenceMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const segmentGeo = new THREE.BoxGeometry(1, 1, 0.2);
        const edge = size / 2;

        const createRow = (xStart, xEnd, zStart, zEnd, horizontal = true) => {
            const step = 1.2;
            if (horizontal) {
                for (let x = xStart; x <= xEnd; x += step) {
                    const post = new THREE.Mesh(segmentGeo, fenceMat);
                    post.position.set(x, 0.5, zStart);
                    this.group.add(post);
                    this.segments.push(post);
                }
            } else {
                for (let z = zStart; z <= zEnd; z += step) {
                    const post = new THREE.Mesh(segmentGeo, fenceMat);
                    post.rotation.y = Math.PI / 2;
                    post.position.set(xStart, 0.5, z);
                    this.group.add(post);
                    this.segments.push(post);
                }
            }
        };

        createRow(-edge, edge, -edge, -edge, true);
        createRow(-edge, edge, edge, edge, true);
        createRow(-edge, -edge, -edge, edge, false);
        createRow(edge, edge, -edge, edge, false);
    }

    removeSegment(index) {
        if (this.segments[index]) {
            this.group.remove(this.segments[index]);
            this.segments.splice(index, 1);
        }
    }
}