// src/core/AudioManager.js
export class AudioManager {
    constructor() {
        this.music = new Audio('/background-music.mp3');
        this.music.loop = true;
        this.music.volume = 0.3;
    }

    play() {
        this.music.play().catch(err => {
            // This is normal — browser is waiting for user interaction
            console.log("Audio play deferred until user interaction");
        });
    }

    stop() {
        this.music.pause();
        this.music.currentTime = 0;
    }
}