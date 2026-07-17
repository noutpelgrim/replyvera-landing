def fix_file(f_name):
    with open(f_name, 'r', encoding='utf-8') as f:
        c = f.read()
    
    # Remove the accidental script.js injected in head
    c = c.replace('<script src="/script.js"></script>\n    <script src="/demo.js" defer></script>\n</head>', '<script src="/demo.js" defer></script>\n</head>')
    
    # Add demo.js to head if it's not there
    if '<script src="/demo.js" defer></script>' not in c:
        c = c.replace('</head>', '    <script src="/demo.js" defer></script>\n</head>')
        
    with open(f_name, 'w', encoding='utf-8') as f:
        f.write(c)

fix_file('index.html')
fix_file('pricing.html')
