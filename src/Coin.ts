// tslint:disable-next-line: no-reference
/// <reference path="./GameEntity.ts" />

class Coin extends GameEntity {
  /**
   * Attributes
   */
  private score: number;

  /**
   *
   * @param xPos // xPos of the coin
   * @param yPos // yPos of the coin
   */
  public constructor(xPos: number, yPos: number) {
    super("./assets/img/coin.png", xPos, yPos);
  }

  /**
   * Getter to return the value of this.score
   */
  public getScore(): number {
    return this.score;
  }
}
