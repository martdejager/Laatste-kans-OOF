// tslint:disable-next-line: no-reference
/// <reference path="./Character.ts" />
// tslint:disable-next-line: no-reference
/// <reference path="./Coin.ts" />

class Game {
  // Necessary canvas attributes
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  // An array of GameEntitys the player can interact with
  private gameEntitys: GameEntity[];

  // Player
  private character: Character;

  // Score
  private score: number;
  /**
   * Initialize the game
   *
   * @param {HTMLCanvasElement} canvas - The canvas element that the game
   * should be rendered upon
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.gameEntitys = [];

    // Create coins
    for (let i = 0; i < this.randomNumber(1, 5); i++) {
      this.gameEntitys.push(
        new Coin(this.randomNumber(0, this.canvas.width - 50), 50)
      );
    }

    this.character = new Character(
      this.randomNumber(0, this.canvas.width - 80),
      520,
    );

    // Create a base score of 0
    this.score = 0;

    // Start the game cycle
    this.loop();
  }

  /**
   * Game cycle, basically loop that keeps the game running. It contains all
   * the logic needed to draw the individual frames.
   */
  private loop = () => {
    // Clear the screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Move the player
    this.character.movePlayer(this.canvas);

    // Draw everything
    this.draw();

    // Check if the player has any coins
    this.gameEntitys.forEach((gameEntitys, i) => {
      if (
        this.character.coinCollision(gameEntitys) &&
        this.character.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
      ) {
        // update score
        if (gameEntitys instanceof Coin) {
          this.score++;
        }
        // remove the item
        this.gameEntitys.splice(i, 1);
      }
    });

    // Show score
    this.writeTextToCanvas("Score: " + this.score, 36, 120, 50);

    // Make sure the game actually loops
    requestAnimationFrame(this.loop);
  };

  /**
   * Draw all the necessary items to the screen
   */
  private draw() {
    // draw coins
    this.gameEntitys.forEach(element => {
      this.ctx.drawImage(
        element.getImg(),
        element.getXPos(),
        element.getYPos()
      );
    });

    // draw player
    this.ctx.drawImage(
      this.character.getImg(),
      this.character.getXPos(),
      this.character.getYPos()
    );
  }

  /**
   * Writes text to the canvas
   * @param {string} text - Text to write
   * @param {number} fontSize - Font size in pixels
   * @param {number} xCoordinate - Horizontal coordinate in pixels
   * @param {number} yCoordinate - Vertical coordinate in pixels
   * @param {string} alignment - Where to align the text
   * @param {string} color - The color of the text
   */
  private writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "white"
  ) {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Method to load an image
   * @param {HTMLImageElement} source
   * @return HTMLImageElement - returns an image
   */
  private loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  /**
   * Returns a random number between min and max
   * @param {number} min - lower boundary
   * @param {number} max - upper boundary
   */
  private randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}

/**
 * Start the game whenever the entire DOM is loaded
 */
let init = () =>
  new Game(document.getElementById("canvas") as HTMLCanvasElement);

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
