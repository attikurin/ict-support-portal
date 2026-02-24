// proactive-support.js - 能動的支援ページのインタラクティブ機能

// タブ切り替え機能
function switchTab(tabName) {
    // すべてのタブコンテンツを非表示
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // すべてのタブボタンを非アクティブ
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // 選択されたタブを表示
    document.getElementById(tabName).classList.add('active');
    
    // 選択されたタブボタンをアクティブ
    event.target.classList.add('active');
    
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// チェックリスト機能
function updateChecklistScore() {
    // レベル1のチェック数を計算
    let level1Count = 0;
    for (let i = 1; i <= 10; i++) {
        const checkbox = document.getElementById(`check1-${i}`);
        if (checkbox && checkbox.checked) {
            level1Count++;
        }
    }

    // レベル2のチェック数を計算
    let level2Count = 0;
    for (let i = 1; i <= 10; i++) {
        const checkbox = document.getElementById(`check2-${i}`);
        if (checkbox && checkbox.checked) {
            level2Count++;
        }
    }

    // レベル3のチェック数を計算
    let level3Count = 0;
    for (let i = 1; i <= 10; i++) {
        const checkbox = document.getElementById(`check3-${i}`);
        if (checkbox && checkbox.checked) {
            level3Count++;
        }
    }

    const totalCount = level1Count + level2Count + level3Count;

    // 結果を表示
    const resultDiv = document.getElementById('checklistResult');
    const scoreDiv = document.getElementById('totalScore');
    const feedbackDiv = document.getElementById('checklistFeedback');

    resultDiv.style.display = 'block';
    scoreDiv.textContent = `${totalCount} / 30`;

    // フィードバックメッセージ
    let feedback = '';
    let level1Status = level1Count >= 7 ? '✅ 合格' : '❌ 未達成';
    let level2Status = level2Count >= 7 ? '✅ 合格' : '❌ 未達成';
    let level3Status = level3Count >= 7 ? '✅ 合格' : '❌ 未達成';

    feedback += `<p><strong>レベル1（基礎）:</strong> ${level1Count}/10項目 ${level1Status}</p>`;
    feedback += `<p><strong>レベル2（発展）:</strong> ${level2Count}/10項目 ${level2Status}</p>`;
    feedback += `<p><strong>レベル3（応用）:</strong> ${level3Count}/10項目 ${level3Status}</p>`;
    feedback += '<hr style="margin: 20px 0;">';

    // 総合評価
    if (totalCount >= 25) {
        feedback += '<p><strong>🌟 素晴らしい！</strong></p>';
        feedback += '<p>あなたは高度な能動的支援を実践できています。このレベルを維持しつつ、さらに他の支援員への指導や、学校全体のICT環境改善に取り組みましょう。</p>';
    } else if (totalCount >= 20) {
        feedback += '<p><strong>👍 とても良い！</strong></p>';
        feedback += '<p>能動的支援の基本をしっかり押さえています。次のステップとして、より高度な提案や学校全体を見渡した改善に挑戦してみましょう。</p>';
    } else if (totalCount >= 15) {
        feedback += '<p><strong>📈 順調です！</strong></p>';
        feedback += '<p>能動的支援の基礎が身についてきています。まずは毎日の小さな行動を継続し、先生方との信頼関係を深めていきましょう。</p>';
    } else if (totalCount >= 10) {
        feedback += '<p><strong>🌱 成長中！</strong></p>';
        feedback += '<p>能動的支援への第一歩を踏み出しています。焦らず、できることから少しずつ実践していきましょう。挨拶や声かけなど、小さなことから始めてください。</p>';
    } else {
        feedback += '<p><strong>💡 これから始めましょう！</strong></p>';
        feedback += '<p>能動的支援はこれからです。まずは「毎日の挨拶」「週案の確認」「何かお手伝いできることはありませんか？の声かけ」から始めてみましょう。</p>';
    }

    // レベル別アドバイス
    if (level1Count < 7) {
        feedback += '<p><strong>⭐ レベル1（基礎）を優先しましょう：</strong><br>';
        feedback += '挨拶、声かけ、観察、記録など、基本的な行動を習慣化することが第一歩です。</p>';
    } else if (level2Count < 7 && level1Count >= 7) {
        feedback += '<p><strong>⭐ レベル2（発展）に挑戦しましょう：</strong><br>';
        feedback += '予測、事前準備、情報提供など、一歩進んだ支援に取り組んでみましょう。</p>';
    } else if (level3Count < 7 && level2Count >= 7) {
        feedback += '<p><strong>⭐ レベル3（応用）を目指しましょう：</strong><br>';
        feedback += '授業デザイン支援、データ分析、中長期計画など、より戦略的な支援にチャレンジしてください。</p>';
    }

    feedbackDiv.innerHTML = feedback;

    // ローカルストレージに保存
    const checklistData = {
        level1: level1Count,
        level2: level2Count,
        level3: level3Count,
        total: totalCount,
        date: new Date().toISOString()
    };
    localStorage.setItem('proactiveChecklistResult', JSON.stringify(checklistData));
}

// チェックリスト結果を印刷
function printChecklist() {
    window.print();
}

// 自己評価機能
function calculateEvaluation() {
    const form = document.getElementById('evaluationForm');
    let totalScore = 0;
    let answeredCount = 0;
    const categoryScores = {
        mindset: 0,
        information: 0,
        action: 0,
        communication: 0,
        outcome: 0
    };

    // 各質問の回答を取得
    for (let i = 1; i <= 15; i++) {
        const radios = form.querySelectorAll(`input[name="q${i}"]:checked`);
        if (radios.length > 0) {
            const score = parseInt(radios[0].value);
            totalScore += score;
            answeredCount++;

            // カテゴリー別スコア
            if (i <= 3) {
                categoryScores.mindset += score;
            } else if (i <= 6) {
                categoryScores.information += score;
            } else if (i <= 9) {
                categoryScores.action += score;
            } else if (i <= 12) {
                categoryScores.communication += score;
            } else {
                categoryScores.outcome += score;
            }
        }
    }

    // すべての質問に答えているか確認
    if (answeredCount < 15) {
        alert('すべての質問に回答してください。');
        return;
    }

    // 最大スコアの計算（質問によって最大値が異なる）
    const maxScore = 3 + 3 + 3 + 4 + 3 + 3 + 4 + 3 + 4 + 3 + 3 + 3 + 3 + 3 + 3; // = 48
    const percentage = Math.round((totalScore / maxScore) * 100);

    // 結果を表示
    const resultDiv = document.getElementById('evaluationResult');
    const scoreDiv = document.getElementById('evaluationScore');
    const feedbackDiv = document.getElementById('evaluationFeedback');

    resultDiv.classList.add('show');
    scoreDiv.textContent = `総合スコア: ${totalScore}/${maxScore}点（${percentage}%）`;

    // フィードバックメッセージ
    let feedback = '';

    // カテゴリー別結果
    feedback += '<h4>カテゴリー別評価</h4>';
    feedback += `<p><strong>A. マインドセット:</strong> ${categoryScores.mindset}/9点 ${getBarGraph(categoryScores.mindset, 9)}</p>`;
    feedback += `<p><strong>B. 情報収集:</strong> ${categoryScores.information}/10点 ${getBarGraph(categoryScores.information, 10)}</p>`;
    feedback += `<p><strong>C. 実践行動:</strong> ${categoryScores.action}/11点 ${getBarGraph(categoryScores.action, 11)}</p>`;
    feedback += `<p><strong>D. コミュニケーション:</strong> ${categoryScores.communication}/9点 ${getBarGraph(categoryScores.communication, 9)}</p>`;
    feedback += `<p><strong>E. 成果の実感:</strong> ${categoryScores.outcome}/9点 ${getBarGraph(categoryScores.outcome, 9)}</p>`;
    feedback += '<hr style="margin: 20px 0;">';

    // 総合評価とアドバイス
    if (percentage >= 80) {
        feedback += '<h4>🌟 優秀！（上級レベル）</h4>';
        feedback += '<p>能動的支援を高いレベルで実践できています。このレベルを維持しつつ、さらに以下のことに取り組みましょう：</p>';
        feedback += '<ul>';
        feedback += '<li>他の支援員へのメンター・指導</li>';
        feedback += '<li>学校全体のICT推進計画への貢献</li>';
        feedback += '<li>地域や他校との連携・情報発信</li>';
        feedback += '<li>研修講師としての活動</li>';
        feedback += '</ul>';
    } else if (percentage >= 60) {
        feedback += '<h4>👍 良好！（中級レベル）</h4>';
        feedback += '<p>能動的支援の基本をしっかり実践できています。次のステップとして：</p>';
        feedback += '<ul>';
        feedback += '<li>予測力をさらに磨く（パターン認識）</li>';
        feedback += '<li>提案の質を高める（具体性・実現可能性）</li>';
        feedback += '<li>データに基づいた改善提案</li>';
        feedback += '<li>授業デザインへの深い関与</li>';
        feedback += '</ul>';
    } else if (percentage >= 40) {
        feedback += '<h4>📈 成長中！（初級〜中級レベル）</h4>';
        feedback += '<p>能動的支援の基礎が身についてきています。以下の点を意識して継続しましょう：</p>';
        feedback += '<ul>';
        feedback += '<li>毎日の情報収集（週案確認、巡回）</li>';
        feedback += '<li>小さな声かけの積み重ね</li>';
        feedback += '<li>先生方との信頼関係構築</li>';
        feedback += '<li>簡単な提案から始める</li>';
        feedback += '</ul>';
    } else {
        feedback += '<h4>🌱 これから！（入門レベル）</h4>';
        feedback += '<p>能動的支援はこれからです。まずは以下の基本から始めましょう：</p>';
        feedback += '<ul>';
        feedback += '<li>毎日の挨拶と笑顔</li>';
        feedback += '<li>「何かお手伝いできることはありませんか？」の声かけ</li>';
        feedback += '<li>週案や時間割の確認</li>';
        feedback += '<li>困っている先生がいないか観察</li>';
        feedback += '</ul>';
    }

    // カテゴリー別アドバイス
    feedback += '<hr style="margin: 20px 0;">';
    feedback += '<h4>改善のポイント</h4>';

    const weakPoints = [];
    if (categoryScores.mindset < 6) weakPoints.push('マインドセット');
    if (categoryScores.information < 7) weakPoints.push('情報収集');
    if (categoryScores.action < 7) weakPoints.push('実践行動');
    if (categoryScores.communication < 6) weakPoints.push('コミュニケーション');
    if (categoryScores.outcome < 6) weakPoints.push('成果の実感');

    if (weakPoints.length > 0) {
        feedback += `<p>特に <strong>${weakPoints.join('、')}</strong> の強化をおすすめします。</p>`;
        
        if (weakPoints.includes('マインドセット')) {
            feedback += '<p><strong>マインドセット改善のヒント：</strong> 「依頼待ち」ではなく「先読み」の姿勢を意識しましょう。「今日は暇だな」ではなく「今日は何ができるかな？」と考えてみてください。</p>';
        }
        if (weakPoints.includes('情報収集')) {
            feedback += '<p><strong>情報収集改善のヒント：</strong> 週案や時間割の確認を習慣化しましょう。先生方との雑談も大切な情報源です。</p>';
        }
        if (weakPoints.includes('実践行動')) {
            feedback += '<p><strong>実践行動改善のヒント：</strong> 授業前の巡回、機器の点検など、小さな行動から始めましょう。予防は最良の支援です。</p>';
        }
        if (weakPoints.includes('コミュニケーション')) {
            feedback += '<p><strong>コミュニケーション改善のヒント：</strong> タイミングと相手の状況を考えた声かけを心がけましょう。「押し付け」ではなく「提案」の姿勢で。</p>';
        }
        if (weakPoints.includes('成果の実感')) {
            feedback += '<p><strong>成果の実感を高めるヒント：</strong> 小さな成功を記録し、振り返りましょう。先生方からのフィードバックを積極的に求めることも大切です。</p>';
        }
    } else {
        feedback += '<p>すべてのカテゴリーでバランス良く実践できています！この調子で継続しましょう。</p>';
    }

    feedbackDiv.innerHTML = feedback;

    // ローカルストレージに保存
    const evaluationData = {
        totalScore: totalScore,
        maxScore: maxScore,
        percentage: percentage,
        categoryScores: categoryScores,
        date: new Date().toISOString()
    };
    localStorage.setItem('proactiveEvaluationResult', JSON.stringify(evaluationData));

    // 結果までスクロール
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// バーグラフ生成
function getBarGraph(score, max) {
    const percentage = Math.round((score / max) * 100);
    const filled = Math.round(percentage / 10);
    const empty = 10 - filled;
    return '█'.repeat(filled) + '░'.repeat(empty) + ` ${percentage}%`;
}

// 評価結果を印刷
function printEvaluation() {
    window.print();
}

// 行動計画の保存
function saveActionPlan() {
    const actionPlan = {
        goal1: document.getElementById('goal1').value,
        goal2: document.getElementById('goal2').value,
        goal3: document.getElementById('goal3').value,
        dailyActions: document.getElementById('dailyActions').value,
        weeklyActions: document.getElementById('weeklyActions').value,
        monthlyActions: document.getElementById('monthlyActions').value,
        outcome1month: document.getElementById('outcome1month').value,
        outcome3months: document.getElementById('outcome3months').value,
        outcome6months: document.getElementById('outcome6months').value,
        savedDate: new Date().toISOString()
    };

    localStorage.setItem('proactiveActionPlan', JSON.stringify(actionPlan));
    alert('行動計画を保存しました！');
}

// 行動計画の読み込み
function loadActionPlan() {
    const saved = localStorage.getItem('proactiveActionPlan');
    if (saved) {
        const actionPlan = JSON.parse(saved);
        document.getElementById('goal1').value = actionPlan.goal1 || '';
        document.getElementById('goal2').value = actionPlan.goal2 || '';
        document.getElementById('goal3').value = actionPlan.goal3 || '';
        document.getElementById('dailyActions').value = actionPlan.dailyActions || '';
        document.getElementById('weeklyActions').value = actionPlan.weeklyActions || '';
        document.getElementById('monthlyActions').value = actionPlan.monthlyActions || '';
        document.getElementById('outcome1month').value = actionPlan.outcome1month || '';
        document.getElementById('outcome3months').value = actionPlan.outcome3months || '';
        document.getElementById('outcome6months').value = actionPlan.outcome6months || '';
        
        const savedDate = new Date(actionPlan.savedDate);
        alert(`保存日: ${savedDate.toLocaleDateString('ja-JP')}\n行動計画を読み込みました！`);
    } else {
        alert('保存された行動計画がありません。');
    }
}

// 行動計画の印刷
function printActionPlan() {
    window.print();
}

// 行動計画のクリア
function clearActionPlan() {
    if (confirm('行動計画をクリアしてもよろしいですか？')) {
        document.getElementById('goal1').value = '';
        document.getElementById('goal2').value = '';
        document.getElementById('goal3').value = '';
        document.getElementById('dailyActions').value = '';
        document.getElementById('weeklyActions').value = '';
        document.getElementById('monthlyActions').value = '';
        document.getElementById('outcome1month').value = '';
        document.getElementById('outcome3months').value = '';
        document.getElementById('outcome6months').value = '';
        alert('行動計画をクリアしました。');
    }
}

// 週間計画の保存
function saveWeeklyPlan() {
    const weeklyPlan = {
        weekGoal: document.getElementById('weekGoal').value,
        mon: {
            morning: document.getElementById('mon-morning').value,
            day: document.getElementById('mon-day').value,
            evening: document.getElementById('mon-evening').value
        },
        tue: {
            morning: document.getElementById('tue-morning').value,
            day: document.getElementById('tue-day').value,
            evening: document.getElementById('tue-evening').value
        },
        wed: {
            morning: document.getElementById('wed-morning').value,
            day: document.getElementById('wed-day').value,
            evening: document.getElementById('wed-evening').value
        },
        thu: {
            morning: document.getElementById('thu-morning').value,
            day: document.getElementById('thu-day').value,
            evening: document.getElementById('thu-evening').value
        },
        fri: {
            morning: document.getElementById('fri-morning').value,
            day: document.getElementById('fri-day').value,
            evening: document.getElementById('fri-evening').value
        },
        savedDate: new Date().toISOString()
    };

    localStorage.setItem('proactiveWeeklyPlan', JSON.stringify(weeklyPlan));
    alert('週間計画を保存しました！');
}

// 週間計画の読み込み
function loadWeeklyPlan() {
    const saved = localStorage.getItem('proactiveWeeklyPlan');
    if (saved) {
        const plan = JSON.parse(saved);
        document.getElementById('weekGoal').value = plan.weekGoal || '';
        
        const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
        days.forEach(day => {
            if (plan[day]) {
                document.getElementById(`${day}-morning`).value = plan[day].morning || '';
                document.getElementById(`${day}-day`).value = plan[day].day || '';
                document.getElementById(`${day}-evening`).value = plan[day].evening || '';
            }
        });
        
        const savedDate = new Date(plan.savedDate);
        alert(`保存日: ${savedDate.toLocaleDateString('ja-JP')}\n週間計画を読み込みました！`);
    } else {
        alert('保存された週間計画がありません。');
    }
}

// 週間計画の印刷
function printWeeklyPlan() {
    window.print();
}

// 週間計画のクリア
function clearWeeklyPlan() {
    if (confirm('週間計画をクリアしてもよろしいですか？')) {
        document.getElementById('weekGoal').value = '';
        
        const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
        days.forEach(day => {
            document.getElementById(`${day}-morning`).value = '';
            document.getElementById(`${day}-day`).value = '';
            document.getElementById(`${day}-evening`).value = '';
        });
        
        alert('週間計画をクリアしました。');
    }
}

// 振り返りの保存
function saveReflection() {
    const reflection = {
        todaySupport: document.getElementById('todaySupport').value,
        whatWorked: document.getElementById('whatWorked').value,
        whatImprove: document.getElementById('whatImprove').value,
        tomorrowAction: document.getElementById('tomorrowAction').value,
        savedDate: new Date().toISOString()
    };

    localStorage.setItem('proactiveReflection', JSON.stringify(reflection));
    alert('振り返りを保存しました！');
}

// 振り返りの読み込み
function loadReflection() {
    const saved = localStorage.getItem('proactiveReflection');
    if (saved) {
        const reflection = JSON.parse(saved);
        document.getElementById('todaySupport').value = reflection.todaySupport || '';
        document.getElementById('whatWorked').value = reflection.whatWorked || '';
        document.getElementById('whatImprove').value = reflection.whatImprove || '';
        document.getElementById('tomorrowAction').value = reflection.tomorrowAction || '';
        
        const savedDate = new Date(reflection.savedDate);
        alert(`保存日: ${savedDate.toLocaleDateString('ja-JP')}\n振り返りを読み込みました！`);
    } else {
        alert('保存された振り返りがありません。');
    }
}

// 振り返りの印刷
function printReflection() {
    window.print();
}

// 振り返りのクリア
function clearReflection() {
    if (confirm('振り返りをクリアしてもよろしいですか？')) {
        document.getElementById('todaySupport').value = '';
        document.getElementById('whatWorked').value = '';
        document.getElementById('whatImprove').value = '';
        document.getElementById('tomorrowAction').value = '';
        alert('振り返りをクリアしました。');
    }
}

// ページ読み込み時に保存データを自動読み込み
window.addEventListener('DOMContentLoaded', function() {
    // 行動計画の自動読み込み
    const savedActionPlan = localStorage.getItem('proactiveActionPlan');
    if (savedActionPlan) {
        loadActionPlan();
    }

    // チェックリスト結果の復元
    const savedChecklist = localStorage.getItem('proactiveChecklistResult');
    if (savedChecklist) {
        const data = JSON.parse(savedChecklist);
        // 前回のチェック状態を復元する場合はここに実装
    }
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
