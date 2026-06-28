import * as THREE from 'three';

export class StuckSystem {
    constructor(mower, resetCallback) {
        this.mower = mower;
        this.resetCallback = resetCallback;
        this.timer = 0;
        this.lastPosition = new THREE.Vector3();
        this.button = null;
        this.isPaused = false;
    }

    setPaused(paused) {
        this.isPaused = paused;
        if (paused) this.removeButton();
    }

    update(delta) {
        if (this.isPaused) return; // Stop logic while paused

        if (this.mower.position.distanceTo(this.lastPosition) < 0.01) {
            this.timer += delta;
        } else {
            this.timer = 0;
            this.removeButton();
        }
        this.lastPosition.copy(this.mower.position);

        if (this.timer > 5 && !this.button) {
            this.createButton();
        }
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.id = "reset-btn";
        this.button.innerText = "RESET POSITION";
        this.button.style.position = "absolute";
        this.button.style.bottom = "20px"; // Positioned bottom-left
        this.button.style.left = "20px";   // Positioned bottom-left
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