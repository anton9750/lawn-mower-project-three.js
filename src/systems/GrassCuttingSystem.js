// src/systems/GrassCuttingSystem.js
export class GrassCuttingSystem {
  constructor(lawn) {
    this.lawn = lawn;
  }

  update(mowerPosition) {
    if (this.lawn) {
      this.lawn.cutAt(mowerPosition, 0.9);
    }
  }
}