import { Vector2 } from '@utils/Vector2';

/**
 * エンティティの基本インターフェース
 */
export interface IEntity {
  position: Vector2;
  active: boolean;
  update(deltaTime: number): void;
  render(ctx: CanvasRenderingContext2D): void;
}

/**
 * プレイヤーインターフェース
 */
export interface IPlayer extends IEntity {
  hp: number;
  maxHp: number;
  speed: number;
  experience: number;
  level: number;
  takeDamage(amount: number): void;
  heal(amount: number): void;
  addExperience(amount: number): void;
  isAlive(): boolean;
}

/**
 * 敵インターフェース
 */
export interface IEnemy extends IEntity {
  hp: number;
  maxHp: number;
  speed: number;
  damage: number;
  experienceValue: number;
  takeDamage(amount: number): void;
  isAlive(): boolean;
}

/**
 * 武器インターフェース
 */
export interface IWeapon {
  damage: number;
  attackSpeed: number;
  range: number;
  level: number;
  update(deltaTime: number, playerPosition: Vector2, enemies: IEnemy[]): void;
  render(ctx: CanvasRenderingContext2D): void;
  levelUp(): void;
}

/**
 * 経験値オーブインターフェース
 */
export interface IExperienceOrb extends IEntity {
  value: number;
  collect(): void;
}
