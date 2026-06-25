export class Shop {
    constructor(game, onColorChange) {
        this.game = game;
        this.onColorChange = onColorChange;
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

        const container = document.createElement('div');
        container.id = 'shop-container';
        container.innerHTML = '<h3>Mower Shop</h3>';
        
        const closeBtn = document.createElement('div');
        closeBtn.id = 'shop-close';
        closeBtn.innerText = 'X';
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
    }
}