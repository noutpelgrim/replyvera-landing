/**
 * ReplyVera Centralized Router & Link Localizer Module
 * Ensures every internal link, menu item, button, and footer link maintains the user's active locale
 * while protecting explicit language switcher links and in-page anchor navigation.
 */

const { getIndustryBySlug, getLocalizedPath } = require('./industries_master');

const STATIC_EXTENSIONS = [
    '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg',
    '.ico', '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.pdf', '.zip'
];

function isStaticAsset(urlPath) {
    if (!urlPath) return false;
    const cleanPath = urlPath.split('?')[0].split('#')[0].toLowerCase();
    return STATIC_EXTENSIONS.some(ext => cleanPath.endsWith(ext));
}

function isExternal(urlPath) {
    if (!urlPath) return false;
    return urlPath.startsWith('http://') ||
           urlPath.startsWith('https://') ||
           urlPath.startsWith('//') ||
           urlPath.startsWith('mailto:') ||
           urlPath.startsWith('tel:') ||
           urlPath.startsWith('javascript:');
}

/**
 * Localizes a path string for a target locale ('en', 'nl', 'es').
 */
function localizePath(urlPath, targetLocale) {
    const loc = targetLocale || 'en';
    if (!urlPath || isExternal(urlPath) || isStaticAsset(urlPath)) {
        return urlPath;
    }

    // Preserve query strings and hashes
    const hashIndex = urlPath.indexOf('#');
    const hash = hashIndex !== -1 ? urlPath.slice(hashIndex) : '';
    let mainPath = hashIndex !== -1 ? urlPath.slice(0, hashIndex) : urlPath;

    const queryIndex = mainPath.indexOf('?');
    const query = queryIndex !== -1 ? mainPath.slice(queryIndex) : '';
    if (queryIndex !== -1) {
        mainPath = mainPath.slice(0, queryIndex);
    }

    // Preserve plain hash-only links
    if (urlPath.startsWith('#')) {
        return urlPath;
    }

    // Strip leading locale prefix if present (/nl/, /es/, /en/)
    let stripped = mainPath;
    if (stripped.startsWith('/nl/')) stripped = stripped.slice(3);
    else if (stripped.startsWith('/es/')) stripped = stripped.slice(3);
    else if (stripped.startsWith('/en/')) stripped = stripped.slice(3);

    if (stripped.startsWith('nl/')) stripped = '/' + stripped.slice(3);
    else if (stripped.startsWith('es/')) stripped = '/' + stripped.slice(3);
    else if (stripped.startsWith('en/')) stripped = '/' + stripped.slice(3);

    // Normalize leading slash
    if (!stripped.startsWith('/') && !stripped.startsWith('#')) {
        stripped = '/' + stripped;
    }

    if (stripped === '' || stripped === '/') {
        const prefix = loc === 'en' ? '/' : `/${loc}/`;
        return `${prefix}${query}${hash}`;
    }

    // Handle Industry routes (e.g., /industries/dentists, /industries/tandartsen, /industries/dentistas)
    const indMatch = stripped.match(/^\/industries\/([^\/]+)/);
    if (indMatch) {
        const slug = indMatch[1].replace('.html', '');
        const ind = getIndustryBySlug(slug, loc);
        if (ind) {
            const locPath = getLocalizedPath(ind.id, loc);
            return `${locPath}${query}${hash}`;
        }
        const prefix = loc === 'en' ? '' : `/${loc}`;
        return `${prefix}/industries/${slug}/${query}${hash}`;
    }

    // Handle Resources routes (e.g., /resources, /resources/how-to-reply-to-google-reviews-automatically)
    if (stripped.startsWith('/resources')) {
        const prefix = loc === 'en' ? '' : `/${loc}`;
        return `${prefix}${stripped}${query}${hash}`;
    }

    // Root path
    if (stripped === '/index.html') {
        const prefix = loc === 'en' ? '/' : `/${loc}/`;
        return `${prefix}${query}${hash}`;
    }

    // Handle main site static HTML pages (/pricing.html, /privacy.html, /terms.html, /cookie.html, /demo.html)
    let pageName = stripped.startsWith('/') ? stripped.slice(1) : stripped;
    if (!pageName.endsWith('.html') && !pageName.includes('.')) {
        pageName += '.html';
    }

    const prefix = loc === 'en' ? '' : `/${loc}`;
    return `${prefix}/${pageName}${query}${hash}`;
}

/**
 * Sweeps an HTML content string and rewrites internal href attributes for the target locale.
 * Respects data-no-localize and language switcher classes to never break cross-language links.
 */
function localizeAllHtmlLinks(htmlContent, targetLocale) {
    if (!htmlContent) return htmlContent;
    const loc = targetLocale || 'en';

    return htmlContent.replace(/<a\b([^>]*)\bhref=(["'])([^"']*)\2([^>]*)>/gi, (match, before, quote, hrefValue, after) => {
        const fullTag = before + ' ' + after;
        if (fullTag.includes('data-no-localize') ||
            fullTag.includes('lang-item') ||
            fullTag.includes('mobile-lang-opt')) {
            return match;
        }

        if (!hrefValue || isExternal(hrefValue) || isStaticAsset(hrefValue)) {
            return match;
        }

        // On-page anchor links (e.g. #pricing, #faq) shouldn't force page jumps
        if (hrefValue.startsWith('#')) {
            return match;
        }

        const newHref = localizePath(hrefValue, loc);
        return `<a${before}href=${quote}${newHref}${quote}${after}>`;
    });
}

module.exports = {
    isStaticAsset,
    isExternal,
    localizePath,
    localizeAllHtmlLinks
};
