import re

with open('build-industries.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix active dot color in mockup
old_dot = r"<span style=\"width:6px;height:6px;background:var(--accent);border-radius:50%;display:inline-block;\"></span>Active"
new_dot = r"<span class=\"mockup-active-dot\" style=\"width:6px;height:6px;background:var(--industry-accent, var(--accent));border-radius:50%;display:inline-block;\"></span>Active"
content = content.replace(old_dot, new_dot)

# Also fix the text "Active" color if it's currently var(--accent)
old_active_container = r"color:var(--accent);display:flex;align-items:center;gap:5px;"
new_active_container = r"color:var(--industry-accent, var(--accent));display:flex;align-items:center;gap:5px;"
content = content.replace(old_active_container, new_active_container)

with open('build-industries.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed active dot in build script.")
