import * as THREE from 'three';

export class LawnMower {
    constructor() {
        this.mesh = new THREE.Group();
        this.speed = 5;
        this.position = new THREE.Vector3(0, 0.25, 0);

        // 1. The Body (Red Box)
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.5, 1),
            new THREE.MeshStandardMaterial({ color: 0xff0000 })
        );
        body.castShadow = true;
        this.mesh.add(body);

        // 2. The Handle (Crank)
        const handleMat = new THREE.MeshStandardMaterial({ color: 0x333333 });

        // Vertical support
        const upright = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8), handleMat);
        upright.position.set(0, 0.6, -0.4); 
        upright.rotation.x = Math.PI / 4; 
        this.mesh.add(upright);

        // Horizontal grip bar
        const crossbar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8), handleMat);
        crossbar.position.set(0, 1.0, -0.6);
        crossbar.rotation.z = Math.PI / 2;
        this.mesh.add(crossbar);

        // 3. Audio Setup
        this.sound = new Audio('/sounds/mower.mp3');
        this.sound.loop = true;
        this.isMoving = false;

        this.mesh.position.copy(this.position);
    }

    update(delta, input) {
        let direction = new THREE.Vector2(0, 0);

        // Capture input
        if (input.isPressed('KeyW')) direction.y -= 1;
        if (input.isPressed('KeyS')) direction.y += 1;
        if (input.isPressed('KeyA')) direction.x -= 1;
        if (input.isPressed('KeyD')) direction.x += 1;

        // Process movement
        if (direction.length() > 0) {
            direction.normalize();
            this.position.x += direction.x * this.speed * delta;
            this.position.z += direction.y * this.speed * delta;

            // Calculate target rotation using the movement vector
            const targetRotation = Math.atan2(direction.x, direction.y);
            
            // Smoothly rotate the mower group
            this.mesh.rotation.y += (targetRotation - this.mesh.rotation.y) * 0.2;

            // Handle Audio
            if (!this.isMoving) {
                this.sound.play().catch(e => console.log("Audio requires user interaction"));
                this.isMoving = true;
            }
        } else {
            // Stop sound when idle
            this.stop();
        }

        // Apply position to the entire Group
        this.mesh.position.copy(this.position);
    }

    // Explicit stop method to clean up audio
    stop() {
        if (this.isMoving) {
            this.sound.pause();
            this.sound.currentTime = 0;
            this.isMoving = false;
        }
    }
}