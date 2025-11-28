# 開発ガイドライン（Development Guidelines Document）

## 概要
本ドキュメントでは、コーディング規約、命名規則、テスト慣行、レビュー基準を定義します。

## コーディング規約

### TypeScript規約

#### 1. 型の使用
```typescript
// ✅ Good: 明示的な型定義
function calculateDamage(baseDamage: number, multiplier: number): number {
  return baseDamage * multiplier;
}

// ❌ Bad: any型の使用
function calculateDamage(baseDamage: any, multiplier: any): any {
  return baseDamage * multiplier;
}

// ✅ Good: インターフェースの使用
interface Enemy {
  hp: number;
  damage: number;
}

// ❌ Bad: オブジェクトリテラル型の多用
function spawnEnemy(): { hp: number; damage: number } {
  return { hp: 100, damage: 10 };
}
```

#### 2. null/undefinedの扱い
```typescript
// ✅ Good: オプショナルチェーン
const damage = enemy?.combat?.damage ?? 0;

// ✅ Good: 型ガード
if (player.weapon) {
  player.weapon.attack();
}

// ❌ Bad: 明示的なnullチェックなし
const damage = enemy.combat.damage; // エラーの可能性
```

#### 3. 非同期処理
```typescript
// ✅ Good: async/await
async function loadAssets(): Promise<void> {
  const sprite = await loadSprite('player.png');
  const sound = await loadSound('hit.mp3');
}

// ❌ Bad: コールバック地獄
loadSprite('player.png', (sprite) => {
  loadSound('hit.mp3', (sound) => {
    // ...
  });
});
```

### クラス設計

#### 1. 単一責任の原則
```typescript
// ✅ Good: 1つのクラスは1つの責任
class Player {
  move(direction: Vector2): void { }
  takeDamage(amount: number): void { }
}

class PlayerRenderer {
  render(player: Player): void { }
}

// ❌ Bad: 複数の責任
class Player {
  move(direction: Vector2): void { }
  takeDamage(amount: number): void { }
  render(ctx: CanvasRenderingContext2D): void { }
  saveToStorage(): void { }
}
```

#### 2. カプセル化
```typescript
// ✅ Good: プライベートメンバーの使用
class Player {
  private hp: number;
  private maxHp: number;

  public getHp(): number {
    return this.hp;
  }

  public takeDamage(amount: number): void {
    this.hp = Math.max(0, this.hp - amount);
  }
}

// ❌ Bad: すべてpublic
class Player {
  public hp: number;
  public maxHp: number;
}
```

#### 3. 継承vs合成
```typescript
// ✅ Good: 合成を優先
class Enemy {
  private movement: MovementComponent;
  private combat: CombatComponent;

  update(deltaTime: number): void {
    this.movement.update(deltaTime);
  }
}

// ⚠️ Caution: 継承は慎重に
class Enemy extends Entity {
  // 基底クラスの変更が影響する
}
```

### 関数設計

#### 1. 関数の長さ
```typescript
// ✅ Good: 短く明確な関数
function checkCollision(a: Entity, b: Entity): boolean {
  return Vector2.distance(a.position, b.position) < a.radius + b.radius;
}

function processCollisions(player: Player, enemies: Enemy[]): void {
  enemies.forEach(enemy => {
    if (checkCollision(player, enemy)) {
      handleCollision(player, enemy);
    }
  });
}

// ❌ Bad: 長すぎる関数（50行以上）
function updateGame(deltaTime: number): void {
  // 移動処理
  // 衝突判定
  // ダメージ処理
  // スポーン処理
  // UI更新
  // ... 100行以上
}
```

#### 2. 引数の数
```typescript
// ✅ Good: オブジェクトでまとめる
interface SpawnConfig {
  position: Vector2;
  type: string;
  hp: number;
}

function spawnEnemy(config: SpawnConfig): Enemy {
  // ...
}

// ❌ Bad: 引数が多すぎる
function spawnEnemy(
  x: number,
  y: number,
  type: string,
  hp: number,
  damage: number,
  speed: number
): Enemy {
  // ...
}
```

#### 3. 純粋関数の推奨
```typescript
// ✅ Good: 純粋関数（副作用なし）
function calculateExperienceToNext(level: number): number {
  return 10 + level * 5;
}

// ❌ Bad: 副作用あり
let globalLevel = 1;
function calculateExperienceToNext(): number {
  globalLevel++; // グローバル変数を変更
  return 10 + globalLevel * 5;
}
```

### エラーハンドリング

#### 1. 例外処理
```typescript
// ✅ Good: 適切な例外処理
async function loadAsset(path: string): Promise<HTMLImageElement> {
  try {
    const image = await fetch(path);
    return await image.blob();
  } catch (error) {
    Logger.error(`Failed to load asset: ${path}`, error);
    throw new Error(`Asset loading failed: ${path}`);
  }
}

// ❌ Bad: 例外を無視
async function loadAsset(path: string): Promise<HTMLImageElement> {
  try {
    const image = await fetch(path);
    return await image.blob();
  } catch (error) {
    return null; // エラーを無視
  }
}
```

#### 2. エラーメッセージ
```typescript
// ✅ Good: 具体的なエラーメッセージ
throw new Error(`Enemy spawn failed: invalid type '${type}'`);

// ❌ Bad: 不明確なエラーメッセージ
throw new Error('Error');
```

### パフォーマンス考慮

#### 1. 不要な計算の回避
```typescript
// ✅ Good: キャッシュの利用
class Player {
  private _experienceToNext: number;

  public levelUp(): void {
    this.level++;
    this._experienceToNext = this.calculateExperienceToNext();
  }

  public getExperienceToNext(): number {
    return this._experienceToNext;
  }
}

// ❌ Bad: 毎回計算
class Player {
  public getExperienceToNext(): number {
    return 10 + this.level * 5; // 毎回計算
  }
}
```

#### 2. オブジェクト生成の最適化
```typescript
// ✅ Good: オブジェクトプール使用
const enemy = enemyPool.acquire();
enemy.reset(position);

// ❌ Bad: 毎回new
const enemy = new Enemy(position);
```

#### 3. 配列操作
```typescript
// ✅ Good: インデックスベースのループ
for (let i = 0; i < enemies.length; i++) {
  enemies[i].update(deltaTime);
}

// ⚠️ Caution: forEachは遅い場合がある（大量データ時）
enemies.forEach(enemy => enemy.update(deltaTime));
```

## 命名規則

### 変数・定数

#### 変数
```typescript
// ✅ Good: camelCase、説明的な名前
const playerHealth = 100;
const enemySpawnInterval = 2.0;
const isGameOver = false;

// ❌ Bad: 短すぎる、不明確
const h = 100;
const e = 2.0;
const f = false;
```

#### 定数
```typescript
// ✅ Good: UPPER_SNAKE_CASE
const MAX_ENEMIES = 100;
const GAME_WIDTH = 1280;
const PLAYER_SPEED = 200;

// ❌ Bad: camelCase
const maxEnemies = 100;
```

### 関数・メソッド

#### 命名パターン
```typescript
// ✅ Good: 動詞で始まる
function calculateDamage(): number { }
function spawnEnemy(): void { }
function isAlive(): boolean { }
function hasWeapon(): boolean { }

// ❌ Bad: 名詞のみ
function damage(): number { }
function enemy(): void { }
```

#### 真偽値を返す関数
```typescript
// ✅ Good: is/has/can/shouldで始まる
function isAlive(): boolean { }
function hasWeapon(): boolean { }
function canAttack(): boolean { }
function shouldSpawn(): boolean { }

// ❌ Bad: 真偽値が不明確
function alive(): boolean { }
function weapon(): boolean { }
```

### クラス・インターフェース

```typescript
// ✅ Good: PascalCase、名詞
class Player { }
class EnemySpawner { }
interface WeaponConfig { }
type EntityType = 'player' | 'enemy';

// ❌ Bad: camelCase、動詞
class player { }
class spawnEnemy { }
```

### ファイル名
```typescript
// ✅ Good: クラス名と一致
// Player.ts
export class Player { }

// ❌ Bad: 不一致
// player-class.ts
export class Player { }
```

## コメント規約

### JSDocコメント
```typescript
/**
 * プレイヤーにダメージを与える
 * @param amount ダメージ量
 * @returns ダメージ後のHP
 */
function takeDamage(amount: number): number {
  this.hp -= amount;
  return this.hp;
}

/**
 * 敵をスポーンする
 * @param position スポーン位置
 * @param type 敵のタイプ
 * @returns 生成された敵インスタンス
 */
function spawnEnemy(position: Vector2, type: string): Enemy {
  // ...
}
```

### インラインコメント
```typescript
// ✅ Good: 複雑なロジックの説明
// 経験値は指数関数的に増加（バランス調整用）
const experienceRequired = Math.floor(10 * Math.pow(1.5, this.level));

// ✅ Good: なぜそうするかの説明
// Canvas APIの制約により、テキストは中央揃えにならないため手動計算
const textX = this.x - (this.text.length * fontSize) / 2;

// ❌ Bad: コード通りの説明（不要）
// HPを減らす
this.hp -= damage;
```

### TODOコメント
```typescript
// TODO: 武器の進化システムを実装
// FIXME: 敵のスポーン位置が重なる問題を修正
// HACK: 一時的な回避策、将来的に要リファクタリング
// NOTE: この処理は60FPSを前提としている
```

## テスト規約

### ユニットテスト（将来実装）

#### テストファイルの配置
```
src/utils/Vector2.ts
tests/unit/utils/Vector2.test.ts
```

#### テストの構造
```typescript
describe('Vector2', () => {
  describe('add', () => {
    it('should add two vectors correctly', () => {
      const v1 = new Vector2(1, 2);
      const v2 = new Vector2(3, 4);
      const result = v1.add(v2);

      expect(result.x).toBe(4);
      expect(result.y).toBe(6);
    });

    it('should handle negative values', () => {
      const v1 = new Vector2(-1, -2);
      const v2 = new Vector2(3, 4);
      const result = v1.add(v2);

      expect(result.x).toBe(2);
      expect(result.y).toBe(2);
    });
  });
});
```

### テストすべき項目
- ✅ ユーティリティ関数（Vector2, MathUtilsなど）
- ✅ ゲームロジック（レベル計算、ダメージ計算など）
- ✅ システムクラス（CollisionSystem, SpawnSystemなど）
- ⚠️ UIコンポーネント（必要に応じて）
- ❌ レンダリング処理（テスト困難）

## コードレビュー基準

### レビューチェックリスト

#### 機能性
- [ ] 要件を満たしているか
- [ ] 期待通りに動作するか
- [ ] エッジケースが考慮されているか
- [ ] エラーハンドリングが適切か

#### コード品質
- [ ] 命名規則に従っているか
- [ ] 関数・クラスの責任が明確か
- [ ] 重複コードがないか
- [ ] 適切にコメントされているか

#### パフォーマンス
- [ ] 不要な計算がないか
- [ ] メモリリークの可能性はないか
- [ ] オブジェクトプールが適切に使われているか

#### セキュリティ
- [ ] 入力検証が行われているか
- [ ] 潜在的な脆弱性はないか

#### テスト
- [ ] テストが書かれているか（該当する場合）
- [ ] テストが網羅的か

### レビューコメントの例
```typescript
// ✅ Good: 建設的なコメント
// この計算は毎フレーム実行されるので、結果をキャッシュしたほうが良いかもしれません。

// ✅ Good: 代替案の提示
// この条件分岐は複雑なので、ガード節を使うとより読みやすくなります。
// 例: if (!player.isAlive()) return;

// ❌ Bad: 否定的で具体性がない
// このコードは読みにくい
```

## バージョン管理規約

### コミットメッセージ

#### フォーマット
```
<type>: <subject>

<body>

<footer>
```

#### Type
- `feat`: 新機能
- `fix`: バグ修正
- `refactor`: リファクタリング
- `docs`: ドキュメント更新
- `style`: コードスタイル修正（機能変更なし）
- `test`: テスト追加・修正
- `chore`: ビルド処理やツール変更

#### 例
```
feat: プレイヤーの移動機能を実装

WASD/矢印キーで8方向移動が可能に。
移動速度は設定ファイルで調整可能。

Closes #123
```

```
fix: 敵のスポーン位置が重なる問題を修正

SpatialHashを使用して、既存の敵と距離をチェックするように変更。

Fixes #456
```

### ブランチ運用（将来的に）

```
main
  ↑
develop
  ↑
feature/player-movement
feature/weapon-system
fix/enemy-spawn-issue
```

## セキュリティガイドライン

### 基本原則
1. **入力検証**: すべての外部入力を検証
2. **最小権限の原則**: 必要最小限の権限のみ使用
3. **データの暗号化**: 機密情報は暗号化（将来のオンライン機能）

### チェックリスト
- [ ] XSS対策: ユーザー入力のサニタイズ
- [ ] CSRF対策: トークン検証（API通信時）
- [ ] 認証・認可: 適切なアクセス制御（オンライン機能時）
- [ ] ログ記録: セキュリティイベントの記録

### コード例
```typescript
// ✅ Good: 入力検証
function setPlayerName(name: string): void {
  // 長さチェック
  if (name.length > 20) {
    throw new Error('Name too long');
  }
  // 不正文字チェック
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    throw new Error('Invalid characters in name');
  }
  this.name = name;
}

// ❌ Bad: 検証なし
function setPlayerName(name: string): void {
  this.name = name; // 任意の文字列を受け入れる
}
```

## パフォーマンスガイドライン

### 測定
```typescript
// パフォーマンス測定の例
class PerformanceMonitor {
  startMeasure(label: string): void {
    performance.mark(`${label}-start`);
  }

  endMeasure(label: string): number {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    const measure = performance.getEntriesByName(label)[0];
    return measure.duration;
  }
}

// 使用例
monitor.startMeasure('collision-detection');
collisionSystem.update();
const duration = monitor.endMeasure('collision-detection');
if (duration > 5) {
  Logger.warn(`Collision detection took ${duration}ms`);
}
```

### 最適化のヒント
1. **プロファイリング**: 最適化前に必ず計測
2. **ボトルネックの特定**: 最も遅い部分から改善
3. **早すぎる最適化は避ける**: まず動作させてから最適化
4. **60FPS維持**: 1フレーム16.67ms以内に処理

## まとめ

このガイドラインに従うことで：
- ✅ 一貫性のあるコードベース
- ✅ 可読性・保守性の向上
- ✅ バグの早期発見
- ✅ チーム開発の効率化
- ✅ 高品質なコードの維持

---

**作成日**: 2025-11-28
**バージョン**: 1.0
**ステータス**: ドラフト（レビュー待ち）
