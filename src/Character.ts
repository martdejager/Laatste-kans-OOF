// tslint:disable-next-line: no-reference
/// <reference path="./GameEntity.ts" />
// tslint:disable-next-line: no-reference
/// <reference path="./KeyboardListener.ts" />

class Character extends GameEntity {
  public keyboardListener: KeyboardListener;
  private xVel: number;
  private playerState: string;

  /**
   *
   * @param xPos //xPos of the player
   * @param yPos //yPos of the player
   * @param yVel //Velocity of the player
   * @param {keyboardListener} //A keyboardListener so that the olayer is able to jump
   */
  public constructor(xPos: number, yPos: number) {
    super("./assets/img/buzz.png", xPos, yPos);
    this.xVel = 3;
    this.keyboardListener = new KeyboardListener();
  }

  /**
   * Moves when spacebar is pressed. Player is bound
   * to the canvas and cannot move outside of it
   */

  public movePlayer(canvas: HTMLCanvasElement): void {
    // Player is automaticly moving from left to right
    if (this.playerState === "moving") {
      if (this.xPos + this.img.width >= canvas.width || this.xPos < 0) {
        this.xVel = -this.xVel;
      }
      this.xPos += this.xVel;
    }

    // Using the space bar to jump for a coin
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
      this.playerState = "hyperjump";
      this.yPos = 50;
    }

    // If de player wants to go down to the bottom of the screen press down arrow
    if (
      this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN) &&
      this.playerState === "hyperjump"
    ) {
      this.playerState = "moving";
      this.yPos = canvas.height - 260;
    }
  }

  /**
   * Removes coins from the game based on box collision detection.
   *
   * NOTE: We use a filter command in this method. A filter is basically a
   * for-loop that returns a new array. It does so by comparing every element
   * of the array with a given check. In this case, that is the collision
   * detection algorithm in the if-statement.
   *
   * If we have a collision, that means the players is standing on top of an
   * coin and therefore, it needs to be removed from the array.
   * The filter command does this for us, but it's a bit paradoxical since
   * we don't do anything in the if-statement. We only return elements in the
   * else-statement.
   *
   * By not returning an coin we have collision with to the new array, and
   * returning coins we don't have a collision with, we effectively remove
   * elements from the array. Try to do this as a mental exercise with only
   * two elements in the array. You have collision with the first, but not
   * with the second element. What does the if-statement do for the
   * individual elements?
   *
   * Read for more info: https://alligator.io/js/filter-array-method/
   */
  public coinCollision(element: GameEntity): boolean {
    if (
      this.getXPos() < element.getXPos() + element.getImg().width &&
      this.getXPos() + this.getImg().width > element.getXPos() &&
      this.getYPos() < element.getYPos() + element.getImg().height &&
      this.getYPos() + this.getImg().height > element.getYPos()
    ) {
      return true;
    } else {
      return false;
    }
  }
}
