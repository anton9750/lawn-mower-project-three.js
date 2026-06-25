import * as THREE from 'three';
import { Rain } from '../entities/Rain.js';

export class WeatherSystem {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.weatherObjects = [];
        this.moon = null;
    }

    clear() {
        // Remove Moon
        if (this.moon) {
            this.scene.remove(this.moon);
            this.moon = null;
        }

        // Remove other objects (Clouds, Rain)
        this.weatherObjects.forEach(obj => {
            if (obj.mesh) {
                if (obj.mesh.parent) obj.mesh.parent.remove(obj.mesh);
                this.scene.remove(obj.mesh);
            }
        });
        this.weatherObjects = [];
    }

    addMoon() {
        const geometry = new THREE.SphereGeometry(3, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.moon = new THREE.Mesh(geometry, material);
        
        // Positioned far North in the world
        this.moon.position.set(0, 25, -60);
        this.scene.add(this.moon);
    }

    addRain() {
        const rain = new Rain();
        this.scene.add(rain.mesh);
        this.weatherObjects.push(rain);
    }

    addClouds() {
        const cloudGeometry = new THREE.SphereGeometry(1.5, 8, 8);
        const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });

        for (let i = 0; i < 6; i++) {
            const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
            // Clouds are children of the camera to follow the horizon
            cloud.position.set(
                (Math.random() - 0.5) * 40,
                8 + Math.random() * 5,
                -20 - Math.random() * 10
            );
            this.camera.add(cloud);
            this.weatherObjects.push({ mesh: cloud, speed: 0.5 + Math.random() * 0.5 });
        }
    }

    update(delta) {
        // Update Rain
        this.weatherObjects.forEach(obj => {
            // If it has an update method (Rain entity)
            if (obj.update) {
                obj.update(delta);
            } 
            // If it is a cloud (simple mesh with speed property)
            else if (obj.mesh && obj.speed) {
                obj.mesh.position.x += obj.speed * delta;
                if (obj.mesh.position.x > 25) obj.mesh.position.x = -25;
            }
        });
    }
}