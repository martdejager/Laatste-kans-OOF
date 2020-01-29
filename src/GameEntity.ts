class GameEntity {
  /**
   * Attributes
   */
  protected img: HTMLImageElement;
  protected xPos: number;
  protected yPos: number;

  /**
   *
   * @param imgSrc //Src of the image
   * @param xPos //xPos of the GameEntity
   * @param yPos //yPos of the GameEntity
   */
  public constructor(imgSrc: string, xPos: number, yPos: number) {
    this.img = this.loadNewImage(imgSrc);
    this.xPos = xPos;
    this.yPos = yPos;
  }

  /**
   * Getters
   */
  public getImg(): HTMLImageElement {
    return this.img;
  }

  public getXPos(): number {
    return this.xPos;
  }

  public getYPos(): number {
    return this.yPos;
  }

  /**
   * Methods
   */
  public drawImg(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.img, this.xPos, this.yPos);
  }

  /**
   * @param {HTMLImageElement} source
   * @return HTMLImageElement - returns an image
   */
  private loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }
}
