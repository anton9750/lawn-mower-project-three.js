import * as THREE from 'three';
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
import { CoinSystem } from '../systems/CoinSystem.js';
import { Shop } from '../ui/Shop.js';
import { WeatherSystem } from '../systems/WeatherSystem.js';
import { StuckSystem } from '../systems/StuckSystem.js';
import { Vortex } from '../entities/Vortex.js';
import { Menu } from '../ui/Menu.js';

export class Game {
    constructor() {

        this.renderer = new Renderer();
        this.sceneManager = new SceneManager();
        this.input = new InputManager();
        this.camera = new Camera();
        this.mower = new LawnMower();

        this.vortex = null;
        this.lastTime = 0;
        this.isNight = false;

        this.isRunning = false;

        // SYSTEMS
        this.coinSystem = new CoinSystem();
        this.hud = new HUD();
        this.weather = new WeatherSystem(this.sceneManager.scene, this.camera.instance);

        this.stuckSystem = new StuckSystem(this.mower, () => {
            this.mower.position.set(0, 0.25, 0);
            this.mower.mesh.position.set(0, 0.25, 0);
        });

        this.shop = new Shop(this,
            (hex) => {
                this.mower.mesh.traverse(c => {
                    if (c.isMesh) c.material.color.setHex(hex);
                });
            },
            (mult) => this.mower.speed = mult
        );

        this.shop.onOpen = () => this.stuckSystem.setPaused(true);
        this.shop.onClose = () => this.stuckSystem.setPaused(false);

        this.createShopButton();

        // AUDIO
        this.listener = new THREE.AudioListener();
        this.camera.instance.add(this.listener);

        this.bgMusic = new THREE.Audio(this.listener);
        new THREE.AudioLoader().load('./background-music.mp3', (buffer) => {
            this.bgMusic.setBuffer(buffer);
            this.bgMusic.setLoop(true);
            this.bgMusic.setVolume(0.3);
        });

        document.addEventListener('click', () => {
            if (this.bgMusic && !this.bgMusic.isPlaying) this.bgMusic.play();
        }, { once: true });

        // JOYSTICK
        this.joystick = createJoystick();
        this.joystick.on('move', (evt, data) => {
            if (data?.vector) this.input.setJoystick(data.vector.x, data.vector.y);
        });
        this.joystick.on('end', () => this.input.setJoystick(0, 0));

        this.update = this.update.bind(this);

        this.showMenu();
    }

    // =========================
    // MENU
    // =========================

    showMenu() {
        this.menu = new Menu({
            onStart: () => {
                this.destroyMenu();
                this.initialize();
            },

            onLoad: () => {
                this.loadGame();
                this.destroyMenu();
                this.initialize();
            },

            onSettings: () => console.log("Settings"),
            onExit: () => console.log("Exit")
        });
    }

    destroyMenu() {
        if (this.menu?.container) this.menu.container.remove();
        this.menu = null;
    }

    // =========================
    // SAVE SYSTEM (SAFE)
    // =========================

    saveGame() {
        const save = {
            coins: this.coinSystem.coins,
            multiplier: this.coinSystem.multiplier,
            stage: this.coinSystem.stage || 0,
            mowerSpeed: this.mower.speed,
            isNight: this.isNight
        };

        localStorage.setItem("mower_save", JSON.stringify(save));
    }

    loadGame() {
        const data = localStorage.getItem("mower_save");
        if (!data) return;

        const save = JSON.parse(data);

        this.coinSystem.coins = save.coins ?? 0;
        this.coinSystem.multiplier = save.multiplier ?? 1;
        this.coinSystem.stage = save.stage ?? 0;
        this.mower.speed = save.mowerSpeed ?? 5;
        this.isNight = save.isNight ?? false;
    }

    // =========================
    // INIT
    // =========================

    initialize() {
        this.isRunning = true;
        this.sceneManager.init();
        this.setupStage();
        requestAnimationFrame(this.update);
    }

    // =========================
    // STAGE (UNCHANGED CORE LOGIC)
    // =========================

    setupStage() {

        this.sceneManager.clear();
        this.weather.clear();

        this.vortex = null;

        this.mower.position.set(0, 0.25, 0);

        this.isNight = !this.isNight;

        this.sceneManager.setTheme(this.isNight);

        if (this.isNight) {
            this.weather.addMoon();
            this.weather.addRain();
        } else {
            this.weather.addClouds();
        }

        const isSecret = (this.coinSystem.multiplier === 2);
        const size = isSecret ? 25 : Math.floor(Math.random() * 6) + 15;

        const treeCount = Math.floor(Math.random() * 6) + 10;

        this.trees = [];
        const treePositions = [];

        for (let i = 0; i < treeCount; i++) {
            const x = (Math.random() - 0.5) * (size - 4);
            const z = (Math.random() - 0.5) * (size - 4);

            treePositions.push({ x, z });
            this.trees.push(new Tree(x, z));
        }

        this.lawn = new Lawn(size, size, treePositions);
        this.lawn.init();

        this.fence = new Fence(size);

        this.grassCuttingSystem = new GrassCuttingSystem(this.lawn);
        this.scoreSystem = new ScoreSystem(this.lawn);
        this.collisionSystem = new CollisionSystem(this.lawn, this.trees, this.fence);
        this.gameState = new GameStateManager(this.lawn, this.scoreSystem);

        this.sceneManager.add(this.lawn.group);
        this.sceneManager.add(this.fence.group);
        this.sceneManager.add(this.mower.mesh);

        this.trees.forEach(t => this.sceneManager.add(t.group));
    }

    // =========================
    // VORTEX END FLOW (UNCHANGED LOGIC RESTORED)
    // =========================

    endGame() {
        this.gameState.isGameOver = true;

        const isNextSecret = (this.coinSystem.multiplier !== 2);

        if (isNextSecret) {

            this.vortex = new Vortex();
            this.vortex.group.position.set(0, 0, 0);

            this.sceneManager.add(this.vortex.group);

            if (this.fence) this.fence.removeSegment(0);
        } else {

            this.coinSystem.addCoins(200);
            this.coinSystem.multiplier = 1;

            this.showNextButton();
        }
    }

    showNextButton() {

        if (document.getElementById('next-btn')) return;

        const btn = document.createElement('button');

        btn.id = "next-btn";
        btn.innerText = "Next Stage";

        Object.assign(btn.style, {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "30px 60px",
            fontSize: "32px",
            zIndex: "1000"
        });

        btn.onclick = () => {

            this.mower.speed = 5;

            btn.remove();

            this.setupStage();

            this.gameState.reset();
        };

        document.body.appendChild(btn);
    }

    // =========================
    // LOOP (SAFE VORTEX HANDLING RESTORED)
    // =========================

    update(time) {

        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.weather.update(delta);
        this.camera.update(this.mower.position);

        if (this.vortex) this.vortex.update(delta);

        this.renderer.render(this.sceneManager.scene, this.camera.instance);

        if (!this.gameState?.isGameOver) {

            this.stuckSystem.update(delta);
            this.mower.update(delta, this.input);

            this.collisionSystem.constrain(this.mower.position);
          this.grassCuttingSystem.update(this.mower.position);

            this.scoreSystem.update();
            this.hud.update(this.scoreSystem.getPercentage(), this.coinSystem.coins);

            this.gameState.update();

            if (this.gameState.isGameOver) this.endGame();

        } else if (this.vortex) {

            this.mower.update(delta, this.input);

            if (this.mower.position.distanceTo(this.vortex.group.position) < 2) {

                this.coinSystem.addCoins(100);
                this.coinSystem.multiplier = 2;
                this.mower.speed *= 2;

                this.setupStage();
                this.gameState.reset();
            }
        }

        requestAnimationFrame(this.update);
    }

    // =========================
    // UI
    // =========================

    createShopButton() {

        const btn = document.createElement('button');

        btn.innerText = "🛒 Shop";

        Object.assign(btn.style, {
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: "2000"
        });

        btn.onclick = () => this.shop.open();

        document.body.appendChild(btn);

        const saveBtn = document.createElement('button');

        saveBtn.innerText = "💾 Save";

        Object.assign(saveBtn.style, {
            position: "absolute",
            top: "50px",
            left: "10px",
            zIndex: "2000"
        });

        saveBtn.onclick = () => this.saveGame();

        document.body.appendChild(saveBtn);
    }
}