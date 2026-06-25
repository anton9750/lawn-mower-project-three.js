import * as THREE from 'three';

export class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb);
        
        // Store lights as class properties to modify them later
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.dirLight = new THREE.DirectionalLight(0xffffff, 1);
    }
    
    init() {
        this.scene.add(this.ambientLight);
        this.dirLight.position.set(5, 10, 5);
        this.dirLight.castShadow = true;
        this.scene.add(this.dirLight);
    }

    setTheme(isNight) {
        this.scene.background = new THREE.Color(isNight ? 0x0a0a2a : 0x87ceeb);
        
        // Dim lights at night for a better "Moonlight" feel
        this.ambientLight.intensity = isNight ? 0.2 : 0.5;
        this.dirLight.intensity = isNight ? 0.3 : 1.0;
    }

    add(obj) { this.scene.add(obj); }

    clear() {
        const toRemove = [];
        this.scene.traverse((object) => {
            // Only remove things that are NOT lights and NOT the camera/scene root
            if (object.isMesh || object.isGroup) {
                // Ensure we don't accidentally remove the lights we added
                if (object !== this.ambientLight && object !== this.dirLight) {
                    toRemove.push(object);
                }
            }
        });
        toRemove.forEach(obj => this.scene.remove(obj));
    }
}