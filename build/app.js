class GameEntity {
    constructor(imgSrc, xPos, yPos) {
        this.img = this.loadNewImage(imgSrc);
        this.xPos = xPos;
        this.yPos = yPos;
    }
    getImg() {
        return this.img;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    drawImg(ctx) {
        ctx.drawImage(this.img, this.xPos, this.yPos);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
class Character extends GameEntity {
    constructor(xPos, yPos) {
        super("./assets/img/buzz.png", xPos, yPos);
        this.xVel = 3;
        this.keyboardListener = new KeyboardListener();
    }
    movePlayer(canvas) {
        if (this.playerState === "moving") {
            if (this.xPos + this.img.width >= canvas.width || this.xPos < 0) {
                this.xVel = -this.xVel;
            }
            this.xPos += this.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.playerState = "hyperjump";
            this.yPos = 50;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN) &&
            this.playerState === "hyperjump") {
            this.playerState = "moving";
            this.yPos = canvas.height - 260;
        }
    }
    coinCollision(element) {
        if (this.getXPos() < element.getXPos() + element.getImg().width &&
            this.getXPos() + this.getImg().width > element.getXPos() &&
            this.getYPos() < element.getYPos() + element.getImg().height &&
            this.getYPos() + this.getImg().height > element.getYPos()) {
            return true;
        }
        else {
            return false;
        }
    }
}
class Coin extends GameEntity {
    constructor(xPos, yPos) {
        super("./assets/img/coin.png", xPos, yPos);
    }
    getScore() {
        return this.score;
    }
}
class Game {
    constructor(canvas) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.character.movePlayer(this.canvas);
            this.draw();
            this.gameEntitys.forEach((gameEntitys, i) => {
                if (this.character.coinCollision(gameEntitys) &&
                    this.character.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                    if (gameEntitys instanceof Coin) {
                        this.score++;
                    }
                    this.gameEntitys.splice(i, 1);
                }
            });
            this.writeTextToCanvas("Score: " + this.score, 36, 120, 50);
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameEntitys = [];
        for (let i = 0; i < this.randomNumber(1, 5); i++) {
            this.gameEntitys.push(new Coin(this.randomNumber(0, this.canvas.width - 50), 50));
        }
        this.character = new Character(this.randomNumber(0, this.canvas.width - 80), 520);
        this.score = 0;
        this.loop();
    }
    draw() {
        this.gameEntitys.forEach(element => {
            this.ctx.drawImage(element.getImg(), element.getXPos(), element.getYPos());
        });
        this.ctx.drawImage(this.character.getImg(), this.character.getXPos(), this.character.getYPos());
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = () => new Game(document.getElementById("canvas"));
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map