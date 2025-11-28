import { describe, it, expect } from 'vitest';
import { MathUtils } from '@utils/MathUtils';

describe('MathUtils', () => {
  describe('clamp', () => {
    it('値が範囲内の場合はそのまま返す', () => {
      expect(MathUtils.clamp(5, 0, 10)).toBe(5);
      expect(MathUtils.clamp(0, 0, 10)).toBe(0);
      expect(MathUtils.clamp(10, 0, 10)).toBe(10);
    });

    it('値が最小値より小さい場合は最小値を返す', () => {
      expect(MathUtils.clamp(-5, 0, 10)).toBe(0);
      expect(MathUtils.clamp(-100, 0, 10)).toBe(0);
    });

    it('値が最大値より大きい場合は最大値を返す', () => {
      expect(MathUtils.clamp(15, 0, 10)).toBe(10);
      expect(MathUtils.clamp(100, 0, 10)).toBe(10);
    });

    it('負の範囲でも正しく動作する', () => {
      expect(MathUtils.clamp(-5, -10, -1)).toBe(-5);
      expect(MathUtils.clamp(-15, -10, -1)).toBe(-10);
      expect(MathUtils.clamp(0, -10, -1)).toBe(-1);
    });

    it('小数でも正しく動作する', () => {
      expect(MathUtils.clamp(0.5, 0, 1)).toBe(0.5);
      expect(MathUtils.clamp(1.5, 0, 1)).toBe(1);
      expect(MathUtils.clamp(-0.5, 0, 1)).toBe(0);
    });
  });

  describe('lerp', () => {
    it('t=0の時は開始値を返す', () => {
      expect(MathUtils.lerp(0, 10, 0)).toBe(0);
      expect(MathUtils.lerp(-5, 5, 0)).toBe(-5);
    });

    it('t=1の時は終了値を返す', () => {
      expect(MathUtils.lerp(0, 10, 1)).toBe(10);
      expect(MathUtils.lerp(-5, 5, 1)).toBe(5);
    });

    it('t=0.5の時は中間値を返す', () => {
      expect(MathUtils.lerp(0, 10, 0.5)).toBe(5);
      expect(MathUtils.lerp(-10, 10, 0.5)).toBe(0);
    });

    it('任意のt値で正しく補間する', () => {
      expect(MathUtils.lerp(0, 10, 0.25)).toBe(2.5);
      expect(MathUtils.lerp(0, 10, 0.75)).toBe(7.5);
    });

    it('tが0-1の範囲外でも計算する（外挿）', () => {
      expect(MathUtils.lerp(0, 10, 2)).toBe(20);
      expect(MathUtils.lerp(0, 10, -1)).toBe(-10);
    });

    it('負の値でも正しく補間する', () => {
      expect(MathUtils.lerp(-10, -5, 0.5)).toBe(-7.5);
    });
  });

  describe('randomRange', () => {
    it('指定した範囲内の値を返す', () => {
      for (let i = 0; i < 100; i++) {
        const value = MathUtils.randomRange(0, 10);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(10);
      }
    });

    it('最小値と最大値が同じ場合はその値を返す', () => {
      expect(MathUtils.randomRange(5, 5)).toBe(5);
    });

    it('負の範囲でも正しく動作する', () => {
      for (let i = 0; i < 100; i++) {
        const value = MathUtils.randomRange(-10, -5);
        expect(value).toBeGreaterThanOrEqual(-10);
        expect(value).toBeLessThanOrEqual(-5);
      }
    });

    it('小数の範囲でも正しく動作する', () => {
      for (let i = 0; i < 100; i++) {
        const value = MathUtils.randomRange(0.5, 1.5);
        expect(value).toBeGreaterThanOrEqual(0.5);
        expect(value).toBeLessThanOrEqual(1.5);
      }
    });
  });

  describe('randomInt', () => {
    it('指定した範囲内の整数を返す', () => {
      for (let i = 0; i < 100; i++) {
        const value = MathUtils.randomInt(0, 10);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(10);
        expect(Number.isInteger(value)).toBe(true);
      }
    });

    it('最小値と最大値が同じ場合はその値を返す', () => {
      expect(MathUtils.randomInt(5, 5)).toBe(5);
    });

    it('1つの値のみの範囲でランダム性を確認', () => {
      const results = new Set<number>();
      for (let i = 0; i < 100; i++) {
        results.add(MathUtils.randomInt(0, 1));
      }
      // 0と1の両方が出現することを確認（ランダム性のチェック）
      expect(results.size).toBe(2);
      expect(results.has(0)).toBe(true);
      expect(results.has(1)).toBe(true);
    });
  });

  describe('degToRad', () => {
    it('度をラジアンに変換する', () => {
      expect(MathUtils.degToRad(0)).toBe(0);
      expect(MathUtils.degToRad(180)).toBeCloseTo(Math.PI);
      expect(MathUtils.degToRad(90)).toBeCloseTo(Math.PI / 2);
      expect(MathUtils.degToRad(360)).toBeCloseTo(Math.PI * 2);
    });

    it('負の角度も正しく変換する', () => {
      expect(MathUtils.degToRad(-90)).toBeCloseTo(-Math.PI / 2);
      expect(MathUtils.degToRad(-180)).toBeCloseTo(-Math.PI);
    });
  });

  describe('radToDeg', () => {
    it('ラジアンを度に変換する', () => {
      expect(MathUtils.radToDeg(0)).toBe(0);
      expect(MathUtils.radToDeg(Math.PI)).toBeCloseTo(180);
      expect(MathUtils.radToDeg(Math.PI / 2)).toBeCloseTo(90);
      expect(MathUtils.radToDeg(Math.PI * 2)).toBeCloseTo(360);
    });

    it('負の角度も正しく変換する', () => {
      expect(MathUtils.radToDeg(-Math.PI / 2)).toBeCloseTo(-90);
      expect(MathUtils.radToDeg(-Math.PI)).toBeCloseTo(-180);
    });
  });
});
