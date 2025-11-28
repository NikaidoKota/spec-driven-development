# Elemental Survivors

ヴァンパイアサバイバーズに触発された、環境インタラクションと属性システムが特徴のブラウザベース2Dアクションゲーム。

## 🎮 ゲームの特徴

### 独自の差別化要素

#### 🌍 環境インタラクション - リアクティブ・フィールド
- **破壊可能オブジェクト**: 岩、木、建物などを破壊し、範囲ダメージや素材を獲得
- **地形効果**: 水溜まり、溶岩、草地、氷床など、立つ場所で戦略が変わる
- **フィールド変化**: プレイヤーの行動で環境が変化（草地が燃える、溶岩が固まる等）

#### 🔮 革新的なビルドシステム - エレメンタル・フュージョン
- **5属性システム**: 火・水・雷・自然・闇の属性を武器に付与
- **フュージョン効果**: 2属性の組み合わせで特殊効果発動（15種類）
- **トリニティ効果**: 3属性の組み合わせで最強効果発動（10種類）
- **無限のビルド可能性**: 属性と武器の組み合わせで戦略は無限大

## 📋 開発フェーズ

### Phase 1: プロトタイプ（現在の目標）
- 基本ゲームループの実装
- プレイヤー移動、敵スポーン、自動攻撃
- レベルアップシステム
- 10分間のサバイバル

### Phase 2: 環境インタラクション導入
- 破壊可能オブジェクト
- 地形効果と地形変化
- 環境を利用した戦略的ゲームプレイ

### Phase 3: ビルドシステム導入
- 5属性システム
- フュージョンとトリニティ効果
- 武器合成システム

### Phase 4: 完成版
- 複数キャラクター・武器・ステージ
- オンラインランキング
- ビルド共有機能

## 🛠️ 技術スタック

- **言語**: TypeScript 5.x
- **ビルドツール**: Vite 5.x
- **レンダリング**: HTML5 Canvas 2D API
- **対応ブラウザ**: Chrome, Firefox, Safari, Edge (最新版)

## 📁 プロジェクト構造

```
.
├── docs/                      # ドキュメント
│   ├── persistent/            # 永続的な設計書
│   │   ├── product-requirements.md
│   │   ├── functional-design.md
│   │   ├── architecture.md
│   │   ├── repository-structure.md
│   │   ├── development-guidelines.md
│   │   └── glossary.md
│   ├── steering/              # 作業単位ドキュメント
│   │   └── 20251128-prototype-implementation/
│   │       ├── requirements.md
│   │       ├── design.md
│   │       └── tasklist.md
│   └── images/                # ドキュメント用画像
├── src/                       # ソースコード（Phase 1で作成予定）
├── public/                    # 静的ファイル（Phase 1で作成予定）
├── CLAUDE.md                  # 開発ルール
└── README.md                  # このファイル
```

## 🚀 セットアップ（Phase 1実装後）

Phase 1実装完了後、以下のコマンドでセットアップできます：

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 🎯 操作方法（Phase 1実装後）

- **移動**: WASD または 矢印キー
- **攻撃**: 自動
- **レベルアップ**: 自動（経験値が満タンになると選択肢が表示）

## 📖 ドキュメント

詳細な設計書は `docs/persistent/` ディレクトリにあります：

- **製品要件**: [product-requirements.md](docs/persistent/product-requirements.md)
- **機能設計**: [functional-design.md](docs/persistent/functional-design.md)
- **アーキテクチャ**: [architecture.md](docs/persistent/architecture.md)
- **リポジトリ構造**: [repository-structure.md](docs/persistent/repository-structure.md)
- **開発ガイドライン**: [development-guidelines.md](docs/persistent/development-guidelines.md)
- **用語集**: [glossary.md](docs/persistent/glossary.md)

開発ルールは [CLAUDE.md](CLAUDE.md) を参照してください。

## 📝 開発方針

このプロジェクトは段階的開発を採用しています：

1. **要件定義・設計優先**: 実装前に詳細な設計書を作成
2. **段階的実装**: プロトタイプから始め、機能を段階的に追加
3. **レビュー駆動**: 各フェーズでレビューと承認を取得
4. **ドキュメント管理**: 永続的ドキュメント（設計）と作業単位ドキュメント（実装）を分離

詳細は [CLAUDE.md](CLAUDE.md) を参照してください。

## 🎨 ゲームデザインのインスピレーション

### ベースとなるジャンル
- Vampire Survivors
- Brotato
- 20 Minutes Till Dawn

### 独自要素
- 環境との相互作用（テラリア、マインクラフト的な要素）
- 属性システム（ARPG的なビルド構築）
- 戦略的な配置と誘導（タワーディフェンス的な要素）

## 📊 開発状況

- ✅ Phase 0: プロジェクトセットアップとドキュメント作成
- 🔲 Phase 1: プロトタイプ実装
- 🔲 Phase 2: 環境インタラクション導入
- 🔲 Phase 3: ビルドシステム導入
- 🔲 Phase 4: 完成版

## 📄 ライセンス

TBD

## 👥 コントリビューター

TBD

---

**作成日**: 2025-11-28
**バージョン**: 0.1.0 (ドキュメントフェーズ)
