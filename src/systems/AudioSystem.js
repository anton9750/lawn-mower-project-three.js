import * as THREE from 'three';

export class AudioSystem {
    constructor(camera) {
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);
        this.engineSound = new THREE.Audio(this.listener);
        // Note: You would typically load a buffer here:
        // const audioLoader = new THREE.AudioLoader();
        // audioLoader.load('sounds/engine.mp3', (buffer) => {
        //     this.engineSound.setBuffer(buffer);
        //     this.engineSound.setLoop(true);
        // });
    }

    playEngine() {
        if (!this.engineSound.isPlaying) {
            this.engineSound.play();
        }
    }
}