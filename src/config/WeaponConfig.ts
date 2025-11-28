/**
 * 武器設定
 */
export const WeaponConfig = {
  // 基本武器（円形攻撃）
  BASIC_WEAPON: {
    INITIAL_DAMAGE: 10,
    INITIAL_ATTACK_SPEED: 1.0, // 秒
    INITIAL_RANGE: 100,
    MAX_LEVEL: 10,

    // レベルアップボーナス
    DAMAGE_PER_LEVEL: 5,
    ATTACK_SPEED_BONUS: 0.9, // 10%速くなる
    RANGE_PER_LEVEL: 10,

    // 表示設定
    COLOR: '#ffff00',
    PROJECTILE_RADIUS: 5,
  },
} as const;
