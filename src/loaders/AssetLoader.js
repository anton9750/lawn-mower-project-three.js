import * as THREE from 'three';

export class AssetLoader {
    constructor() {
        this.manager = new THREE.LoadingManager();
        this.textureLoader = new THREE.TextureLoader(this.manager);
        this.audioLoader = new THREE.AudioLoader(this.manager);

        this.manager.onStart = (url, itemsLoaded, itemsTotal) => {
            console.log(`Started loading: ${url}`);
        };
        
        this.manager.onLoad = () => {
            console.log('All assets loaded.');
        };
    }

    loadTexture(path) {
        return this.textureLoader.load(path);
    }
}