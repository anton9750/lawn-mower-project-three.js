import * as THREE from 'three';

export class StuckSystem {
    constructor(mower, resetCallback) {
        this.mower = mower;
        this.resetCallback = resetCallback;
        this.timer = 0;
        this.lastPosition = new THREE.Vector3();
        this.button = null;
    }

    update(delta) {
        // Track movement
        if (this.mower.position.distanceTo(this.lastPosition) < 0.01) {
            this.timer += delta;
        } else {
            this.timer = 0;
            this.removeButton();
        }
        this.lastPosition.copy(this.mower.position);

        // Show button if stuck for 5 seconds
        if (this.timer > 5 && !this.button) {
            this.createButton();
        }
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.id = "reset-btn";
        this.button.innerText = "RESET POSITION";
        this.button.style.position = "absolute";
        this.button.style.top = "20%";
        this.button.style.left = "50%";
        this.button.style.transform = "translateX(-50%)";
        this.button.style.padding = "15px 30px";
        this.button.style.zIndex = "10000";
        
        this.button.onclick = () => {
            this.resetCallback();
            this.removeButton();
            this.timer = 0;
        };
        document.body.appendChild(this.button);
    }

    removeButton() {
        if (this.button) {
            this.button.remove();
            this.button = null;
        }
    }
}