import os

css_addition = """
/* ==========================================================================
   Industry-Specific Theme System
   ========================================================================== */

/* Eyebrow Accent */
.industry-eyebrow {
    color: var(--industry-accent, var(--primary));
    background: var(--industry-icon-bg, rgba(99, 102, 241, 0.1));
    border: 1px solid var(--industry-accent-soft, rgba(99, 102, 241, 0.2));
}

/* Topic Tags */
.topic-tag.industry-tag {
    color: var(--industry-accent, var(--text-primary));
    background: var(--industry-icon-bg, rgba(255, 255, 255, 0.05));
    border: 1px solid var(--industry-accent-soft, var(--border));
}

/* Active Nav State */
.dropdown-item.active {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    box-shadow: inset 0 0 0 1px var(--industry-accent-soft, rgba(255, 255, 255, 0.1));
}
.dropdown-item.active .dropdown-icon-wrapper {
    background: var(--industry-accent, var(--primary));
    color: #fff;
    box-shadow: 0 0 12px var(--industry-accent-glow, transparent);
}
.dropdown-item.active .dropdown-title {
    color: #fff;
}

.mobile-industry-item.active {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    border: 1px solid var(--industry-accent-soft, rgba(255, 255, 255, 0.1));
}
.mobile-industry-item.active .mobile-ind-icon {
    background: var(--industry-accent, var(--primary));
    color: #fff;
    box-shadow: 0 0 12px var(--industry-accent-glow, transparent);
}

/* Section Dividers */
.industry-divider-line {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--industry-accent-soft, var(--border)), transparent);
    margin: 0;
}
.industry-divider-glow {
    width: 100%;
    height: 1px;
    background: transparent;
    position: relative;
    margin: 0;
}
.industry-divider-glow::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, var(--industry-accent-glow, transparent) 0%, transparent 70%);
    opacity: 0.5;
    pointer-events: none;
}

/* Hero Background Motifs */
.industry-hero {
    position: relative;
    overflow: hidden;
}
.industry-hero .hero-glow-layer {
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 140vw;
    height: 140vw;
    max-width: 1200px;
    max-height: 1200px;
    background: radial-gradient(circle at top center, var(--industry-accent-glow, rgba(99, 102, 241, 0.15)) 0%, transparent 60%);
    z-index: 0;
    pointer-events: none;
}
.industry-hero > .container {
    position: relative;
    z-index: 1;
}

/* Specific Motifs */
.industry-hero[data-motif="radial"]::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 30%, var(--industry-accent-soft, transparent) 0%, transparent 50%);
    pointer-events: none;
}
.industry-hero[data-motif="grid"]::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(var(--industry-accent-soft) 1px, transparent 1px), linear-gradient(90deg, var(--industry-accent-soft) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.3;
    mask-image: radial-gradient(circle at center top, black 30%, transparent 70%);
    -webkit-mask-image: radial-gradient(circle at center top, black 30%, transparent 70%);
    pointer-events: none;
}
.industry-hero[data-motif="nodes"]::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(var(--industry-accent-soft) 2px, transparent 2px);
    background-size: 30px 30px;
    opacity: 0.4;
    mask-image: radial-gradient(ellipse at center top, black 40%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center top, black 40%, transparent 70%);
    pointer-events: none;
}
.industry-hero[data-motif="diagonal"]::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, var(--industry-accent-soft) 10px, var(--industry-accent-soft) 11px);
    opacity: 0.3;
    mask-image: radial-gradient(circle at center top, black 30%, transparent 70%);
    -webkit-mask-image: radial-gradient(circle at center top, black 30%, transparent 70%);
    pointer-events: none;
}
.industry-hero[data-motif="rounded"]::before {
    content: '';
    position: absolute;
    top: 10%;
    left: 20%;
    width: 300px;
    height: 300px;
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    background: var(--industry-accent-soft);
    filter: blur(40px);
    opacity: 0.5;
    pointer-events: none;
}
.industry-hero[data-motif="dots"]::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(var(--industry-accent-soft) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.4;
    mask-image: radial-gradient(circle at center top, black 30%, transparent 70%);
    -webkit-mask-image: radial-gradient(circle at center top, black 30%, transparent 70%);
    pointer-events: none;
}
.industry-hero[data-motif="waves"]::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-radial-gradient(ellipse at center top, transparent, transparent 20px, var(--industry-accent-soft) 20px, var(--industry-accent-soft) 22px);
    opacity: 0.2;
    mask-image: radial-gradient(circle at center top, black 40%, transparent 70%);
    -webkit-mask-image: radial-gradient(circle at center top, black 40%, transparent 70%);
    pointer-events: none;
}
.industry-hero[data-motif="paws"]::before, .industry-hero[data-motif="bubbles"]::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, var(--industry-accent-soft) 2px, transparent 2px), radial-gradient(circle, var(--industry-accent-soft) 4px, transparent 4px);
    background-size: 60px 60px, 90px 90px;
    background-position: 0 0, 30px 30px;
    opacity: 0.3;
    mask-image: radial-gradient(circle at center top, black 40%, transparent 70%);
    -webkit-mask-image: radial-gradient(circle at center top, black 40%, transparent 70%);
    pointer-events: none;
}

/* Specific Card adjustments to accept industry accents without breaking universality */
.mockup-header .mockup-active-dot {
    background: var(--industry-accent, var(--accent));
}

"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css_addition)

print("Appended industry styles to style.css successfully.")
