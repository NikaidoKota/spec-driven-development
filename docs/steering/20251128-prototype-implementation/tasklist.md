# プロトタイプ実装 - タスクリスト

## タスク概要
プロトタイプ実装を段階的に進めるための具体的なタスクリスト。各タスク完了後に動作確認を行い、次のタスクに進む。

---

## Phase 0: プロジェクトセットアップ

### ✅ 完了条件
- npm run dev でローカル開発サーバーが起動する
- ブラウザで空の Canvas が表示される
- TypeScript のビルドエラーがない

### タスク

- [ ] **0.1 プロジェクト初期化**
  - [ ] `npm init -y` でプロジェクト作成
  - [ ] 必要なパッケージをインストール
    - `npm install -D typescript vite`
    - `npm install -D eslint prettier`
    - `npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser`
  - [ ] package.json の scripts 設定

- [ ] **0.2 設定ファイル作成**
  - [ ] tsconfig.json 作成（パスエイリアス設定含む）
  - [ ] vite.config.ts 作成
  - [ ] .eslintrc.json 作成
  - [ ] .prettierrc 作成
  - [ ] .gitignore 作成

- [ ] **0.3 ディレクトリ構造作成**
  - [ ] src/ 配下のディレクトリを作成
    - src/core/, src/entities/, src/systems/
    - src/scenes/, src/ui/, src/utils/
    - src/config/, src/types/, src/styles/
  - [ ] public/ ディレクトリ作成

- [ ] **0.4 HTML/CSS 作成**
  - [ ] public/index.html 作成（Canvas要素含む）
  - [ ] src/styles/main.css 作成（最小限のスタイル）

- [ ] **0.5 エントリーポイント作成**
  - [ ] src/main.ts 作成（Hello World確認用）
  - [ ] npm run dev で動作確認

---

## Phase 1: コアエンジンとユーティリティ

### ✅ 完了条件
- ゲームループが60FPSで動作する
- 画面に青い円が表示され、WASDキーで移動できる

### タスク

- [ ] **1.1 ユーティリティ実装**
  - [ ] src/utils/Vector2.ts 作成
    - add, subtract, multiply, length, normalize メソッド
    - distance 静的メソッド
  - [ ] src/utils/MathUtils.ts 作成
    - clamp, lerp 関数
  - [ ] src/utils/Random.ts 作成
    - range, choice 関数
  - [ ] src/utils/Logger.ts 作成
    - error, warn, info メソッド

- [ ] **1.2 型定義**
  - [ ] src/types/entities.ts 作成
    - Entity, Player, Enemy インターフェース
  - [ ] src/types/game.ts 作成
    - GameState, SceneType 型
  - [ ] src/types/index.ts 作成（エクスポート）

- [ ] **1.3 設定ファイル実装**
  - [ ] src/config/GameConfig.ts 作成
  - [ ] src/config/PlayerConfig.ts 作成
  - [ ] src/config/EnemyConfig.ts 作成
  - [ ] src/config/WeaponConfig.ts 作成
  - [ ] src/config/BalanceConfig.ts 作成

- [ ] **1.4 レンダラー実装**
  - [ ] src/core/Renderer.ts 作成
    - clear, drawCircle, drawRect, drawText メソッド
    - drawHealthBar メソッド

- [ ] **1.5 入力管理実装**
  - [ ] src/core/Input.ts 作成
    - キーボードイベントリスナー
    - isKeyPressed メソッド
    - getMovementDirection メソッド

- [ ] **1.6 ゲームクラス実装**
  - [ ] src/core/Game.ts 作成
    - ゲームループ（requestAnimationFrame）
    - deltaTime 計算
    - update, render メソッド
  - [ ] src/main.ts から Game インスタンス作成
  - [ ] 動作確認: コンソールに FPS 表示

---

## Phase 2: シーン管理とタイトル画面

### ✅ 完了条件
- タイトル画面が表示される
- クリックでゲーム画面に遷移する

### タスク

- [ ] **2.1 シーン基底クラス**
  - [ ] src/core/Scene.ts 作成
    - init, update, render, cleanup メソッド（抽象）

- [ ] **2.2 シーン管理**
  - [ ] src/core/SceneManager.ts 作成
    - changeScene, getCurrentScene メソッド
    - シーンのライフサイクル管理

- [ ] **2.3 タイトルシーン実装**
  - [ ] src/scenes/TitleScene.ts 作成
    - ゲームタイトル表示
    - 「Click to Start」メッセージ
    - 操作説明表示
    - クリックイベントでGameSceneへ遷移
  - [ ] 動作確認: タイトル画面表示とシーン遷移

- [ ] **2.4 ゲームシーン（仮実装）**
  - [ ] src/scenes/GameScene.ts 作成
    - 背景描画のみ
    - 「Game Scene」テキスト表示
  - [ ] Game.ts でシーン管理を統合

---

## Phase 3: プレイヤー実装

### ✅ 完了条件
- プレイヤーが画面中央に表示される
- WASDまたは矢印キーで8方向に移動できる
- 画面端で停止する（画面外に出ない）

### タスク

- [ ] **3.1 エンティティ基底クラス**
  - [ ] src/entities/Entity.ts 作成
    - position, active プロパティ
    - update, render メソッド（抽象）

- [ ] **3.2 プレイヤー実装**
  - [ ] src/entities/Player.ts 作成
    - プロパティ: hp, maxHp, level, experience, moveSpeed
    - update メソッド: 入力に応じて移動
    - render メソッド: 青い円を描画
    - 画面端の制限処理
  - [ ] GameScene でプレイヤー生成・更新・描画
  - [ ] 動作確認: プレイヤー移動

- [ ] **3.3 カメラ実装**
  - [ ] src/core/Camera.ts 作成
    - プレイヤー追従カメラ
    - ワールド座標→スクリーン座標変換
  - [ ] 動作確認: カメラがプレイヤーを追従

---

## Phase 4: 敵の実装とスポーン

### ✅ 完了条件
- 敵が定期的にスポーンする
- 敵がプレイヤーに向かって移動する
- 最大100体まで制限される

### タスク

- [ ] **4.1 エンティティ管理**
  - [ ] src/systems/EntityManager.ts 作成
    - addEntity, removeEntity メソッド
    - getEntitiesByType メソッド
    - updateAll, renderAll メソッド

- [ ] **4.2 敵基底クラス**
  - [ ] src/entities/Enemy.ts 作成
    - 共通プロパティ定義

- [ ] **4.3 基本敵実装**
  - [ ] src/entities/enemies/BasicEnemy.ts 作成
    - プロパティ: hp, damage, moveSpeed, expDrop
    - update メソッド: プレイヤーへ直進
    - render メソッド: 赤い円を描画
  - [ ] 動作確認: 手動で敵を1体生成し、プレイヤーを追いかける

- [ ] **4.4 スポーンシステム**
  - [ ] src/systems/SpawnSystem.ts 作成
    - スポーン間隔管理（時間経過で短縮）
    - 画面外ランダム位置に生成
    - 最大数制限
  - [ ] GameScene にスポーンシステム統合
  - [ ] 動作確認: 敵が定期的にスポーンし、増えていく

---

## Phase 5: 衝突判定

### ✅ 完了条件
- 敵と接触するとプレイヤーがダメージを受ける
- HPが0になるとゲームオーバー（コンソールログ）

### タスク

- [ ] **5.1 衝突判定システム**
  - [ ] src/systems/CollisionSystem.ts 作成
    - checkCircleCollision メソッド
    - getEntitiesInRange メソッド

- [ ] **5.2 プレイヤーと敵の衝突**
  - [ ] Player.takeDamage メソッド実装
  - [ ] GameScene で衝突判定実行
  - [ ] 接触時にダメージ処理（1秒に1回制限）
  - [ ] HP 0 で死亡フラグ設定
  - [ ] 動作確認: 敵に触れるとダメージ、HP 0 で死亡

---

## Phase 6: 武器システム

### ✅ 完了条件
- 武器が自動で最寄りの敵を攻撃する
- 敵を倒すと消える

### タスク

- [ ] **6.1 武器基底クラス**
  - [ ] src/entities/Weapon.ts 作成
    - プロパティ: damage, attackSpeed, range, piercing

- [ ] **6.2 基本武器実装**
  - [ ] src/entities/weapons/BasicWeapon.ts 作成
    - update メソッド: 攻撃タイミング管理
    - attack メソッド: 範囲内の最寄り敵にダメージ
    - render メソッド: 攻撃エフェクト描画
  - [ ] Player に武器を装備
  - [ ] 動作確認: 武器が自動で敵を攻撃

- [ ] **6.3 戦闘システム**
  - [ ] src/systems/CombatSystem.ts 作成
    - dealDamage メソッド
    - 敵の死亡処理
  - [ ] Enemy.takeDamage, Enemy.die メソッド実装
  - [ ] 動作確認: 敵を倒すと消える

---

## Phase 7: 経験値とレベルアップ

### ✅ 完了条件
- 敵を倒すと経験値オーブがドロップする
- 経験値オーブを取得すると経験値が増える
- 経験値が満タンでレベルアップ（コンソールログ）

### タスク

- [ ] **7.1 経験値オーブ実装**
  - [ ] src/entities/ExperienceOrb.ts 作成
    - プロパティ: value, magnetized
    - update メソッド: プレイヤーに引き寄せ
    - render メソッド: 緑の小円描画
  - [ ] 敵の死亡時にオーブをドロップ
  - [ ] 動作確認: 敵を倒すとオーブが出現

- [ ] **7.2 経験値収集**
  - [ ] プレイヤーとオーブの衝突判定
  - [ ] Player.gainExperience メソッド実装
  - [ ] 動作確認: オーブを取ると経験値増加

- [ ] **7.3 レベルシステム**
  - [ ] src/systems/LevelSystem.ts 作成
    - addExperience メソッド
    - levelUp メソッド（一時停止とパネル表示は後で）
    - getExperienceToNext メソッド
  - [ ] GameScene にレベルシステム統合
  - [ ] 動作確認: 経験値が満タンでレベルアップ（コンソールログ）

---

## Phase 8: UI実装

### ✅ 完了条件
- HP、経験値、レベル、時間、撃破数が表示される
- レベルアップ時にパネルが表示され、選択できる

### タスク

- [ ] **8.1 HUD実装**
  - [ ] src/ui/HUD.ts 作成
    - HPバー描画
    - 経験値バー描画
    - レベル、時間、撃破数テキスト描画
  - [ ] GameScene で HUD 描画
  - [ ] 動作確認: HUD が表示され、リアルタイムで更新される

- [ ] **8.2 ボタンコンポーネント**
  - [ ] src/ui/Button.ts 作成
    - 矩形ボタン描画
    - クリック判定
    - ホバーエフェクト

- [ ] **8.3 レベルアップパネル**
  - [ ] src/ui/LevelUpPanel.ts 作成
    - 3つの選択肢表示
    - 選択肢のランダム生成
    - クリックで選択
  - [ ] 強化効果の適用ロジック
  - [ ] レベルアップ時にゲーム一時停止
  - [ ] 選択後にゲーム再開
  - [ ] 動作確認: レベルアップ→パネル表示→選択→強化適用→再開

---

## Phase 9: ゲームオーバーとリトライ

### ✅ 完了条件
- HP 0 または時間切れでゲームオーバー画面に遷移
- 結果（勝敗、時間、撃破数）が表示される
- リトライボタンでゲームを再開できる

### タスク

- [ ] **9.1 ゲーム状態管理**
  - [ ] GameScene に制限時間（10分）追加
  - [ ] 時間切れで勝利判定
  - [ ] プレイヤー死亡で敗北判定

- [ ] **9.2 ゲームオーバーシーン**
  - [ ] src/scenes/GameOverScene.ts 作成
    - 勝敗表示（WIN/LOSE）
    - 生存時間表示
    - 撃破数表示
    - リトライボタン
    - タイトルに戻るボタン
  - [ ] GameScene からゲームオーバーシーンへ遷移
  - [ ] 動作確認: HP 0 または時間切れでゲームオーバー画面

- [ ] **9.3 リトライ機能**
  - [ ] リトライボタンで GameScene をリセット
  - [ ] タイトルボタンで TitleScene へ遷移
  - [ ] 動作確認: リトライでゲームが最初から開始される

---

## Phase 10: バランス調整とバグ修正

### ✅ 完了条件
- 10分間プレイして適切な難易度になっている
- 明らかなバグがない
- 60FPS で安定動作する

### タスク

- [ ] **10.1 ゲームバランス調整**
  - [ ] 敵の HP、ダメージ、スポーン間隔を調整
  - [ ] 武器の威力、攻撃速度を調整
  - [ ] レベルアップ速度を調整
  - [ ] プレイテストして調整を繰り返す

- [ ] **10.2 パフォーマンス確認**
  - [ ] 敵100体での FPS 確認
  - [ ] メモリリークチェック
  - [ ] 必要に応じてオブジェクトプール導入

- [ ] **10.3 バグ修正**
  - [ ] 発見されたバグをリストアップ
  - [ ] 優先度順に修正
  - [ ] 再テスト

- [ ] **10.4 コード整理**
  - [ ] 不要なコメント削除
  - [ ] コードフォーマット統一
  - [ ] ESLint エラー修正
  - [ ] 最終動作確認

---

## Phase 11: 最終確認とデプロイ準備

### ✅ 完了条件
- すべての機能が要件を満たしている
- ビルドが正常に完了する
- デプロイ可能な状態

### タスク

- [ ] **11.1 最終動作確認**
  - [ ] 全シーンの遷移確認
  - [ ] 全機能の動作確認
  - [ ] 複数ブラウザでの動作確認（Chrome, Firefox, Safari, Edge）

- [ ] **11.2 README作成**
  - [ ] README.md 作成
    - プロジェクト概要
    - セットアップ手順
    - 操作方法
    - 開発コマンド

- [ ] **11.3 ビルド確認**
  - [ ] `npm run build` でビルド
  - [ ] `npm run preview` でプレビュー確認
  - [ ] ビルドサイズ確認

- [ ] **11.4 ドキュメント更新**
  - [ ] CHANGELOG.md 作成
  - [ ] ステアリングドキュメントの完了記録

---

## 進捗管理

### タスクの状態
- [ ] 未着手
- [進行中] 作業中
- [✓] 完了

### 注意事項
- 各 Phase 完了後に必ず動作確認を行う
- バグを発見したら即座に記録し、優先度を判断
- 実装中に設計変更が必要な場合は design.md を更新
- 重要な技術的決定は記録する

---

**作成日**: 2025-11-28
**想定期間**: 初期開発
