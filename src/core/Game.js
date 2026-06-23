import { Renderer } from './Renderer.js';
import { SceneManager } from './SceneManager.js';
import { InputManager } from './InputManager.js';
import { Camera } from './Camera.js';
import { LawnMower } from '../entities/LawnMower.js';
import { Lawn } from '../world/Lawn.js';
import { Fence } from '../entities/Fence.js';
import { GrassCuttingSystem } from '../systems/GrassCuttingSystem.js';
import { ScoreSystem } from '../systems/ScoreSystem.js';
import { HUD } from '../ui/HUD.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';
import { GameStateManager } from '../systems/GameStateManager.js';
import { Tree } from '../entities/Tree.js'; 

export class Game {
    constructor() {
        this.renderer = new Renderer();
        this.sceneManager = new SceneManager();
        this.input = new InputManager();
        this.camera = new Camera();
        this.mower = new LawnMower();
        
        const size = 20; 
        
        // 1. Setup Tree positions for the Lawn to use
        this.trees = [];
        const treePositions = [];
        const treeCount = 10;
        for (let i = 0; i < treeCount; i++) {
            const x = (Math.random() - 0.5) * (size - 2);
            const z = (Math.random() - 0.5) * (size - 2);
            treePositions.push({ x, z });
            this.trees.push(new Tree(x, z));
        }

        // 2. Initialize World
        this.lawn = new Lawn(size, size, treePositions);
        this.fence = new Fence(size);
        
        // 3. Systems
        this.grassCuttingSystem = new GrassCuttingSystem(this.lawn);
        this.scoreSystem = new ScoreSystem(this.lawn);
        this.collisionSystem = new CollisionSystem(this.lawn, this.trees, this.fence);
        this.gameState = new GameStateManager(this.lawn, this.scoreSystem);
        this.hud = new HUD();
        
        this.lastTime = 0;
        this.update = this.update.bind(this);
        
        // 4. Input Handlers
        window.addEventListener('keydown', (e) => {
            if (e.code === 'KeyC') {
                this.camera.toggleView();
            }
            
            // "Call it a day" logic
            if (e.code === 'KeyG' && this.scoreSystem.getPercentage() >= 90) {
                this.endGame();
            }
        });
    }

    endGame() {
        this.gameState.isGameOver = true;
        alert("Day complete! You did a great job!");
        // Optional: Reset game or navigate to results screen
    }

    initialize() {
        this.sceneManager.init();
        this.lawn.init();
        
        this.sceneManager.add(this.lawn.group);
        this.sceneManager.add(this.fence.group);
        this.sceneManager.add(this.mower.mesh);
        this.trees.forEach(tree => this.sceneManager.add(tree.group));
        
        requestAnimationFrame(this.update);
    }

    update(time) {
        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;

        if (!this.gameState.isGameOver) {
            this.mower.update(delta, this.input);
            this.collisionSystem.constrain(this.mower.position);
            
            this.grassCuttingSystem.update(this.mower.position);
            this.scoreSystem.update();
            this.hud.update(this.scoreSystem.getPercentage());
            this.gameState.update();
        } else {
            this.mower.stop();
        }
        
        this.camera.update(this.mower.position);
        this.renderer.render(this.sceneManager.scene, this.camera.instance);
        
        requestAnimationFrame(this.update);
    }
}