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

## テスト駆動開発（TDD）規約

このプロジェクトでは、すべての実装にテスト駆動開発（TDD）を採用します。

### TDDの基本原則

#### Red-Green-Refactorサイクル
すべてのコードは以下のサイクルで開発します：

1. **🔴 Red（失敗するテストを書く）**
   ```typescript
   // 例: Vector2クラスのaddメソッドのテスト（実装前）
   describe('Vector2', () => {
     describe('add', () => {
       it('2つのベクトルを正しく加算する', () => {
         const v1 = new Vector2(1, 2);
         const v2 = new Vector2(3, 4);
         const result = v1.add(v2);

         expect(result.x).toBe(4);
         expect(result.y).toBe(6);
       });
     });
   });
   // この時点でテストは失敗する（addメソッドが未実装のため）
   ```

2. **🟢 Green（テストを通す最小限のコードを書く）**
   ```typescript
   // 例: テストを通すための最小実装
   class Vector2 {
     constructor(public x: number, public y: number) {}

     add(other: Vector2): Vector2 {
       return new Vector2(this.x + other.x, this.y + other.y);
     }
   }
   // テストが成功する
   ```

3. **🔵 Refactor（リファクタリング）**
   ```typescript
   // 例: コードの品質を向上（パフォーマンス、可読性など）
   class Vector2 {
     constructor(public x: number, public y: number) {}

     add(other: Vector2): Vector2 {
       // 将来的にオブジェクトプールを使う可能性を考慮
       return new Vector2(this.x + other.x, this.y + other.y);
     }

     // 他の演算も追加
     subtract(other: Vector2): Vector2 {
       return new Vector2(this.x - other.x, this.y - other.y);
     }
   }
   // テストが引き続き成功することを確認
   ```

#### TDD実践のポイント
- **テストファースト**: 実装コードを書く前に必ずテストを書く
- **小さいステップ**: 一度に1つの機能のみをテストし実装
- **継続的な実行**: コード変更のたびにテストを実行
- **テストの独立性**: 各テストは他のテストに依存しない
- **明確な失敗**: テストが失敗した理由が明確にわかるようにする

### テストの種類と適用範囲

#### ユニットテスト（必須）
**対象**: 個別の関数、クラス、メソッド
**ツール**: Vitest
**カバレッジ目標**: 80%以上
**実施タイミング**: すべての実装に対して

##### テストファイルの配置
```
src/utils/Vector2.ts
tests/unit/utils/Vector2.test.ts

src/entities/Player.ts
tests/unit/entities/Player.test.ts

src/systems/CollisionSystem.ts
tests/unit/systems/CollisionSystem.test.ts
```

##### テストの構造（AAA パターン）
```typescript
describe('Player', () => {
  describe('takeDamage', () => {
    it('ダメージを受けるとHPが減少する', () => {
      // Arrange: テストの準備
      const player = new Player({ x: 0, y: 0 });
      const initialHp = player.getHp();
      const damage = 10;

      // Act: テスト対象の実行
      player.takeDamage(damage);

      // Assert: 結果の検証
      expect(player.getHp()).toBe(initialHp - damage);
    });

    it('HPが0未満にならない', () => {
      // Arrange
      const player = new Player({ x: 0, y: 0 });
      player.setHp(5);

      // Act
      player.takeDamage(10);

      // Assert
      expect(player.getHp()).toBe(0);
    });

    it('ダメージを受けると死亡フラグが立つ', () => {
      // Arrange
      const player = new Player({ x: 0, y: 0 });
      player.setHp(5);

      // Act
      player.takeDamage(5);

      // Assert
      expect(player.isAlive()).toBe(false);
    });
  });
});
```

##### テストすべき項目
- ✅ **ユーティリティ関数**: Vector2, MathUtils, Randomなど
- ✅ **ゲームロジック**: レベル計算、ダメージ計算、スコア計算など
- ✅ **エンティティクラス**: Player, Enemy, Weaponなど
- ✅ **システムクラス**: CollisionSystem, LevelSystem, SpawnSystemなど
- ✅ **コンポーネント**: MovementComponent, CombatComponentなど
- ⚠️ **UIコンポーネント**: 複雑なロジックがある場合のみ
- ❌ **レンダリング処理**: テスト困難（視覚的テストは手動）

##### エッジケースのテスト
```typescript
describe('CollisionSystem', () => {
  describe('checkCircleCollision', () => {
    it('2つの円が重なっている場合true', () => {
      const a = { position: new Vector2(0, 0), radius: 10 };
      const b = { position: new Vector2(5, 0), radius: 10 };
      expect(CollisionSystem.checkCircleCollision(a, b)).toBe(true);
    });

    it('2つの円が接触している場合true', () => {
      const a = { position: new Vector2(0, 0), radius: 10 };
      const b = { position: new Vector2(20, 0), radius: 10 };
      expect(CollisionSystem.checkCircleCollision(a, b)).toBe(true);
    });

    it('2つの円が離れている場合false', () => {
      const a = { position: new Vector2(0, 0), radius: 10 };
      const b = { position: new Vector2(25, 0), radius: 10 };
      expect(CollisionSystem.checkCircleCollision(a, b)).toBe(false);
    });

    it('半径が0の場合も正しく動作', () => {
      const a = { position: new Vector2(0, 0), radius: 0 };
      const b = { position: new Vector2(0, 0), radius: 10 };
      expect(CollisionSystem.checkCircleCollision(a, b)).toBe(true);
    });
  });
});
```

##### モックの使用
```typescript
describe('LevelSystem', () => {
  describe('levelUp', () => {
    it('レベルアップ時にUIを更新する', () => {
      // Arrange: UIのモック
      const mockUI = {
        showLevelUpOptions: vi.fn(),
      };
      const levelSystem = new LevelSystem(mockUI);
      const player = new Player({ x: 0, y: 0 });

      // Act
      levelSystem.levelUp(player);

      // Assert: UIメソッドが呼ばれたことを確認
      expect(mockUI.showLevelUpOptions).toHaveBeenCalledTimes(1);
      expect(mockUI.showLevelUpOptions).toHaveBeenCalledWith(player);
    });
  });
});
```

#### 統合テスト（推奨）
**対象**: 複数のモジュールの連携
**ツール**: Vitest
**実施タイミング**: モジュール間の連携実装時

##### 統合テストの例
```typescript
describe('ゲームループ統合テスト', () => {
  it('プレイヤーが敵と衝突するとダメージを受ける', () => {
    // Arrange: ゲームシステムの初期化
    const game = new Game();
    const player = game.getPlayer();
    const enemy = game.spawnEnemy(player.position.x + 5, player.position.y);
    const initialHp = player.getHp();

    // Act: 1フレーム更新
    game.update(0.016); // 16ms

    // Assert: プレイヤーがダメージを受けたことを確認
    expect(player.getHp()).toBeLessThan(initialHp);
  });

  it('武器が敵を倒すと経験値を獲得する', () => {
    // Arrange
    const game = new Game();
    const player = game.getPlayer();
    const enemy = game.spawnEnemy(player.position.x + 10, player.position.y);
    const initialExp = player.getExperience();
    enemy.setHp(1); // 1発で倒せるHP

    // Act: 敵を倒すまで更新
    for (let i = 0; i < 60; i++) { // 1秒分
      game.update(0.016);
      if (!enemy.isAlive()) break;
    }

    // Assert: 経験値が増えたことを確認
    expect(player.getExperience()).toBeGreaterThan(initialExp);
  });
});
```

#### E2Eテスト（Phase 2以降）
**対象**: システム全体の動作
**ツール**: Playwright
**実施タイミング**: 主要機能完成時

##### E2Eテストの例（将来実装）
```typescript
test('ゲームの基本フローが動作する', async ({ page }) => {
  // ゲーム起動
  await page.goto('http://localhost:5173');

  // タイトル画面でスタートボタンをクリック
  await page.click('button:has-text("Start Game")');

  // ゲーム画面が表示されることを確認
  await expect(page.locator('#game-canvas')).toBeVisible();

  // プレイヤーのHPが表示されることを確認
  await expect(page.locator('.player-hp')).toBeVisible();

  // 5秒間プレイ
  await page.waitForTimeout(5000);

  // スコアが増えていることを確認
  const score = await page.locator('.score').textContent();
  expect(parseInt(score)).toBeGreaterThan(0);
});
```

### テスト命名規則

#### describeブロック
```typescript
// ✅ Good: クラス名/関数名を明記
describe('Vector2', () => {
  describe('add', () => {
    // テスト
  });
});

describe('Player', () => {
  describe('takeDamage', () => {
    // テスト
  });
});

// ❌ Bad: 不明確
describe('utils', () => {
  // テスト
});
```

#### itブロック
```typescript
// ✅ Good: 日本語で明確に
it('2つのベクトルを正しく加算する', () => {});
it('HPが0未満にならない', () => {});
it('経験値が満タンになるとレベルアップする', () => {});

// ✅ Good: 英語の場合は "should" で始める
it('should add two vectors correctly', () => {});
it('should not allow HP to go below zero', () => {});

// ❌ Bad: 動作が不明確
it('テスト1', () => {});
it('works', () => {});
```

### テストカバレッジ

#### カバレッジ目標
- **ユニットテスト**: 80%以上
- **統合テスト**: 主要な連携フローをカバー
- **E2Eテスト**: 重要なユーザーシナリオをカバー

#### カバレッジ測定
```bash
# カバレッジ測定
npm run test:coverage

# カバレッジレポート確認
open coverage/index.html
```

#### カバレッジ対象外
以下は低いカバレッジでも許容：
- レンダリングコード（canvas描画）
- エントリーポイント（main.ts）
- 設定ファイル
- 型定義のみのファイル

### テスト実行

#### 開発中のテスト実行
```bash
# ウォッチモード（推奨）
npm run test:watch

# 1回だけ実行
npm run test

# 特定のファイルのみ
npm run test Vector2.test.ts
```

#### CI/CDでのテスト実行
```bash
# すべてのテストを実行
npm run test:ci

# カバレッジチェック付き
npm run test:coverage
```

### テストデータとフィクスチャ

#### テストデータの管理
```typescript
// tests/fixtures/playerData.ts
export const testPlayerData = {
  default: {
    position: { x: 0, y: 0 },
    hp: 100,
    maxHp: 100,
    level: 1,
  },
  lowHp: {
    position: { x: 0, y: 0 },
    hp: 10,
    maxHp: 100,
    level: 1,
  },
  highLevel: {
    position: { x: 0, y: 0 },
    hp: 200,
    maxHp: 200,
    level: 10,
  },
};

// テストでの使用
import { testPlayerData } from '../fixtures/playerData';

it('プレイヤーが生成される', () => {
  const player = new Player(testPlayerData.default);
  expect(player.getHp()).toBe(100);
});
```

### テストのベストプラクティス

#### ✅ Do（推奨）
- テストは独立して実行可能にする
- テストは決定的（毎回同じ結果）にする
- テストは高速に実行できるようにする
- テストは明確で読みやすくする
- テストは実装の詳細ではなく動作をテストする

#### ❌ Don't（非推奨）
- テスト間で状態を共有しない
- 実装の詳細に依存したテストを書かない
- 複雑すぎるテストを書かない
- テストのためだけにコードを変更しない（テスタビリティは除く）
- すべてをモックにしない（実際のコードを使うべき場所もある）

### トラブルシューティング

#### テストが不安定（フラッキー）な場合
```typescript
// ❌ Bad: タイミングに依存
it('アニメーションが完了する', async () => {
  animation.start();
  await wait(100); // 100msで完了すると仮定
  expect(animation.isComplete()).toBe(true);
});

// ✅ Good: 完了を待つ
it('アニメーションが完了する', async () => {
  animation.start();
  await animation.waitForCompletion();
  expect(animation.isComplete()).toBe(true);
});
```

#### テストが遅い場合
```typescript
// ❌ Bad: 実際のタイマーを使う
it('3秒後にスポーンする', async () => {
  spawner.start();
  await wait(3000);
  expect(spawner.hasSpawned()).toBe(true);
});

// ✅ Good: タイマーをモック
it('3秒後にスポーンする', async () => {
  vi.useFakeTimers();
  spawner.start();
  vi.advanceTimersByTime(3000);
  expect(spawner.hasSpawned()).toBe(true);
  vi.useRealTimers();
});
```

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
