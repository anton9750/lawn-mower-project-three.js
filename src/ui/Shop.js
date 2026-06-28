export class Shop {
    constructor(game, onColorChange) {
        this.game = game;
        this.onColorChange = onColorChange;
        this.onOpen = null;  // Added hook
        this.onClose = null; // Added hook
        this.colors = [
            { name: 'Blue', price: 200, hex: 0x0000ff },
            { name: 'Red', price: 500, hex: 0xff0000 },
            { name: 'Green', price: 1000, hex: 0x00ff00 },
            { name: 'Purple', price: 1500, hex: 0x800080 },
            { name: 'Orange', price: 2000, hex: 0xffa500 },
            { name: 'Gold', price: 3000, hex: 0xffd700 }
        ];
    }

    open() {
        if (document.getElementById('shop-container')) return;
        if (this.onOpen) this.onOpen(); // Trigger pause

        const container = document.createElement('div');
        container.id = 'shop-container';
        container.style.position = "absolute";
        container.style.top = "50%";
        container.style.left = "50%";
        container.style.transform = "translate(-50%, -50%)";
        container.style.zIndex = "10000";
        container.style.background = "white";
        container.style.padding = "20px";
        container.style.border = "2px solid black";
        
        container.innerHTML = '<h3>Mower Shop</h3>';
        
        const closeBtn = document.createElement('div');
        closeBtn.id = 'shop-close';
        closeBtn.innerText = 'X';
        closeBtn.style.cursor = "pointer";
        closeBtn.onclick = () => this.close();
        container.appendChild(closeBtn);

        const list = document.createElement('div');
        list.id = 'shop-list';

        this.colors.forEach(color => {
            const item = document.createElement('div');
            item.className = 'shop-item';
            item.innerHTML = `<span>${color.name}</span><span>${color.price} coins</span>`;
            item.onclick = () => {
                if (this.game.coinSystem.spendCoins(color.price)) {
                    this.onColorChange(color.hex);
                } else {
                    alert('Not enough coins!');
                }
            };
            list.appendChild(item);
        });

        container.appendChild(list);
        document.body.appendChild(container);
    }

    close() {
        const container = document.getElementById('shop-container');
        if (container) container.remove();
        if (this.onClose) this.onClose(); // Trigger resume
    }
}