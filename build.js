const fs = require('fs');
const path = require('path');
const { localizeAllHtmlLinks } = require('./lib/router');

const srcDir = path.join(__dirname, 'src');
const localesDir = path.join(__dirname, 'locales');
const distDir = __dirname; // Building to root

const htmlFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

const locales = ['en', 'es', 'nl'];
const translations = {};

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
        
        // Update <html lang="..."> attribute
        html = html.replace(/<html\s+lang=["'][^"']*["']/i, `<html lang="${lang}"`);

        // Update header language button label (EN -> NL / ES)
        html = html.replace(/<button class="lang-btn"[^>]*>[\s\S]*?<\/button>/, `
                    <button class="lang-btn" aria-label="Select Language">
                        <i class="fa-solid fa-globe" style="font-size:16px; margin-right:6px;"></i> ${lang.toUpperCase()}
                    </button>`);

        // Update mobile language selector active state
        html = html.replace(/class="mobile-lang-opt active"/g, 'class="mobile-lang-opt"');
        const langUpper = lang.toUpperCase();
        html = html.replace(
            new RegExp(`class="mobile-lang-opt"\\s+onclick="changeLang\\('${lang}',\\s*event\\)">${langUpper}<\\/a>`),
            `class="mobile-lang-opt active" onclick="changeLang('${lang}', event)">${langUpper}</a>`
        );

        // Replace {{ key }} with the localized string
        html = html.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key) => {
            return translations[lang][key] || enTranslations[key] || match;
        });

        // Rewrite internal links using centralized router
        html = localizeAllHtmlLinks(html, lang);

        if (!isDefault) {
            // Rewrite demo.js path for localized pages if needed
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

console.log("Build complete! Generated localized HTML files with centralized router & language selector fixes.");
