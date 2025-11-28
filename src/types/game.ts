/**
 * ゲーム状態
 */
export enum GameState {
  TITLE = 'title',
  PLAYING = 'playing',
  PAUSED = 'paused',
  LEVEL_UP = 'levelup',
  GAME_OVER = 'gameover',
}

/**
 * シーンタイプ
 */
export enum SceneType {
  TITLE = 'title',
  GAME = 'game',
  GAME_OVER = 'gameover',
}

/**
 * レベルアップ選択肢
 */
export interface LevelUpOption {
  id: string;
  name: string;
  description: string;
  apply: () => void;
}

/**
 * ゲーム統計
 */
export interface GameStats {
  playTime: number;
  enemiesKilled: number;
  damageDealt: number;
  damageTaken: number;
}
