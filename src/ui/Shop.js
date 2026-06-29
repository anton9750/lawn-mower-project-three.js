export class Shop {
    constructor(game, onColorChange, onSpeedChange) {
        this.game = game;
        this.onColorChange = onColorChange;
        this.onSpeedChange = onSpeedChange;

        this.colorUpgrades = [
            { name: 'Deep Purple', price: 500,  hex: 0x4b0082 },
            { name: 'Green',       price: 1000, hex: 0x00ff00 },
            { name: 'Purple',      price: 1500, hex: 0x800080 },
            { name: 'Orange',      price: 2000, hex: 0xffa500 },
            { name: 'Gold',        price: 3000, hex: 0xffd700 },
        ];

        this.speedUpgrades = [
            { name: 'Speed +10', price: 300,  speedAdd: 10 },
            { name: 'Speed +10', price: 600,  speedAdd: 10 },
            { name: 'Speed +10', price: 1500, speedAdd: 10 },
            { name: 'Speed +10', price: 3000, speedAdd: 10 }
        ];
    }

    open() {
        if (document.getElementById('shop-container')) return;
        if (this.onOpen) this.onOpen();

        const container = document.createElement('div');
        container.id = 'shop-container';
        container.style.position = "absolute";
        container.style.top = "50%";
        container.style.left = "50%";
        container.style.transform = "translate(-50%, -50%)";
        container.style.zIndex = "10000";
        container.style.background = "#F5F5DC"; 
        container.style.padding = "20px";
        container.style.border = "2px solid #8B4513";
        container.style.width = "620px";
        container.style.borderRadius = "12px";
        container.style.boxShadow = "0 8px 30px rgba(0,0,0,0.4)";
        
        container.innerHTML = `
            <h3 style="margin:0 0 20px 0; text-align:center; font-size:22px; display:flex; align-items:center; justify-content:center; gap:10px; color:#5D4037;">
                <span>🛒</span> Mower Shop
            </h3>
        `;
        
        const closeBtn = document.createElement('div');
        closeBtn.id = 'shop-close';
        closeBtn.innerText = 'X';
        closeBtn.style.cursor = "pointer";
        closeBtn.style.position = "absolute";
        closeBtn.style.top = "12px";
        closeBtn.style.right = "15px";
        closeBtn.style.fontWeight = "bold";
        closeBtn.style.fontSize = "24px";
        closeBtn.style.color = "#5D4037";
        closeBtn.onclick = () => this.close();
        container.appendChild(closeBtn);

        // ====================== COLORS ======================
        const colorsTitle = document.createElement('h4');
        colorsTitle.style.margin = "0 0 12px 0";
        colorsTitle.style.fontSize = "17px";
        colorsTitle.style.color = "#5D4037";
        colorsTitle.textContent = "Colors";
        container.appendChild(colorsTitle);

        const colorList = document.createElement('div');
        colorList.style.display = "flex";
        colorList.style.gap = "16px";
        colorList.style.flexWrap = "wrap";
        colorList.style.marginBottom = "25px";

        this.colorUpgrades.forEach(color => {
            const item = document.createElement('div');
            item.style.display = "flex";
            item.style.alignItems = "center";
            item.style.gap = "12px";
            item.style.padding = "12px 18px";
            item.style.border = "1px solid #D2B48C";
            item.style.borderRadius = "8px";
            item.style.backgroundColor = "rgba(255,255,255,0.5)";
            item.style.cursor = "pointer";
            
            // Dynamically convert hex to CSS color string
            const cssColor = `#${color.hex.toString(16).padStart(6, '0')}`;
            
            item.innerHTML = `
                <div style="width:32px;height:32px;border-radius:50%;background-color:${cssColor};border:2px solid #333;"></div>
                <div>
                    <div style="font-weight:600; color:#333;">${color.name}</div>
                    <div style="color:#666;font-size:13px;">${color.price} coins</div>
                </div>
            `;
            item.onclick = () => {
                if (this.game.coinSystem.spendCoins(color.price)) {
                    this.onColorChange(color.hex);
                } else {
                    alert('Not enough coins!');
                }
            };
            colorList.appendChild(item);
        });
        container.appendChild(colorList);

        // ====================== SPEED UPGRADES ======================
        const speedTitle = document.createElement('h4');
        speedTitle.style.margin = "0 0 12px 0";
        speedTitle.style.fontSize = "17px";
        speedTitle.style.color = "#5D4037";
        speedTitle.textContent = "Speed Upgrades";
        container.appendChild(speedTitle);

        const speedList = document.createElement('div');
        speedList.style.display = "flex";
        speedList.style.gap = "16px";
        speedList.style.flexWrap = "wrap";

        this.speedUpgrades.forEach(speed => {
            const item = document.createElement('div');
            item.style.display = "flex";
            item.style.alignItems = "center";
            item.style.gap = "12px";
            item.style.padding = "12px 18px";
            item.style.border = "1px solid #D2B48C";
            item.style.borderRadius = "8px";
            item.style.backgroundColor = "rgba(255,255,255,0.5)";
            item.style.cursor = "pointer";
            item.innerHTML = `
                <div style="font-weight:600; color:#333;">${speed.name}</div>
                <div style="color:#666;font-size:13px;">${speed.price} coins</div>
            `;
            item.onclick = () => {
                if (this.game.coinSystem.spendCoins(speed.price)) {
                    this.game.coinSystem.addSpeedUpgrade(speed.speedAdd);
                    if (this.onSpeedChange) this.onSpeedChange(speed.speedAdd);
                } else {
                    alert('Not enough coins!');
                }
            };
            speedList.appendChild(item);
        });
        container.appendChild(speedList);

        document.body.appendChild(container);
    }

    close() {
        const container = document.getElementById('shop-container');
        if (container) container.remove();
        if (this.onClose) this.onClose();
    }
}