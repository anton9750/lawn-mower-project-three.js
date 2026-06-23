import * as THREE from 'three';

export class Lawn {
    constructor(width, depth, treePositions = []) {
        this.width = width;
        this.depth = depth;
        this.treePositions = treePositions;
        this.group = new THREE.Group();
        this.tiles = [];
    }

    init() {
        const geometry = new THREE.BoxGeometry(1, 0.1, 1);
        const grassMat = new THREE.MeshStandardMaterial({ color: 0x4CAF50 });
        const soilMat = new THREE.MeshStandardMaterial({ color: 0x654321 });
        const borderMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32 });

        const halfW = this.width / 2;
        const halfD = this.depth / 2;

        for (let x = -halfW; x < halfW; x++) {
            for (let z = -halfD; z < halfD; z++) {
                const posX = x + 0.5;
                const posZ = z + 0.5;

                // Check if this tile is occupied by a tree
                const isTree = this.treePositions.some(t => 
                    Math.abs(t.x - posX) < 0.8 && Math.abs(t.z - posZ) < 0.8
                );
                const isBorder = (x === -halfW || x === halfW - 1 || z === -halfD || z === halfD - 1);

                // If it's a border OR has a tree, it's not cuttable grass
                const isGrass = !isBorder && !isTree;

                const mesh = new THREE.Mesh(geometry, isGrass ? grassMat : soilMat);
                mesh.position.set(posX, 0, posZ);
                this.group.add(mesh);

                this.tiles.push({
                    mesh: mesh,
                    type: isGrass ? 'grass' : 'non-grass',
                    isCut: !isGrass, // Border/Tree tiles start as 'cut'
                    cut() {
                        if (this.type === 'grass' && !this.isCut) {
                            this.isCut = true;
                            this.mesh.material = soilMat;
                        }
                    }
                });
            }
        }
    }
}