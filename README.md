# Task-manager

## プロジェクト概要

このプロジェクトは、Next.js（App Router）とSupabaseを使った認証付きタスク管理アプリです。

- ログイン／新規登録機能（JWT認証）
- タスク一覧表示、タスク作成
- ログアウト機能
- Tailwind CSSによるレスポンシブデザイン
- Vercelにデプロイ可能

---

## 技術スタック

- **フロントエンド**: Next.js 13 (App Router), React, TypeScript
- **スタイル**: Tailwind CSS
- **バックエンド / 認証**: Supabase (PostgreSQL)
- **デプロイ**: Vercel
- **その他**: ESLint, Prettier, GitHub Actions（任意）

---

## セットアップ手順

1. リポジトリをクローン

```bash
git clone https://github.com/<your-username>/<project-name>.git
cd <project-name>
```

2. パッケージのインストール

```bash
npm install
# または
yarn install
```

3. 環境変数の設定（.env.local を作成）

```bash
cp .env.example .env.local
```

4. 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

5. ブラウザで http://localhost:3000 にアクセスして動作確認。

環境変数の設定方法

以下の環境変数を .env.local に設定してください：

```bash
NEXT_PUBLIC_SUPABASE_URL=<あなたのSupabaseプロジェクトURL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<あなたのSupabase匿名キー>

NEXT_PUBLIC_SUPABASE_URL: Supabase プロジェクトのURL

NEXT_PUBLIC_SUPABASE_ANON_KEY: 公開用匿名キー（クライアントでの認証に使用）

```

注意: .env.local は絶対に Git にコミットしないこと。

デプロイ

Vercel に接続すると、自動的にビルドされデプロイされます。
Vercel 上でも上記の環境変数を設定してください。

ライセンス

MIT License
