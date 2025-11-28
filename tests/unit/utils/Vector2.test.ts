import { describe, it, expect } from 'vitest';
import { Vector2 } from '@utils/Vector2';

describe('Vector2', () => {
  describe('constructor', () => {
    it('x と y の値を正しく設定する', () => {
      const vector = new Vector2(3, 4);
      expect(vector.x).toBe(3);
      expect(vector.y).toBe(4);
    });
  });

  describe('add', () => {
    it('2つのベクトルを正しく加算する', () => {
      // Arrange
      const v1 = new Vector2(1, 2);
      const v2 = new Vector2(3, 4);

      // Act
      const result = v1.add(v2);

      // Assert
      expect(result.x).toBe(4);
      expect(result.y).toBe(6);
    });

    it('負の値を持つベクトルを正しく加算する', () => {
      const v1 = new Vector2(-1, -2);
      const v2 = new Vector2(3, 4);
      const result = v1.add(v2);

      expect(result.x).toBe(2);
      expect(result.y).toBe(2);
    });

    it('元のベクトルを変更しない', () => {
      const v1 = new Vector2(1, 2);
      const v2 = new Vector2(3, 4);
      v1.add(v2);

      expect(v1.x).toBe(1);
      expect(v1.y).toBe(2);
    });
  });

  describe('subtract', () => {
    it('2つのベクトルを正しく減算する', () => {
      const v1 = new Vector2(5, 7);
      const v2 = new Vector2(2, 3);
      const result = v1.subtract(v2);

      expect(result.x).toBe(3);
      expect(result.y).toBe(4);
    });

    it('負の値になる減算を正しく処理する', () => {
      const v1 = new Vector2(1, 2);
      const v2 = new Vector2(3, 4);
      const result = v1.subtract(v2);

      expect(result.x).toBe(-2);
      expect(result.y).toBe(-2);
    });
  });

  describe('multiply', () => {
    it('スカラー値で正しく乗算する', () => {
      const v = new Vector2(3, 4);
      const result = v.multiply(2);

      expect(result.x).toBe(6);
      expect(result.y).toBe(8);
    });

    it('0で乗算すると0ベクトルになる', () => {
      const v = new Vector2(3, 4);
      const result = v.multiply(0);

      expect(result.x).toBe(0);
      expect(result.y).toBe(0);
    });

    it('負の値で乗算すると方向が反転する', () => {
      const v = new Vector2(3, 4);
      const result = v.multiply(-1);

      expect(result.x).toBe(-3);
      expect(result.y).toBe(-4);
    });
  });

  describe('length', () => {
    it('ベクトルの長さを正しく計算する', () => {
      const v = new Vector2(3, 4);
      expect(v.length()).toBe(5);
    });

    it('0ベクトルの長さは0', () => {
      const v = new Vector2(0, 0);
      expect(v.length()).toBe(0);
    });

    it('単位ベクトルの長さは1', () => {
      const v = new Vector2(1, 0);
      expect(v.length()).toBe(1);
    });
  });

  describe('normalize', () => {
    it('ベクトルを正規化する', () => {
      const v = new Vector2(3, 4);
      const result = v.normalize();

      expect(result.x).toBeCloseTo(0.6);
      expect(result.y).toBeCloseTo(0.8);
      expect(result.length()).toBeCloseTo(1);
    });

    it('0ベクトルを正規化すると0ベクトルを返す', () => {
      const v = new Vector2(0, 0);
      const result = v.normalize();

      expect(result.x).toBe(0);
      expect(result.y).toBe(0);
    });

    it('既に正規化されたベクトルはそのまま', () => {
      const v = new Vector2(1, 0);
      const result = v.normalize();

      expect(result.x).toBe(1);
      expect(result.y).toBe(0);
      expect(result.length()).toBe(1);
    });
  });

  describe('distance (static)', () => {
    it('2つのベクトル間の距離を正しく計算する', () => {
      const v1 = new Vector2(0, 0);
      const v2 = new Vector2(3, 4);
      const distance = Vector2.distance(v1, v2);

      expect(distance).toBe(5);
    });

    it('同じ位置のベクトルの距離は0', () => {
      const v1 = new Vector2(2, 3);
      const v2 = new Vector2(2, 3);
      const distance = Vector2.distance(v1, v2);

      expect(distance).toBe(0);
    });

    it('負の座標間の距離も正しく計算する', () => {
      const v1 = new Vector2(-1, -1);
      const v2 = new Vector2(2, 3);
      const distance = Vector2.distance(v1, v2);

      expect(distance).toBe(5);
    });
  });

  describe('clone', () => {
    it('ベクトルの複製を作成する', () => {
      const v = new Vector2(3, 4);
      const clone = v.clone();

      expect(clone.x).toBe(3);
      expect(clone.y).toBe(4);
    });

    it('複製は元のベクトルとは別のインスタンス', () => {
      const v = new Vector2(3, 4);
      const clone = v.clone();

      expect(clone).not.toBe(v);
    });
  });

  describe('zero (static)', () => {
    it('0ベクトルを返す', () => {
      const zero = Vector2.zero();
      expect(zero.x).toBe(0);
      expect(zero.y).toBe(0);
    });
  });
});
