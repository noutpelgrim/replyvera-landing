import glob

lang_html = """
                <div class="lang-selector">
                    <button class="lang-btn" aria-label="Select Language">
                        <i data-lucide="globe" style="width:18px;height:18px;"></i>
                    </button>
                    <div class="lang-menu">
                        <a href="#" class="lang-item" onclick="changeLang('en', event)">English</a>
                        <a href="#" class="lang-item" onclick="changeLang('es', event)">Español</a>
                        <a href="#" class="lang-item" onclick="changeLang('nl', event)">Nederlands</a>
                    </div>
                </div>
                <a href="https://dashboard.replyvera.com/login"
"""

lang_script = """
    <script>
    function changeLang(lang, event) {
        event.preventDefault();
        localStorage.setItem('lang_redirected', 'true');
        
        let path = window.location.pathname;
        
        // Remove existing lang prefix if present
        if (path.startsWith('/es/')) path = path.replace('/es/', '/');
        if (path.startsWith('/nl/')) path = path.replace('/nl/', '/');
        if (path === '/es' || path === '/nl') path = '/';
        
        let newPath = path;
        if (lang === 'es') {
            newPath = '/es' + (path === '/' ? '/' : path);
        } else if (lang === 'nl') {
            newPath = '/nl' + (path === '/' ? '/' : path);
        }
        
        window.location.href = newPath + window.location.hash;
    }
    </script>
</head>
"""

for filepath in glob.glob('src/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Insert switcher
    if '<div class="lang-selector">' not in content:
        content = content.replace('<a href="https://dashboard.replyvera.com/login"', lang_html.strip()[:-43])
    
    # Insert script
    if 'function changeLang' not in content:
        content = content.replace('</head>', lang_script)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Language selector added!")
