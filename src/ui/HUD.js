export class HUD {
    constructor() {
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.top = '20px';
        this.element.style.left = '20px';
        this.element.style.color = 'white';
        this.element.style.fontSize = '24px';
        this.element.style.fontFamily = 'Arial';
        document.body.appendChild(this.element);

        this.message = document.createElement('div');
        this.message.style.display = 'none'; // Hidden by default
        this.message.style.marginTop = '10px';
        this.message.style.backgroundColor = 'rgba(0,0,0,0.5)';
        this.message.style.padding = '10px';
        this.message.innerHTML = 'Press <b>G</b> to call it a day!';
        document.body.appendChild(this.message);
    }

    update(percentage) {
        this.element.innerText = `Grass Cut: ${percentage}%`;
        
        // Show message if percentage >= 90
        if (percentage >= 90) {
            this.message.style.display = 'block';
        } else {
            this.message.style.display = 'none';
        }
    }
}