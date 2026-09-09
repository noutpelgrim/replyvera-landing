/**
 * ReplyVera Language Switcher Generator
 * Generates clean, accessible, crawlable static HTML links for language switching without JavaScript.
 */

function renderDesktopLangSelector(currentLang, urls) {
    const langUpper = currentLang.toUpperCase();
    return `<div class="lang-selector">
                    <button class="lang-btn" aria-label="Select Language">
                        <i class="fa-solid fa-globe" style="font-size:16px; margin-right:6px;"></i> ${langUpper}
                    </button>
                    <div class="lang-menu">
                        <a href="${urls.en}" class="lang-item${currentLang === 'en' ? ' active' : ''}" data-no-localize>English</a>
                        <a href="${urls.es}" class="lang-item${currentLang === 'es' ? ' active' : ''}" data-no-localize>Español</a>
                        <a href="${urls.nl}" class="lang-item${currentLang === 'nl' ? ' active' : ''}" data-no-localize>Nederlands</a>
                    </div>
                </div>`;
}

function renderMobileLangBar(currentLang, urls) {
    return `<div class="mobile-lang-bar">
                <span class="mobile-lang-label"><i class="fa-solid fa-globe"></i> Language:</span>
                <a href="${urls.en}" class="mobile-lang-opt${currentLang === 'en' ? ' active' : ''}" data-no-localize>EN</a>
                <a href="${urls.es}" class="mobile-lang-opt${currentLang === 'es' ? ' active' : ''}" data-no-localize>ES</a>
                <a href="${urls.nl}" class="mobile-lang-opt${currentLang === 'nl' ? ' active' : ''}" data-no-localize>NL</a>
            </div>`;
}

function renderFooterLangSelector(currentLang, urls) {
    const langUpper = currentLang.toUpperCase();
    return `<div class="lang-selector">
                                <button class="lang-btn" aria-label="Select Language">
                                    <i data-lucide="globe" style="width:16px;height:16px;margin-right:6px;"></i> ${langUpper}
                                </button>
                                <div class="lang-menu">
                                    <a href="${urls.en}" class="lang-item${currentLang === 'en' ? ' active' : ''}" data-no-localize>English</a>
                                    <a href="${urls.es}" class="lang-item${currentLang === 'es' ? ' active' : ''}" data-no-localize>Español</a>
                                    <a href="${urls.nl}" class="lang-item${currentLang === 'nl' ? ' active' : ''}" data-no-localize>Nederlands</a>
                                </div>
                            </div>`;
}

function replaceAllLangSelectors(html, currentLang, urls) {
    let res = html;
    
    // Remove client-side changeLang script completely (including multiple spaces/newlines)
    res = res.replace(/<script[^>]*>[\s\r\n]*function\s+changeLang[\s\S]*?<\/script>/gi, '');
    
    // Replace desktop nav language selector (the one in nav-actions)
    const desktopHtml = renderDesktopLangSelector(currentLang, urls);
    res = res.replace(/<div class="lang-selector">\s*<button class="lang-btn"[\s\S]*?<\/div>\s*<\/div>/i, desktopHtml);

    // Replace mobile nav bar if present
    const mobileHtml = renderMobileLangBar(currentLang, urls);
    if (res.includes('class="mobile-lang-bar"')) {
        res = res.replace(/<div class="mobile-lang-bar">[\s\S]*?<\/div>/i, mobileHtml);
    }
    // Also replace any lang-selector inside mobile-nav (like in pricing, terms, etc.)
    res = res.replace(/(<div class="mobile-nav"[\s\S]*?)<div class="lang-selector">\s*<button class="lang-btn"[\s\S]*?<\/div>\s*<\/div>/i, '$1' + mobileHtml);

    // Replace footer selector
    const footerHtml = renderFooterLangSelector(currentLang, urls);
    res = res.replace(/(<div class="footer-col">[\s\S]*?)<div class="lang-selector">\s*<button class="lang-btn"[\s\S]*?<\/div>\s*<\/div>/i, '$1' + footerHtml);

    // Replace any remaining lang-selector instances
    res = res.replace(/<div class="lang-selector">\s*<button class="lang-btn"[\s\S]*?<\/div>\s*<\/div>/gi, footerHtml);

    // Sanitize any remaining changeLang references
    res = res.replace(/\s*onclick=["']changeLang\([^)]*\)["']/gi, '');

    return res;
}

module.exports = {
    renderDesktopLangSelector,
    renderMobileLangBar,
    renderFooterLangSelector,
    replaceAllLangSelectors
};
