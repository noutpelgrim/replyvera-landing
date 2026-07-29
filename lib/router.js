/**
 * Centralized Multilingual Router Module for ReplyVera
 * Ensures consistent localized route generation across all components,
 * build scripts, dynamic templates, and navigation menus.
 */

const LOCALES = ['en', 'es', 'nl'];
const DEFAULT_LOCALE = 'en';

const STATIC_ASSET_EXTENSIONS = [
    '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
    '.webp', '.woff', '.woff2', '.ttf', '.eot', '.pdf', '.zip', '.xml', '.json'
];

/**
 * Checks if a URL path points to a static file asset.
 * @param {string} path - URL path
 * @returns {boolean} True if static asset
 */
function isStaticAsset(path) {
    if (!path) return false;
    const clean = path.split('?')[0].split('#')[0].toLowerCase();
    return STATIC_ASSET_EXTENSIONS.some(ext => clean.endsWith(ext));
}

/**
 * Localizes a path string based on the active locale.
 * @param {string} path - Target path or URL (e.g. "/pricing.html", "/industries/dentists", "#pricing")
 * @param {string} locale - Target locale ("en", "es", "nl")
 * @returns {string} Localized URL path
 */
function localizePath(path, locale) {
    if (!path) return path;
    const targetLocale = (locale && LOCALES.includes(locale)) ? locale : DEFAULT_LOCALE;
    
    // Ignore external URLs, mailto, tel, javascript
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('javascript:')) {
        return path;
    }

    // Ignore static asset files (css, js, images, fonts, pdfs, etc.)
    if (isStaticAsset(path)) {
        // Strip any accidental lang prefix from static assets
        let cleanAsset = path;
        if (cleanAsset.startsWith('/nl/')) cleanAsset = '/' + cleanAsset.substring(4);
        else if (cleanAsset.startsWith('/es/')) cleanAsset = '/' + cleanAsset.substring(4);
        return cleanAsset;
    }
    
    // Normalize path: strip existing locale prefix if present
    let cleanPath = path;

    if (cleanPath.startsWith('/nl/')) cleanPath = cleanPath.substring(3);
    else if (cleanPath.startsWith('nl/')) cleanPath = '/' + cleanPath.substring(3);
    else if (cleanPath.startsWith('/es/')) cleanPath = cleanPath.substring(3);
    else if (cleanPath.startsWith('es/')) cleanPath = '/' + cleanPath.substring(3);
    else if (cleanPath === '/nl' || cleanPath === 'nl' || cleanPath === '/es' || cleanPath === 'es') cleanPath = '/';

    if (cleanPath === 'index.html' || cleanPath === '/index.html') {
        cleanPath = '/index.html';
    } else if (cleanPath === '/' || cleanPath === '') {
        cleanPath = '/index.html';
    } else if (!cleanPath.startsWith('/') && !cleanPath.startsWith('#')) {
        cleanPath = '/' + cleanPath;
    }

    // Default locale (EN) uses un-prefixed routes
    if (targetLocale === DEFAULT_LOCALE) {
        if (cleanPath.startsWith('#')) {
            return `/index.html${cleanPath}`;
        }
        return cleanPath;
    }

    // Localized routes (NL, ES)
    if (cleanPath.startsWith('#')) {
        return `/${targetLocale}/index.html${cleanPath}`;
    }

    return `/${targetLocale}${cleanPath}`;
}

/**
 * Parses an HTML string and localizes all internal href attributes.
 * @param {string} htmlContent - Raw HTML string
 * @param {string} locale - Active target locale ("en", "es", "nl")
 * @returns {string} Fully localized HTML string
 */
function localizeAllHtmlLinks(htmlContent, locale) {
    if (!htmlContent) return htmlContent;
    const targetLocale = (locale && LOCALES.includes(locale)) ? locale : DEFAULT_LOCALE;

    // Match all href="..." or href='...'
    return htmlContent.replace(/href=["']([^"']+)["']/g, (match, hrefValue) => {
        if (hrefValue.startsWith('http://') || hrefValue.startsWith('https://') || hrefValue.startsWith('mailto:') || hrefValue.startsWith('tel:') || hrefValue.startsWith('javascript:')) {
            return match;
        }

        const newHref = localizePath(hrefValue, targetLocale);
        return `href="${newHref}"`;
    });
}

module.exports = {
    LOCALES,
    DEFAULT_LOCALE,
    isStaticAsset,
    localizePath,
    localizeAllHtmlLinks
};
