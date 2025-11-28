# リポジトリ構造（Repository Structure Document）

## 概要
本ドキュメントでは、プロジェクトのディレクトリ構造、ファイル配置ルール、命名規則を定義します。

## ディレクトリ構造

```
vampire-survivors-like/
├── .github/                    # GitHub関連設定
│   └── workflows/              # GitHub Actions
│       └── deploy.yml          # デプロイワークフロー
├── docs/                       # プロジェクトドキュメント
│   ├── persistent/             # 永続的ドキュメント
│   │   ├── product-requirements.md
│   │   ├── functional-design.md
│   │   ├── architecture.md
│   │   ├── repository-structure.md
│   │   ├── development-guidelines.md
│   │   └── glossary.md
│   ├── steering/               # 作業単位ドキュメント
│   │   └── YYYYMMDD-task-name/ # 日付付きタスクディレクトリ
│   │       ├── requirements.md
│   │       ├── design.md
│   │       └── tasklist.md
│   └── images/                 # ドキュメント用画像
├── public/                     # 静的ファイル（ビルド時にそのままコピー）
│   ├── index.html              # エントリーHTML
│   ├── favicon.ico             # ファビコン
│   └── assets/                 # 静的アセット
│       ├── sprites/            # スプライト画像
│       │   ├── player.png
│       │   ├── enemies/
│       │   │   └── basic-enemy.png
│       │   └── effects/
│       │       └── explosion.png
│       ├── sounds/             # サウンドファイル
│       │   ├── bgm/
│       │   │   └── game-theme.mp3
│       │   └── sfx/
│       │       ├── hit.mp3
│       │       └── levelup.mp3
│       └── fonts/              # フォントファイル
│           └── game-font.ttf
├── src/                        # ソースコード
│   ├── core/                   # コアエンジン機能
│   │   ├── Game.ts             # メインゲームクラス
│   │   ├── Scene.ts            # シーン基底クラス
│   │   ├── SceneManager.ts     # シーン管理
│   │   ├── Renderer.ts         # レンダリングエンジン
│   │   ├── Input.ts            # 入力管理
│   │   ├── Time.ts             # 時間管理
│   │   └── Camera.ts           # カメラ制御
│   ├── entities/               # ゲームエンティティ
│   │   ├── Entity.ts           # エンティティ基底クラス
│   │   ├── Player.ts           # プレイヤー
│   │   ├── Enemy.ts            # 敵基底クラス
│   │   ├── enemies/            # 敵の種類
│   │   │   └── BasicEnemy.ts
│   │   ├── Weapon.ts           # 武器基底クラス
│   │   ├── weapons/            # 武器の種類
│   │   │   └── BasicWeapon.ts
│   │   └── ExperienceOrb.ts    # 経験値オーブ
│   ├── systems/                # ゲームシステム
│   │   ├── EntityManager.ts    # エンティティ管理
│   │   ├── CollisionSystem.ts  # 衝突判定
│   │   ├── SpawnSystem.ts      # スポーンシステム
│   │   ├── LevelSystem.ts      # レベルシステム
│   │   ├── CombatSystem.ts     # 戦闘システム
│   │   └── PoolManager.ts      # オブジェクトプール管理
│   ├── scenes/                 # シーン実装
│   │   ├── TitleScene.ts       # タイトルシーン
│   │   ├── GameScene.ts        # ゲームシーン
│   │   └── GameOverScene.ts    # ゲームオーバーシーン
│   ├── ui/                     # UIコンポーネント
│   │   ├── HUD.ts              # ヘッドアップディスプレイ
│   │   ├── LevelUpPanel.ts     # レベルアップパネル
│   │   ├── GameOverScreen.ts   # ゲームオーバー画面
│   │   └── Button.ts           # ボタンコンポーネント
│   ├── utils/                  # ユーティリティ
│   │   ├── Vector2.ts          # 2Dベクトル
│   │   ├── MathUtils.ts        # 数学ユーティリティ
│   │   ├── Random.ts           # ランダム生成
│   │   ├── SpatialHash.ts      # 空間分割
│   │   └── Logger.ts           # ロガー
│   ├── config/                 # 設定ファイル
│   │   ├── GameConfig.ts       # ゲーム全般設定
│   │   ├── PlayerConfig.ts     # プレイヤー設定
│   │   ├── EnemyConfig.ts      # 敵設定
│   │   ├── WeaponConfig.ts     # 武器設定
│   │   └── BalanceConfig.ts    # ゲームバランス設定
│   ├── types/                  # 型定義
│   │   ├── index.ts            # 共通型エクスポート
│   │   ├── entities.ts         # エンティティ型
│   │   ├── game.ts             # ゲーム型
│   │   └── config.ts           # 設定型
│   ├── assets/                 # インポート用アセット定義
│   │   └── index.ts            # アセットパス定義
│   ├── styles/                 # スタイルシート（最小限）
│   │   └── main.css            # メインスタイル
│   └── main.ts                 # エントリーポイント
├── tests/                      # テストコード（将来実装）
│   ├── unit/                   # ユニットテスト
│   │   ├── utils/
│   │   └── systems/
│   └── e2e/                    # E2Eテスト
│       └── game.spec.ts
├── .gitignore                  # Git除外設定
├── .eslintrc.json              # ESLint設定
├── .prettierrc                 # Prettier設定
├── package.json                # パッケージ設定
├── tsconfig.json               # TypeScript設定
├── vite.config.ts              # Vite設定
├── README.md                   # プロジェクト説明
├── CHANGELOG.md                # 変更履歴
└── CLAUDE.md                   # 開発ルール
```

## ファイル配置ルール

### コアエンジン（`src/core/`）
- **目的**: ゲームエンジンの基盤機能
- **配置基準**:
  - ゲーム全体で使用される基本機能
  - ゲーム固有のロジックを含まない汎用機能
  - シーン管理、レンダリング、入力処理など
- **命名規則**: PascalCase（例: `Game.ts`, `SceneManager.ts`）

### エンティティ（`src/entities/`）
- **目的**: ゲームオブジェクトの定義
- **配置基準**:
  - ゲーム内に存在するオブジェクト
  - 状態と振る舞いを持つクラス
  - 基底クラスはトップレベル、派生クラスはサブディレクトリ
- **命名規則**: PascalCase（例: `Player.ts`, `BasicEnemy.ts`）
- **サブディレクトリ**:
  - `enemies/`: 敵の種類ごと
  - `weapons/`: 武器の種類ごと

### システム（`src/systems/`）
- **目的**: ゲームロジックの処理
- **配置基準**:
  - 複数のエンティティに対する処理
  - 状態を持たない、またはグローバルな状態管理
  - エンティティの生成、更新、削除を管理
- **命名規則**: PascalCase + System（例: `CollisionSystem.ts`）

### シーン（`src/scenes/`）
- **目的**: ゲームの画面状態
- **配置基準**:
  - 画面単位の処理
  - 各シーンは独立して動作
  - タイトル、ゲーム、ゲームオーバーなど
- **命名規則**: PascalCase + Scene（例: `TitleScene.ts`）

### UI（`src/ui/`）
- **目的**: ユーザーインターフェース
- **配置基準**:
  - 画面表示用のコンポーネント
  - ユーザー入力を受け付けるUI要素
  - 再利用可能なUIパーツ
- **命名規則**: PascalCase（例: `HUD.ts`, `Button.ts`）

### ユーティリティ（`src/utils/`）
- **目的**: 汎用的なヘルパー関数・クラス
- **配置基準**:
  - ゲーム固有ではない汎用機能
  - 数学計算、データ変換、ログなど
  - 複数箇所から使用される機能
- **命名規則**: PascalCase（例: `Vector2.ts`, `MathUtils.ts`）

### 設定（`src/config/`）
- **目的**: ゲームバランスとパラメータ設定
- **配置基準**:
  - 定数定義
  - ゲームバランス調整用パラメータ
  - 環境依存しない固定値
- **命名規則**: PascalCase + Config（例: `GameConfig.ts`）
- **フォーマット**: オブジェクトまたは定数エクスポート

### 型定義（`src/types/`）
- **目的**: TypeScript型定義の集約
- **配置基準**:
  - interface, type, enumの定義
  - 複数ファイルで共有される型
  - ドメインごとに分割
- **命名規則**: camelCase（例: `entities.ts`, `game.ts`）

### アセット（`public/assets/`）
- **目的**: 画像、音声、フォントなどの静的ファイル
- **配置基準**:
  - ビルド時に加工不要なファイル
  - ランタイムで読み込むファイル
- **命名規則**: kebab-case（例: `player-sprite.png`, `hit-sound.mp3`）
- **サブディレクトリ**:
  - `sprites/`: 画像ファイル
  - `sounds/bgm/`: BGM
  - `sounds/sfx/`: 効果音
  - `fonts/`: フォントファイル

## 命名規則

### ファイル名
- **TypeScriptファイル**: PascalCase（例: `Player.ts`, `GameScene.ts`）
- **設定ファイル**: camelCase（例: `vite.config.ts`, `.eslintrc.json`）
- **アセットファイル**: kebab-case（例: `player-sprite.png`, `game-theme.mp3`）

### クラス名
- **PascalCase**（例: `Player`, `CollisionSystem`, `GameScene`）
- **接尾辞**:
  - システム: `System`（例: `SpawnSystem`）
  - シーン: `Scene`（例: `TitleScene`）
  - マネージャー: `Manager`（例: `SceneManager`）

### インターフェース/型
- **PascalCase**（例: `Entity`, `Vector2`, `WeaponConfig`）
- **接頭辞**: なし（Iプレフィックスは使用しない）

### 変数・関数名
- **camelCase**（例: `playerHealth`, `calculateDamage()`）
- **定数**: UPPER_SNAKE_CASE（例: `MAX_ENEMIES`, `GAME_WIDTH`）
- **プライベートメンバー**: プレフィックスなし（TypeScriptのprivateキーワード使用）

### 列挙型
- **PascalCase**（例: `EntityType`, `GameState`）
- **メンバー**: PascalCase（例: `EntityType.Player`）

## ファイルサイズガイドライン

### コードファイル
- **理想**: 200行以内
- **最大**: 400行
- **超える場合**: 機能ごとに分割

### アセットファイル
- **画像**: 100KB以内（個別ファイル）
- **スプライトシート**: 500KB以内
- **音声（BGM）**: 1MB以内
- **音声（効果音）**: 50KB以内

## インポートルール

### インポート順序
1. 外部ライブラリ
2. コアエンジン（`src/core/`）
3. システム（`src/systems/`）
4. エンティティ（`src/entities/`）
5. UI（`src/ui/`）
6. ユーティリティ（`src/utils/`）
7. 型定義（`src/types/`）
8. 設定（`src/config/`）
9. 相対パス

### インポート例
```typescript
// 外部ライブラリ
import { someLibrary } from 'some-library';

// コアエンジン
import { Game } from '@/core/Game';
import { Renderer } from '@/core/Renderer';

// システム
import { CollisionSystem } from '@/systems/CollisionSystem';

// エンティティ
import { Player } from '@/entities/Player';

// UI
import { HUD } from '@/ui/HUD';

// ユーティリティ
import { Vector2 } from '@/utils/Vector2';

// 型定義
import type { Entity } from '@/types/entities';

// 設定
import { GAME_CONFIG } from '@/config/GameConfig';

// 相対パス
import { helper } from './helper';
```

### パスエイリアス設定
`tsconfig.json`で以下のエイリアスを設定：
```json
{
  "compilerOptions": {
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
  }
}
```

## Git管理ルール

### コミット対象
- ソースコード（`src/`）
- 設定ファイル
- ドキュメント（`docs/`）
- 小サイズのアセット（目安: 100KB以下）

### コミット対象外（`.gitignore`）
```
# ビルド成果物
dist/
build/

# 依存パッケージ
node_modules/

# 環境設定
.env
.env.local

# IDE設定
.vscode/
.idea/

# OS生成ファイル
.DS_Store
Thumbs.db

# ログファイル
*.log

# 一時ファイル
*.tmp
*.temp
```

### ブランチ戦略（将来的に）
- `main`: 本番環境用
- `develop`: 開発用
- `feature/xxx`: 機能開発用
- `fix/xxx`: バグ修正用

## ドキュメント管理ルール

### 永続的ドキュメント（`docs/persistent/`）
- プロジェクトの基礎仕様
- 大きな変更時のみ更新
- バージョン管理必須

### ステアリングドキュメント（`docs/steering/`）
- 日付付きディレクトリで管理
- タスク完了後も履歴として保持
- 命名: `YYYYMMDD-task-name/`
  - 例: `20251128-initial-setup/`

## ビルド成果物

### 開発ビルド
- 出力先: `dist/`
- ソースマップ: あり
- 最適化: 最小限

### プロダクションビルド
- 出力先: `dist/`
- ソースマップ: なし
- 最適化: 最大
- ファイル名ハッシュ: あり

## まとめ

このリポジトリ構造により：
- ✅ 機能ごとに明確に分離
- ✅ ファイルの配置場所が明確
- ✅ 新機能の追加が容易
- ✅ チーム開発時の競合が最小限
- ✅ コードの可読性と保守性が向上

---

**作成日**: 2025-11-28
**バージョン**: 1.0
**ステータス**: ドラフト（レビュー待ち）
