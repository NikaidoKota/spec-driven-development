/**
 * ゲームバランス設定
 */
export const BalanceConfig = {
  // 経験値オーブ
  EXPERIENCE_ORB: {
    COLLECTION_RANGE: 30,
    MAGNET_RANGE: 150,
    MAGNET_SPEED: 300,
    LIFETIME: 10.0, // 秒
    RADIUS: 8,
    COLOR: '#00ffff',
  },

  // 難易度調整
  DIFFICULTY: {
    SPAWN_RATE_INCREASE_INTERVAL: 10.0, // 秒
    ENEMY_HP_INCREASE_RATE: 1.1, // 10秒ごとに10%増加
    ENEMY_DAMAGE_INCREASE_RATE: 1.05, // 10秒ごとに5%増加
  },

  // UI設定
  UI: {
    HP_BAR_WIDTH: 100,
    HP_BAR_HEIGHT: 10,
    EXP_BAR_HEIGHT: 20,
    FONT_SIZE: 16,
    FONT_FAMILY: 'Arial',
  },
} as const;
