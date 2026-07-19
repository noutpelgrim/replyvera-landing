import glob

for filepath in glob.glob('src/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('<a h class="nav-login">', '<a href="https://dashboard.replyvera.com/login" class="nav-login">')
    content = content.replace('<a h class="mobile-nav-link">', '<a href="https://dashboard.replyvera.com/login" class="mobile-nav-link">')
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Links fixed!")
