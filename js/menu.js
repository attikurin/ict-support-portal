// メニューの開閉機能
document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューボタンを作成
    const nav = document.querySelector('.main-nav');
    const container = nav ? nav.querySelector('.container') : null;
    const navMenu = document.querySelector('.nav-menu');
    
    if (nav && navMenu && container) {
        // メニュートグルボタンを作成
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i><span>メニュー</span>';
        menuToggle.setAttribute('aria-label', 'メニューを開く');
        
        // ボタンをコンテナの最初に追加（メニューの前）
        container.insertBefore(menuToggle, navMenu);
        
        // 初期状態の設定
        if (window.innerWidth <= 768) {
            // モバイルではメニューを閉じてボタンを表示
            navMenu.classList.add('collapsed');
            menuToggle.style.display = 'flex';
        } else {
            // デスクトップではメニューを開いてボタンを非表示
            navMenu.classList.remove('collapsed');
            menuToggle.style.display = 'none';
        }
        
        // メニュートグル機能
        menuToggle.addEventListener('click', function() {
            const isCollapsed = navMenu.classList.toggle('collapsed');
            
            // アイコンとテキストを変更
            if (isCollapsed) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i><span>メニュー</span>';
                menuToggle.setAttribute('aria-label', 'メニューを開く');
            } else {
                menuToggle.innerHTML = '<i class="fas fa-times"></i><span>閉じる</span>';
                menuToggle.setAttribute('aria-label', 'メニューを閉じる');
            }
        });
        
        // ウィンドウリサイズ時の処理
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                // デスクトップサイズではメニューを常に表示
                navMenu.classList.remove('collapsed');
                menuToggle.style.display = 'none';
            } else {
                // モバイルサイズではトグルボタンを表示
                menuToggle.style.display = 'flex';
                // リサイズ時は閉じた状態に
                if (!navMenu.classList.contains('collapsed')) {
                    navMenu.classList.add('collapsed');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i><span>メニュー</span>';
                }
            }
        });
        
        // メニューアイテムクリック時にモバイルではメニューを閉じる
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.add('collapsed');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i><span>メニュー</span>';
                }
            });
        });
    }
    
    // ドロップダウンメニューの制御
    const dropdownItems = document.querySelectorAll('.nav-menu li.has-dropdown');
    let closeTimeout;
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown-menu');
        
        // モバイルでのクリックイベント
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                // 他の開いているドロップダウンを閉じる
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                    }
                });
                
                // 現在のドロップダウンをトグル
                item.classList.toggle('open');
            }
        });
        
        // デスクトップでのホバー制御（遅延付き）
        if (window.innerWidth > 768) {
            // マウスが親要素に入った時
            item.addEventListener('mouseenter', function() {
                clearTimeout(closeTimeout);
                
                // 他の全てのドロップダウンを閉じる
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('hover');
                    }
                });
                
                // 現在のドロップダウンを開く
                item.classList.add('hover');
            });
            
            // マウスが親要素から出た時（遅延付き）
            item.addEventListener('mouseleave', function() {
                closeTimeout = setTimeout(function() {
                    item.classList.remove('hover');
                }, 200); // 200ms の猶予時間
            });
            
            // ドロップダウンメニュー内にマウスがある場合も維持
            if (dropdown) {
                dropdown.addEventListener('mouseenter', function() {
                    clearTimeout(closeTimeout);
                    item.classList.add('hover');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    closeTimeout = setTimeout(function() {
                        item.classList.remove('hover');
                    }, 200);
                });
            }
        }
    });
    
    // リサイズ時にイベントリスナーを再設定
    window.addEventListener('resize', function() {
        dropdownItems.forEach(item => {
            item.classList.remove('hover', 'open');
        });
    });
});
