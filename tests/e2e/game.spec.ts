import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Elemental Survivors
 * Phase 2以降で本格的に実装予定
 */

test.describe('Game Load', () => {
  test('should load the game page', async ({ page }) => {
    await page.goto('/');

    // ページタイトルを確認
    await expect(page).toHaveTitle('Elemental Survivors');

    // キャンバス要素が存在することを確認
    const canvas = page.locator('#game-canvas');
    await expect(canvas).toBeVisible();
  });

  test('should initialize canvas with correct dimensions', async ({ page }) => {
    await page.goto('/');

    const canvas = page.locator('#game-canvas');

    // キャンバスのサイズを確認（GameConfig.tsの設定値）
    const width = await canvas.getAttribute('width');
    const height = await canvas.getAttribute('height');

    expect(width).toBe('1280');
    expect(height).toBe('720');
  });

  test('should log game start message', async ({ page }) => {
    // コンソールログをキャプチャ
    const messages: string[] = [];
    page.on('console', (msg) => messages.push(msg.text()));

    await page.goto('/');

    // ゲーム開始ログを確認（[INFO]プレフィックス付き）
    const hasStartMessage = messages.some((msg) =>
      msg.includes('Elemental Survivors - Starting')
    );
    expect(hasStartMessage).toBe(true);
  });
});
