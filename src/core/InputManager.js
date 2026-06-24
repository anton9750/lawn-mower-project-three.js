// src/InputManager.js
export class InputManager {
    constructor() {
        this.keys = {};
        // Add joystick state
        this.joystick = { x: 0, y: 0 };

        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);
    }

    isPressed(code) {
        return !!this.keys[code];
    }

    // New method to bridge mobile controls
    setJoystick(x, y) {
        this.joystick.x = x;
        this.joystick.y = y;
    }
}