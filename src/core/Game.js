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
import { createJoystick } from '../Controls.js'; 

export class Game {
    constructor() {
        this.renderer = new Renderer();
        this.sceneManager = new SceneManager();
        this.input = new InputManager();
        this.camera = new Camera();
        this.mower = new LawnMower();
        this.isNight = false;
        
        // 2. Initialize Mobile Joystick
        this.joystick = createJoystick();
        this.joystick.on('move', (evt, data) => {
            this.input.setJoystick(data.vector.x, data.vector.y);
        });
        this.joystick.on('end', () => {
            this.input.setJoystick(0, 0);
        });
        
        this.lastTime = 0;
        this.update = this.update.bind(this);
        
        window.addEventListener('keydown', (e) => {
            if (e.code === 'KeyC') {
                this.camera.toggleView();
            }
        });
    }

    setupStage() {
        // 1. Clean up old stage
        this.sceneManager.clear();
        
        // 2. Toggle Theme
        this.isNight = !this.isNight;
        this.sceneManager.setTheme(this.isNight);
        
        // 3. Randomize dimensions and trees
        const size = Math.floor(Math.random() * 6) + 15; // 15-20 range
        const treeCount = Math.floor(Math.random() * 6) + 5; // 5-10 range
        
        this.trees = [];
        const treePositions = [];
        for (let i = 0; i < treeCount; i++) {
            const x = (Math.random() - 0.5) * (size - 2);
            const z = (Math.random() - 0.5) * (size - 2);
            treePositions.push({ x, z });
            this.trees.push(new Tree(x, z));
        }

        // 4. Initialize world parts
        this.lawn = new Lawn(size, size, treePositions);
        this.lawn.init();
        this.fence = new Fence(size);
        this.grassCuttingSystem = new GrassCuttingSystem(this.lawn);
        this.scoreSystem = new ScoreSystem(this.lawn);
        this.collisionSystem = new CollisionSystem(this.lawn, this.trees, this.fence);
        this.gameState = new GameStateManager(this.lawn, this.scoreSystem);
        this.hud = new HUD();
        
        // 5. Add to scene
        this.sceneManager.add(this.lawn.group);
        this.sceneManager.add(this.fence.group);
        this.sceneManager.add(this.mower.mesh);
        this.trees.forEach(tree => this.sceneManager.add(tree.group));
    }

    endGame() {
        if (document.getElementById('next-btn')) return;
        
        this.gameState.isGameOver = true;
        
        const btn = document.createElement('button');
        btn.id = "next-btn";
        btn.innerText = "Next Stage";
        btn.style.position = "absolute";
        btn.style.top = "50%";
        btn.style.left = "50%";
        btn.style.transform = "translate(-50%, -50%)";
        btn.style.padding = "20px 40px";
        btn.style.fontSize = "24px";
        btn.style.zIndex = "10000";
        
        btn.onclick = () => {
            btn.remove();
            this.setupStage();
            this.gameState.reset();
        };
        document.body.appendChild(btn);
    }

    initialize() {
        this.sceneManager.init();
        this.setupStage();
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
            
            if (this.gameState.isGameOver) {
                this.endGame();
            }
        } else {
            this.mower.stop();
        }
        
        this.camera.update(this.mower.position);
        this.renderer.render(this.sceneManager.scene, this.camera.instance);
        
        requestAnimationFrame(this.update);
    }
}