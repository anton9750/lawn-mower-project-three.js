export class HUD {
    constructor() {
        this.container = document.createElement('div');
        this.container.style.position = 'absolute';
        this.container.style.top = '10px';
        this.container.style.right = '10px';
        this.container.style.color = 'white';
        this.container.style.fontSize = '20px';
        this.container.style.fontFamily = 'sans-serif';
        this.container.style.zIndex = '1000';
        document.body.appendChild(this.container);
    }

    update(percentage, coins) {
        this.container.innerHTML = `
            <div>Mowed: ${Math.floor(percentage)}%</div>
            <div>Coins: ${coins}</div>
        `;
    }
}