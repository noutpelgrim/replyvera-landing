import glob

for filepath in glob.glob('src/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('<i data-lucide="globe" style="width:18px;height:18px;"></i>', '<i data-lucide="globe" style="width:16px;height:16px;margin-right:6px;"></i> EN')
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Language button text added!")
