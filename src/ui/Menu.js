export class Menu {
    constructor({ onStart, onLoad, onSettings, onExit }) {
        this.container = document.createElement("div");

        Object.assign(this.container.style, {
            position: "fixed",
            inset: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            background: "linear-gradient(#3ba43b, #184818)",
            zIndex: "9999",
            fontFamily: "'Press Start 2P', sans-serif",
            color: "white"
        });

        this.container.innerHTML = `
            <h1 style="margin-bottom:40px;">MOWER ADVENTURE</h1>

            <button id="start">Start Game</button>
            <button id="load">Load Game</button>
            <button id="settings">Settings</button>
            <button id="exit">Exit</button>
        `;

        document.body.appendChild(this.container);

        this.container.querySelector("#start").onclick = () => {
            this.destroy();
            onStart();
        };

        this.container.querySelector("#load").onclick = () => onLoad?.();

        this.container.querySelector("#settings").onclick = () => onSettings?.();

        this.container.querySelector("#exit").onclick = () => onExit?.();

        this.container.querySelectorAll("button").forEach(btn => {
            Object.assign(btn.style, {
                width: "320px",
                padding: "18px",
                fontSize: "20px",
                cursor: "pointer"
            });
        });
    }

    destroy() {
        this.container.remove();
    }
}