import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. never published
    content = content.replace(
        "Animal Safety Concerns Are Never Published Automatically",
        "Animal Safety Concerns Require Manual Approval"
    )
    content = content.replace(
        "never published without it",
        "blocked from automatic publishing under your configured rules"
    )
    content = content.replace(
        "never published automatically",
        "blocked from automatic publishing under your configured rules"
    )

    # 2. Fix the 5 locations in build-industries.js (just to be absolutely sure)
    # the search above showed NO "five locations" or "5 client locations", meaning my first script successfully killed them in build-industries.js and pricing.html!
    
    # Let's verify pricing.html for Start Free
    # In pricing.html, make sure Starter CTA says "Start Free Trial"
    content = content.replace(">Start Free<", ">Start Free Trial<")
    content = content.replace(">Start Your Free Trial<", ">Start Free Trial<")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('build-industries.js')
fix_file('index.html')
fix_file('pricing.html')
