import * as THREE from 'three';

export class Maze {
    constructor(size) {
        this.group = new THREE.Group();
        this.size = size;
        this.walls = [];
        this.generate();
    }

    generate() {
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x444444 });
        const wallGeo = new THREE.BoxGeometry(1, 2, 1);
        
        // Simple example: Create a perimeter wall
        for (let i = -this.size / 2; i <= this.size / 2; i++) {
            this.addWall(i, 0, -this.size / 2, wallGeo, wallMat);
            this.addWall(i, 0, this.size / 2, wallGeo, wallMat);
            this.addWall(-this.size / 2, 0, i, wallGeo, wallMat);
            this.addWall(this.size / 2, 0, i, wallGeo, wallMat);
        }
        
        // Add a "Exit" marker
        const exit = new THREE.Mesh(
            new THREE.CylinderGeometry(0.5, 0.5, 0.1),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );
        exit.position.set(this.size / 2 - 2, 0.1, this.size / 2 - 2);
        this.group.add(exit);
    }

    addWall(x, y, z, geo, mat) {
        const wall = new THREE.Mesh(geo, mat);
        wall.position.set(x, 1, z);
        this.group.add(wall);
        this.walls.push(wall);
    }
}