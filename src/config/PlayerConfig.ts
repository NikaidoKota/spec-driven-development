/**
 * プレイヤー設定
 */
export const PlayerConfig = {
  // 初期ステータス
  INITIAL_HP: 100,
  INITIAL_MAX_HP: 100,
  INITIAL_SPEED: 200, // ピクセル/秒
  INITIAL_LEVEL: 1,

  // 表示設定
  RADIUS: 20,
  COLOR: '#00ff00',

  // レベルアップ設定
  EXPERIENCE_PER_LEVEL: 10,
  EXPERIENCE_GROWTH_RATE: 1.2,
} as const;
