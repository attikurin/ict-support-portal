/**
 * ICT支援員総合ポータルサイト - 全サイト検索機能
 * 全ページを横断した検索を実現
 */

class SiteSearch {
    constructor() {
        this.sitemap = [];
        this.searchInput = null;
        this.searchResults = null;
        this.init();
    }

    async init() {
        // サイトマップデータを読み込み
        try {
            const response = await fetch('js/sitemap.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.sitemap = data.pages;
            console.log('サイトマップ読み込み成功:', this.sitemap.length, 'ページ');
        } catch (error) {
            console.error('サイトマップの読み込みに失敗:', error);
            this.sitemap = [];
        }

        // 検索ボックスの初期化
        this.searchInput = document.getElementById('siteSearch');
        this.searchResults = document.getElementById('searchResults');

        if (!this.searchInput) {
            console.warn('検索ボックスが見つかりません (id="siteSearch")');
            return;
        }
        
        if (!this.searchResults) {
            console.warn('検索結果表示エリアが見つかりません (id="searchResults")');
            return;
        }

        console.log('検索機能初期化完了');

        if (this.searchInput && this.searchResults) {
            // リアルタイム検索
            this.searchInput.addEventListener('input', (e) => {
                this.showSuggestions(e.target.value);
            });

            // 検索ボックスのフォーカス時
            this.searchInput.addEventListener('focus', (e) => {
                if (e.target.value.length >= 2) {
                    this.showSuggestions(e.target.value);
                }
            });

            // クリック外で結果を非表示
            document.addEventListener('click', (e) => {
                const searchBox = this.searchInput.parentElement;
                if (!searchBox.contains(e.target)) {
                    this.hideSuggestions();
                }
            });
        }
    }

    /**
     * 検索候補を表示（リアルタイム検索）
     */
    showSuggestions(query) {
        if (!this.searchResults) {
            return;
        }

        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }

        const results = this.search(query, 8); // 上位8件
        console.log(`検索: "${query}" → ${results.length}件ヒット`);
        
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="search-no-results">該当するページが見つかりません</div>';
            this.searchResults.style.display = 'block';
            return;
        }

        // 候補リストを作成
        this.searchResults.innerHTML = results.map(result => `
            <a href="${result.url}" class="search-result-item">
                <div class="result-title">${this.highlightText(result.title, query)}</div>
                <div class="result-description">${this.truncate(result.description, 80)}</div>
                <div class="result-category">${result.category}</div>
            </a>
        `).join('');

        this.searchResults.style.display = 'block';
    }

    /**
     * 候補リストを非表示
     */
    hideSuggestions() {
        if (this.searchResults) {
            this.searchResults.style.display = 'none';
            this.searchResults.innerHTML = '';
        }
    }

    /**
     * 検索を実行（内部使用）
     * @param {string} query - 検索クエリ
     * @param {number} limit - 結果の最大数（省略時は全件）
     * @returns {Array} - 検索結果の配列
     */
    search(query, limit = null) {
        const lowerQuery = query.toLowerCase();
        const results = [];

        for (const page of this.sitemap) {
            let score = 0;
            const titleLower = page.title.toLowerCase();
            const descLower = page.description.toLowerCase();
            const keywordsLower = page.keywords.map(k => k.toLowerCase());

            // タイトルに含まれる場合（最高スコア）
            if (titleLower.includes(lowerQuery)) {
                score += 10;
            }

            // 説明文に含まれる場合
            if (descLower.includes(lowerQuery)) {
                score += 5;
            }

            // キーワードに含まれる場合
            for (const keyword of keywordsLower) {
                if (keyword.includes(lowerQuery)) {
                    score += 3;
                }
            }

            // カテゴリに含まれる場合
            if (page.category.toLowerCase().includes(lowerQuery)) {
                score += 2;
            }

            if (score > 0) {
                results.push({
                    ...page,
                    score: score
                });
            }
        }

        // スコア順にソート
        results.sort((a, b) => b.score - a.score);

        return limit ? results.slice(0, limit) : results;
    }

    /**
     * テキストをハイライト
     */
    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    /**
     * テキストを切り詰め
     */
    truncate(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
}

// ページ読み込み時に初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.siteSearch = new SiteSearch();
    });
} else {
    window.siteSearch = new SiteSearch();
}
