import { Vector2 } from '@utils/Vector2';

/**
 * 入力管理クラス
 * キーボード入力を管理する
 */
export class Input {
  private keys: Set<string> = new Set();
  private mousePosition: Vector2 = new Vector2(0, 0);
  private mousePressed: boolean = false;

  constructor() {
    this.setupEventListeners();
  }

  /**
   * イベントリスナーをセットアップする
   */
  private setupEventListeners(): void {
    // キーボードイベント
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.key.toLowerCase());
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.key.toLowerCase());
    });

    // マウスイベント
    window.addEventListener('mousemove', (e) => {
      this.mousePosition = new Vector2(e.clientX, e.clientY);
    });

    window.addEventListener('mousedown', () => {
      this.mousePressed = true;
    });

    window.addEventListener('mouseup', () => {
      this.mousePressed = false;
    });

    // フォーカスが外れたときにキーをクリア
    window.addEventListener('blur', () => {
      this.keys.clear();
    });
  }

  /**
   * 指定したキーが押されているかチェックする
   * @param key キー
   * @returns 押されている場合true
   */
  isKeyPressed(key: string): boolean {
    return this.keys.has(key.toLowerCase());
  }

  /**
   * WASDまたは矢印キーから移動方向を取得する
   * @returns 移動方向（正規化されたベクトル）
   */
  getMovementDirection(): Vector2 {
    let x = 0;
    let y = 0;

    // WASD
    if (this.isKeyPressed('w') || this.isKeyPressed('arrowup')) {
      y -= 1;
    }
    if (this.isKeyPressed('s') || this.isKeyPressed('arrowdown')) {
      y += 1;
    }
    if (this.isKeyPressed('a') || this.isKeyPressed('arrowleft')) {
      x -= 1;
    }
    if (this.isKeyPressed('d') || this.isKeyPressed('arrowright')) {
      x += 1;
    }

    const direction = new Vector2(x, y);
    if (direction.length() > 0) {
      return direction.normalize();
    }
    return direction;
  }

  /**
   * マウスの位置を取得する
   * @returns マウスの位置
   */
  getMousePosition(): Vector2 {
    return this.mousePosition.clone();
  }

  /**
   * マウスが押されているかチェックする
   * @returns 押されている場合true
   */
  isMousePressed(): boolean {
    return this.mousePressed;
  }

  /**
   * 入力をクリアする
   */
  clear(): void {
    this.keys.clear();
    this.mousePressed = false;
  }
}
