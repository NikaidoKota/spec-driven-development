import { Renderer } from './Renderer';
import { Input } from './Input';
import { GameConfig } from '@config/GameConfig';
import { Logger } from '@utils/Logger';
import { Vector2 } from '@utils/Vector2';

/**
 * ゲームクラス
 * ゲームループとシーン管理を行う
 */
export class Game {
  private renderer: Renderer;
  private input: Input;
  private running: boolean = false;
  private lastTime: number = 0;
  private fps: number = 0;
  private frameCount: number = 0;
  private fpsUpdateTime: number = 0;

  // テスト用プレイヤー
  private playerPosition: Vector2;
  private playerSpeed: number = 200;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer(canvas);
    this.input = new Input();
    this.playerPosition = new Vector2(
      this.renderer.getWidth() / 2,
      this.renderer.getHeight() / 2
    );

    Logger.info('Game initialized');
  }

  /**
   * ゲームを開始する
   */
  start(): void {
    if (this.running) {
      Logger.warn('Game is already running');
      return;
    }

    this.running = true;
    this.lastTime = performance.now();
    this.gameLoop();
    Logger.info('Game started');
  }

  /**
   * ゲームを停止する
   */
  stop(): void {
    this.running = false;
    Logger.info('Game stopped');
  }

  /**
   * ゲームループ
   */
  private gameLoop = (): void => {
    if (!this.running) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000; // 秒に変換
    this.lastTime = currentTime;

    // FPS計算
    this.updateFPS(deltaTime);

    // 更新
    this.update(deltaTime);

    // 描画
    this.render();

    // 次のフレーム
    requestAnimationFrame(this.gameLoop);
  };

  /**
   * FPSを更新する
   * @param deltaTime デルタタイム
   */
  private updateFPS(deltaTime: number): void {
    this.frameCount++;
    this.fpsUpdateTime += deltaTime;

    if (this.fpsUpdateTime >= 1.0) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.fpsUpdateTime = 0;
    }
  }

  /**
   * ゲーム状態を更新する
   * @param deltaTime デルタタイム（秒）
   */
  private update(deltaTime: number): void {
    // プレイヤー移動（テスト）
    const direction = this.input.getMovementDirection();
    this.playerPosition = this.playerPosition.add(
      direction.multiply(this.playerSpeed * deltaTime)
    );

    // 画面端でクランプ
    this.playerPosition.x = Math.max(
      20,
      Math.min(this.renderer.getWidth() - 20, this.playerPosition.x)
    );
    this.playerPosition.y = Math.max(
      20,
      Math.min(this.renderer.getHeight() - 20, this.playerPosition.y)
    );
  }

  /**
   * ゲームを描画する
   */
  private render(): void {
    // 画面クリア
    this.renderer.clear();

    // プレイヤー描画（テスト）
    this.renderer.drawCircle(this.playerPosition, 20, '#00ff00');

    // FPS表示
    if (GameConfig.DEBUG_MODE) {
      this.renderer.drawText(
        `FPS: ${this.fps}`,
        new Vector2(10, 20),
        '#ffffff',
        16
      );
    }

    // 操作説明
    this.renderer.drawText(
      'Use WASD or Arrow Keys to move',
      new Vector2(this.renderer.getWidth() / 2, 30),
      '#ffffff',
      16,
      'Arial',
      'center'
    );
  }

  /**
   * レンダラーを取得する
   */
  getRenderer(): Renderer {
    return this.renderer;
  }

  /**
   * 入力管理を取得する
   */
  getInput(): Input {
    return this.input;
  }
}
