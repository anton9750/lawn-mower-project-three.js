import * as THREE from 'three';

export class Camera {
    constructor() {
        this.instance = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.isBirdView = false;
        
        // Offset for normal view
        this.normalOffset = new THREE.Vector3(0, 5, 8);
        // Position for bird view
        this.birdPosition = new THREE.Vector3(0, 15, 0);
    }

    toggleView() {
        this.isBirdView = !this.isBirdView;
    }

    update(targetPosition) {
        if (this.isBirdView) {
            // Bird View: Fixed high above, looking straight down
            this.instance.position.set(0, 15, 0);
            this.instance.lookAt(0, 0, 0);
        } else {
            // Normal View: Follow the target
            const desiredPosition = targetPosition.clone().add(this.normalOffset);
            this.instance.position.lerp(desiredPosition, 0.1);
            this.instance.lookAt(targetPosition);
        }
    }
}