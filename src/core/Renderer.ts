import { Vector2 } from '@utils/Vector2';

/**
 * レンダラークラス
 * Canvas描画を管理する
 */
export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context from canvas');
    }
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  /**
   * 画面をクリアする
   * @param color 背景色
   */
  clear(color: string = '#1a1a1a'): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * 円を描画する
   * @param position 位置
   * @param radius 半径
   * @param color 色
   */
  drawCircle(position: Vector2, radius: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  /**
   * 矩形を描画する
   * @param position 位置
   * @param width 幅
   * @param height 高さ
   * @param color 色
   */
  drawRect(
    position: Vector2,
    width: number,
    height: number,
    color: string
  ): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(position.x, position.y, width, height);
  }

  /**
   * テキストを描画する
   * @param text テキスト
   * @param position 位置
   * @param color 色
   * @param fontSize フォントサイズ
   * @param fontFamily フォントファミリー
   * @param align テキストの配置
   */
  drawText(
    text: string,
    position: Vector2,
    color: string = '#ffffff',
    fontSize: number = 16,
    fontFamily: string = 'Arial',
    align: CanvasTextAlign = 'left'
  ): void {
    this.ctx.fillStyle = color;
    this.ctx.font = `${fontSize}px ${fontFamily}`;
    this.ctx.textAlign = align;
    this.ctx.fillText(text, position.x, position.y);
  }

  /**
   * HPバーを描画する
   * @param position 位置
   * @param width 幅
   * @param height 高さ
   * @param currentHp 現在のHP
   * @param maxHp 最大HP
   * @param backgroundColor 背景色
   * @param fillColor 塗りつぶし色
   */
  drawHealthBar(
    position: Vector2,
    width: number,
    height: number,
    currentHp: number,
    maxHp: number,
    backgroundColor: string = '#333333',
    fillColor: string = '#00ff00'
  ): void {
    // 背景
    this.drawRect(position, width, height, backgroundColor);

    // HP
    const hpWidth = (currentHp / maxHp) * width;
    this.drawRect(position, hpWidth, height, fillColor);

    // 枠線
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(position.x, position.y, width, height);
  }

  /**
   * Canvasの幅を取得する
   */
  getWidth(): number {
    return this.width;
  }

  /**
   * Canvasの高さを取得する
   */
  getHeight(): number {
    return this.height;
  }

  /**
   * CanvasRenderingContext2Dを取得する
   */
  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }
}
