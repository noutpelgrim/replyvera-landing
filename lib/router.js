/**
 * ReplyVera Centralized Router & Link Localizer Module
 * Ensures every internal link, menu item, button, and footer link maintains the user's active locale.
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

    // Handle hash-only paths
    if (stripped === '' || stripped.startsWith('#')) {
        const homePath = loc === 'en' ? '/index.html' : `/${loc}/index.html`;
        return `${homePath}${stripped}${query}${hash}`;
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
        // Fallback for custom industry slug
        const prefix = loc === 'en' ? '' : `/${loc}`;
        return `${prefix}/industries/${slug}${query}${hash}`;
    }

    // Root path
    if (stripped === '/' || stripped === '/index.html') {
        const prefix = loc === 'en' ? '/' : `/${loc}/`;
        return `${prefix}${query}${hash}`;
    }

    // Handle main site static HTML pages (/pricing.html, /privacy.html, /terms.html, /cookie.html)
    let pageName = stripped.startsWith('/') ? stripped.slice(1) : stripped;
    if (!pageName.endsWith('.html') && !pageName.includes('.')) {
        pageName += '.html';
    }

    const prefix = loc === 'en' ? '' : `/${loc}`;
    return `${prefix}/${pageName}${query}${hash}`;
}

/**
 * Sweeps an HTML content string and rewrites all internal href attributes for the target locale.
 */
function localizeAllHtmlLinks(htmlContent, targetLocale) {
    if (!htmlContent) return htmlContent;
    const loc = targetLocale || 'en';

    return htmlContent.replace(/\bhref=(["'])([^"']*)\1/gi, (match, quote, hrefValue) => {
        // Skip external, empty, or static assets
        if (!hrefValue || isExternal(hrefValue) || isStaticAsset(hrefValue)) {
            return match;
        }

        const newHref = localizePath(hrefValue, loc);
        return `href=${quote}${newHref}${quote}`;
    });
}

module.exports = {
    isStaticAsset,
    isExternal,
    localizePath,
    localizeAllHtmlLinks
};
