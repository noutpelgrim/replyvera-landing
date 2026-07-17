/* ==========================================================================
   Interactive Demo Modal
   ========================================================================== */

.rv-demo-modal {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.rv-demo-modal[aria-hidden="false"] {
    opacity: 1;
    visibility: visible;
}

.rv-demo-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(7, 7, 11, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.rv-demo-container {
    position: relative;
    z-index: 1;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl, 16px);
    width: 95%;
    max-width: 1200px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 32px;
    box-shadow: 0 25px 50px rgba(0,0,0,0.5);
}

.rv-demo-close {
    position: absolute;
    top: 24px;
    right: 24px;
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background 0.2s, color 0.2s;
}

.rv-demo-close:hover {
    background: rgba(255,255,255,0.05);
    color: #fff;
}

.rv-demo-header {
    text-align: center;
    margin-bottom: 32px;
}

.rv-demo-tabs {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
}

.rv-demo-tab {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.rv-demo-tab:hover {
    background: rgba(255,255,255,0.06);
    color: #fff;
}

.rv-demo-tab.active {
    background: rgba(99, 102, 241, 0.1);
    border-color: var(--accent);
    color: #fff;
}

.rv-demo-body {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-bottom: 32px;
    align-items: stretch;
}

.rv-demo-stage {
    flex: 1;
    min-width: 200px;
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    opacity: 0.3;
    transform: translateY(10px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    display: none; /* Controlled by JS */
}

.demo-stage-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    font-weight: 600;
}

/* Review Card */
.demo-review-card {
    background: rgba(255,255,255,0.03);
    border-radius: 8px;
    padding: 16px;
    border: 1px solid rgba(255,255,255,0.05);
}
.demo-review-stars {
    display: flex;
    gap: 2px;
    margin-bottom: 8px;
}
.demo-review-quote {
    font-size: 0.95rem;
    font-style: italic;
    color: #fff;
    line-height: 1.5;
}
.demo-notification {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: var(--primary);
    background: rgba(99, 102, 241, 0.1);
    padding: 6px 10px;
    border-radius: 6px;
    align-self: flex-start;
}

/* Analysis Tags */
.demo-analysis-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.demo-tag {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255,255,255,0.04);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.85rem;
}
.demo-tag-label {
    color: var(--text-muted);
}
.demo-tag span:last-child {
    font-weight: 500;
    color: #fff;
}

/* AI Response */
.demo-response-box {
    background: rgba(99, 102, 241, 0.05);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 8px;
    padding: 16px;
}
.demo-response-text {
    font-size: 0.9rem;
    color: #fff;
    line-height: 1.5;
    min-height: 80px;
}
.demo-sensitive-alert {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    padding: 16px;
    border-radius: 8px;
    display: flex;
    align-items: flex-start;
}

/* Decision */
.demo-decision-badge {
    padding: 12px 16px;
    border-radius: 8px;
    font-weight: 600;
    text-align: center;
    font-size: 0.95rem;
}
.demo-decision-text {
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.5;
    text-align: center;
}

/* Outcomes */
.demo-outcome-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px 16px;
    background: rgba(255,255,255,0.03);
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.05);
    height: 100%;
}
.outcome-success {
    color: var(--success);
    background: rgba(16, 185, 129, 0.05);
    border-color: rgba(16, 185, 129, 0.2);
}
.outcome-danger {
    color: var(--danger);
    background: rgba(239, 68, 68, 0.05);
    border-color: rgba(239, 68, 68, 0.2);
}
.demo-outcome-title {
    font-weight: 700;
    font-size: 1.05rem;
    margin: 12px 0 4px;
}
.demo-outcome-sub {
    font-size: 0.85rem;
    color: var(--text-secondary);
}
.demo-outcome-actions {
    font-size: 0.85rem;
    color: var(--text-secondary);
    text-align: left;
    margin-top: 12px;
}

/* Controls */
.rv-demo-controls {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 24px;
    border-top: 1px solid var(--border);
    padding-top: 24px;
}

.demo-cta-panel {
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    margin-top: 24px;
}

@media (max-width: 1024px) {
    .rv-demo-body {
        flex-direction: column;
    }
    .rv-demo-container {
        padding: 24px 16px;
    }
    .rv-demo-close {
        top: 12px;
        right: 12px;
        position: fixed; /* Sticky close on mobile */
        background: var(--bg-card);
        border: 1px solid var(--border);
        z-index: 10;
    }
    .rv-demo-tabs {
        overflow-x: auto;
        justify-content: flex-start;
        padding-bottom: 8px;
    }
    .rv-demo-tab {
        white-space: nowrap;
    }
}
