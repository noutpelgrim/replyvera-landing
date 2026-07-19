import os
import glob

src_dir = r"C:\Users\noutp\.gemini\antigravity\scratch\replyvera\src"
html_files = glob.glob(os.path.join(src_dir, "*.html"))

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Fix asset paths to be absolute from root so they work in subfolders
    html = html.replace('src="img/', 'src="/img/')
    html = html.replace('src="script.js"', 'src="/script.js"')
    
    # Fix relative links that were hardcoded absolute
    html = html.replace('href="/cookie.html"', 'href="cookie.html"')
    
    # Note: style.css is already '/style.css?v=13'
    # demo.js is already '/demo.js?v=3'
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(html)

print("Fixed asset paths and absolute links in templates.")
