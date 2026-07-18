const DEMO_MODAL_HTML = `
<div id="rv-demo-modal" class="rv-demo-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
    <div class="rv-demo-backdrop" onclick="closeDemoModal()"></div>
    <div class="rv-demo-container">
        <button class="rv-demo-close" onclick="closeDemoModal()" aria-label="Close Demo">
            <i data-lucide="x"></i>
        </button>
        <div class="rv-demo-header">
            <h2 id="demo-modal-title" style="margin-bottom:8px;">See ReplyVera in Action</h2>
            <p style="color:var(--text-secondary);font-size:0.95rem;max-width:500px;margin:0 auto 20px;">Watch a new Google review arrive, get analyzed, and move through ReplyVera's approval rules.</p>
            
            <div class="rv-demo-tabs" role="tablist">
                <button class="rv-demo-tab active" role="tab" aria-selected="true" onclick="switchScenario('positive')">Positive Review</button>
                <button class="rv-demo-tab" role="tab" aria-selected="false" onclick="switchScenario('negative')">Negative Review</button>
                <button class="rv-demo-tab" role="tab" aria-selected="false" onclick="switchScenario('sensitive')">Sensitive Review</button>
            </div>
        </div>
        
        <div class="rv-demo-body">
            <!-- Stage 1 -->
            <div class="rv-demo-stage" id="demo-stage-1">
                <div class="demo-stage-label">Stage 1: New Google Review</div>
                <div class="demo-review-card">
                    <div class="demo-review-stars" id="demo-val-stars"></div>
                    <div class="demo-review-quote" id="demo-val-quote"></div>
                </div>
                <div class="demo-notification"><i data-lucide="bell" style="width:14px;height:14px;"></i> New Google review received</div>
            </div>

            <!-- Stage 2 -->
            <div class="rv-demo-stage" id="demo-stage-2">
                <div class="demo-stage-label">Stage 2: Review Analysis</div>
                <div class="demo-analysis-grid">
                    <div class="demo-tag"><span class="demo-tag-label">Sentiment:</span> <span id="demo-val-sentiment"></span></div>
                    <div class="demo-tag"><span class="demo-tag-label">Rating:</span> <span id="demo-val-rating"></span></div>
                    <div class="demo-tag"><span class="demo-tag-label">Topic:</span> <span id="demo-val-topic"></span></div>
                    <div class="demo-tag" id="demo-tag-employee"><span class="demo-tag-label">Employee mention:</span> <span id="demo-val-employee"></span></div>
                    <div class="demo-tag" id="demo-tag-sensitive" style="display:none;"><span class="demo-tag-label">Sensitive topic:</span> <span id="demo-val-sensitive"></span></div>
                    <div class="demo-tag"><span class="demo-tag-label">Risk level:</span> <span id="demo-val-risk"></span></div>
                </div>
            </div>

            <!-- Stage 3 -->
            <div class="rv-demo-stage" id="demo-stage-3">
                <div class="demo-stage-label">Stage 3: AI Response Generated</div>
                <div class="demo-response-box" id="demo-val-response-box">
                    <div style="font-size:0.75rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;margin-bottom:6px;">ReplyVera response</div>
                    <div class="demo-response-text" id="demo-val-response"></div>
                </div>
                <div class="demo-sensitive-alert" id="demo-val-sensitive-alert" style="display:none;">
                    <i data-lucide="shield-alert" style="color:var(--danger);margin-right:8px;width:18px;height:18px;"></i>
                    <div>
                        <strong>Sensitive topic detected</strong>
                        <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:2px;">ReplyVera paused automatic response generation.</div>
                    </div>
                </div>
            </div>

            <!-- Stage 4 -->
            <div class="rv-demo-stage" id="demo-stage-4">
                <div class="demo-stage-label">Stage 4: Approval Decision</div>
                <div class="demo-decision-badge" id="demo-val-decision-badge"></div>
                <div class="demo-decision-text" id="demo-val-decision-text"></div>
            </div>

            <!-- Stage 5 -->
            <div class="rv-demo-stage" id="demo-stage-5">
                <div class="demo-stage-label">Stage 5: Final Outcome</div>
                
                <div id="outcome-positive" style="display:none;" class="demo-outcome-box outcome-success">
                    <i data-lucide="check-circle-2" style="width:24px;height:24px;"></i>
                    <div class="demo-outcome-title">Response published to Google</div>
                    <div class="demo-outcome-sub">Published moments ago</div>
                </div>
                
                <div id="outcome-negative" style="display:none;" class="demo-outcome-box">
                    <div style="display:flex;gap:8px;margin-bottom:12px;">
                        <button class="btn btn-accent btn-sm" onclick="approveAndPublish()">Approve and Publish</button>
                        <button class="btn btn-secondary btn-sm">Edit Response</button>
                        <button class="btn btn-secondary btn-sm">Keep as Draft</button>
                    </div>
                    <div id="outcome-negative-success" style="display:none;align-items:center;gap:8px;color:var(--warning);font-weight:600;">
                        <i data-lucide="check-circle-2" style="width:18px;height:18px;"></i> Response approved and ready to publish
                    </div>
                </div>
                
                <div id="outcome-sensitive" style="display:none;" class="demo-outcome-box outcome-danger">
                    <i data-lucide="alert-triangle" style="width:24px;height:24px;"></i>
                    <div class="demo-outcome-title">Escalated to manager</div>
                    <div class="demo-outcome-actions">
                        Suggested actions:<br>
                        • Review the complaint<br>
                        • Contact the customer privately<br>
                        • Create a response manually
                    </div>
                </div>
            </div>
            
        </div>
        
        <div class="rv-demo-controls">
            <button id="btn-run-demo" class="btn btn-primary" onclick="runDemoSequence()">Run Demo</button>
            <button id="btn-skip" class="btn btn-secondary" onclick="skipAnimations()" style="display:none;">Skip to Result</button>
            <button id="btn-pause" class="btn btn-secondary" onclick="togglePause()" style="display:none;">Pause</button>
        </div>
        
        <div id="demo-cta-panel" class="demo-cta-panel" style="display:none;">
            <div style="font-weight:700;font-size:1.1rem;margin-bottom:12px;">Ready to automate your Google review replies?</div>
            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
                <a href="https://dashboard.replyvera.com/login?signup=true" class="btn btn-accent">Start Free Trial</a>
                <a href="/pricing.html" class="btn btn-secondary">View Pricing</a>
            </div>
        </div>
    </div>
</div>
`;

// Base fallback data
const fallbackData = {
    'positive': { review: 'Friendly team and excellent service. Sarah was especially helpful.', sentiment: 'Positive', rating: 5, topic: 'Customer service', employee: 'Sarah', risk: 'Low', reply: 'Thank you for your kind review. We’re glad you had a great experience and that Sarah was especially helpful. We’ll be sure to share your feedback with her.', decision: 'Safe to Auto-Publish', text: 'This review matches your automatic publishing rules.' },
    'negative': { review: 'The service took much longer than expected, and nobody explained the delay.', sentiment: 'Negative', rating: 2, topic: 'Wait time and communication', employee: 'None', risk: 'Medium', reply: 'Thank you for sharing your feedback. We’re sorry the service took longer than expected and that the delay was not clearly explained. We’re sharing this with the team so we can improve.', decision: 'Needs Approval', text: 'Negative reviews require approval under your current rules.' },
    'sensitive': { review: 'This caused an injury, and the manager has not responded.', sentiment: 'Negative', rating: 1, topic: 'Injury and management response', employee: 'None', risk: 'High', blocked: 'Injury', decision: 'Auto-Publishing Blocked', text: 'This review requires human review before any public response is created or published.' }
};

let currentScenario = 'positive';
let currentStage = 0;
let demoTimer = null;
let isPaused = false;
let hasRun = false;

document.addEventListener('DOMContentLoaded', () => {
    // Inject HTML
    document.body.insertAdjacentHTML('beforeend', DEMO_MODAL_HTML);
    lucide.createIcons();
    
    // Intercept clicks to #how-it-works
    document.querySelectorAll('a[href$="#how-it-works"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            openDemoModal();
        });
    });
    
    // Escape key handling
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDemoModal();
    });
});

function getDemoData() {
    if (window.REPLYVERA_DEMO_DATA && window.REPLYVERA_DEMO_DATA[currentScenario]) {
        return window.REPLYVERA_DEMO_DATA[currentScenario];
    }
    return fallbackData[currentScenario];
}

function openDemoModal() {
    document.getElementById('rv-demo-modal').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    switchScenario('positive'); // Reset to default on open
}

function closeDemoModal() {
    document.getElementById('rv-demo-modal').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    clearTimeout(demoTimer);
}

function renderStars(rating) {
    let html = '';
    for(let i=1; i<=5; i++) {
        const c = i <= rating ? '#F59E0B' : '#64748B';
        html += `<svg width="14" height="14" viewBox="0 0 24 24" fill="${i <= rating ? c : 'none'}" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }
    return html;
}

function resetStages() {
    clearTimeout(demoTimer);
    isPaused = false;
    currentStage = 0;
    
    // Hide all stages
    for(let i=1; i<=5; i++) {
        const st = document.getElementById(`demo-stage-${i}`);
        if(st) {
            st.style.opacity = '0.3';
            st.style.transform = 'translateY(10px)';
            st.style.display = 'none';
        }
    }
    
    document.getElementById('demo-cta-panel').style.display = 'none';
    
    const runBtn = document.getElementById('btn-run-demo');
    runBtn.style.display = 'inline-flex';
    runBtn.textContent = hasRun ? 'Replay Demo' : 'Run Demo';
    
    document.getElementById('btn-skip').style.display = 'none';
    document.getElementById('btn-pause').style.display = 'none';
    
    // Reset specific states
    document.getElementById('outcome-negative-success').style.display = 'none';
}

function switchScenario(scenario) {
    currentScenario = scenario;
    
    // Update tabs
    document.querySelectorAll('.rv-demo-tab').forEach(t => t.setAttribute('aria-selected', 'false'));
    document.querySelectorAll('.rv-demo-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.rv-demo-tab[onclick="switchScenario('${scenario}')"]`).classList.add('active');
    document.querySelector(`.rv-demo-tab[onclick="switchScenario('${scenario}')"]`).setAttribute('aria-selected', 'true');
    
    const data = getDemoData();
    
    // Pre-fill data
    document.getElementById('demo-val-stars').innerHTML = renderStars(data.rating);
    document.getElementById('demo-val-quote').textContent = `"${data.review}"`;
    
    document.getElementById('demo-val-sentiment').textContent = data.sentiment;
    document.getElementById('demo-val-rating').textContent = `${data.rating} stars`;
    document.getElementById('demo-val-topic').textContent = data.topic;
    document.getElementById('demo-val-risk').textContent = data.risk;
    
    if (scenario === 'sensitive') {
        document.getElementById('demo-tag-employee').style.display = 'none';
        document.getElementById('demo-tag-sensitive').style.display = 'flex';
        document.getElementById('demo-val-sensitive').textContent = data.blocked || 'Policy violation';
        
        document.getElementById('demo-val-response-box').style.display = 'none';
        document.getElementById('demo-val-sensitive-alert').style.display = 'flex';
        
        document.getElementById('demo-val-decision-badge').className = 'demo-decision-badge badge-blocked';
    } else {
        document.getElementById('demo-tag-employee').style.display = 'flex';
        document.getElementById('demo-val-employee').textContent = data.employee;
        document.getElementById('demo-tag-sensitive').style.display = 'none';
        
        document.getElementById('demo-val-response-box').style.display = 'block';
        document.getElementById('demo-val-sensitive-alert').style.display = 'none';
        document.getElementById('demo-val-response').textContent = data.reply;
        
        document.getElementById('demo-val-decision-badge').className = 'demo-decision-badge ' + (scenario === 'positive' ? 'badge-auto' : 'badge-approval');
    }
    
    document.getElementById('demo-val-decision-badge').textContent = data.decision;
    document.getElementById('demo-val-decision-text').textContent = data.text;
    
    // Outcome panel visibility
    document.getElementById('outcome-positive').style.display = scenario === 'positive' ? 'flex' : 'none';
    document.getElementById('outcome-negative').style.display = scenario === 'negative' ? 'block' : 'none';
    document.getElementById('outcome-sensitive').style.display = scenario === 'sensitive' ? 'flex' : 'none';

    // specific CTA setup
    const isAgency = window.location.pathname.includes('/agencies');
    const ctaPrimary = document.querySelector('#demo-cta-panel .btn-accent');
    if(isAgency) {
        ctaPrimary.textContent = 'Start Agency Trial';
    } else {
        ctaPrimary.textContent = 'Start Free Trial';
    }
    
    resetStages();
}

function showStage(stageNum) {
    // Dim previous stages
    for(let i=1; i<stageNum; i++) {
        const prev = document.getElementById(`demo-stage-${i}`);
        if(prev) prev.style.opacity = '0.5';
    }

    const el = document.getElementById(`demo-stage-${stageNum}`);
    if(!el) return;
    el.style.display = 'flex';
    // Trigger reflow
    void el.offsetWidth;
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';

    
    // Typewriter effect for response if it's stage 3 and not sensitive
    if (stageNum === 3 && currentScenario !== 'sensitive') {
        const rBox = document.getElementById('demo-val-response');
        const text = rBox.textContent;
        rBox.textContent = '';
        let i = 0;
        const typeInterval = setInterval(() => {
            if(i < text.length) {
                rBox.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 10);
        // store interval to clear if skipped
        rBox.dataset.interval = typeInterval;
    }
}

function runDemoSequence() {
    hasRun = true;
    resetStages();
    document.getElementById('btn-run-demo').style.display = 'none';
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        skipAnimations();
        return;
    }
    
    document.getElementById('btn-skip').style.display = 'inline-flex';
    // document.getElementById('btn-pause').style.display = 'inline-flex';
    
    const timings = [0, 1500, 4000, 6500, 8500];
    
    function scheduleStage(stageIdx, delay) {
        demoTimer = setTimeout(() => {
            currentStage = stageIdx + 1;
            showStage(currentStage);
            
            if (currentStage === 5) {
                setTimeout(() => {
                    document.getElementById('btn-skip').style.display = 'none';
                    document.getElementById('btn-run-demo').style.display = 'inline-flex';
                    document.getElementById('btn-run-demo').textContent = 'Replay Demo';
                    document.getElementById('demo-cta-panel').style.display = 'block';
                }, 1000);
            }
        }, delay);
    }
    
    for(let i=0; i<5; i++) {
        scheduleStage(i, timings[i]);
    }
}

function skipAnimations() {
    clearTimeout(demoTimer);
    // kill typing interval if any
    const rBox = document.getElementById('demo-val-response');
    if(rBox.dataset.interval) {
        clearInterval(parseInt(rBox.dataset.interval));
        rBox.textContent = getDemoData().reply;
    }
    
    for(let i=1; i<=5; i++) {
        const el = document.getElementById(`demo-stage-${i}`);
        el.style.display = 'block';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }
    
    document.getElementById('btn-skip').style.display = 'none';
    document.getElementById('btn-pause').style.display = 'none';
    document.getElementById('btn-run-demo').style.display = 'inline-flex';
    document.getElementById('btn-run-demo').textContent = 'Replay Demo';
    document.getElementById('demo-cta-panel').style.display = 'block';
}

function approveAndPublish() {
    const msg = document.getElementById('outcome-negative-success');
    msg.style.display = 'flex';
    msg.style.opacity = '0';
    setTimeout(() => msg.style.opacity = '1', 10);
}
