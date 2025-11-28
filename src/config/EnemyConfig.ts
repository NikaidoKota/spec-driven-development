/**
 * 敵設定
 */
export const EnemyConfig = {
  // 基本敵のステータス
  BASIC_ENEMY: {
    HP: 20,
    SPEED: 80, // ピクセル/秒
    DAMAGE: 10,
    EXPERIENCE_VALUE: 1,
    RADIUS: 15,
    COLOR: '#ff0000',
  },

  // スポーン設定
  INITIAL_SPAWN_INTERVAL: 2.0, // 秒
  MIN_SPAWN_INTERVAL: 0.5, // 秒
  SPAWN_INTERVAL_DECREASE_RATE: 0.95, // 10秒ごとに5%減少
  MAX_ENEMIES: 100,

  // スポーン位置
  SPAWN_DISTANCE: 50, // 画面外からのスポーン距離
} as const;
