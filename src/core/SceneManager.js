import * as THREE from 'three';

export class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb); // Start Day (Blue)
    }
    
    init() {
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 10, 5);
        light.castShadow = true;
        this.scene.add(light);
    }

    // Toggle between Day and Night
    setTheme(isNight) {
        this.scene.background = new THREE.Color(isNight ? 0x0a0a2a : 0x87ceeb);
    }

    add(obj) { this.scene.add(obj); }

    clear() {
        const toRemove = [];
        this.scene.traverse((object) => {
            if (object instanceof THREE.Mesh || object instanceof THREE.Group) {
                if (object.type !== 'DirectionalLight' && object.type !== 'AmbientLight') {
                    toRemove.push(object);
                }
            }
        });
        toRemove.forEach(obj => this.scene.remove(obj));
    }
}