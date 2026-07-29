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

function localizeLinks(htmlContent, lang) {
    if (!lang || lang === 'en') return htmlContent;
    const prefix = '/' + lang;
    
    return htmlContent
        .replace(/href="\/es\//g, 'href="/')
        .replace(/href="\/nl\//g, 'href="/')
        .replace(/href="index\.html"/g, `href="${prefix}/index.html"`)
        .replace(/href="pricing\.html"/g, `href="${prefix}/pricing.html"`)
        .replace(/href="terms\.html"/g, `href="${prefix}/terms.html"`)
        .replace(/href="privacy\.html"/g, `href="${prefix}/privacy.html"`)
        .replace(/href="cookie\.html"/g, `href="${prefix}/cookie.html"`)
        .replace(/href="\/index\.html"/g, `href="${prefix}/index.html"`)
        .replace(/href="\/pricing\.html"/g, `href="${prefix}/pricing.html"`)
        .replace(/href="\/terms\.html"/g, `href="${prefix}/terms.html"`)
        .replace(/href="\/privacy\.html"/g, `href="${prefix}/privacy.html"`)
        .replace(/href="\/cookie\.html"/g, `href="${prefix}/cookie.html"`)
        .replace(/href="\/industries\/restaurants"/g, `href="${prefix}/industries/restaurants"`)
        .replace(/href="\/industries\/dentists"/g, `href="${prefix}/industries/dentists"`)
        .replace(/href="\/industries\/agencies"/g, `href="${prefix}/industries/agencies"`)
        .replace(/href="\/industries\/martial-arts"/g, `href="${prefix}/industries/martial-arts"`)
        .replace(/href="\/industries\/childcare"/g, `href="${prefix}/industries/childcare"`)
        .replace(/href="\/industries\/tutoring"/g, `href="${prefix}/industries/tutoring"`)
        .replace(/href="\/industries\/pet-care"/g, `href="${prefix}/industries/pet-care"`)
        .replace(/href="\/industries\/car-washes"/g, `href="${prefix}/industries/car-washes"`)
        .replace(/href="\/industries\/laundromats"/g, `href="${prefix}/industries/laundromats"`)
        .replace(/href="industries\/car-washes"/g, `href="${prefix}/industries/car-washes"`)
        .replace(/href="#product"/g, `href="${prefix}/index.html#product"`)
        .replace(/href="#benefits"/g, `href="${prefix}/index.html#benefits"`)
        .replace(/href="#how-it-works"/g, `href="${prefix}/index.html#how-it-works"`)
        .replace(/href="#pricing"/g, `href="${prefix}/index.html#pricing"`)
        .replace(/href="#faq"/g, `href="${prefix}/index.html#faq"`);
}

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
            // Rewrite demo.js and all internal href links to localized versions
            html = html.replace(/src="\/demo\.js/g, `src="/${lang}/demo.js`);
            html = localizeLinks(html, lang);
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
