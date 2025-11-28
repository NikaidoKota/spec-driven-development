/**
 * 2Dベクトルクラス
 * ゲーム内の位置、速度、方向などを表現する
 */
export class Vector2 {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * 2つのベクトルを加算する
   * @param other 加算するベクトル
   * @returns 新しいベクトル
   */
  add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  /**
   * 2つのベクトルを減算する
   * @param other 減算するベクトル
   * @returns 新しいベクトル
   */
  subtract(other: Vector2): Vector2 {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  /**
   * ベクトルをスカラー値で乗算する
   * @param scalar スカラー値
   * @returns 新しいベクトル
   */
  multiply(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  /**
   * ベクトルの長さ（大きさ）を計算する
   * @returns ベクトルの長さ
   */
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * ベクトルを正規化する（長さ1にする）
   * @returns 正規化されたベクトル
   */
  normalize(): Vector2 {
    const len = this.length();
    if (len === 0) {
      return new Vector2(0, 0);
    }
    return new Vector2(this.x / len, this.y / len);
  }

  /**
   * ベクトルを複製する
   * @returns 複製されたベクトル
   */
  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * 2つのベクトル間の距離を計算する
   * @param v1 ベクトル1
   * @param v2 ベクトル2
   * @returns 距離
   */
  static distance(v1: Vector2, v2: Vector2): number {
    const dx = v2.x - v1.x;
    const dy = v2.y - v1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * 0ベクトルを返す
   * @returns (0, 0)のベクトル
   */
  static zero(): Vector2 {
    return new Vector2(0, 0);
  }
}
