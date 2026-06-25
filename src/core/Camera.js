// src/core/Camera.js
import * as THREE from 'three';

export class Camera {
    constructor() {
        this.instance = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.isBirdView = false;
        this.normalOffset = new THREE.Vector3(0, 5, 8);
        this.birdPosition = new THREE.Vector3(0, 15, 0);
    }

    toggleView() {
        this.isBirdView = !this.isBirdView;
    }

    update(targetPosition) {
        if (this.isBirdView) {
            this.instance.position.set(0, 15, 0);
            this.instance.lookAt(0, 0, 0);
        } else {
            const desiredPosition = targetPosition.clone().add(this.normalOffset);
            this.instance.position.lerp(desiredPosition, 0.1);
            this.instance.lookAt(targetPosition);
        }
    }
}