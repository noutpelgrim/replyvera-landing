import os
import re

files = ['demo.html', os.path.join('es', 'demo.html'), os.path.join('nl', 'demo.html')]

# We want to match:
# let sentiment = '...';
# if (isSensitive) {
#     sentiment = '...';
# } else if (hasPraise && hasComplaint) {
#     sentiment = '...';
# } else if (hasComplaint || (selectedStars <= 2 && !hasPraise)) {
#     sentiment = '...';
# } else {
#     sentiment = '...';
# }

pattern = re.compile(
    r"let sentiment = '([^']+)';\s*if\s*\(isSensitive\)\s*{\s*sentiment = '([^']+)';\s*}\s*else if\s*\(hasPraise && hasComplaint\)\s*{\s*sentiment = '([^']+)';\s*}\s*else if\s*\(hasComplaint \|\| \(selectedStars <= 2 && !hasPraise\)\)\s*{\s*sentiment = '([^']+)';\s*}\s*else\s*{\s*sentiment = '([^']+)';\s*}",
    re.DOTALL
)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    match = pattern.search(content)
    if match:
        pos_str = match.group(1) # 'Positive' / 'Positivo' / 'Positief'
        crit_str = match.group(2) # 'Critical' / 'Crítico' / 'Kritiek'
        mix_str = match.group(3) # 'Mixed / Neutral' / 'Mixto / Neutral' / 'Gemengd / Neutraal'
        neg_str = match.group(4) # 'Negative' / 'Negativo' / 'Negatief'

        replacement = f"""let sentiment = '{pos_str}';
            if (isSensitive) {{
                sentiment = '{crit_str}';
            }} else if (selectedStars <= 2) {{
                sentiment = '{neg_str}';
            }} else if (selectedStars === 3 || (hasPraise && hasComplaint)) {{
                sentiment = '{mix_str}';
            }} else if (hasComplaint) {{
                sentiment = '{neg_str}';
            }} else {{
                sentiment = '{pos_str}';
            }}"""

        new_content = content[:match.start()] + replacement + content[match.end():]
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Patched {file}")
    else:
        print(f"Could not find pattern in {file}")
