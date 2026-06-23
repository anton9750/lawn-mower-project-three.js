import { Game } from './core/Game.js';

// Instantiate the game engine
const game = new Game();

// Start the initialization sequence
game.initialize();

// Optional: Global error handling
window.addEventListener('error', (event) => {
    console.error('Game Error:', event.message);
});