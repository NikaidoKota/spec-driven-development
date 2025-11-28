/**
 * ゲーム全般の設定
 */
export const GameConfig = {
  // 画面サイズ
  CANVAS_WIDTH: 1280,
  CANVAS_HEIGHT: 720,

  // ターゲットFPS
  TARGET_FPS: 60,

  // ゲーム時間（秒）
  GAME_DURATION: 600, // 10分

  // デバッグモード
  DEBUG_MODE: false,
} as const;
