import * as THREE from 'three';

export class LawnMower {
    constructor() {
        this.mesh = new THREE.Group();
        this.speed = 5;
        this.position = new THREE.Vector3(0, 0.25, 0);

        // 1. The Body
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.5, 1),
            new THREE.MeshStandardMaterial({ color: 0xff0000 })
        );
        body.castShadow = true;
        this.mesh.add(body);

        // 2. The Handle Assembly
        this.createHandle();

        // 3. Audio
        this.sound = new Audio('/sounds/mower.mp3');
        this.sound.loop = true;
        this.isMoving = false;

        this.mesh.position.copy(this.position);
    }

    createHandle() {
        const handleMat = new THREE.MeshStandardMaterial({ color: 0x333333 });

        // A. Vertical Post (The main upright)
        const postGeom = new THREE.CylinderGeometry(0.05, 0.05, 1.0);
        const post = new THREE.Mesh(postGeom, handleMat);
        post.position.set(0, 0.7, -0.4);
        post.rotation.x = Math.PI / 8; 
        this.mesh.add(post);

        // B. Horizontal Grip Bar
        const gripGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.8);
        const grip = new THREE.Mesh(gripGeom, handleMat);
        grip.position.set(0, 1.2, -0.75);
        grip.rotation.z = Math.PI / 2;
        this.mesh.add(grip);

        // C. The Connecting Strut (The missing piece)
        // This bridges the post and the grip to create the structural "L"
        const strutGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.45);
        const strut = new THREE.Mesh(strutGeom, handleMat);
        strut.position.set(0, 1.0, -0.55);
        strut.rotation.x = -Math.PI / 4; // Angled to bridge the corner
        this.mesh.add(strut);
    }

    update(delta, input) {
        let direction = new THREE.Vector2(0, 0);

        if (input.isPressed('KeyW')) direction.y -= 1;
        if (input.isPressed('KeyS')) direction.y += 1;
        if (input.isPressed('KeyA')) direction.x -= 1;
        if (input.isPressed('KeyD')) direction.x += 1;

        if (direction.length() > 0) {
            direction.normalize();
            this.position.x += direction.x * this.speed * delta;
            this.position.z += direction.y * this.speed * delta;

            const targetRotation = Math.atan2(direction.x, direction.y);
            this.mesh.rotation.y += (targetRotation - this.mesh.rotation.y) * 0.2;

            if (!this.isMoving) {
                this.sound.play().catch(e => console.log("Audio requires user interaction"));
                this.isMoving = true;
            }
        } else {
            this.stop();
        }

        this.mesh.position.copy(this.position);
    }

    stop() {
        if (this.isMoving) {
            this.sound.pause();
            this.sound.currentTime = 0;
            this.isMoving = false;
        }
    }
}