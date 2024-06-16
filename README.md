# todolist-nextjs

個人的な勉強用の Todolist アプリ。

## メモ

次回やること：

- status を変更できるようにする
  - クリックしたら値を変更できるようにする

その次やること：

- autoincrement カラムを省略した create で Unique constraint failed on the fields エラーが出る件の対処
- route.ts で API 実装
  - delete
- API テストコード作成＆自動テスト
- エラーハンドリング
  - prisma 操作周りに try/catch 追加
  - クエリ実行完了後に disconnect する処理を追加
- モデルの追加・拡張・依存関係の設定
  - Task 拡張
    - createdAt, updatedAt 追加
  - User 追加
    - id
    - name

いつかやる備忘メモ：

- テストコード実装、自動テスト
- ワイヤーフレーム作成
- ユーザ認証
- 権限設計・実装
- description にメディア貼り付け機能追加
  - 画像
  - 動画
  - ファイル
- api を Next.js から切り離して別で実装
  - 責務ごとに更に分割しマイクロサービス化
- sentry との連携
- opentelemetry 設定
