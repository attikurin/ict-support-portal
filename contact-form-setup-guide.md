# お問い合わせフォーム設定ガイド

## 📋 概要

`contact.html` は、Formspreeという無料サービスを利用した静的サイト向けのお問い合わせフォームです。

## 🚀 セットアップ手順

### Step 1: Formspreeアカウント作成

1. **Formspreeにアクセス**
   - URL: https://formspree.io/
   - 「Get Started」ボタンをクリック

2. **アカウント登録**
   - メールアドレスとパスワードを入力
   - または、GitHubアカウントでログイン

3. **メール認証**
   - 登録したメールアドレスに確認メールが届く
   - メール内のリンクをクリックして認証完了

### Step 2: フォーム作成

1. **ダッシュボードにログイン**
   - https://formspree.io/forms にアクセス

2. **新規フォーム作成**
   - 「+ New Form」ボタンをクリック
   - フォーム名を入力（例: ICT支援員ポータルお問い合わせ）
   - 「Create」をクリック

3. **フォームIDを取得**
   - 作成完了後、フォームの詳細ページが表示される
   - `https://formspree.io/f/YOUR_FORM_ID` のような形式のURLが表示される
   - **YOUR_FORM_ID** の部分をコピー（例: xpzglvwq）

### Step 3: contact.html の編集

`contact.html` の以下の部分を編集します：

**変更前:**
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**変更後:**
```html
<form id="contactForm" action="https://formspree.io/f/xpzglvwq" method="POST">
```

※ `xpzglvwq` の部分を実際のフォームIDに置き換えてください。

### Step 4: 動作確認

1. **ローカルまたは本番環境でテスト**
   - `contact.html` をブラウザで開く
   - フォームに情報を入力して送信

2. **初回送信時の確認**
   - 初回送信時、Formspreeの確認ページにリダイレクトされる
   - 「Confirm your email」ボタンをクリック
   - 登録メールアドレスに確認メールが届く
   - メール内のリンクをクリックして確認完了

3. **2回目以降**
   - 確認完了後は、フォーム送信がスムーズに動作
   - 送信されたデータはFormspreeのダッシュボードで確認可能

---

## ⚙️ Formspree設定のカスタマイズ

### 受信メールアドレスの変更

1. Formspreeダッシュボードにログイン
2. 該当フォームを選択
3. 「Settings」タブをクリック
4. 「Email Notifications」セクションで受信先メールアドレスを変更
5. 「Save」をクリック

### 自動返信メールの設定

1. 「Settings」タブ → 「Autoresponder」
2. 「Enable autoresponder」をON
3. 件名と本文を入力
4. 「Save」をクリック

**推奨設定例:**

```
件名: お問い合わせを受け付けました - ICT支援員総合ポータルサイト

本文:
この度はICT支援員総合ポータルサイトにお問い合わせいただき、誠にありがとうございます。

お問い合わせ内容を確認させていただき、3営業日以内にご返信いたします。
今しばらくお待ちくださいませ。

なお、このメールは自動送信されています。
このメールに返信されても対応できかねますのでご了承ください。

━━━━━━━━━━━━━━━━━━━━
ICT支援員総合ポータルサイト
URL: https://your-site-url.com
━━━━━━━━━━━━━━━━━━━━
```

### スパム対策の設定

1. 「Settings」タブ → 「Spam Filtering」
2. 以下を有効化:
   - ✅ reCAPTCHA (推奨)
   - ✅ Honeypot
   - ✅ Block common spam phrases

### 送信後のリダイレクト設定

フォーム送信後、サンクスページにリダイレクトしたい場合:

1. `contact.html` のフォームに `data-redirect` 属性を追加:

```html
<form id="contactForm" 
      action="https://formspree.io/f/YOUR_FORM_ID" 
      method="POST"
      data-redirect="thanks.html">
```

2. `thanks.html` を作成（別途サンクスページを作成する場合）

---

## 📊 Formspree無料プランの制限

| 項目 | 無料プラン | 有料プラン |
|------|-----------|----------|
| **月間送信数** | 50通まで | 無制限 |
| **フォーム数** | 無制限 | 無制限 |
| **ファイル添付** | ❌ 不可 | ✅ 可能 |
| **カスタムドメイン** | ❌ 不可 | ✅ 可能 |
| **優先サポート** | ❌ なし | ✅ あり |
| **広告表示** | なし | なし |

**月間50通を超える場合:**
- 有料プラン（$10/月〜）へのアップグレードを検討
- または、他のフォームサービス（Google Forms等）への移行

---

## 🔄 代替サービス

Formspree以外のサービスも検討できます：

### 1. Google Forms（完全無料）

**メリット:**
- 完全無料、送信数無制限
- スプレッドシートで自動管理
- 日本語完全対応

**デメリット:**
- デザインのカスタマイズが難しい
- iframe埋め込みになる

**設定方法:**
1. Google Formsでフォームを作成
2. 「送信」→「埋め込みコード」を取得
3. `contact.html` に埋め込み

### 2. Netlify Forms（Netlifyでホスティング時）

**メリット:**
- 無料プラン: 月100通まで
- Netlifyでのホスティングと完全統合
- スパムフィルター標準装備

**デメリット:**
- Netlifyでホスティングしている場合のみ利用可能

**設定方法:**
1. フォームに `netlify` 属性を追加:
```html
<form name="contact" method="POST" netlify>
```

### 3. EmailJS（JavaScript API）

**メリット:**
- 月200通まで無料
- JavaScriptで完全制御
- テンプレート機能

**デメリット:**
- セットアップがやや複雑

---

## 🎨 フォームのカスタマイズ

### 項目の追加

新しい入力項目を追加したい場合:

```html
<!-- 電話番号フィールドの追加例 -->
<div class="form-group">
    <label for="phone">電話番号（任意）</label>
    <input type="tel" id="phone" name="phone" placeholder="090-1234-5678">
    <p class="form-help">折り返しお電話でのご連絡を希望される場合はご入力ください</p>
</div>
```

### 選択肢の変更

お問い合わせ種類の選択肢を変更したい場合は、`<select>` 内の `<option>` を編集:

```html
<select id="category" name="category" required>
    <option value="">選択してください</option>
    <option value="new-category">新しいカテゴリ</option>
    <!-- 他の選択肢... -->
</select>
```

---

## 🔒 セキュリティ対策

### 1. Honeypot（ボット対策）

Formspreeは自動的にHoneypot対策を実装していますが、追加で以下を実装可能:

```html
<!-- 人間には見えないフィールド（ボットが入力してしまう） -->
<input type="text" name="_gotcha" style="display:none">
```

### 2. reCAPTCHA

Formspreeの設定画面でreCAPTCHAを有効化すると、ボット対策が強化されます。

### 3. CSRFトークン

静的サイトではCSRF対策は不要ですが、動的サイトに移行する場合は検討してください。

---

## 📧 メール通知のカスタマイズ

### 件名のカスタマイズ

お問い合わせの種類によって件名を変更したい場合:

```html
<input type="hidden" name="_subject" value="【お問い合わせ】サイトコンテンツに関する質問">
```

JavaScriptで動的に変更:

```javascript
const categorySelect = document.getElementById('category');
categorySelect.addEventListener('change', () => {
    const subjectInput = document.querySelector('input[name="_subject"]');
    if (subjectInput) {
        subjectInput.value = `【お問い合わせ】${categorySelect.options[categorySelect.selectedIndex].text}`;
    }
});
```

---

## 🐛 トラブルシューティング

### Q1. フォームが送信されない

**確認事項:**
- [ ] フォームIDが正しく設定されているか
- [ ] インターネット接続は正常か
- [ ] ブラウザのコンソールにエラーが表示されていないか
- [ ] 必須項目がすべて入力されているか

### Q2. 送信後にエラーメッセージが表示される

**原因:**
- Formspreeの月間送信上限（50通）に達した
- Formspreeのサーバーが一時的にダウン

**対処法:**
- Formspreeのダッシュボードで送信数を確認
- しばらく時間をおいて再試行

### Q3. メールが届かない

**確認事項:**
- [ ] 迷惑メールフォルダを確認
- [ ] Formspreeの受信メールアドレスが正しいか
- [ ] Formspreeのダッシュボードで送信履歴を確認

---

## 📊 送信データの管理

### Formspreeダッシュボードでの確認

1. https://formspree.io/forms にアクセス
2. 該当フォームをクリック
3. 「Submissions」タブで送信データを確認
4. CSVエクスポート可能

### Googleスプレッドシートとの連携

Zapier（無料プラン）を使用すると、Formspreeの送信データをGoogleスプレッドシートに自動転送できます。

1. Zapierアカウント作成
2. 「Formspree → Google Sheets」のZapを作成
3. Formspreeフォームを選択
4. スプレッドシートを選択
5. フィールドマッピング設定

---

## 🎯 運用開始後のチェックリスト

- [ ] Formspreeアカウント作成完了
- [ ] フォームID取得・設定完了
- [ ] テスト送信成功
- [ ] 受信メールアドレス確認
- [ ] 自動返信メール設定（推奨）
- [ ] スパムフィルター有効化
- [ ] プライバシーポリシーにお問い合わせフォームの記載追加
- [ ] フッター等にお問い合わせページへのリンク追加

---

## 💡 今後の改善案

### フェーズ1（即座に実装可能）
- ✅ 基本的なお問い合わせフォーム
- ✅ FAQ セクション

### フェーズ2（リソース追加時）
- ファイル添付機能（Formspree有料プラン）
- より詳細なカテゴリ分類
- お問い合わせ履歴の自動管理

### フェーズ3（将来的）
- AIチャットボット導入
- リアルタイムチャット
- 多言語対応

---

## 📞 サポート

**Formspree公式サポート:**
- ドキュメント: https://help.formspree.io/
- サポートメール: support@formspree.io

**当サイトの実装に関する質問:**
- 実装ガイド: 本ドキュメント参照
- カスタマイズ相談: 適宜対応

---

**最終更新: 2025年12月20日**
