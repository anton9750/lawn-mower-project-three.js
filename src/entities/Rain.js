import * as THREE from 'three';

export class Rain {
    constructor() {
        this.count = 1500; // Increased count for better density
        this.geometry = new THREE.BufferGeometry();
        
        // Use an array to store individual data for each drop
        this.positions = new Float32Array(this.count * 3);
        this.velocities = new Float32Array(this.count); // Vertical speed for each drop
        
        for (let i = 0; i < this.count; i++) {
            this.resetDrop(i);
            // Give each drop a random starting Y so they aren't all at the top at once
            this.positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
        }
        
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        
        const material = new THREE.PointsMaterial({ 
            color: 0xaaaaaa, 
            size: 0.08, 
            transparent: true, 
            opacity: 0.6 
        });
        
        this.mesh = new THREE.Points(this.geometry, material);
    }

    // Helper to randomize a drop's position
    resetDrop(i) {
        this.positions[i * 3] = (Math.random() - 0.5) * 50;     // Random X
        this.positions[i * 3 + 1] = 20;                         // Start at top
        this.positions[i * 3 + 2] = (Math.random() - 0.5) * 50; // Random Z
        this.velocities[i] = 15 + Math.random() * 10;           // Random speed
    }

    update(delta) {
        const pos = this.geometry.attributes.position.array;
        
        for (let i = 0; i < this.count; i++) {
            // Move downwards based on individual velocity
            pos[i * 3 + 1] -= this.velocities[i] * delta;
            
            // Add slight horizontal "jitter"
            pos[i * 3] += (Math.random() - 0.5) * 0.1;
            pos[i * 3 + 2] += (Math.random() - 0.5) * 0.1;
            
            // If drop goes below ground, reset it to the top
            if (pos[i * 3 + 1] < -5) {
                this.resetDrop(i);
            }
        }
        this.geometry.attributes.position.needsUpdate = true;
    }
}