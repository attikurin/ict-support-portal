// トップへ戻るボタン
window.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    if (backToTopBtn) {
        // スクロール時の表示/非表示
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // クリック時のスムーズスクロール
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// アンカーリンクのスムーズスクロール
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // ハッシュのみの場合（#）は処理をスキップ
            if (href === '#') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 検索機能（ページ内コンテンツフィルタリング）
function initializeSearch(searchBoxId, targetSelector) {
    const searchBox = document.getElementById(searchBoxId);
    
    if (!searchBox) return;
    
    searchBox.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const targets = document.querySelectorAll(targetSelector);
        
        let visibleCount = 0;
        
        targets.forEach(target => {
            const text = target.textContent.toLowerCase();
            
            if (text.includes(searchTerm) || searchTerm === '') {
                target.style.display = '';
                visibleCount++;
            } else {
                target.style.display = 'none';
            }
        });
        
        // 検索結果が0件の場合のメッセージ表示（オプション）
        const noResultsMsg = document.getElementById('no-results-message');
        if (noResultsMsg) {
            if (visibleCount === 0 && searchTerm !== '') {
                noResultsMsg.style.display = 'block';
            } else {
                noResultsMsg.style.display = 'none';
            }
        }
    });
}

// アコーディオン機能
function initializeAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i.fa-chevron-down, i.fa-chevron-up');
            
            // トグル
            this.classList.toggle('active');
            
            if (content.style.display === 'block') {
                content.style.display = 'none';
                if (icon) icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            } else {
                content.style.display = 'block';
                if (icon) icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        });
    });
}

// タブ機能
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab');
            const tabGroup = this.closest('.tabs-container');
            
            if (!tabGroup) return;
            
            // すべてのタブボタンとコンテンツから active クラスを削除
            tabGroup.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            tabGroup.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // クリックされたボタンと対応するコンテンツに active クラスを追加
            this.classList.add('active');
            const targetContent = tabGroup.querySelector(`#${targetId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// 目次の自動生成
function generateTOC(contentSelector, tocContainerId) {
    const tocContainer = document.getElementById(tocContainerId);
    if (!tocContainer) return;
    
    const content = document.querySelector(contentSelector);
    if (!content) return;
    
    const headings = content.querySelectorAll('h2, h3');
    if (headings.length === 0) return;
    
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    
    headings.forEach((heading, index) => {
        // 見出しにIDを付与（存在しない場合）
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }
        
        const listItem = document.createElement('li');
        listItem.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-sub-item' : 'toc-item';
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
    
    tocContainer.appendChild(tocList);
}

// ローディング表示
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> 読み込み中...</div>';
}

function hideLoading(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const loading = container.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// モーダルウィンドウ
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// モーダルの外側をクリックで閉じる
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ローカルストレージ管理
const storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('ローカルストレージへの保存に失敗しました:', e);
            return false;
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('ローカルストレージからの読み込みに失敗しました:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('ローカルストレージからの削除に失敗しました:', e);
            return false;
        }
    }
};

// ページ初期化
document.addEventListener('DOMContentLoaded', function() {
    // アコーディオン初期化
    initializeAccordion();
    
    // タブ初期化
    initializeTabs();
    
    // ページビューのトラッキング（オプション）
    console.log('Page loaded:', document.title);
});

// エクスポート（他のスクリプトから利用可能にする）
window.ICTPortal = {
    initializeSearch,
    generateTOC,
    showLoading,
    hideLoading,
    openModal,
    closeModal,
    storage
};