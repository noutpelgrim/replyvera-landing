import re

with open('demo.js', 'r', encoding='utf-8') as f:
    content = f.read()

replacement = """function showStage(stageNum) {
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
"""

content = content.replace(
"""function showStage(stageNum) {
    const el = document.getElementById(`demo-stage-${stageNum}`);
    if(!el) return;
    el.style.display = 'block';
    // Trigger reflow
    void el.offsetWidth;
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';""", replacement)

with open('demo.js', 'w', encoding='utf-8') as f:
    f.write(content)
