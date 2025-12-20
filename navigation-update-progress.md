# ナビゲーションメニュー更新進捗

## 実施日時
2025年12月20日

## 目的
フェーズ1で追加した3ページ（device-management.html, wifi-troubleshooting.html, account-management.html）へのリンクを、全ページのナビゲーションメニューに追加する。

---

## ✅ 更新完了ページ（15ページ）

### 基本ページ
1. ✅ index.html
2. ✅ basics.html

### 基礎・入門カテゴリ（8ページ）
3. ✅ guidelines.html
4. ✅ lesson-proposal.html
5. ✅ skills.html
6. ✅ psychology.html
7. ✅ lesson-design.html
8. ✅ education-basics.html
9. ✅ glossary.html
10. ✅ daily-work.html
11. ✅ planner.html
12. ✅ business-manners.html

### GIGA・最新動向カテゴリ（2ページ）
13. ✅ giga-update.html
14. ✅ ai-education.html

### フェーズ1ページ（自身）
15. ✅ device-management.html
16. ✅ wifi-troubleshooting.html
17. ✅ account-management.html

**合計: 17ページ更新完了**

---

## ⏳ 更新が必要な残りページ（28ページ）

### GIGA・最新動向カテゴリ（4ページ）
- ai-apps-education.html
- case-studies.html
- special-needs-ict.html
- communication-skills.html

### 機器・ツールカテゴリ（5ページ）
- tools.html
- troubleshooting.html
- network-basics.html
- security.html
- edtech-comparison.html
- edtech-tools.html（※6ページ）

### 運用・管理カテゴリ（13ページ）
- school-dx.html
- training.html
- data-analytics.html
- project-management.html
- budget-procurement.html
- online-learning.html
- time-task-management.html
- crisis-management.html
- parent-communication.html
- school-events-ict.html
- career-path.html
- self-learning.html
- business-improvement.html
- mental-health.html（※14ページ）

### データ・資料カテゴリ（3ページ）
- statistics.html
- certifications.html
- board-education.html

### リソースカテゴリ（3ページ）
- resources-links.html
- downloads.html
- rubric.html

---

## 📝 更新内容（標準パターン）

### 更新前
```html
<li class="has-dropdown">
    <a href="#"><i class="fas fa-laptop"></i> 機器・ツール</a>
    <ul class="dropdown-menu">
        <li><a href="tools.html"><i class="fas fa-laptop"></i> ICT機器一覧</a></li>
        <li><a href="troubleshooting.html"><i class="fas fa-wrench"></i> トラブルシューティング</a></li>
    </ul>
</li>
```

### 更新後
```html
<li class="has-dropdown">
    <a href="#"><i class="fas fa-laptop"></i> 機器・ツール</a>
    <ul class="dropdown-menu">
        <li><a href="tools.html"><i class="fas fa-laptop"></i> ICT機器一覧</a></li>
        <li><a href="device-management.html"><i class="fas fa-tablet-alt"></i> 端末管理・MDM</a></li>
        <li><a href="wifi-troubleshooting.html"><i class="fas fa-wifi"></i> Wi-Fiトラブル対応</a></li>
        <li><a href="account-management.html"><i class="fas fa-user-shield"></i> アカウント管理</a></li>
        <li><a href="troubleshooting.html"><i class="fas fa-wrench"></i> トラブルシューティング</a></li>
        <li><a href="network-basics.html"><i class="fas fa-network-wired"></i> ネットワーク基礎</a></li>
        <li><a href="security.html"><i class="fas fa-shield-alt"></i> 情報セキュリティ</a></li>
    </ul>
</li>
```

### 追加する3行
```html
<li><a href="device-management.html"><i class="fas fa-tablet-alt"></i> 端末管理・MDM</a></li>
<li><a href="wifi-troubleshooting.html"><i class="fas fa-wifi"></i> Wi-Fiトラブル対応</a></li>
<li><a href="account-management.html"><i class="fas fa-user-shield"></i> アカウント管理</a></li>
```

---

## 📊 進捗状況

| カテゴリ | 更新済み | 残り | 完了率 |
|---------|---------|------|--------|
| 基本ページ | 2/2 | 0 | 100% |
| 基礎・入門 | 8/8 | 0 | 100% |
| GIGA・最新動向 | 2/6 | 4 | 33% |
| 機器・ツール | 0/6 | 6 | 0% |
| 運用・管理 | 0/14 | 14 | 0% |
| データ・資料 | 0/3 | 3 | 0% |
| リソース | 0/3 | 3 | 0% |
| フェーズ1（自身） | 3/3 | 0 | 100% |
| **合計** | **17/45** | **28** | **38%** |

---

## 🎯 実装ガイドライン（残りページ用）

### ステップ1: ファイルを開く
```bash
# 例: ai-apps-education.html
```

### ステップ2: 「機器・ツール」セクションを検索
検索キーワード: `<a href="#"><i class="fas fa-laptop"></i> 機器・ツール</a>`

### ステップ3: `<li><a href="tools.html">` の後に3行を挿入
```html
<li><a href="tools.html"><i class="fas fa-laptop"></i> ICT機器一覧</a></li>
<!-- ↓ ここに以下3行を挿入 ↓ -->
<li><a href="device-management.html"><i class="fas fa-tablet-alt"></i> 端末管理・MDM</a></li>
<li><a href="wifi-troubleshooting.html"><i class="fas fa-wifi"></i> Wi-Fiトラブル対応</a></li>
<li><a href="account-management.html"><i class="fas fa-user-shield"></i> アカウント管理</a></li>
<!-- ↑ ここまで ↑ -->
<li><a href="troubleshooting.html"><i class="fas fa-wrench"></i> トラブルシューティング</a></li>
```

### ステップ4: 既に`network-basics.html`と`security.html`がある場合
そのまま維持（例: business-manners.html のパターン）

### ステップ5: 保存して確認

---

## ⚠️ 特殊ケース

### 1. 既に拡張メニューを持つページ
- business-manners.html: ✅ 対応済み
- 他に同様のページがあれば、適切な位置に挿入

### 2. ナビゲーション構造が異なるページ
- downloads/ 配下のファイル: 更新不要（サブページ）
- slide.html, flyer.html: 更新不要（特殊ページ）

---

## 📈 期待される効果

### 更新前（現状）
- ユーザーは17ページからのみ新規3ページにアクセス可能
- アクセシビリティ: 38%

### 更新後（完了時）
- ユーザーは全45ページから新規3ページにアクセス可能
- アクセシビリティ: 100%
- ユーザビリティの大幅向上

---

## 🔄 次のアクション

1. **優先度: 高** - 機器・ツールカテゴリ（6ページ）を更新
   - 同カテゴリ内なので、最も重要
2. **優先度: 高** - 運用・管理カテゴリ（14ページ）を更新
   - ページ数が多いが、ユーザー利用頻度が高い
3. **優先度: 中** - GIGA・最新動向カテゴリ（4ページ）を更新
4. **優先度: 中** - データ・資料カテゴリ（3ページ）を更新
5. **優先度: 低** - リソースカテゴリ（3ページ）を更新

---

## ✅ 完了条件

- [ ] 全45ページのナビゲーションメニューに新規3ページへのリンクを追加
- [ ] 各ページのナビゲーションが正しく機能することを確認
- [ ] design-check-phase1.md に最終結果を記録
- [ ] README.md に完了報告を記録
