// Import the global styles to ensure the joystick and layout are positioned correctly
import './style.css';

import { Game } from '/src/core/Game.js';

// Instantiate the game engine
const game = new Game();

// Start the initialization sequence
game.initialize();

// Optional: Global error handling
window.addEventListener('error', (event) => {
    console.error('Game Error:', event.message);
});