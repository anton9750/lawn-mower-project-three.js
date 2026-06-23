export class GrassCuttingSystem {
    constructor(lawn) { this.lawn = lawn; }

    update(pos) {
        // Define a small cutting radius (e.g., 0.8 units)
        const radius = 0.8;

        this.lawn.tiles.forEach(tile => {
            // Only attempt to cut grass tiles that are not yet cut
            if (tile.type === 'grass' && !tile.isCut) {
                // Get the distance between the mower and the tile
                const dist = pos.distanceTo(tile.mesh.position);
                
                // If the tile is within the radius, cut it
                if (dist < radius) {
                    tile.cut();
                }
            }
        });
    }
}