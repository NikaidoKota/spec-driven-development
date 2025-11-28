/**
 * 数学ユーティリティクラス
 * ゲームで使用する数学関数を提供
 */
export class MathUtils {
  /**
   * 値を指定した範囲内に制限する
   * @param value 制限する値
   * @param min 最小値
   * @param max 最大値
   * @returns 制限された値
   */
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * 線形補間（Linear Interpolation）
   * @param start 開始値
   * @param end 終了値
   * @param t 補間係数（0-1、範囲外も可）
   * @returns 補間された値
   */
  static lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }

  /**
   * 指定した範囲内のランダムな数値を生成する
   * @param min 最小値
   * @param max 最大値
   * @returns ランダムな数値
   */
  static randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * 指定した範囲内のランダムな整数を生成する
   * @param min 最小値（含む）
   * @param max 最大値（含む）
   * @returns ランダムな整数
   */
  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * 度をラジアンに変換する
   * @param degrees 度
   * @returns ラジアン
   */
  static degToRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  /**
   * ラジアンを度に変換する
   * @param radians ラジアン
   * @returns 度
   */
  static radToDeg(radians: number): number {
    return (radians * 180) / Math.PI;
  }
}
