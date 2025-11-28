# プロトタイプ実装 - 設計書

## 実装アプローチ

### 開発方針
1. **段階的実装**: 最小単位から段階的に機能を追加
2. **動作確認優先**: 各段階で動作確認してから次へ進む
3. **シンプル第一**: 過度な抽象化を避け、わかりやすいコードを優先
4. **プレースホルダー活用**: 画像・音声は図形と無音で代用

### 実装順序
```
1. プロジェクトセットアップ
   ↓
2. コアエンジン（Game, Renderer, Input）
   ↓
3. シーン管理とタイトルシーン
   ↓
4. プレイヤーエンティティと移動
   ↓
5. 敵エンティティとスポーン
   ↓
6. 衝突判定システム
   ↓
7. 武器システム
   ↓
8. 経験値とレベルアップ
   ↓
9. UI実装
   ↓
10. ゲームオーバーシーン
   ↓
11. バランス調整とバグ修正
```

## 影響を受けるコンポーネント

### 新規作成するファイル

#### コアエンジン（src/core/）
- `Game.ts` - メインゲームクラス
- `Renderer.ts` - 描画エンジン
- `Input.ts` - 入力管理
- `SceneManager.ts` - シーン管理
- `Camera.ts` - カメラ（プレイヤー追従）

#### エンティティ（src/entities/）
- `Entity.ts` - エンティティ基底クラス
- `Player.ts` - プレイヤー
- `Enemy.ts` - 敵基底クラス
- `enemies/BasicEnemy.ts` - 基本敵
- `Weapon.ts` - 武器基底クラス
- `weapons/BasicWeapon.ts` - 基本武器
- `ExperienceOrb.ts` - 経験値オーブ

#### システム（src/systems/）
- `EntityManager.ts` - エンティティ管理
- `CollisionSystem.ts` - 衝突判定
- `SpawnSystem.ts` - スポーンシステム
- `LevelSystem.ts` - レベルシステム
- `CombatSystem.ts` - 戦闘システム

#### シーン（src/scenes/）
- `TitleScene.ts` - タイトルシーン
- `GameScene.ts` - ゲームシーン
- `GameOverScene.ts` - ゲームオーバーシーン

#### UI（src/ui/）
- `HUD.ts` - HUD
- `LevelUpPanel.ts` - レベルアップパネル
- `Button.ts` - ボタンコンポーネント

#### ユーティリティ（src/utils/）
- `Vector2.ts` - 2Dベクトル
- `MathUtils.ts` - 数学ユーティリティ
- `Random.ts` - ランダム生成
- `Logger.ts` - ロガー

#### 設定（src/config/）
- `GameConfig.ts` - ゲーム全般設定
- `PlayerConfig.ts` - プレイヤー設定
- `EnemyConfig.ts` - 敵設定
- `WeaponConfig.ts` - 武器設定
- `BalanceConfig.ts` - バランス設定

#### 型定義（src/types/）
- `index.ts` - 型エクスポート
- `entities.ts` - エンティティ型
- `game.ts` - ゲーム型

#### その他
- `src/main.ts` - エントリーポイント
- `src/styles/main.css` - 基本スタイル
- `public/index.html` - HTML

#### 設定ファイル
- `package.json` - パッケージ設定
- `tsconfig.json` - TypeScript設定
- `vite.config.ts` - Vite設定
- `.eslintrc.json` - ESLint設定
- `.prettierrc` - Prettier設定
- `.gitignore` - Git除外設定

## 実装詳細

### 1. プロジェクトセットアップ

#### package.json
```json
{
  "name": "vampire-survivors-like",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts",
    "format": "prettier --write \"src/**/*.ts\""
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "eslint": "^8.55.0",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "prettier": "^3.1.0"
  }
}
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@core/*": ["src/core/*"],
      "@entities/*": ["src/entities/*"],
      "@systems/*": ["src/systems/*"],
      "@scenes/*": ["src/scenes/*"],
      "@ui/*": ["src/ui/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"],
      "@config/*": ["src/config/*"]
    }
  },
  "include": ["src"]
}
```

#### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@systems': path.resolve(__dirname, './src/systems'),
      '@scenes': path.resolve(__dirname, './src/scenes'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config'),
    },
  },
});
```

### 2. コアエンジン実装

#### Game.ts
```typescript
export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lastTime: number = 0;
  private isRunning: boolean = false;

  constructor(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) throw new Error(`Canvas with id '${canvasId}' not found`);

    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2D context');

    this.ctx = ctx;
  }

  start(): void {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);
  }

  private gameLoop(currentTime: number): void {
    if (!this.isRunning) return;

    const deltaTime = (currentTime - this.lastTime) / 1000; // 秒単位
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame((time) => this.gameLoop(time));
  }

  private update(deltaTime: number): void {
    // シーン更新
    // エンティティ更新
    // システム更新
  }

  private render(): void {
    // 画面クリア
    // シーン描画
  }
}
```

#### Renderer.ts
```typescript
export class Renderer {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  clear(width: number, height: number): void {
    this.ctx.clearRect(0, 0, width, height);
  }

  drawCircle(x: number, y: number, radius: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawRect(x: number, y: number, width: number, height: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawText(text: string, x: number, y: number, color: string, font: string = '16px Arial'): void {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.fillText(text, x, y);
  }

  drawHealthBar(current: number, max: number, x: number, y: number, width: number, height: number): void {
    // 背景（赤）
    this.drawRect(x, y, width, height, '#ff0000');
    // HP（緑）
    const healthWidth = (current / max) * width;
    this.drawRect(x, y, healthWidth, height, '#00ff00');
    // 枠（黒）
    this.ctx.strokeStyle = '#000000';
    this.ctx.strokeRect(x, y, width, height);
  }
}
```

### 3. Vector2ユーティリティ

```typescript
export class Vector2 {
  constructor(public x: number = 0, public y: number = 0) {}

  add(v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  subtract(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  multiply(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector2 {
    const len = this.length();
    if (len === 0) return new Vector2(0, 0);
    return new Vector2(this.x / len, this.y / len);
  }

  static distance(a: Vector2, b: Vector2): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static zero(): Vector2 {
    return new Vector2(0, 0);
  }
}
```

### 4. 衝突判定

```typescript
export class CollisionSystem {
  checkCircleCollision(
    pos1: Vector2,
    radius1: number,
    pos2: Vector2,
    radius2: number
  ): boolean {
    const distance = Vector2.distance(pos1, pos2);
    return distance < radius1 + radius2;
  }

  getEntitiesInRange(
    position: Vector2,
    radius: number,
    entities: Entity[]
  ): Entity[] {
    return entities.filter(entity => {
      const distance = Vector2.distance(position, entity.position);
      return distance <= radius;
    });
  }
}
```

### 5. レベルシステム

```typescript
export class LevelSystem {
  private player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  addExperience(amount: number): void {
    this.player.experience += amount;

    while (this.player.experience >= this.getExperienceToNext()) {
      this.levelUp();
    }
  }

  private levelUp(): void {
    this.player.experience -= this.getExperienceToNext();
    this.player.level++;

    // レベルアップパネル表示
    this.showUpgradeChoices();
  }

  private getExperienceToNext(): number {
    return 10 + this.player.level * 5;
  }

  private showUpgradeChoices(): void {
    // ゲーム一時停止
    // 3つのランダムな強化選択肢を生成
    // UIパネル表示
  }
}
```

### 6. スポーンシステム

```typescript
export class SpawnSystem {
  private spawnTimer: number = 0;
  private gameTime: number = 0;

  update(deltaTime: number, player: Player): void {
    this.gameTime += deltaTime;
    this.spawnTimer += deltaTime;

    const spawnInterval = this.getSpawnInterval();

    if (this.spawnTimer >= spawnInterval) {
      this.spawnEnemy(player.position);
      this.spawnTimer = 0;
    }
  }

  private getSpawnInterval(): number {
    const start = 2.0; // 初期: 2秒
    const min = 0.3;   // 最小: 0.3秒
    const progress = Math.min(this.gameTime / 600, 1); // 10分で最小値
    return start - (start - min) * progress;
  }

  private spawnEnemy(playerPos: Vector2): void {
    // 画面外のランダムな位置にスポーン
    const angle = Math.random() * Math.PI * 2;
    const distance = 800; // 画面外
    const x = playerPos.x + Math.cos(angle) * distance;
    const y = playerPos.y + Math.sin(angle) * distance;

    // 敵を生成
    const enemy = new BasicEnemy(new Vector2(x, y));
    entityManager.addEntity(enemy);
  }
}
```

## データフロー図

### ゲームループフロー
```
requestAnimationFrame
  ↓
計算 deltaTime
  ↓
InputManager.update()
  ↓
SceneManager.update(deltaTime)
  ├→ Player.update()
  ├→ Enemy.update()
  ├→ Weapon.update()
  ├→ ExperienceOrb.update()
  ├→ CollisionSystem.update()
  ├→ SpawnSystem.update()
  └→ LevelSystem.update()
  ↓
SceneManager.render()
  ├→ Renderer.clear()
  ├→ 背景描画
  ├→ Entity描画
  └→ UI描画
  ↓
requestAnimationFrame（次のフレーム）
```

### レベルアップフロー
```
敵を倒す
  ↓
ExperienceOrb生成
  ↓
Playerが収集
  ↓
LevelSystem.addExperience()
  ↓
経験値 >= 必要経験値？
  ├→ Yes: levelUp()
  │     ↓
  │   level++
  │     ↓
  │   ゲーム一時停止
  │     ↓
  │   3つの強化選択肢生成
  │     ↓
  │   LevelUpPanel表示
  │     ↓
  │   プレイヤーが選択
  │     ↓
  │   強化適用
  │     ↓
  │   ゲーム再開
  └→ No: 継続
```

## 簡易実装の方針

### プレースホルダー
- **グラフィック**: Canvas図形（円・矩形）で代用
  - プレイヤー: 青い円
  - 敵: 赤い円
  - 経験値オーブ: 緑の小円
  - 武器エフェクト: 黄色い線/円

- **サウンド**: 未実装（無音）

- **アニメーション**: 最小限
  - 移動のみ
  - 攻撃エフェクトは一瞬表示

### シンプル化
- **AI**: 単純な直進のみ
- **武器**: 1種類のみ、単純な円形範囲攻撃
- **ステージ**: 平坦な単色背景
- **カメラ**: プレイヤー中心の固定追従

## 技術的考慮事項

### パフォーマンス
- オブジェクトプールは後で追加（最初は new で生成）
- 空間分割は敵が100体超えたら追加
- 最適化は動作確認後に実施

### エラーハンドリング
- Canvas取得失敗時のエラー
- アセット読み込み失敗時のエラー（今回はなし）
- 不正な設定値のチェック

### ブラウザ互換性
- requestAnimationFrame 使用
- ES2020 機能使用
- モダンブラウザのみ対応

---

**作成日**: 2025-11-28
**対象フェーズ**: Phase 1（プロトタイプ）
