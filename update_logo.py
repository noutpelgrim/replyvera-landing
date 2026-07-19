import glob
import re
import os

print("Starting logo refactor...")

# 1. Update style.css
base_dir = r"C:\Users\noutp\.gemini\antigravity\scratch\replyvera"
css_file = os.path.join(base_dir, "style.css")

try:
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    old_styles = """.nav-logo-icon i {
    width: 17px;
    height: 17px;
    stroke-width: 2.5;
}"""
    
    new_styles = """.nav-logo-icon i {
    font-size: 0.95rem;
    line-height: 1;
}"""
    
    if old_styles in content:
        content = content.replace(old_styles, new_styles)
        print("style.css logo rules updated.")
    else:
        content = re.sub(r'\.nav-logo-icon\s+i\s*\{[^}]*\}', new_styles, content)
        print("style.css logo rules updated via regex.")
        
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(content)
except Exception as e:
    print(f"Error updating style.css: {e}")

# 2. Update HTML pages
fa_cdn = '    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" />'

html_files = glob.glob(os.path.join(base_dir, "*.html"))
for html_path in html_files:
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            html = f.read()
        
        if "all.min.css" not in html:
            html = html.replace('</head>', f'{fa_cdn}\n</head>')
            print(f"Added FontAwesome CDN to {html_path}")
            
        html = html.replace('<i data-lucide="reply"></i>', '<i class="fa-solid fa-reply"></i>')
        html = html.replace('<i data-lucide="undo-2"></i>', '<i class="fa-solid fa-reply"></i>')
        
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Updated logo icons in {html_path}")
    except Exception as e:
        print(f"Error updating {html_path}: {e}")

print("Refactor finished successfully!")
