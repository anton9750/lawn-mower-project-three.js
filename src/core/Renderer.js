import * as THREE from 'three';

export class Renderer {
    constructor() {
        this.instance = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.instance.setPixelRatio(window.devicePixelRatio);
        this.instance.setSize(window.innerWidth, window.innerHeight);
        this.instance.shadowMap.enabled = true;
        document.body.appendChild(this.instance.domElement);
        window.addEventListener('resize', () => this.onResize());
    }
    onResize() {
        this.instance.setSize(window.innerWidth, window.innerHeight);
    }
    render(scene, camera) {
        this.instance.render(scene, camera);
    }
}