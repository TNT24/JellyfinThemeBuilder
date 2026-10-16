// Builds tests/fixtures/jellyfin-web-10.10-focus.js from a jellyfin-web release-10.10.z checkout: the dark theme's
// focus and button rules plus the element styles they combine with (emby-button, emby-tabs, guide), verbatim.
import fs from 'fs';
import path from 'path';
const [src, out] = process.argv.slice(2);
const blocks = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '').split('}').map(b => b.trim()).filter(b => b.includes('{')).map(b => b + '\n}');
const wanted = (sel) => /focus|^\s*\.(button-submit|raised|fab|emby-button|button-flat|emby-tab-button|paper-icon-button-light)\b|^\s*html\b/m.test(sel);
const pick = (file, filter) => blocks(fs.readFileSync(path.join(src, file), 'utf8')).filter(b => filter(b.split('{')[0]) && !/[@$&]/.test(b.split('{')[0]) && !/@include|\$/.test(b));
const parts = [
    ['themes/dark/theme.css', wanted],
    // The base blocks too: they make buttons transparent, or the test sees the browser's own grey button background.
    ['elements/emby-button/emby-button.scss', s => /show-focus|^\s*\.(button-flat|paper-icon-button-light|emby-button)\s*$/m.test(s)],
    ['elements/emby-tabs/emby-tabs.scss', s => /^\s*\.emby-tab-button(\.show-focus:focus)?\s*$/m.test(s)],
    ['components/guide/guide.scss', s => /guide-date-tab-button/.test(s)]
];
let css = '';
for (const [file, f] of parts) css += `/* ${file} */\n` + pick(file, f).join('\n') + '\n';
fs.writeFileSync(out, `// The focus and button rules of jellyfin-web release-10.10.z (the web client Tizen and webOS apps bundle), copied
// verbatim for the focus-contrast tests: themes/dark/theme.css, emby-button.scss, emby-tabs.scss, guide.scss.
// jellyfin-web is GPL-2.0 (https://github.com/jellyfin/jellyfin-web). Regenerate with tools/make-focus-fixture.mjs.
window.JF_1010_FOCUS_CSS = ${JSON.stringify(css)};\n`);
console.log(css.length + ' chars, ' + (css.match(/\{/g) || []).length + ' rules');
