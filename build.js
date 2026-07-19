const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const localesDir = path.join(__dirname, 'locales');
const distDir = __dirname; // Building to root

const htmlFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

const locales = ['en', 'es', 'nl'];
const translations = {};

// We can run the build script even if es.json or nl.json don't exist yet by falling back to en.json
locales.forEach(lang => {
    const localePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(localePath)) {
        translations[lang] = JSON.parse(fs.readFileSync(localePath, 'utf-8'));
    } else {
        translations[lang] = {};
    }
});

const enTranslations = translations['en'];

locales.forEach(lang => {
    const isDefault = lang === 'en';
    const targetDir = isDefault ? distDir : path.join(distDir, lang);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    htmlFiles.forEach(file => {
        let html = fs.readFileSync(path.join(srcDir, file), 'utf-8');
        
        // Replace {{ key }} with the localized string
        html = html.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key) => {
            return translations[lang][key] || enTranslations[key] || match;
        });

        if (!isDefault) {
            // Rewrite demo.js to localized demo.js
            html = html.replace(/src="\/demo\.js/g, `src="/${lang}/demo.js`);
        }

        // Add auto-redirect script only on the root english files
        if (isDefault) {
            const redirectScript = `
    <script>
        (function() {
            if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
                var lang = navigator.language || navigator.userLanguage;
                if (lang) {
                    if (lang.startsWith('es') && !localStorage.getItem('lang_redirected')) {
                        localStorage.setItem('lang_redirected', 'true');
                        window.location.href = '/es/';
                    } else if (lang.startsWith('nl') && !localStorage.getItem('lang_redirected')) {
                        localStorage.setItem('lang_redirected', 'true');
                        window.location.href = '/nl/';
                    }
                }
            }
        })();
    </script>
</head>`;
            html = html.replace('</head>', redirectScript);
        }

        fs.writeFileSync(path.join(targetDir, file), html);
    });
});
console.log("Build complete! Generated localized HTML files.");
