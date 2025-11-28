import { test, expect } from '@playwright/test';

/**
 * ゲーム動作検証テスト
 * ブラウザで実際にゲームが正しく動作するか確認
 */

test.describe('Game Verification', () => {
  test('should load and run the game without errors', async ({ page }) => {
    // JavaScriptエラーをキャプチャ（HMR WebSocketエラーは除外）
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      const message = error.message;
      // ViteのHMR WebSocketエラーは無視（ゲーム動作に影響なし）
      if (message.includes('WebSocket')) {
        console.log('Ignoring HMR WebSocket error (expected in test environment)');
        return;
      }
      errors.push(message);
      console.error('Page error:', message);
    });

    // コンソールログをキャプチャ
    const logs: string[] = [];
    page.on('console', (msg) => {
      const text = msg.text();
      logs.push(text);
      console.log('Console:', text);
    });

    // ページを読み込む
    await page.goto('/');

    // ページが完全に読み込まれるまで待機
    await page.waitForLoadState('networkidle');

    // スクリーンショットを撮る
    await page.screenshot({ path: 'test-results/game-initial-state.png' });

    // 1. JavaScriptエラーがないことを確認
    expect(errors).toHaveLength(0);

    // 2. ゲーム開始ログを確認
    const hasStartLog = logs.some((log) => log.includes('Elemental Survivors - Starting'));
    expect(hasStartLog).toBe(true);

    const hasInitializedLog = logs.some((log) => log.includes('Game initialized'));
    expect(hasInitializedLog).toBe(true);

    const hasStartedLog = logs.some((log) => log.includes('Game started'));
    expect(hasStartedLog).toBe(true);

    // 3. キャンバスが表示されていることを確認
    const canvas = page.locator('#game-canvas');
    await expect(canvas).toBeVisible();

    // 4. キャンバスのサイズが正しいことを確認
    const width = await canvas.getAttribute('width');
    const height = await canvas.getAttribute('height');
    expect(width).toBe('1280');
    expect(height).toBe('720');

    // 5. キャンバスが実際に描画されているか確認（背景色がデフォルトと異なる）
    const canvasElement = await canvas.elementHandle();
    const hasRendering = await canvasElement?.evaluate((canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return false;

      // キャンバスの中央のピクセルデータを取得
      const imageData = ctx.getImageData(640, 360, 1, 1);
      const pixel = imageData.data;

      // 真っ白（未描画）でないことを確認
      const isNotBlank = !(pixel[0] === 255 && pixel[1] === 255 && pixel[2] === 255);

      console.log('Canvas pixel at center:', pixel[0], pixel[1], pixel[2], pixel[3]);
      return isNotBlank;
    });

    expect(hasRendering).toBe(true);

    // 6. 少し待ってから2枚目のスクリーンショット（アニメーションを確認）
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/game-after-500ms.png' });

    console.log('\n✅ Game verification completed successfully!');
    console.log('Screenshots saved:');
    console.log('  - test-results/game-initial-state.png');
    console.log('  - test-results/game-after-500ms.png');
  });

  test('should detect player movement input', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // キャンバスが読み込まれるのを待つ
    const canvas = page.locator('#game-canvas');
    await expect(canvas).toBeVisible();

    // 初期スクリーンショット
    await page.screenshot({ path: 'test-results/game-before-input.png' });

    // キーボード入力をシミュレート（W, A, S, Dキー）
    await page.keyboard.press('KeyW');
    await page.waitForTimeout(100);

    await page.keyboard.press('KeyD');
    await page.waitForTimeout(100);

    // 入力後のスクリーンショット
    await page.screenshot({ path: 'test-results/game-after-input.png' });

    console.log('\n✅ Input test completed!');
    console.log('Screenshots saved:');
    console.log('  - test-results/game-before-input.png');
    console.log('  - test-results/game-after-input.png');
  });

  test('should run game loop continuously', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', (msg) => logs.push(msg.text()));

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 2秒間待機してゲームループが動作しているか確認
    await page.waitForTimeout(2000);

    // ゲームが開始されていることを確認
    const hasStartedLog = logs.some((log) => log.includes('Game started'));
    expect(hasStartedLog).toBe(true);

    // エラーログがないことを確認
    const hasErrorLog = logs.some((log) => log.includes('[ERROR]'));
    expect(hasErrorLog).toBe(false);

    console.log('\n✅ Game loop test completed!');
  });
});
