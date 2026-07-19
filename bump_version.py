import glob

for filepath in glob.glob('src/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('style.css?v=13', 'style.css?v=14')
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Cache buster bumped!")
