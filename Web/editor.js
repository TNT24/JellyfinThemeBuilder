(function () {
    if (window.ThemeBuilderInjected) return;
    window.ThemeBuilderInjected = true;

    const pluginId = "__TB_PLUGIN_ID__";
    const TB_VERSION = "__TB_VERSION__";
    const SAVE_COLOR = '#1f9d55';

    const fields = [
        { section: 'Colours' },
        { id: 'AccentColor', label: 'Accent Colour (buttons, tabs, highlights)', type: 'color', default: '#00a4dc' },
        { id: 'BackgroundColor', label: 'Page Background', type: 'color', default: '#101010' },
        { id: 'SurfaceColor', label: 'Menus & Dialogs', type: 'color', default: '#202020' },
        { id: 'EnableOledBlack', label: 'Force True OLED Black', type: 'checkbox', default: false },
        { id: 'AutoAccentFromBackdrop', label: 'Match Accent to Each Title\'s Artwork (details pages, browsers only)', type: 'checkbox', default: false },
        { id: 'AccentSpinner', label: 'Accent-Coloured Loading Spinner', type: 'checkbox', default: true },
        { id: 'GlassMenus', label: 'Frosted Glass Menus & Dialogs', type: 'checkbox', default: false },
        { id: 'GlassOpacity', label: 'Glass Opacity', type: 'range', min: '0.3', max: '1', step: '0.05', default: '0.7' },

        { section: 'Text & Scrollbars' },
        { id: 'CustomFontFamily', label: 'Google Font Name (e.g. Inter)', type: 'text', default: '' },
        { id: 'TextScale', label: 'Text Size (%)', type: 'range', min: '80', max: '130', step: '5', default: '100' },
        { id: 'EnableSlimScrollbars', label: 'Slim Accent Scrollbars', type: 'checkbox', default: true },

        { section: 'Backgrounds' },
        { id: 'AppBackgroundUrl', label: 'App Background Image URL', type: 'text', default: '' },
        { id: 'AppBackgroundDim', label: 'Background Image Darkness', type: 'range', min: '0', max: '1', step: '0.05', default: '0.7' },
        { id: 'AppAccentGlow', label: 'Soft Accent Glow at the Top of Pages', type: 'checkbox', default: false },
        { id: 'BgGradient', label: 'Background Gradient', type: 'select', default: 'off', options: [['off', 'Off (solid page colour)'], ['linear', 'Linear (fade across the page)'], ['radial', 'Radial glow'], ['corners', 'Two corner glows (Disney+)']] },
        { id: 'BgGradientColor1', label: 'Gradient Colour 1', type: 'color', default: '#1f3a6e' },
        { id: 'BgGradientColor2', label: 'Gradient Colour 2', type: 'color', default: '#101010' },
        { id: 'BgGradientStrength', label: 'Gradient Strength', type: 'range', min: '0.1', max: '1', step: '0.05', default: '0.6' },
        { id: 'BgGradientAngle', label: 'Gradient Angle (linear, degrees)', type: 'range', min: '0', max: '360', step: '15', default: '180' },
        { id: 'BgGradientPosition', label: 'Glow Position (radial)', type: 'select', default: 'top', options: [['top', 'Top'], ['top left', 'Top left'], ['top right', 'Top right'], ['center', 'Centre'], ['bottom', 'Bottom']] },
        { id: 'TvPlainBackground', label: 'Plain Background on TV (no image, glow or gradient)', type: 'checkbox', default: false },
        { id: 'BackdropDim', label: 'Title Backdrop Darkness (when Backdrops are on in Display settings)', type: 'range', min: '0', max: '1', step: '0.02', default: '0.86' },
        { id: 'BackdropBlur', label: 'Title Backdrop Blur (px)', type: 'range', min: '0', max: '20', step: '1', default: '0' },

        { section: 'Top Bar' },
        { id: 'HeaderColor', label: 'Top Navigation Bar Colour', type: 'color', default: '#000000' },
        { id: 'HeaderOpacity', label: 'Top Bar Opacity', type: 'range', min: '0', max: '1', step: '0.05', default: '0.8' },
        { id: 'HeaderBlur', label: 'Header Blur (px)', type: 'range', min: '0', max: '30', step: '1', default: '15' },
        { id: 'HeaderTransparentTop', label: 'Transparent Top Bar Until You Scroll (browsers only)', type: 'checkbox', default: false },
        { id: 'TopBarLayout', label: 'Top Bar Layout', type: 'select', default: 'default', options: [['default', 'Logo and tabs on the left'], ['centered', 'Logo and tabs centred (Apple TV+)']] },
        { id: 'HeaderButtonPadding', label: 'Extra Side Padding: Icon Buttons (em)', type: 'range', min: '0', max: '1.5', step: '0.1', default: '0' },
        { id: 'HeaderTabPadding', label: 'Extra Side Padding: Library Tabs (em)', type: 'range', min: '0', max: '2', step: '0.1', default: '0' },
        { id: 'HeaderLogoUrl', label: 'Custom Header Logo URL', type: 'text', default: '' },
        { id: 'HeaderLogoHeight', label: 'Logo Height (em)', type: 'range', min: '1', max: '5', step: '0.5', default: '2' },
        { id: 'AccentProfileIcon', label: 'Accent-Coloured Profile Icon', type: 'checkbox', default: true },
        { id: 'HideHeaderSearch', label: 'Hide Search Icon', type: 'checkbox', default: false },
        { id: 'HideHeaderCast', label: 'Hide Cast / Play-On Icon', type: 'checkbox', default: false },
        { id: 'HideHeaderSyncPlay', label: 'Hide SyncPlay Icon', type: 'checkbox', default: false },

        { section: 'Home Screen' },
        { id: 'HomeTitleScale', label: 'Row Title Size (%)', type: 'range', min: '70', max: '160', step: '5', default: '100' },
        { id: 'HomeTitleAlign', label: 'Row Title Alignment', type: 'select', default: 'left', options: [['left', 'Left'], ['center', 'Centred']] },
        { id: 'HomeTitleIndent', label: 'Extra Row Title Indent (em)', type: 'range', min: '0', max: '3', step: '0.25', default: '0' },
        { id: 'HomeRowSpacing', label: 'Extra Space Between Rows (em)', type: 'range', min: '0', max: '4', step: '0.25', default: '0' },
        { id: 'HideMyMediaRow', label: 'Hide "My Media" Library Row (browsers and TVs from 2023 on)', type: 'checkbox', default: false },
        { id: 'HideMyMediaTitles', label: 'Hide Titles Under "My Media" Tiles', type: 'checkbox', default: false },
        { id: 'HideRowSeeAll', label: 'Hide Row Title Arrows (›)', type: 'checkbox', default: false },

        { section: 'Cards & Posters' },
        { id: 'PosterSize', label: 'Poster Size', type: 'select', default: 'default', options: [['small', 'Small (more per row)'], ['default', 'Medium (Jellyfin default)'], ['large', 'Large (Disney+)'], ['xlarge', 'Extra large (Apple TV+)']] },
        { id: 'BorderRadius', label: 'Corner Radius (em)', type: 'range', min: '0', max: '2', step: '0.1', default: '0.2' },
        { id: 'SeparateWideRadius', label: 'Different Corner Radius for Wide Tiles', type: 'checkbox', default: false },
        { id: 'WideTileRadius', label: 'Wide Tile Corner Radius (em)', type: 'range', min: '0', max: '2', step: '0.1', default: '0.2' },
        { id: 'GridSpacing', label: 'Poster Spacing (em)', type: 'range', min: '0', max: '2', step: '0.1', default: '0.5' },
        { id: 'EnableCardShadow', label: 'Drop Shadow Under Cards', type: 'checkbox', default: false },
        { id: 'CardBorderWidth', label: 'Card Border Width (px, 0 = none)', type: 'range', min: '0', max: '4', step: '1', default: '0' },
        { id: 'CardBorderColor', label: 'Card Border Colour', type: 'color', default: '#ffffff' },
        { id: 'CardBorderOpacity', label: 'Card Border Opacity', type: 'range', min: '0.1', max: '1', step: '0.05', default: '0.25' },
        { id: 'EnableHoverZoom', label: 'Zoom Cards on Hover', type: 'checkbox', default: true },
        { id: 'EnableHoverGlow', label: 'Accent Glow on Hover', type: 'checkbox', default: false },
        { id: 'GlowSize', label: 'Hover Glow Size (px)', type: 'range', min: '0', max: '40', step: '1', default: '14' },

        { section: 'Card Titles' },
        { id: 'HideCardTitles', label: 'Hide Titles Under Cards', type: 'checkbox', default: false },
        { id: 'CardTitlePosition', label: 'Title Position', type: 'select', default: 'below', options: [['below', 'Below the poster'], ['overlay', 'On the poster (Apple TV+)'], ['overlayHover', 'On the poster, only on hover / focus (Netflix)']] },
        { id: 'CardTitleLines', label: 'Card Title Lines', type: 'select', default: '1', options: [['1', 'One line (cut off with …)'], ['2', 'Up to two lines']] },
        { id: 'CardTitleAlign', label: 'Card Title Alignment', type: 'select', default: 'center', options: [['center', 'Centred'], ['left', 'Left']] },
        { id: 'CardTitleBold', label: 'Bold Card Titles', type: 'checkbox', default: false },

        { section: 'Card Buttons (⋮ menu, played, favourite, play)' },
        { id: 'HideCardOverlayButtons', label: 'Hide Card Buttons (shown on hover)', type: 'checkbox', default: false },
        { id: 'CardButtonColor', label: 'Button Icon Colour', type: 'color', default: '#ffffff' },
        { id: 'CardButtonPlayedColor', label: 'Played Tick Colour (when marked played)', type: 'color', default: '#00a4dc' },
        { id: 'CardButtonFavoriteColor', label: 'Favourite Heart Colour (when favourited)', type: 'color', default: '#cc3333' },
        { id: 'CardButtonBgOpacity', label: 'Button Background Darkness', type: 'range', min: '0', max: '1', step: '0.05', default: '0' },
        { id: 'CardButtonGlow', label: 'Glowing Buttons (each glows in its own colour)', type: 'checkbox', default: false },

        { section: 'Watched & Progress' },
        { id: 'LinkWatchedToAccent', label: 'Watched Badge Uses Accent Colour', type: 'checkbox', default: true },
        { id: 'WatchedIndicatorColor', label: 'Watched Badge Colour', type: 'color', default: '#00a4dc' },
        { id: 'AutoBadgeText', label: 'Badge Text Colour: Automatic (black or white)', type: 'checkbox', default: true },
        { id: 'BadgeTextColor', label: 'Badge Text Colour (play count & tick)', type: 'color', default: '#ffffff' },
        { id: 'WatchedDim', label: 'Dim Watched Items', type: 'range', min: '0', max: '0.8', step: '0.05', default: '0' },
        { id: 'ProgressTrackerColor', label: 'Progress Bar Colour', type: 'color', default: '#00a4dc' },
        { id: 'ProgressPosition', label: 'Progress Bar Position', type: 'select', default: 'bottom', options: [['bottom', 'Along the bottom edge'], ['inset', 'Floating inside the poster (Disney+ / Apple TV+)'], ['top', 'Along the top edge']] },
        { id: 'BadgePosition', label: 'Watched Badge Position', type: 'select', default: 'topRight', options: [['topRight', 'Top right'], ['topLeft', 'Top left']] },
        { id: 'ProgressBarHeight', label: 'Progress Bar Thickness (em)', type: 'range', min: '0.1', max: '0.8', step: '0.02', default: '0.28' },
        { id: 'ProgressTrackerRadius', label: 'Progress Bar Rounding (em)', type: 'range', min: '0', max: '1', step: '0.1', default: '0' },

        { section: 'Library Pages' },
        { id: 'HidePlayAll', label: 'Hide "Play All" Button', type: 'checkbox', default: false },
        { id: 'HideShuffle', label: 'Hide "Shuffle" Button', type: 'checkbox', default: false },
        { id: 'HideAlphaPicker', label: 'Hide A–Z Letter Picker', type: 'checkbox', default: false },

        { section: 'Detail Page: Banner & Title' },
        { id: 'BannerDim', label: 'Banner Darkness', type: 'range', min: '0', max: '0.9', step: '0.05', default: '0' },
        { id: 'BannerBlur', label: 'Banner Blur (px)', type: 'range', min: '0', max: '20', step: '1', default: '0' },
        { id: 'RibbonOpacity', label: 'Title Ribbon Background Opacity (uses Menus colour)', type: 'range', min: '0', max: '1', step: '0.05', default: '0.8' },
        { id: 'DetailTitleScale', label: 'Title Size (%)', type: 'range', min: '60', max: '140', step: '5', default: '100' },
        { id: 'HideDetailPoster', label: 'Hide Poster', type: 'checkbox', default: false },
        { id: 'DetailPosterSide', label: 'Poster Side (desktop & TV)', type: 'select', default: 'left', options: [['left', 'Left'], ['right', 'Right']] },
        { id: 'DetailAlign', label: 'Title, Info & Buttons Alignment', type: 'select', default: 'left', options: [['left', 'Left (Netflix)'], ['center', 'Centred, logo on top (Apple TV+)']] },
        { id: 'HideDetailLogo', label: 'Hide Title Logo Image', type: 'checkbox', default: false },

        { section: 'Detail Page: Info' },
        { id: 'HideDetailMiscInfo', label: 'Hide Secondary Info Line (end time, etc.)', type: 'checkbox', default: false },
        { id: 'HideGenres', label: 'Hide Genres', type: 'checkbox', default: false },
        { id: 'HideTagline', label: 'Hide Tagline', type: 'checkbox', default: false },
        { id: 'HideDetailsGroup', label: 'Hide Director / Writer / Studio List', type: 'checkbox', default: false },
        { id: 'HideTags', label: 'Hide Tags', type: 'checkbox', default: false },
        { id: 'HideExternalLinks', label: 'Hide External Links (IMDb, TMDB…)', type: 'checkbox', default: false },
        { id: 'HideTrackSelects', label: 'Hide Version / Audio / Subtitle Dropdowns', type: 'checkbox', default: false },
        { id: 'HideAudioLanguages', label: 'Hide Audio Languages on Details Page (Jellyfin Enhanced)', type: 'checkbox', default: false },

        { section: 'Detail Page: Buttons' },
        { id: 'AccentDetailButtons', label: 'Accent-Coloured Detail Buttons (Play, Trailer…)', type: 'checkbox', default: true },
        { id: 'FilledPlayButton', label: 'Solid Accent Play / Resume Button', type: 'checkbox', default: false },
        { id: 'HideTrailerBtn', label: 'Hide Trailer', type: 'checkbox', default: false },
        { id: 'HideDownloadBtn', label: 'Hide Download', type: 'checkbox', default: false },
        { id: 'HideInstantMixBtn', label: 'Hide Instant Mix', type: 'checkbox', default: false },
        { id: 'HideSplitBtn', label: 'Hide Split Versions', type: 'checkbox', default: false },
        { id: 'HidePlayedBtn', label: 'Hide Mark Played', type: 'checkbox', default: false },
        { id: 'HideMoreBtn', label: 'Hide ⋮ More (also hides Edit Metadata, Edit Images, Identify and Delete there)', type: 'checkbox', default: false },

        { section: 'Detail Page: Sections (hides heading too)' },
        { id: 'HideCastCrew', label: 'Hide Cast & Crew (incl. Guest Stars)', type: 'checkbox', default: false },
        { id: 'HideNextUp', label: 'Hide Next Up', type: 'checkbox', default: false },
        { id: 'NextUpLayout', label: 'Next Up Layout (series pages)', type: 'select', default: 'featured', options: [['featured', 'Large, details beside the image (Apple TV+)'], ['default', 'Small card (Jellyfin default)']] },
        { id: 'HideMoreFrom', label: 'Hide "More From Season / Artist"', type: 'checkbox', default: false },
        { id: 'HideSpecials', label: 'Hide Special Features', type: 'checkbox', default: false },
        { id: 'HideScenes', label: 'Hide Scenes / Chapters', type: 'checkbox', default: false },
        { id: 'HideSimilar', label: 'Hide More Like This', type: 'checkbox', default: false },
        { id: 'HideCollections', label: 'Hide Collections / Music Videos / Extra Parts', type: 'checkbox', default: false },

        { section: 'Episode Lists' },
        { id: 'HideEpisodeOverview', label: 'Hide Episode Descriptions', type: 'checkbox', default: false },
        { id: 'EpisodeThumbScale', label: 'Episode Thumbnail Size (%)', type: 'range', min: '60', max: '160', step: '10', default: '100' },

        { section: 'Ratings & Badges (all pages)' },
        { id: 'HideRatings', label: 'Hide Star & Critic Ratings', type: 'checkbox', default: false },
        { id: 'HideAgeRating', label: 'Hide Age Rating (PG-13, 15, TV-MA…)', type: 'checkbox', default: false },
        { id: 'HideLikeDislike', label: 'Hide Favourite (Heart) Button', type: 'checkbox', default: false },
        { id: 'HideLanguageFlags', label: 'Hide Language Flags (Jellyfin Enhanced)', type: 'checkbox', default: false },

        { section: 'Video Player' },
        { id: 'AccentPlayer', label: 'Accent Player Timeline, Volume & Sliders', type: 'checkbox', default: true },
        { id: 'AccentPlayerButtons', label: 'Accent Player Buttons (pause, skip, rewind…)', type: 'checkbox', default: false },
        { id: 'SubtitleStyle', label: 'Subtitle Style', type: 'select', default: 'default', options: [
            ['default', 'Default (each user\'s subtitle settings)'], ['outline', 'White with black outline'],
            ['yellow', 'Yellow with black outline'], ['boxed', 'White on dark box'], ['bold', 'Bold white with outline'] ] },
        { id: 'SubtitleScale', label: 'Subtitle Size (%)', type: 'range', min: '50', max: '200', step: '10', default: '100' },

        { section: 'Login Page' },
        { id: 'LoginBackgroundUrl', label: 'Background Image URL', type: 'text', default: '' },
        { id: 'LoginBackgroundBlur', label: 'Background Blur (px)', type: 'range', min: '0', max: '20', step: '1', default: '0' },
        { id: 'LoginLogoUrl', label: 'Logo Image URL (above the form)', type: 'text', default: '' },
        { id: 'LoginWelcomeText', label: 'Welcome Text', type: 'text', default: '' },
        { id: 'HideForgotPassword', label: 'Hide "Forgot Password" Button', type: 'checkbox', default: false },

        { section: 'Night Mode (browsers only)' },
        { id: 'NightMode', label: 'Dim the App at Night', type: 'checkbox', default: false },
        { id: 'NightStart', label: 'Night Starts (hour, 24h)', type: 'range', min: '0', max: '23', step: '1', default: '22' },
        { id: 'NightEnd', label: 'Night Ends (hour, 24h)', type: 'range', min: '0', max: '23', step: '1', default: '7' },
        { id: 'NightDim', label: 'Night Dimming', type: 'range', min: '0', max: '0.6', step: '0.05', default: '0.2' },
        { id: 'NightOled', label: 'Use True Black at Night', type: 'checkbox', default: true },

        { section: 'User Themes' },
        { id: 'AllowUserThemes', label: 'Let Every User Pick a Personal Theme (adds "My Theme" to their menu; TV apps use the server theme)', type: 'checkbox', default: false }
    ];

    // Saving plugin configuration needs an administrator, so the editor is only offered to admins.
    let isAdmin = false;
    let checkedUserId = null;
    let panelBuilt = false;
    let loadedConfig = null;

    const el = (id) => document.getElementById('tb_' + id);

    function readValues() {
        const v = {};
        fields.forEach(f => {
            if (f.section) return;
            v[f.id] = f.type === 'checkbox' ? el(f.id).checked : el(f.id).value;
        });
        return v;
    }

    function writeValues(v) {
        fields.forEach(f => {
            if (f.section) return;
            const val = v[f.id] !== undefined && v[f.id] !== null ? v[f.id] : f.default;
            if (f.type === 'checkbox') el(f.id).checked = (val === true || val === 'true');
            else el(f.id).value = val;
        });
    }

    // Black or white, whichever is more readable on the given background colour.
    function contrastText(hex) {
        const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
        if (!m) return '#ffffff';
        const n = parseInt(m[1], 16);
        const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
        const lum = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
        // Pick whichever of black/white gives the higher WCAG contrast ratio.
        return (lum + 0.05) / 0.05 > 1.05 / (lum + 0.05) ? '#000000' : '#ffffff';
    }

    // WCAG relative luminance and contrast ratio (1 to 21) of #rrggbb colours.
    function luminance(hex) {
        const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
        if (!m) return 0;
        const n = parseInt(m[1], 16);
        const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
        return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
    }

    function contrastRatio(a, b) {
        const la = luminance(a), lb = luminance(b);
        return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
    }

    // The colour itself when it reads on the background (3:1, the WCAG minimum for large text and icons); otherwise
    // mixed towards white or black, whichever gets there first.
    function readableOn(hex, bg) {
        if (contrastRatio(hex, bg) >= 3) return hex;
        const dir = luminance(bg) < 0.18 ? 1 : -1;
        for (let t = 0.1; t <= 1.001; t += 0.1) {
            const c = shade(hex, dir * t);
            if (contrastRatio(c, bg) >= 3) return c;
        }
        return dir > 0 ? '#ffffff' : '#000000';
    }

    function rgba(hex, alpha) {
        const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
        const n = m ? parseInt(m[1], 16) : 0;
        return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
    }

    // "r g b", the format of the web client's --jf-palette-*Channel variables.
    function channels(hex) {
        const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
        const n = m ? parseInt(m[1], 16) : 0;
        return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
    }

    // Mix a colour towards black (amount < 0) or white (amount > 0).
    function shade(hex, amount) {
        const target = amount < 0 ? 0 : 255, t = Math.abs(amount);
        return '#' + channels(hex).split(' ').map(c => Math.round(Number(c) + (target - Number(c)) * t).toString(16).padStart(2, '0')).join('');
    }

    function watchedColorOf(v) {
        const accent = v.AccentColor || '#00a4dc';
        return v.LinkWatchedToAccent ? accent : (v.WatchedIndicatorColor || accent);
    }

    function badgeTextOf(v) {
        return v.AutoBadgeText ? contrastText(watchedColorOf(v)) : (v.BadgeTextColor || '#ffffff');
    }

    // Whole-app background layers, top first: accent glow, then the image under its darkening layer, then the
    // gradient. Shared by the saved CSS and the editor preview.
    function backgroundLayers(v) {
        const accent = v.AccentColor || '#00a4dc';
        const s = Number(v.BgGradientStrength);
        const c1 = rgba(v.BgGradientColor1, s), c2 = rgba(v.BgGradientColor2, s);
        const layers = [];
        if (v.AppAccentGlow) layers.push(`radial-gradient(ellipse at top, ${rgba(accent, 0.22)} 0%, transparent 60%)`);
        if (v.AppBackgroundUrl) layers.push(`linear-gradient(rgba(0,0,0,${v.AppBackgroundDim}), rgba(0,0,0,${v.AppBackgroundDim}))`, `url('${cssStr(v.AppBackgroundUrl)}') center / cover no-repeat`);
        if (v.BgGradient === 'linear') layers.push(`linear-gradient(${Number(v.BgGradientAngle)}deg, ${c1} 0%, ${c2} 100%)`);
        if (v.BgGradient === 'radial') layers.push(`radial-gradient(ellipse at ${v.BgGradientPosition}, ${c1} 0%, ${c2} 75%)`);
        if (v.BgGradient === 'corners') layers.push(`radial-gradient(ellipse at top left, ${c1} 0%, transparent 55%)`, `radial-gradient(ellipse at bottom right, ${c2} 0%, transparent 55%)`);
        return layers;
    }

    // Positioning and layout options. Written without :is(), :has() or inset so older TVs keep every rule.
    const POSTER_WIDTHS = {
        // Target card widths in em for each size; grids get as many per row as fit.
        portrait: { small: 8, large: 14, xlarge: 17.5 },
        backdrop: { small: 14, large: 24, xlarge: 30 },
        smallBackdrop: { small: 11, large: 18, xlarge: 22 }
    };

    function layoutCss(v) {
        const r = v.BorderRadius;
        let css = '';

        // Poster size. Scrolling rows get a fixed width; grids get "as many as fit" breakpoints
        // (card em ≈ media-query em, so N cards of T em fit from a viewport of about N × T em).
        const size = v.PosterSize;
        if (POSTER_WIDTHS.portrait[size]) {
            const shapes = [
                [['.portraitCard', '.squareCard'], ['.overflowPortraitCard', '.overflowSquareCard'], POSTER_WIDTHS.portrait[size]],
                [['.backdropCard'], ['.overflowBackdropCard'], POSTER_WIDTHS.backdrop[size]],
                [['.smallBackdropCard'], ['.overflowSmallBackdropCard'], POSTER_WIDTHS.smallBackdrop[size]]
            ];
            shapes.forEach(([grid, overflow, t]) => {
                css += `${overflow.join(', ')} { width: ${t}em !important; }\n`;
                const sel = grid.map(g => `.vertical-wrap > ${g}`).join(', ');
                css += `${sel} { width: 50% !important; }\n`;
                for (let n = 3; n * t <= 260; n++) css += `@media (min-width: ${n * t}em) { ${sel} { width: ${(100 / n).toFixed(4)}% !important; } }\n`;
                // TV text is 125% instead of 93%, so its cards are that much wider per em and fewer fit per row;
                // without this, TV grid posters came out smaller than the same size in TV rows.
                const tvSel = grid.map(g => `.layout-tv .vertical-wrap > ${g}`).join(', ');
                const tvT = t * 1.25 / 0.93;
                css += `${tvSel} { width: 50% !important; }\n`;
                for (let n = 3; n * tvT <= 260; n++) css += `@media (min-width: ${(n * tvT).toFixed(2)}em) { ${tvSel} { width: ${(100 / n).toFixed(4)}% !important; } }\n`;
            });
        }

        // Card titles on the poster: a dark fade at the bottom of the artwork, optionally only on hover / focus.
        if (v.CardTitlePosition === 'overlay' || v.CardTitlePosition === 'overlayHover') {
            css += `.cardBox { position: relative; }
.card:not(.imageEditorCard) .cardFooter { position: absolute !important; left: 0; right: 0; bottom: 0; z-index: 4; padding: 2.2em 0.6em 0.5em 0.6em !important; background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0)) !important; border-radius: 0 0 ${r}em ${r}em; pointer-events: none; }
.card:not(.imageEditorCard) .cardFooter .cardText { color: #fff !important; text-shadow: 0 1px 3px rgba(0,0,0,0.8); }
.card:not(.imageEditorCard) .cardFooter button, .card:not(.imageEditorCard) .cardFooter a { pointer-events: auto; }
/* Keep the progress bar visible above the fade, with the titles sitting just above it. */
.cardScalable { contain: none !important; }
.innerCardFooter.innerCardFooterClear { z-index: 5; }
.card:not(.imageEditorCard) .cardFooter { padding-bottom: ${v.ProgressPosition === 'inset' ? '1.6em' : '0.9em'} !important; }
/* TVs put a 0.5em focus border around the poster, so keep the fade inside the image. */
.card.show-focus:not(.show-animation):not(.imageEditorCard) .cardBox:not(.visualCardBox) .cardFooter { left: 0.5em !important; right: 0.5em !important; bottom: 0.5em !important; }\n`;
            if (v.CardTitlePosition === 'overlayHover') {
                // Touch screens have no hover, so they keep the titles showing.
                css += `@media (hover: hover) and (pointer: fine) { .card:not(.imageEditorCard) .cardFooter { opacity: 0; transition: opacity 0.2s ease; } .card:hover .cardFooter, .card:focus-within .cardFooter { opacity: 1; } }
.layout-tv .card:not(.imageEditorCard) .cardFooter { opacity: 0; transition: opacity 0.2s ease; }
.layout-tv .card:focus .cardFooter { opacity: 1; }\n`;
            }
        }

        // Watched badge and progress bar.
        if (v.BadgePosition === 'topLeft') css += `.cardIndicators { left: 0.225em !important; right: auto !important; }\n`;
        if (v.ProgressPosition === 'inset') css += `.innerCardFooter.innerCardFooterClear { left: 8% !important; right: 8% !important; bottom: 7% !important; overflow: visible; }\n`;
        if (v.ProgressPosition === 'top') css += `.innerCardFooter.innerCardFooterClear { top: 0 !important; bottom: auto !important; }\n`;

        // Home screen row titles. Titles sit in .sectionTitleContainer-cards, or stand alone (My Media).
        const rowTitles = '.homeSectionsContainer .sectionTitleContainer, .homeSectionsContainer .sectionTitle-cards';
        if (v.HomeTitleAlign === 'center') css += `${rowTitles} { text-align: center !important; }\n`;
        if (Number(v.HomeTitleIndent) > 0) css += `.homeSectionsContainer .sectionTitle-cards, .homeSectionsContainer .sectionTitleContainer-cards > a { margin-left: ${v.HomeTitleIndent}em !important; }\n`;

        // Detail page: the poster floats beside the text, which is padded 32.45vw to make room for it.
        // Newer clients pad .detailRibbon and .detailPagePrimaryContent. Older ones (bundled in TV apps) pad
        // .detailPagePrimaryContainer (10.10, the one with .padded-left; in 10.11+ it holds the ribbon) and
        // .detailPageContent, which in 10.10 wraps .detailPagePrimaryContent, so that one mustn't pad again.
        const deskTv = (s) => `.layout-desktop .itemDetailPage ${s}, .layout-tv .itemDetailPage ${s}`;
        const textAreas = ['.detailRibbon', '.detailPagePrimaryContent', '.detailPagePrimaryContainer.padded-left', '.detailPageContent'].map(deskTv).join(', ');
        if (v.HideDetailPoster || v.DetailPosterSide === 'right') css += `${deskTv('.detailPageContent .detailPagePrimaryContent')} { padding-left: 0 !important; padding-right: 0 !important; }\n`;
        if (v.HideDetailPoster) {
            // Without the poster, give its space back instead of leaving a gap.
            css += `${textAreas} { padding-left: 3.3% !important; padding-right: 3.3% !important; }\n`;
        } else if (v.DetailPosterSide === 'right') {
            css += `${deskTv('.detailImageContainer .card')} { float: right !important; left: auto !important; }
.layout-desktop .itemDetailPage .detailImageContainer .card { right: 3.3% !important; }
.layout-tv .itemDetailPage .detailImageContainer .card { right: 5% !important; margin-right: 0 !important; margin-left: -25vw !important; }
${textAreas} { padding-left: 3.3% !important; padding-right: 32.45vw !important; }
.layout-desktop .itemDetailPage .detailLogo { right: auto !important; left: 25vw !important; }\n`;
        }
        if (v.DetailAlign === 'center') {
            css += `.itemDetailPage .nameContainer { align-items: center !important; text-align: center !important; }
.itemDetailPage .itemName { white-space: normal !important; text-align: center !important; }
.itemDetailPage .itemMiscInfo, .itemDetailPage .mainDetailButtons { justify-content: center !important; }
.layout-desktop .itemDetailPage .detailLogo { left: 50% !important; right: auto !important; transform: translateX(-50%); }\n`;
        }

        // Next Up on series pages: usually one episode as a small card in a wide empty row. Featured makes it a
        // large image with the episode details beside it (stacked on narrow screens). No flex gap: older TVs lack it.
        if (v.NextUpLayout === 'featured') {
            const nu = '.itemDetailPage .nextUpItems';
            css += `${nu} > .card { width: 100% !important; max-width: 56em; }
${nu} > .card > .cardBox { display: flex; align-items: center; }
${nu} .cardScalable { flex: 0 0 55%; max-width: 55%; }
${nu} .cardFooter { position: static !important; flex: 1 1 auto; min-width: 0; margin-left: 2em; padding: 0.8em 2em 0.8em 0 !important; background: none !important; opacity: 1 !important; }
${nu} .cardText { text-align: left !important; white-space: normal !important; font-size: 1.1em; line-height: 1.4; opacity: 0.8; padding: 0.1em 0 !important; }
${nu} .cardText-first { font-size: 1.45em; font-weight: 600; opacity: 1; line-height: 1.25; margin-bottom: 0.5em; }
@media (max-width: 40em) {
    ${nu} > .card > .cardBox { display: block; }
    ${nu} .cardScalable { max-width: none; }
    ${nu} .cardFooter { margin: 0.8em 0 0 0; padding: 0 0.4em !important; }
}\n`;
        }

        // Edit Images and image search dialogs: their cards use the page's poster widths (a percentage of the
        // whole screen), which comes out tiny inside a dialog. Give each image type a fixed size instead, small
        // enough that a row of cards with their buttons fits in the dialog (an 18.5em-tall image filled it alone).
        // Each card's box has the poster spacing as side margin (2 × spacing in all), which the image doesn't fill,
        // so widths add it on top: card width = image height / image shape + spacing.
        // TV text (the em) is 125% instead of 93%, so the TV layout gets the picture sizes scaled back by that much and
        // shows them the same size on screen; the spacing is in that same em, so it isn't scaled.
        const gap = 2 * Number(v.GridSpacing);
        const imageSizes = (scope, k) => {
            const imgH = 11 * k;
            const n = (x) => Number(x.toFixed(3));
            const w = (ratio) => n(imgH * 100 / ratio + gap);
            const pick = (shape) => `${scope}.vertical-wrap > .imageEditorCard.${shape}Card`;
            // Search results keep a little more width for their provider / size / language lines under the picture.
            let out = `${pick('portrait')} { width: ${Math.max(w(150), n(10 * k))}em !important; max-width: 100%; }
${pick('square')} { width: ${w(100)}em !important; max-width: 100%; }
${pick('backdrop')} { width: ${w(56.25)}em !important; max-width: 100%; }
${pick('banner')} { width: ${n(30 * k)}em !important; max-width: 100%; }\n`;
            // Edit Images shows every type in the same 16:9 box, so a poster came out tiny between empty sides.
            // Give each image type (data-imagetype) a box of its own shape. Posters, discs and 16:9 images (the backdrop
            // rule above) share one height so a row of them lines up. Logos and banners are too wide for that height:
            // logos get about half of it, banners a fixed width.
            const ei = (types, width, ratio) => {
                const cards = types.map(t => `${scope}.vertical-wrap > .imageEditorCard.backdropCard[data-imagetype="${t}"]`);
                return `${cards.join(', ')} { width: ${width}em !important; max-width: 100%; }
${cards.map(c => `${c} .cardPadder-backdrop`).join(', ')} { padding-bottom: ${ratio}% !important; }\n`;
            };
            return out + ei(['Primary', 'Profile', 'Box', 'BoxRear'], w(150), 150) + ei(['Disc'], w(100), 100)
                + ei(['Logo'], n(imgH * 0.55 * 100 / 38 + gap), 38) + ei(['Banner'], n(30 * k), 18.5);
        };
        css += imageSizes('', 1) + imageSizes('.layout-tv ', 0.93 / 1.25);

        // Top bar spacing: extra side padding on top of each button's own (MUI icon buttons 8px, classic 0.556em;
        // MUI tab buttons 8px, MUI view tabs 16px, classic tabs 1.5em). Icon buttons become pills instead of ovals.
        const bp = Number(v.HeaderButtonPadding), tp = Number(v.HeaderTabPadding);
        if (bp > 0) css += `.MuiAppBar-root .MuiIconButton-root { padding-left: calc(8px + ${bp}em) !important; padding-right: calc(8px + ${bp}em) !important; border-radius: 999px !important; }
/* The profile button has no padding of its own (the picture fills it), so it only gets the extra. */
.MuiAppBar-root .MuiIconButton-root:has(.MuiAvatar-root) { padding-left: ${bp}em !important; padding-right: ${bp}em !important; }
.skinHeader .headerButton { padding-left: calc(0.556em + ${bp}em) !important; padding-right: calc(0.556em + ${bp}em) !important; border-radius: 999px !important; }\n`;
        if (tp > 0) css += `.MuiAppBar-root .MuiToolbar-root > .MuiStack-root .MuiButton-root { padding-left: calc(8px + ${tp}em) !important; padding-right: calc(8px + ${tp}em) !important; }
.MuiAppBar-root .MuiTab-root { padding-left: calc(16px + ${tp}em) !important; padding-right: calc(16px + ${tp}em) !important; }
.skinHeader .emby-tab-button { padding-left: calc(1.5em + ${tp}em) !important; padding-right: calc(1.5em + ${tp}em) !important; }\n`;

        // Top bar: logo and tabs centred. Newer layout: the logo + tabs group takes the free space between the menu
        // button and the icons and centres itself there, so it can never cover the search / cast / user buttons.
        // Classic (TV) header: centred tabs, and a centred title that lets clicks through to anything under it.
        if (v.TopBarLayout === 'centered') {
            css += `.MuiAppBar-root .MuiToolbar-root > .MuiStack-root { flex: 1 1 auto; min-width: 0; justify-content: center; }
.MuiAppBar-root .MuiToolbar-root > .MuiStack-root ~ .MuiBox-root { flex-grow: 0 !important; }
.skinHeader .headerTabs, .skinHeader .emby-tabs-slider { text-align: center !important; justify-content: center !important; }
/* On wide TVs the tab strip is only 55% wide and sits on the left; centre the strip itself too. */
.skinHeader .headerTabs { margin-left: auto !important; margin-right: auto !important; }
.skinHeader .headerLeft .pageTitle { position: absolute; left: 50%; transform: translateX(-50%); pointer-events: none; }
/* On wide screens (every TV) the tabs move up into the title's row, so a centred title sat on top of them.
   With tabs, the title stays on the left and the tabs take the centre. */
@media all and (min-width: 100em) { .withSectionTabs .skinHeader .headerLeft .pageTitle { position: static; transform: none; } }\n`;
        }
        return css;
    }

    // Text typed into an option, made safe inside a single-quoted CSS string (url('…'), font names).
    // A stray quote or line break would otherwise end the string and drop the whole rule.
    function cssStr(s) {
        return String(s).trim().replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/[\r\n]+/g, ' ');
    }

    // Single source of truth for the theme: used for the live preview and saved verbatim for style.css.
    function buildCss(v) {
        const accent = v.AccentColor || '#00a4dc';
        const accentText = contrastText(accent);
        const bg = v.EnableOledBlack ? '#000000' : (v.BackgroundColor || '#101010');
        const surface = v.EnableOledBlack ? '#0a0a0a' : (v.SurfaceColor || '#202020');
        const watched = watchedColorOf(v);
        const badgeText = badgeTextOf(v);
        const tracker = v.ProgressTrackerColor || accent;
        const r = v.BorderRadius;
        // TV focus on controls that are already accent inverts them: accent on light grey, or on near-black when the
        // accent is too pale to read on grey (yellow, mint, white).
        const invertBg = contrastRatio(accent, '#f2f2f2') >= 3 ? '#f2f2f2' : '#141414';
        // Focus on an accent submit button: a lighter accent, or a darker one when the accent is already pale.
        const focusShade = luminance(accent) > 0.5 ? shade(accent, -0.25) : shade(accent, 0.2);
        // Focused accent text on the page (tabs, icon buttons) that the accent alone might not make readable.
        const focusText = readableOn(accent, bg);
        let css = '';

        // @import must come before every other rule.
        if (v.CustomFontFamily) {
            const fontUrl = encodeURIComponent(v.CustomFontFamily.trim()).replace(/%20/g, '+');
            css += `@import url('https://fonts.googleapis.com/css2?family=${fontUrl}:wght@300;400;500;700&display=swap');\n`;
        }

        css += `
/* Page colour goes on <html> only. The web client forces <body> transparent, and .backgroundContainer
   is a full-screen fixed layer with no z-index, so painting it solid covers the page content
   (item detail pages turned black). */
html { background-color: ${bg} !important; }
.mainDrawer, .dialog, .actionSheet, .MuiPaper-root { background-color: ${surface} !important; }
/* Dialog headers / footers and settings lists (#202020 in older clients). TV dialog footers stay see-through. */
.formDialogHeader:not(.formDialogHeader-clear), html:not(.layout-tv) .formDialogFooter:not(.formDialogFooter-clear), .paperList, .collapseContent { background-color: ${surface} !important; }
/* Older clients (the ones TV apps bundle) paint this full-screen layer #101010 over <html>, hiding the page
   colour, background image and gradient. See-through lets <html> show; backdrop dimming (.withBackdrop) stays. */
.backgroundContainer:not(.withBackdrop) { background: transparent !important; }
/* The playing-now bar at the bottom and pop-up messages follow the menu colour too. */
.appfooter, .playlistSectionButton { background: ${surface} !important; }
.toast { background: ${surface} !important; color: ${contrastText(surface)} !important; }
.skinHeader, .MuiAppBar-root { background-color: ${rgba(v.HeaderColor, v.HeaderOpacity)} !important; background-image: none !important; backdrop-filter: blur(${v.HeaderBlur}px) !important; -webkit-backdrop-filter: blur(${v.HeaderBlur}px) !important; }
/* The TV top bar scrolls with the page instead of floating over it, so a blur only costs TV graphics power. */
.layout-tv .skinHeader { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }

.button-submit, .raised.button-submit, .navMenuOption-selected { background-color: ${accent} !important; }
.button-submit, .raised.button-submit, .navMenuOption-selected, .navMenuOption-selected * { color: ${accentText} !important; }
.emby-tab-button-active, .emby-tab-button.emby-button-foreground, .button-link, .paper-icon-button-light:hover:not(:disabled) { color: ${accent} !important; }
.emby-checkbox:checked + span + .checkboxOutline { background-color: ${accent} !important; border-color: ${accent} !important; }
/* The tick is always white in the web client; on a light accent it vanished. */
.emby-checkbox:checked + span + .checkboxOutline .checkboxIcon { color: ${accentText} !important; }
.emby-input:focus, .emby-select-withcolor:focus, .emby-textarea:focus { border-color: ${accent} !important; }
::selection { background: ${accent}; color: #fff; }

/* Remote/keyboard focus (TV layout). Newer clients take the colour from this variable; TV apps bundle
   older clients with the blue hard-coded, so the focus rules are recoloured explicitly as well. */
:root { --jf-palette-secondary-main: ${accent} !important; --jf-palette-secondary-contrastText: ${accentText} !important; }
/* The web client's main colour, used by the newer settings pages, MUI controls and many legacy rules. */
:root { --jf-palette-primary-main: ${accent} !important; --jf-palette-primary-mainChannel: ${channels(accent)} !important;
  --jf-palette-primary-dark: ${shade(accent, -0.25)} !important; --jf-palette-primary-darkChannel: ${channels(shade(accent, -0.25))} !important;
  --jf-palette-primary-light: ${shade(accent, 0.3)} !important; --jf-palette-primary-lightChannel: ${channels(shade(accent, 0.3))} !important;
  --jf-palette-primary-contrastText: ${accentText} !important; --jf-palette-secondary-mainChannel: ${channels(accent)} !important; }
.itemSelectionPanel { border-color: ${accent} !important; }
/* More controls the older clients bundled in TV apps colour blue directly. */
.selectionCommandsPanel, .emby-button.detailFloatingButton { background-color: ${accent} !important; color: ${accentText} !important; }
.layout-tv .emby-button.detailFloatingButton:focus { background-color: ${invertBg} !important; color: ${accent} !important; }
.upNextDialog-countdownText, .buttonActive, .inputLabelFocused, .selectLabelFocused, .textareaLabelFocused { color: ${accent} !important; }
@media (hover: hover) and (pointer: fine) { .emby-tab-button:hover, .button-flat:hover { color: ${accent} !important; } .paper-icon-button-light:hover:not(:disabled) { background-color: ${rgba(accent, 0.2)} !important; } }
.paper-icon-button-light:active:not(:disabled) { color: ${accent} !important; background-color: ${rgba(accent, 0.2)} !important; }
/* Live TV guide: focused programme / channel and the date tabs (hard-coded blue in the TV apps' clients). */
html .guide-channelHeaderCell:focus, html .programCell:focus { background-color: ${accent} !important; color: ${accentText} !important; }
html .guide-date-tab-button.emby-tab-button-active, html .guide-date-tab-button:focus:not(.show-focus) { color: ${accent} !important; }
html .card:focus .cardBox.visualCardBox, html .card:focus .cardBox:not(.visualCardBox) .cardScalable { border-color: ${accent} !important; }
html .emby-button.show-focus:focus, html .emby-select-tv-withcolor:focus, html .alphaPickerButton-tv:focus { background-color: ${accent} !important; color: ${accentText} !important; }
/* Keyboard focus in browsers (TVs mark remote focus with show-focus instead). Plain :focus also matched a clicked
   button, which stayed accent until you clicked elsewhere. Own rule: TVs before Chrome 86 don't know :focus-visible. */
html .button-submit:focus-visible, html .raised:focus-visible, html .fab:focus-visible { background-color: ${accent} !important; color: ${accentText} !important; }
/* Submit buttons are already accent, so their focus is a lighter accent (darker for a pale one), or it can't be seen. */
html .emby-button.button-submit.show-focus:focus { background-color: ${focusShade} !important; color: ${contrastText(focusShade)} !important; }
html .raised.button-submit:focus-visible { background-color: ${focusShade} !important; color: ${contrastText(focusShade)} !important; }
/* Accent text on the page: lightened (or darkened) when the accent itself is too close to the page colour to read. */
html .paper-icon-button-light.show-focus:focus, html .emby-tab-button.show-focus:focus { color: ${focusText} !important; }
/* Header tabs are emby-buttons too, so the solid fill above landed under their accent text and hid it (TV top bar).
   They focus as accent text on no background, the web client's own look. */
html .emby-tab-button.show-focus:focus { background: transparent !important; }
/* Live TV date tabs focus solid. After the tab rules above, which would otherwise colour their text accent too. */
html .guide-date-tab-button.show-focus:focus { background-color: ${accent} !important; color: ${accentText} !important; }
html .emby-checkbox:focus:not(:checked) + span + .checkboxOutline { border-color: ${accent} !important; }
/* Controls the web client colours blue directly (no variable): toggle switches, radio buttons, list icons. */
.mdl-switch__input:checked + .mdl-switch__label + .mdl-switch__trackContainer > .mdl-switch__track { background: ${rgba(accent, 0.5)} !important; }
.mdl-switch__input:checked + .mdl-switch__label + .mdl-switch__trackContainer > .mdl-switch__thumb { background: ${accent} !important; }
.mdl-switch__input:checked:focus + .mdl-switch__label + .mdl-switch__trackContainer .mdl-switch__focus-helper { background-color: ${rgba(accent, 0.26)} !important; box-shadow: 0 0 0 1.39em ${rgba(accent, 0.26)} !important; }
.mdl-radio__button:checked + .mdl-radio__circles .mdl-radio__inner-circle, .mdl-radio.show-focus .mdl-radio__button:focus + .mdl-radio__circles .mdl-radio__outer-circle,
.mdl-radio.show-focus .mdl-radio__button:focus + .mdl-radio__circles .mdl-radio__inner-circle { color: ${accent} !important; }
.mdl-radio__focus-circle { background: ${accent} !important; }
.listItemIcon:not(.listItemIcon-transparent) { background-color: ${accent} !important; color: ${accentText} !important; }

/* Newer (MUI) layout: selected nav tabs, their underline, selected icons and menu rows use the accent
   instead of MUI's built-in blue. */
.MuiTab-root.Mui-selected, .Mui-selected .MuiSvgIcon-root, .Mui-selected .MuiListItemIcon-root,
.MuiSvgIcon-colorPrimary, .MuiButton-textPrimary, .MuiIconButton-colorPrimary { color: ${accent} !important; }
.MuiTabs-indicator, .MuiButton-containedPrimary { background-color: ${accent} !important; }
.MuiButton-containedPrimary { color: ${accentText} !important; }
.MuiListItemButton-root.Mui-selected, .MuiMenuItem-root.Mui-selected { background-color: ${rgba(accent, 0.16)} !important; }
/* Toggle buttons, e.g. the selected letter in the A–Z picker. */
.MuiToggleButton-root.Mui-selected { color: ${accent} !important; background-color: ${rgba(accent, 0.2)} !important; }
/* Classic layout: selected header tab gets an accent underline too. */
.headerTabs .emby-tab-button-active { box-shadow: inset 0 -2px 0 ${accent}; }
/* The Theme Editor entry's brush icon. */
[data-tb-entry] svg { color: ${accent} !important; }

.cardScalable, .cardImageContainer, .cardContent, .cardOverlayContainer, .visualCardBox,
.button-submit, .raised, .emby-input, .emby-select-withcolor, .emby-textarea, .dialog, .actionSheet { border-radius: ${r}em !important; }
/* Clip every layer of the card (image, overlay, hover ring) to one identical rounded shape. */
.cardScalable { overflow: hidden; }
/* TVs (and phones) draw focus as a 0.5em border around the poster, so its outer radius needs that much
   more or the image inside is clipped to square corners. */
.card.show-focus:not(.show-animation):not(.personCard) .cardBox:not(.visualCardBox) .cardScalable, .card.show-focus:not(.show-animation):not(.personCard) .cardBox.visualCardBox { border-radius: ${(Number(r) + 0.5).toFixed(2)}em !important; }
.cardBox { margin: ${v.GridSpacing}em !important; transition: transform 0.2s ease, box-shadow 0.2s ease; }
/* In rows and grids the web client puts the whole gap on one side so the first poster lines up with the row
   title; the same margin on both sides pushed every row in by one margin. */
[dir="ltr"] .itemsContainer > .card > .cardBox { margin-left: 0 !important; margin-right: ${(Number(v.GridSpacing) * 2).toFixed(2)}em !important; }
[dir="rtl"] .itemsContainer > .card > .cardBox { margin-right: 0 !important; margin-left: ${(Number(v.GridSpacing) * 2).toFixed(2)}em !important; }
/* The detail page poster is a card too; the spacing above pushed it out of line with the page (it has no margin). */
.detailImageContainer .card .cardBox { margin: 0 !important; }

/* The version-count and downloaded badges are the same hard-coded blue. */
.countIndicator, .playedIndicator, .mediaSourceIndicator, .fullSyncIndicator { background: ${watched} !important; }
.countIndicator, .playedIndicator, .mediaSourceIndicator, .fullSyncIndicator, .countIndicator *, .playedIndicator *, .fullSyncIndicator * { color: ${badgeText} !important; }
.itemProgressBar { height: ${v.ProgressBarHeight}em !important; border-radius: ${v.ProgressTrackerRadius}em !important; }
.itemProgressBarForeground { background-color: ${tracker} !important; border-radius: ${v.ProgressTrackerRadius}em !important; }
/* Newer clients: MUI LinearProgress, which sets its own bar colour inline via a generated class. */
.itemLinearProgress { height: ${v.ProgressBarHeight}em !important; border-radius: ${v.ProgressTrackerRadius}em !important; }
.itemLinearProgress .MuiLinearProgress-bar { background-color: ${tracker} !important; border-radius: ${v.ProgressTrackerRadius}em !important; }
`;

        // TV posters sit in a 0.5em see-through focus frame; a matching negative spread keeps the shadow (and the
        // hover glow below) on the image instead of floating 0.5em out around the empty frame.
        const tvFramed = '.card.show-focus:not(.show-animation) .cardBox:not(.visualCardBox) .cardScalable';
        // The web client clips each card to its own box (contain: paint). In rows and grids the poster starts at the
        // card's left edge (see the spacing rule above), so the shadow, hover glow and zoom were cut off on the left.
        if (v.EnableCardShadow || v.EnableHoverZoom || v.EnableHoverGlow) css += `.card:not(.show-animation) { contain: layout style !important; }\n`;
        if (v.EnableCardShadow) css += `.cardScalable { box-shadow: 0 6px 16px rgba(0,0,0,0.55); }\n${tvFramed} { box-shadow: 0 6px 16px -0.5em rgba(0,0,0,0.55); }\n`;
        // Lift the hovered card above its neighbours, otherwise the next card paints over its zoom/glow edges.
        if (v.EnableHoverZoom || v.EnableHoverGlow) {
            css += `@media (hover: hover) and (pointer: fine) { .card:hover .cardBox { position: relative; z-index: 5; } }\n`;
            // Horizontal rows scroll inside a container that clips anything outside it, which cut off
            // the top edge of zoomed large tiles. Give each row a little room above and below, only where the
            // zoom can happen: on phones and TVs nothing zooms, so it just pushed the rows apart.
            css += `@media (hover: hover) and (pointer: fine) { .emby-scroller .scrollSlider { padding-top: 0.8em !important; padding-bottom: 0.8em !important; } }\n`;
        }
        // The poster on an item's detail page is a card too, but it shouldn't zoom.
        if (v.EnableHoverZoom) css += `@media (hover: hover) and (pointer: fine) { .card:hover .cardBox { transform: scale(1.05); } }\n`;
        // Wide tiles (Continue Watching, episodes, libraries) can have their own radius, hover ring included.
        if (v.SeparateWideRadius) {
            // Written out in full rather than with :is(), which TVs older than Chrome 88 don't understand.
            const sels = [];
            ['.backdropCard', '.overflowBackdropCard', '.smallBackdropCard'].forEach(w =>
                ['.cardScalable', '.cardImageContainer', '.cardContent', '.cardOverlayContainer', '.visualCardBox', '.cardScalable::after', '.cardScalable::before'].forEach(p => sels.push(`${w} ${p}`)));
            css += `${sels.join(', ')} { border-radius: ${v.WideTileRadius}em !important; }\n`;
            const tvWide = ['.backdropCard', '.overflowBackdropCard', '.smallBackdropCard'].map(w => `.card${w}.show-focus:not(.show-animation) .cardBox:not(.visualCardBox) .cardScalable, .card${w}.show-focus:not(.show-animation) .cardBox.visualCardBox`);
            css += `${tvWide.join(', ')} { border-radius: ${(Number(v.WideTileRadius) + 0.5).toFixed(2)}em !important; }\n`;
        }
        // A thin border drawn inside the image edge (::before; ::after is the hover ring).
        if (Number(v.CardBorderWidth) > 0) css += `.cardScalable::before { content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0; border: ${v.CardBorderWidth}px solid ${rgba(v.CardBorderColor, v.CardBorderOpacity)}; border-radius: ${r}em; pointer-events: none; z-index: 2; }\n`;
        // Played items (they show the tick badge) get darker so unwatched ones stand out.
        // TVs older than Chrome 105 have no :has(), so there the tick badge casts a shadow over the whole poster instead
        // (.cardScalable clips it to the poster, inside the TV focus frame). Same darkness as the filter.
        if (Number(v.WatchedDim) > 0) css += `html:not(.layout-tv) .card:has(.playedIndicator) :is(.cardImageContainer, .cardImage) { filter: brightness(${(1 - Number(v.WatchedDim)).toFixed(2)}); }
.layout-tv .cardIndicators .playedIndicator { box-shadow: 0 0 0 100em rgba(0,0,0,${Number(v.WatchedDim).toFixed(2)}) !important; }\n`;
        // The border is drawn *inside* the poster edge (an overlay on top of the image), so neither
        // neighbouring cards nor the row's scroll container can clip its left/right sides.
        if (v.EnableHoverGlow) css += `@media (hover: hover) and (pointer: fine) {
    .card:hover .cardScalable { box-shadow: 0 0 ${v.GlowSize}px ${accent}; }
    .card.show-focus:not(.show-animation):hover .cardBox:not(.visualCardBox) .cardScalable { box-shadow: 0 0 ${v.GlowSize}px -0.5em ${accent}; }
    .card:hover .cardScalable::after { content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0; border: 3px solid ${accent}; border-radius: ${r}em; pointer-events: none; z-index: 3; }
}\n`;
        // TVs have no hover: show the glow ring on the remote-focused card instead.
        if (v.EnableHoverGlow) css += `.layout-tv .card:focus .cardScalable::after { content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0; border: 3px solid ${accent}; border-radius: ${r}em; pointer-events: none; z-index: 3; }\n`;
        // Cast / people cards: the border and ring copy the photo's own shape (square normally, a circle in themes
        // that round cast photos). TV focus sizing never applies to these cards, so inheriting is exact.
        css += `.personCard .cardScalable::before, .personCard .cardScalable::after { border-radius: inherit !important; }\n`;
        // The poster on an item's detail page is a card too: no zoom, glow or ring there.
        if (v.EnableHoverZoom || v.EnableHoverGlow) css += `.detailImageContainer .card:hover .cardBox, .detailImageContainer .card:focus .cardBox { transform: none !important; z-index: auto !important; }
.detailImageContainer .card:hover .cardScalable, .detailImageContainer .card:focus .cardScalable { box-shadow: none !important; }
.detailImageContainer .card .cardScalable::after { content: none !important; }\n`;
        if (v.HideCardTitles) css += `.cardFooter { display: none !important; }\n`;
        if (v.HideCardOverlayButtons) css += `.cardOverlayButton { display: none !important; }\n`;

        // Card buttons: hover overlay (play, played, favourite, ⋮) and the ⋮ under cards.
        // Newer web clients render these as MUI icons: the "active" state is MUI's colorError class,
        // told apart by each icon's data-testid. Older clients use the material-icons font classes.
        css += `.cardOverlayButton, .cardOverlayButton .material-icons, .cardOverlayButtonIcon, .btnCardOptions, .btnCardOptions .material-icons,
.cardOverlayButton .MuiSvgIcon-root:not(.MuiSvgIcon-colorError), .btnCardOptions .MuiSvgIcon-root { color: ${v.CardButtonColor} !important; }\n`;
        // The "on" icons need to out-rank the icon colour rule above (.cardOverlayButton .material-icons), or they stay white.
        css += `.playstatebutton-icon-played, .cardOverlayButton .material-icons.playstatebutton-icon-played, [data-testid="CheckIcon"].MuiSvgIcon-colorError { color: ${v.CardButtonPlayedColor} !important; }\n`;
        css += `.ratingbutton-icon-withrating, .cardOverlayButton .material-icons.ratingbutton-icon-withrating, [data-testid="FavoriteIcon"].MuiSvgIcon-colorError { color: ${v.CardButtonFavoriteColor} !important; }\n`;
        if (v.CardButtonGlow) css += `.cardOverlayButton .material-icons, .cardOverlayButtonIcon, .btnCardOptions .material-icons, .cardOverlayButton .MuiSvgIcon-root, .btnCardOptions .MuiSvgIcon-root { filter: drop-shadow(0 0 3px currentColor) drop-shadow(0 0 6px currentColor); }\n`;
        if (Number(v.CardButtonBgOpacity) > 0) css += `.cardOverlayButton { background: rgba(0,0,0,${v.CardButtonBgOpacity}) !important; border-radius: 50% !important; }\n`;

        // Only touch the backdrop overlay when the admin moved the slider off Jellyfin's own default.
        if (Math.abs(Number(v.BackdropDim) - 0.86) > 0.001) css += `.backgroundContainer.withBackdrop { background-color: rgba(0,0,0,${v.BackdropDim}) !important; }\n`;
        if (Number(v.BackdropBlur) > 0) css += `.backdropContainer { filter: blur(${v.BackdropBlur}px); transform: scale(1.05); }\n`;
        if (Number(v.BannerBlur) > 0 || Number(v.BannerDim) > 0) {
            css += `.itemBackdrop { filter: blur(${v.BannerBlur}px) brightness(${(1 - Number(v.BannerDim)).toFixed(2)}) !important; }\n`;
        }

        if (v.CustomFontFamily) css += `body, h1, h2, h3, h4, h5, h6, button, input, .textActionButton { font-family: '${cssStr(v.CustomFontFamily)}', sans-serif !important; }\n`;
        // Scale each layout's own base size (desktop 93%, TV 125% for the 20px TV minimum, phone 90%).
        if (Number(v.TextScale) !== 100) {
            const ts = (base) => (base * Number(v.TextScale) / 100).toFixed(2);
            css += `html { font-size: ${ts(93)}% !important; }\nhtml.layout-tv { font-size: ${ts(125)}% !important; }\nhtml.layout-mobile { font-size: ${ts(90)}% !important; }\n`;
        }
        if (v.EnableSlimScrollbars) css += `@media (pointer: fine) { ::-webkit-scrollbar { width: 8px; height: 8px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: ${accent}; border-radius: 8px; } }\n`;

        // Newer (MUI) header: swap the logo image itself.
        if (v.HeaderLogoUrl) css += `.MuiAppBar-root img[src*="banner"], .MuiAppBar-root img[src*="icon-transparent"] { content: url('${cssStr(v.HeaderLogoUrl)}') !important; height: ${v.HeaderLogoHeight}em !important; width: auto !important; }\n`;
        // Classic header: the logo is a background image on the page title.
        if (v.HeaderLogoUrl) css += `.pageTitleWithDefaultLogo { background-image: url('${cssStr(v.HeaderLogoUrl)}') !important; background-size: contain !important; background-repeat: no-repeat !important; background-position: left center !important; color: transparent !important; height: ${v.HeaderLogoHeight}em !important; min-width: 12em !important; }\n`;
        // Login page. With blur, the image goes on a fixed layer behind the form so only the image is blurred.
        const cssText = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\r\n]+/g, ' ');
        if (v.LoginBackgroundUrl && Number(v.LoginBackgroundBlur) > 0) {
            css += `#loginPage { background: transparent !important; }
#loginPage::before { content: ''; position: fixed; top: -30px; right: -30px; bottom: -30px; left: -30px; z-index: -1; background: url('${cssStr(v.LoginBackgroundUrl)}') center / cover no-repeat; filter: blur(${v.LoginBackgroundBlur}px); }\n`;
        } else if (v.LoginBackgroundUrl) {
            css += `#loginPage { background: url('${cssStr(v.LoginBackgroundUrl)}') center / cover no-repeat !important; }\n`;
        }
        if (v.LoginLogoUrl) css += `#loginPage .padded-bottom-page::before { content: ''; display: block; height: 5em; margin: 1.5em auto 1em auto; background: url('${cssStr(v.LoginLogoUrl)}') center / contain no-repeat; }\n`;
        if (v.LoginWelcomeText) css += `#loginPage .manualLoginForm::before, #loginPage .visualLoginForm::before { content: "${cssText(v.LoginWelcomeText)}"; display: block; text-align: center; font-size: 1.3em; margin-bottom: 1em; }\n`;
        if (v.HideForgotPassword) css += `#loginPage .btnForgotPassword { display: none !important; }\n`;

        // Detail page. Sections are hidden by their wrapper so the heading goes with the content.
        const hide = (on, sel) => { if (on) css += `${sel} { display: none !important; }\n`; };
        if (Number(v.DetailTitleScale) !== 100) css += `.itemDetailPage .nameContainer { font-size: ${Number(v.DetailTitleScale)}% !important; }\n`;
        // The title ribbon is Jellyfin's "paper" colour at 80%; TV layout has no ribbon background, so leave it alone.
        if (Math.abs(Number(v.RibbonOpacity) - 0.8) > 0.001) css += `html:not(.layout-tv) .itemDetailPage .detailRibbon { background: ${rgba(surface, v.RibbonOpacity)} !important; }\n`;
        hide(v.HideDetailPoster, '.itemDetailPage .detailImageContainer');
        hide(v.HideDetailLogo, '.itemDetailPage .detailLogo');
        hide(v.HideDetailMiscInfo, '.itemDetailPage .itemMiscInfo-secondary');
        hide(v.HideGenres, '.itemDetailPage .itemGenres');
        hide(v.HideTagline, '.itemDetailPage .tagline');
        hide(v.HideDetailsGroup, '.itemDetailPage .itemDetailsGroup');
        hide(v.HideTags, '.itemDetailPage .itemTags');
        hide(v.HideExternalLinks, '.itemDetailPage .itemExternalLinks');
        hide(v.HideTrackSelects, '.itemDetailPage .trackSelections');
        // Played tick and favourite heart keep their own "on" colours so their state stays readable.
        // With the solid Play button on, Play/Resume are left out here so their contrasting icon and
        // solid background aren't overridden by these (more specific) rules.
        // The web client widens the buttons' side padding with the screen (0.7em, up to 0.85em on desktop), so a round
        // button came out oval, a different oval on every device. Equal padding makes every button the same circle;
        // the margin keeps the old space between icons.
        css += `.itemDetailPage .mainDetailButtons .detailButton { padding: 0.7em !important; margin: 0 0.15em !important; border-radius: 50% !important; }\n`;
        const plain = v.FilledPlayButton ? '.detailButton:not(.btnPlay):not(.btnReplay)' : '.detailButton';
        if (v.AccentDetailButtons) css += `.itemDetailPage .mainDetailButtons ${plain} .material-icons:not(.playstatebutton-icon-played):not(.ratingbutton-icon-withrating) { color: ${accent} !important; }
.itemDetailPage .mainDetailButtons ${plain}:hover, .itemDetailPage .mainDetailButtons ${plain}:focus { background-color: ${rgba(accent, 0.18)} !important; }
/* TV remote focus stays solid (as without this option), or the focused button is hard to spot from the sofa. */
.itemDetailPage .mainDetailButtons ${plain}.show-focus:focus { background-color: ${accent} !important; }
.itemDetailPage .mainDetailButtons ${plain}.show-focus:focus .material-icons:not(.playstatebutton-icon-played):not(.ratingbutton-icon-withrating) { color: ${accentText} !important; }\n`;
        if (v.FilledPlayButton) css += `.itemDetailPage .mainDetailButtons .btnPlay, .itemDetailPage .mainDetailButtons .btnReplay { background-color: ${accent} !important; border-radius: 50% !important; }
.itemDetailPage .mainDetailButtons .btnPlay .material-icons, .itemDetailPage .mainDetailButtons .btnReplay .material-icons { color: ${accentText} !important; }
/* TV focus: the button is already solid accent, so focus inverts it, or the focused Play looked unfocused. */
.itemDetailPage .mainDetailButtons .btnPlay.show-focus:focus, .itemDetailPage .mainDetailButtons .btnReplay.show-focus:focus { background-color: ${invertBg} !important; }
.itemDetailPage .mainDetailButtons .btnPlay.show-focus:focus .material-icons, .itemDetailPage .mainDetailButtons .btnReplay.show-focus:focus .material-icons { color: ${accent} !important; }\n`;
        hide(v.HideTrailerBtn, '.itemDetailPage .btnPlayTrailer');
        hide(v.HideDownloadBtn, '.itemDetailPage .btnDownload');
        hide(v.HideInstantMixBtn, '.itemDetailPage .btnInstantMix');
        hide(v.HideSplitBtn, '.itemDetailPage .btnSplitVersions');
        hide(v.HidePlayedBtn, '.itemDetailPage .btnPlaystate');
        hide(v.HideMoreBtn, '.itemDetailPage .btnMoreCommands');
        hide(v.HideCastCrew, '#castCollapsible, #guestCastCollapsible');
        hide(v.HideNextUp, '.itemDetailPage .nextUpSection');
        hide(v.HideMoreFrom, '.itemDetailPage .moreFromSeasonSection, .itemDetailPage .moreFromArtistSection');
        hide(v.HideSpecials, '#specialsCollapsible');
        hide(v.HideScenes, '#scenesCollapsible');
        hide(v.HideSimilar, '#similarCollapsible');
        hide(v.HideCollections, '#collectionsCollapsible, #musicVideosCollapsible, #additionalPartsCollapsible');
        if (v.HideLikeDislike) css += `.btnUserRating { display: none !important; }\n`;
        // Classic layout uses class names; the newer layout renders MUI icon buttons, matched by their icon.
        // Newer layout: Play All and Shuffle are MUI buttons in one ButtonGroup, identified by their icons.
        // (Matched by icon rather than the title attribute, which is translated.)
        // Classic selectors get their own rule: TVs without :has() drop any rule that contains it.
        hide(v.HidePlayAll, '.btnPlayAll');
        hide(v.HidePlayAll, '.MuiButtonGroup-root > button:has([data-testid="PlayArrowIcon"])');
        hide(v.HideShuffle, '.btnShuffle');
        hide(v.HideShuffle, '.MuiButtonGroup-root > button:has([data-testid="ShuffleIcon"])');
        // With both hidden, drop the empty group so it doesn't leave a gap.
        if (v.HidePlayAll && v.HideShuffle) css += `.MuiButtonGroup-root:has([data-testid="PlayArrowIcon"]):has([data-testid="ShuffleIcon"]) { display: none !important; }\n`;
        // With one hidden, the remaining button keeps fully rounded corners.
        if (v.HidePlayAll !== v.HideShuffle) css += `.MuiButtonGroup-root:has([data-testid="ShuffleIcon"]) > button { border-radius: ${r}em !important; }\n`;
        // The library grid reserves space on the right for the picker; give it back when hidden.
        // Classic layout: .alphaPicker. Newer (MUI) layout: a toggle-button column in .alphaPicker-fixed-right.
        if (v.HideAlphaPicker) css += `.alphaPicker, .alphaPicker-fixed-right { display: none !important; }\n.padded-right-withalphapicker { padding-right: 3.3% !important; }\n`;
        // A picked letter stays as a saved filter, so with the picker hidden a library showed only that letter's titles
        // with no way to see why or undo it. Bring the picker back while a letter is picked (clicking it again clears it).
        // Own rules: TVs without :has() drop them and keep the picker hidden, as before.
        if (v.HideAlphaPicker) css += `.alphaPicker-fixed-right:has(.MuiToggleButton-root.Mui-selected) { display: block !important; }
.alphaPicker:has(.alphaPickerButton-selected) { display: flex !important; }\n`;
        if (v.HideRatings) css += `.starRatingContainer, .mediaInfoCriticRating { display: none !important; }\n`;
        // Player timeline, volume and other sliders (emby-slider renders as .mdl-slider). Thumb pseudo-elements
        // get their own rules: one unknown vendor pseudo in a selector list would drop the whole rule.
        if (v.AccentPlayer) {
            css += `.mdl-slider, .MuiSlider-root { color: ${accent} !important; }
.mdl-slider-background-lower, .sliderMarker.watched { background-color: ${accent} !important; }
.mdl-slider::-webkit-slider-thumb { background: ${accent} !important; }
.mdl-slider::-moz-range-thumb { background: ${accent} !important; }
.buttonMute, .buttonMute .material-icons, .osdControls .buttonMute:hover .material-icons { color: ${accent} !important; }
.iconOsdProgressInner { background: ${accent} !important; }\n`;
        }
        // Player buttons (pause, rewind, skip…) and the "Skip intro/credits" button.
        if (v.AccentPlayerButtons) {
            css += `${['.btnPause', '.btnRewind', '.btnFastForward', '.btnPreviousTrack', '.btnNextTrack', '.btnPreviousChapter', '.btnNextChapter'].map(b => `.osdControls ${b} .material-icons`).join(', ')} { color: ${accent} !important; }
.skip-button { background-color: ${accent} !important; color: ${accentText} !important; }\n`;
        }
        // Subtitles: rendered text (.videoSubtitlesInner) and native text tracks (::cue). The style presets
        // override each user's own subtitle appearance settings; "default" leaves them alone.
        const outline = 'text-shadow: 0 0 3px #000, 0 0 2px #000, 1px 1px 2px #000 !important;';
        const subStyles = {
            outline: `color: #ffffff !important; background: transparent !important; ${outline}`,
            yellow: `color: #ffd400 !important; background: transparent !important; ${outline}`,
            boxed: 'color: #ffffff !important; background: rgba(0,0,0,0.75) !important; text-shadow: none !important; padding: 0.1em 0.4em !important; border-radius: 0.2em !important;',
            bold: `color: #ffffff !important; font-weight: 700 !important; background: transparent !important; ${outline}`
        };
        if (subStyles[v.SubtitleStyle]) css += `.videoSubtitlesInner { ${subStyles[v.SubtitleStyle]} }\nvideo::cue { ${subStyles[v.SubtitleStyle].replace(/padding[^;]*;|border-radius[^;]*;/g, '')} }\n`;
        if (Number(v.SubtitleScale) !== 100) css += `.videoSubtitlesInner { zoom: ${Number(v.SubtitleScale) / 100}; }\nvideo::cue { font-size: ${Number(v.SubtitleScale)}% !important; }\n`;

        // Header icons. Classic header uses class names; the newer MUI toolbar is matched by icon.
        // Separate rules so TVs without :has() still hide the classic ones.
        hide(v.HideHeaderSearch, '.headerSearchButton');
        hide(v.HideHeaderSearch, '.MuiAppBar-root .MuiIconButton-root:has([data-testid="SearchIcon"])');
        hide(v.HideHeaderCast, '.headerCastButton');
        hide(v.HideHeaderCast, '.MuiAppBar-root .MuiIconButton-root:has([data-testid="CastIcon"]), .MuiAppBar-root .MuiIconButton-root:has([data-testid="CastConnectedIcon"])');
        hide(v.HideHeaderSyncPlay, '.headerSyncButton');
        hide(v.HideHeaderSyncPlay, '.MuiAppBar-root .MuiIconButton-root:has([data-testid="GroupsIcon"])');
        // Hidden "Hide" traps: the button is the only way out of a SyncPlay group, so it comes back while you're in one
        // (the newer client marks that with a primary-coloured badge dot). The cast button needs nothing: once connected
        // it becomes a different, labelled button that the rule above doesn't match.
        if (v.HideHeaderSyncPlay) css += `.MuiAppBar-root .MuiIconButton-root:has([data-testid="GroupsIcon"]):has(.MuiBadge-colorPrimary:not(.MuiBadge-invisible)) { display: inline-flex !important; }\n`;
        // Transparent until scrolled: editor.js sets html.tb-scrolled. TV layout is left alone (no mouse,
        // and TV apps don't run editor.js, so it would never turn solid). Only while editor.js runs (html.tb-js):
        // the theme also arrives through Custom CSS, and without the script the bar stayed clear on every scroll.
        if (v.HeaderTransparentTop) css += `html.tb-js:not(.tb-scrolled):not(.layout-tv) :is(.skinHeader, .MuiAppBar-root) { background-color: transparent !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; box-shadow: none !important; }
:is(.skinHeader, .MuiAppBar-root) { transition: background-color 0.25s ease, backdrop-filter 0.25s ease; }\n`;

        // Home screen rows. Rows are only numbered (section0, section1…), so the library row is found by content.
        if (Number(v.HomeTitleScale) !== 100) css += `.homeSectionsContainer .sectionTitleContainer, .homeSectionsContainer .verticalSection > .sectionTitle { zoom: ${Number(v.HomeTitleScale) / 100}; }\n`;
        if (Number(v.HomeRowSpacing) > 0) css += `.homeSectionsContainer > .verticalSection { margin-bottom: ${v.HomeRowSpacing}em !important; }\n`;
        hide(v.HideMyMediaTitles, ['CollectionFolder', 'UserView'].map(t => `.homeSectionsContainer .card[data-type="${t}"] .cardText, .homeSectionsContainer .card[data-type="${t}"] .cardFooter`).join(', '));
        hide(v.HideMyMediaRow, '.homeSectionsContainer .verticalSection:has(.homeLibraryButton), .homeSectionsContainer .verticalSection:has(.card[data-type="CollectionFolder"])');
        hide(v.HideRowSeeAll, '.sectionTitleTextButton .material-icons.chevron_right');

        // Age / parental rating badge (same class in the classic and React media info rows).
        if (v.HideAgeRating) css += `.mediaInfoOfficialRating { display: none !important; }\n`;
        // Jellyfin Enhanced's language tags (flags on posters).
        if (v.HideLanguageFlags) css += `.language-overlay-container, .language-flag { display: none !important; }\n`;
        // Jellyfin Enhanced's audio-language row in the details page info line.
        hide(v.HideAudioLanguages, '.mediaInfoItem-audioLanguage');

        // Profile icon: only the default letter/person avatar, not a user picture.
        if (v.AccentProfileIcon) css += `.MuiAppBar-root .MuiAvatar-colorDefault { background-color: ${accent} !important; color: ${accentText} !important; }
/* Classic header (TV apps): .headerUserButtonRound means the user has a picture; without one it's a person icon. */
.skinHeader .headerUserButton:not(.headerUserButtonRound) { background-color: ${accent} !important; color: ${accentText} !important; border-radius: 999px !important; }
/* Remote focus colours icon buttons accent, which hid the icon on its accent circle: invert it instead. */
.skinHeader .headerUserButton.show-focus:not(.headerUserButtonRound):focus { background-color: ${invertBg} !important; color: ${accent} !important; }\n`;
        // Loading spinner: classic (mdl-spinner layers) and newer (MUI CircularProgress).
        if (v.AccentSpinner) css += `.mdl-spinner__layer, .progressring-spiner { border-color: ${accent} !important; }\n.MuiCircularProgress-root { color: ${accent} !important; }\n`;

        // Whole-app background: glow, image and gradient (see backgroundLayers).
        // Pages showing their own backdrop (.withBackdrop) keep it.
        const layers = backgroundLayers(v);
        if (layers.length) css += `html { background: ${layers.join(', ')}, ${bg} !important; background-attachment: fixed !important; }\n`;
        // TV layout: just the page colour (a large fixed image is also heavy for TV hardware).
        if (layers.length && v.TvPlainBackground) css += `html.layout-tv { background: ${bg} !important; }\n`;

        // Frosted glass: see-through menus/dialogs that blur what's behind them (the top bar has its own settings).
        if (v.GlassMenus) css += `.mainDrawer, .dialog, .actionSheet, .MuiPaper-root:not(.MuiAppBar-root), .appfooter, .toast { background-color: ${rgba(surface, v.GlassOpacity)} !important; backdrop-filter: blur(16px) saturate(1.2) !important; -webkit-backdrop-filter: blur(16px) saturate(1.2) !important; }
/* Dialog headers and footers show the dialog's own glass instead of a solid bar on top of it. */
html .dialog .formDialogHeader:not(.formDialogHeader-clear), html .dialog .formDialogFooter:not(.formDialogFooter-clear) { background-color: transparent !important; }
/* TVs: blurring the page behind every menu is slow on TV graphics, and see-through without the blur is hard to read
   from the sofa, so menus stay nearly solid there. */
html.layout-tv .mainDrawer, html.layout-tv .dialog, html.layout-tv .actionSheet, html.layout-tv .appfooter, html.layout-tv .toast { background-color: ${rgba(surface, Math.max(Number(v.GlassOpacity), 0.95))} !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }\n`;

        // Card titles.
        if (v.CardTitleLines === '2') css += `.cardText-first { white-space: normal !important; display: -webkit-box !important; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden !important; }\n`;
        if (v.CardTitleAlign === 'left') css += `.cardFooter, .cardText { text-align: left !important; }\n`;
        if (v.CardTitleBold) css += `.cardText-first { font-weight: 600 !important; }\n`;

        // Episode lists (season pages): descriptions and thumbnail size.
        hide(v.HideEpisodeOverview, '.listItem-overview, .listItem-bottomoverview');
        if (Number(v.EpisodeThumbScale) !== 100) css += `.listItemImage.listItemImage-large { zoom: ${Number(v.EpisodeThumbScale) / 100}; }\n`;

        // Night mode: editor.js adds html.tb-night during the configured hours (browsers only; TV apps
        // don't run it). The dimming layer ignores clicks.
        if (v.NightMode) {
            if (Number(v.NightDim) > 0) css += `html.tb-night::after { content: ''; position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0,0,0,${v.NightDim}); pointer-events: none; z-index: 2147483000; }\n`;
            if (v.NightOled) css += `html.tb-night { background-color: #000000 !important; }\nhtml.tb-night :is(.mainDrawer, .dialog, .actionSheet, .MuiPaper-root:not(.MuiAppBar-root), .appfooter, .toast, .formDialogHeader:not(.formDialogHeader-clear), .formDialogFooter:not(.formDialogFooter-clear), .paperList, .collapseContent) { background-color: #000000 !important; }\n`;
        }

        css += layoutCss(v);

        // Editor's Choice plugin (featured banner at the top of Home): it builds its banner from Jellyfin classes
        // (.cardScalable, .starRatingContainer, .sectionTitle-cards), so undo our card, rating, row and font rules
        // there and keep its own look. Only its button (.button-submit) follows the theme.
        const ec = '.editorsChoiceContainer';
        css += `${ec} .splide.cardScalable { border-radius: 0 !important; overflow: visible !important; box-shadow: none !important; contain: layout style !important; }
${ec} .splide.cardScalable::before, ${ec} .splide.cardScalable::after { content: none !important; }
${ec} .editorsChoiceItemRating { display: block !important; }
.homeSectionsContainer > .verticalSection${ec} { margin-bottom: 1.8em !important; }
.homeSectionsContainer ${ec} .sectionTitle-cards { zoom: 1 !important; text-align: start !important; margin-left: 0 !important; }\n`;
        if (v.CustomFontFamily) css += `${ec}, ${ec} h1, ${ec} h2, ${ec} h3, ${ec} h4, ${ec} h5, ${ec} h6, ${ec} .textActionButton { font-family: "Noto Sans", sans-serif !important; }\n`;

        return css;
    }

    // A brand colour for the accent and everything that would otherwise stay Jellyfin blue.
    function brand(accent, extra) {
        return Object.assign({ AccentColor: accent, ProgressTrackerColor: accent, CardButtonPlayedColor: accent }, extra);
    }

    // Starting points: applied over the defaults (any option not listed goes back to its default).
    const PRESETS = {
        'Jellyfin Default': {},
        'OLED Black': {
            EnableOledBlack: true, AccentSpinner: true,
            HeaderColor: '#000000', HeaderOpacity: '1', HeaderBlur: '0', AccentProfileIcon: true,
            BorderRadius: '0.3', GridSpacing: '0.4', EnableCardShadow: false,
            CardBorderWidth: '1', CardBorderColor: '#ffffff', CardBorderOpacity: '0.12',
            EnableHoverZoom: true, EnableHoverGlow: false,
            WatchedDim: '0.25', ProgressBarHeight: '0.2',
            BannerDim: '0.3', RibbonOpacity: '0.35', BackdropDim: '0.96',
            SubtitleStyle: 'outline'
        },
        'Minimal': {
            CustomFontFamily: 'Manrope', TextScale: '95', EnableSlimScrollbars: true,
            HeaderOpacity: '0.6', HeaderBlur: '20', HeaderTransparentTop: true, AccentProfileIcon: false,
            HideHeaderSyncPlay: true, HideHeaderCast: true,
            HomeTitleScale: '90', HomeRowSpacing: '1', HideRowSeeAll: true,
            PosterSize: 'small', BorderRadius: '0.4', GridSpacing: '0.6', EnableHoverZoom: false, EnableHoverGlow: false, EnableCardShadow: false,
            CardBorderWidth: '0', CardTitleAlign: 'left',
            WatchedDim: '0.35', ProgressBarHeight: '0.14',
            RibbonOpacity: '0.4', AccentDetailButtons: false,
            HideTagline: true, HideDetailsGroup: true, HideTags: true, HideExternalLinks: true, HideRatings: true,
            HideLanguageFlags: true, HideAlphaPicker: true, HidePlayAll: true, HideShuffle: true
        },

        // Looks inspired by well-known apps: colours, type, shapes, borders, glow and motion.
        'Netflix Red': brand('#e50914', {
            BackgroundColor: '#141414', SurfaceColor: '#181818', CustomFontFamily: 'Inter', TextScale: '100',
            HeaderColor: '#141414', HeaderOpacity: '1', HeaderBlur: '0', HeaderTransparentTop: true, AccentProfileIcon: true,
            HomeTitleScale: '110', HomeRowSpacing: '0.5', HideRowSeeAll: true,
            BorderRadius: '0.25', GridSpacing: '0.25', EnableHoverZoom: true, EnableHoverGlow: false, EnableCardShadow: false,
            CardBorderWidth: '0', CardTitlePosition: 'overlayHover', CardButtonBgOpacity: '0.5',
            ProgressBarHeight: '0.14', ProgressTrackerRadius: '0',
            BannerDim: '0.2', RibbonOpacity: '0', BackdropDim: '0.9', DetailTitleScale: '120',
            AccentDetailButtons: false, FilledPlayButton: true, HideDetailPoster: true, DetailAlign: 'left',
            SubtitleStyle: 'outline'
        }),
        'Disney+': brand('#0063e5', {
            BackgroundColor: '#1a1d29', SurfaceColor: '#252833', CustomFontFamily: 'Nunito Sans', AppAccentGlow: false,
            BgGradient: 'corners', BgGradientColor1: '#2b4a9a', BgGradientColor2: '#1b2a5c', BgGradientStrength: '0.5',
            GlassMenus: true, GlassOpacity: '0.85',
            HeaderColor: '#090b13', HeaderOpacity: '0.95', HeaderBlur: '10', HeaderTransparentTop: true,
            HomeTitleScale: '95', HomeRowSpacing: '0.5',
            BorderRadius: '0.5', GridSpacing: '0.6', EnableHoverZoom: true, EnableCardShadow: true,
            CardBorderWidth: '3', CardBorderColor: '#f9f9f9', CardBorderOpacity: '0.1',
            EnableHoverGlow: true, GlowSize: '12',
            PosterSize: 'large', HideCardTitles: true, CardButtonBgOpacity: '0.4',
            ProgressBarHeight: '0.2', ProgressTrackerRadius: '0.2', ProgressPosition: 'inset', HideDetailPoster: true,
            BannerDim: '0.15', DetailTitleScale: '110', FilledPlayButton: true
        }),
        'Apple TV+': brand('#f5f5f7', {
            EnableOledBlack: true, CustomFontFamily: 'Inter', GlassMenus: true, GlassOpacity: '0.6',
            BgGradient: 'radial', BgGradientPosition: 'top', BgGradientColor1: '#2c2c30', BgGradientColor2: '#000000', BgGradientStrength: '0.9',
            HeaderColor: '#000000', HeaderOpacity: '0.6', HeaderBlur: '30', HeaderTransparentTop: true, TopBarLayout: 'centered',
            HomeTitleScale: '115', HomeRowSpacing: '1', HideRowSeeAll: true,
            PosterSize: 'large', BorderRadius: '0.7', GridSpacing: '0.7', EnableCardShadow: true, EnableHoverZoom: true,
            CardBorderWidth: '1', CardBorderColor: '#ffffff', CardBorderOpacity: '0.15',
            EnableHoverGlow: true, GlowSize: '20',
            CardTitleAlign: 'left', CardTitleBold: true, CardButtonBgOpacity: '0.35',
            ProgressBarHeight: '0.18', ProgressTrackerRadius: '1', ProgressPosition: 'inset',
            BannerDim: '0.2', RibbonOpacity: '0.4', DetailTitleScale: '115', FilledPlayButton: true, HideDetailPoster: true, DetailAlign: 'center',
            SubtitleStyle: 'outline'
        }),

        'Nord': {
            AccentColor: '#88c0d0', BackgroundColor: '#2e3440', SurfaceColor: '#3b4252', CustomFontFamily: 'IBM Plex Sans',
            BgGradient: 'linear', BgGradientAngle: '180', BgGradientColor1: '#3b4252', BgGradientColor2: '#2e3440', BgGradientStrength: '1',
            HeaderColor: '#3b4252', HeaderOpacity: '1', HeaderBlur: '0',
            BorderRadius: '0.6', WideTileRadius: '0.6', GridSpacing: '0.6', EnableHoverZoom: false, EnableCardShadow: false,
            CardBorderWidth: '1', CardBorderColor: '#4c566a', CardBorderOpacity: '1',
            EnableHoverGlow: true, GlowSize: '6',
            CardTitleAlign: 'left', CardButtonPlayedColor: '#a3be8c', CardButtonFavoriteColor: '#bf616a',
            LinkWatchedToAccent: false, WatchedIndicatorColor: '#a3be8c',
            ProgressTrackerColor: '#88c0d0', ProgressBarHeight: '0.25', ProgressTrackerRadius: '1',
            RibbonOpacity: '0.6'
        },
        'Purple Haze': {
            AccentColor: '#a970ff', BackgroundColor: '#0e0b16', SurfaceColor: '#1a1426', CustomFontFamily: 'Poppins',
            AppAccentGlow: false, GlassMenus: true, GlassOpacity: '0.65',
            BgGradient: 'corners', BgGradientColor1: '#6a2fb5', BgGradientColor2: '#2a0f5a', BgGradientStrength: '0.55',
            HeaderColor: '#0e0b16', HeaderOpacity: '0.5', HeaderBlur: '20',
            BorderRadius: '0.8', GridSpacing: '0.6', EnableHoverZoom: true, EnableCardShadow: true,
            CardBorderWidth: '1', CardBorderColor: '#a970ff', CardBorderOpacity: '0.35',
            EnableHoverGlow: true, GlowSize: '18', CardButtonGlow: true,
            CardTitleBold: true, CardTitlePosition: 'overlay', CardButtonPlayedColor: '#a970ff',
            ProgressTrackerColor: '#a970ff', ProgressBarHeight: '0.3', ProgressTrackerRadius: '1',
            BackdropBlur: '6', FilledPlayButton: true, AccentPlayerButtons: true
        }
    };

    // How the Presets dropdown groups them. Every preset must appear here once.
    const PRESET_GROUPS = [
        ['Basics', ['Jellyfin Default', 'OLED Black', 'Minimal']],
        ['Streaming Services', ['Netflix Red', 'Disney+', 'Apple TV+']],
        ['Colour Schemes', ['Nord', 'Purple Haze']]
    ];

    // Detail page button row for the preview, in the web client's order. `hide` is the setting that hides it;
    // `state` marks the buttons shown in their "on" state (played / favourited).
    const DETAIL_BTNS = [
        { k: 'play', hide: null, d: 'M8 5v14l11-7z' },
        { k: 'trailer', hide: 'HideTrailerBtn', d: 'M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z' },
        { k: 'mix', hide: 'HideInstantMixBtn', d: 'M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z' },
        { k: 'download', hide: 'HideDownloadBtn', d: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z' },
        { k: 'played', hide: 'HidePlayedBtn', state: 'played', d: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' },
        { k: 'fav', hide: 'HideLikeDislike', state: 'fav', d: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
        { k: 'split', hide: 'HideSplitBtn', d: 'M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3z' },
        { k: 'more', hide: 'HideMoreBtn', d: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' }
    ];

    function updatePreview(v) {
        const accent = v.AccentColor || '#00a4dc';
        const bg = v.EnableOledBlack ? '#000000' : v.BackgroundColor;
        const surface = v.EnableOledBlack ? '#0a0a0a' : v.SurfaceColor;
        const r = v.BorderRadius + 'em';
        const q = (id) => document.getElementById('tb_pv_' + id);
        const show = (id, visible) => { q(id).style.display = visible ? '' : 'none'; };

        // Page: background, font, text size.
        const page = q('page');
        page.style.background = bg;
        page.style.fontFamily = v.CustomFontFamily ? `'${cssStr(v.CustomFontFamily)}', sans-serif` : 'sans-serif';
        page.style.fontSize = (12 * Number(v.TextScale) / 100) + 'px';

        // Header over the backdrop: opacity, blur, logo.
        const header = q('header');
        header.style.background = rgba(v.HeaderColor, v.HeaderOpacity);
        header.style.backdropFilter = header.style.webkitBackdropFilter = `blur(${v.HeaderBlur}px)`;
        q('avatar').style.background = v.AccentProfileIcon ? accent : '#00729a';
        const logo = q('logo');
        if (v.HeaderLogoUrl) {
            logo.textContent = '';
            logo.style.backgroundImage = `url('${cssStr(v.HeaderLogoUrl)}')`;
            logo.style.width = (Number(v.HeaderLogoHeight) * 36) + 'px';
            logo.style.height = (Number(v.HeaderLogoHeight) * 9) + 'px';
        } else {
            logo.textContent = 'Jellyfin';
            logo.style.backgroundImage = 'none';
            logo.style.width = 'auto';
            logo.style.height = 'auto';
        }

        // Detail-page banner: darkness and blur.
        q('backdrop').style.filter = `blur(${v.BannerBlur}px) brightness(${1 - Number(v.BannerDim)})`;
        q('dim').style.background = 'transparent';
        show('ratings', !v.HideRatings);
        show('age', !v.HideAgeRating);

        // Posters: radius, spacing, shadow, watched badge, progress bar, titles.
        q('posters').style.gap = (Number(v.GridSpacing) * 2) + 'em';
        ['a', 'b'].forEach(k => {
            const poster = q('poster_' + k);
            poster.style.borderRadius = r;
            poster.style.boxShadow = v.EnableCardShadow ? '0 6px 14px rgba(0,0,0,0.6)' : 'none';
            q('played_' + k).style.background = watchedColorOf(v);
            q('played_' + k).style.color = badgeTextOf(v);
            const track = q('track_' + k);
            track.style.height = Math.max(2, Number(v.ProgressBarHeight) * 14) + 'px';
            track.style.borderRadius = v.ProgressTrackerRadius + 'em';
            const bar = q('bar_' + k);
            bar.style.background = v.ProgressTrackerColor || accent;
            bar.style.borderRadius = v.ProgressTrackerRadius + 'em';
            show('title_' + k, !v.HideCardTitles);
        });

        // The second poster shows the hover state: zoom, glow ring, overlay buttons.
        q('card_b').style.transform = v.EnableHoverZoom ? 'scale(1.05)' : 'none';
        const posterB = q('poster_b');
        if (v.EnableHoverGlow) posterB.style.boxShadow = `0 0 ${v.GlowSize}px ${accent}`;
        const ring = q('ring');
        ring.style.display = v.EnableHoverGlow ? '' : 'none';
        ring.style.borderColor = accent;
        ring.style.borderRadius = r;
        posterB.style.overflow = 'hidden';
        show('overlay', !v.HideCardOverlayButtons);
        // Card buttons: the hovered preview poster is "marked played" and "favourited".
        q('ob_played').style.color = v.CardButtonPlayedColor;
        q('ob_fav').style.color = v.CardButtonFavoriteColor;
        q('ob_more').style.color = v.CardButtonColor;
        document.querySelectorAll('.tb-pv-ob').forEach(b => {
            b.style.display = 'inline-flex';
            b.style.alignItems = 'center';
            b.style.justifyContent = 'center';
            b.style.width = b.style.height = '15px';
            b.style.borderRadius = '50%';
            b.style.background = `rgba(0,0,0,${v.CardButtonBgOpacity})`;
            b.style.textShadow = v.CardButtonGlow ? '0 0 3px currentColor, 0 0 6px currentColor' : 'none';
        });

        // Controls: tab, menu/dialog surface, buttons, declutter items.
        q('tab').style.color = accent;
        q('tab').style.borderBottomColor = accent;
        const surf = q('surface');
        surf.style.background = surface;
        surf.style.borderRadius = r;
        ['play', 'playall', 'shuffle'].forEach(id => {
            q(id).style.background = accent;
            q(id).style.color = contrastText(accent);
            q(id).style.borderRadius = r;
        });
        show('playall', !v.HidePlayAll);
        show('shuffle', !v.HideShuffle);
        show('likes', !v.HideLikeDislike);

        // Detail page buttons: accent icons, optional solid play, played/favourite in their own colours.
        DETAIL_BTNS.forEach(b => {
            const el = q('db_' + b.k);
            const solid = b.k === 'play' && v.FilledPlayButton;
            el.style.display = b.hide && v[b.hide] ? 'none' : 'inline-flex';
            el.style.background = solid ? accent : 'rgba(255,255,255,0.06)';
            el.style.color = b.state === 'played' ? v.CardButtonPlayedColor
                : b.state === 'fav' ? v.CardButtonFavoriteColor
                : solid ? contrastText(accent)
                : v.AccentDetailButtons ? accent : '#ffffff';
        });
        show('cast', !v.HideCastCrew);

        // Header icons and "transparent until scrolled" (the preview shows the top-of-page state).
        show('hsearch', !v.HideHeaderSearch);
        show('hcast', !v.HideHeaderCast);
        show('hsync', !v.HideHeaderSyncPlay);
        if (v.HeaderTransparentTop) { header.style.background = 'transparent'; header.style.backdropFilter = header.style.webkitBackdropFilter = 'none'; }

        // Title ribbon, language flag, card border, watched dimming.
        q('ribbon').style.background = rgba(surface, v.RibbonOpacity);
        show('flag', !v.HideLanguageFlags);
        ['a', 'b'].forEach(k => {
            const poster = q('poster_' + k);
            const w = Number(v.CardBorderWidth);
            poster.style.outline = w > 0 ? `${w}px solid ${rgba(v.CardBorderColor, v.CardBorderOpacity)}` : 'none';
            poster.style.outlineOffset = w > 0 ? `-${w}px` : '0';
        });
        posterB.style.filter = Number(v.WatchedDim) > 0 ? `brightness(${1 - Number(v.WatchedDim)})` : 'none';

        // Video player: timeline/volume accent, player buttons, subtitle style and size.
        const sliderColor = v.AccentPlayer ? accent : '#00a4dc';
        q('seek').style.background = sliderColor;
        q('thumb').style.background = sliderColor;
        q('vol').style.color = v.AccentPlayer ? accent : '#ffffff';
        q('pause').style.color = v.AccentPlayerButtons ? accent : '#ffffff';
        const sub = q('sub');
        const shadow = '0 0 3px #000, 0 0 2px #000, 1px 1px 2px #000';
        const subLook = {
            default: ['#ffffff', 'transparent', shadow, '400'],
            outline: ['#ffffff', 'transparent', shadow, '400'],
            yellow: ['#ffd400', 'transparent', shadow, '400'],
            boxed: ['#ffffff', 'rgba(0,0,0,0.75)', 'none', '400'],
            bold: ['#ffffff', 'transparent', shadow, '700']
        }[v.SubtitleStyle] || ['#ffffff', 'transparent', shadow, '400'];
        sub.style.color = subLook[0];
        sub.style.background = subLook[1];
        sub.style.textShadow = subLook[2];
        sub.style.fontWeight = subLook[3];
        sub.style.padding = v.SubtitleStyle === 'boxed' ? '1px 5px' : '0';
        sub.style.borderRadius = '3px';
        sub.style.fontSize = (11 * Number(v.SubtitleScale) / 100) + 'px';

        // Login page background thumbnail.
        show('login', !!v.LoginBackgroundUrl);
        q('login').style.backgroundImage = v.LoginBackgroundUrl ? `url('${cssStr(v.LoginBackgroundUrl)}')` : 'none';

        // Card titles: alignment and weight; app background image / accent glow behind the preview page.
        ['a', 'b'].forEach(k => {
            const t = q('title_' + k);
            t.style.textAlign = v.CardTitleAlign === 'left' ? 'left' : 'center';
            t.style.fontWeight = v.CardTitleBold ? '600' : '400';
        });
        const pageLayers = previewMode === 'tv' && v.TvPlainBackground ? [] : backgroundLayers(v);
        page.style.background = pageLayers.length ? `${pageLayers.join(', ')}, ${bg}` : bg;
        if (v.GlassMenus) { surf.style.background = rgba(surface, v.GlassOpacity); surf.style.backdropFilter = 'blur(6px)'; }

        // Preview size: phone has no hover (no zoom, glow or overlay buttons); TV shows the focus ring
        // (when glow is on) instead of hover, and no overlay buttons.
        page.style.width = previewMode === 'phone' ? '230px' : '100%';
        if (previewMode !== 'desktop') {
            q('card_b').style.transform = previewMode === 'tv' ? 'scale(1.05)' : 'none';
            posterB.style.boxShadow = 'none';
            show('overlay', false);
            ring.style.display = previewMode === 'tv' && v.EnableHoverGlow ? '' : 'none';
            q('title_b').textContent = previewMode === 'tv' ? 'Focused' : 'Tapped';
        } else {
            q('title_b').textContent = 'Hovered';
        }

        // The panel's own scrollbar mirrors the scrollbar setting.
        const scroller = document.getElementById('tb_scroll');
        scroller.classList.toggle('tb-slim-scroll', !!v.EnableSlimScrollbars);
        scroller.style.setProperty('--tb-accent', accent);
    }

    // The web client renders the Dashboard > General > Custom CSS copy of the theme in a <style> inside <body>, which
    // beats anything in <head>. Runtime and live-preview styles go at the end of <body> so they win over that copy.
    function placeLateStyle(tag, before) {
        const parent = document.body || document.head;
        if (before && before.parentNode === parent) parent.insertBefore(tag, before);
        else parent.appendChild(tag);
    }

    function applyLive() {
        const v = readValues();

        let styleTag = document.getElementById('tb-live-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'tb-live-styles';
            placeLateStyle(styleTag);
        }
        styleTag.textContent = buildCss(v);
        updatePreview(v);

        // Grey out colour pickers that an "automatic"/"linked" checkbox currently overrides.
        const setDisabled = (id, disabled) => {
            document.getElementById('tb_wrap_' + id).style.opacity = disabled ? '0.3' : '1';
            el(id).style.pointerEvents = disabled ? 'none' : 'auto';
        };
        setDisabled('WatchedIndicatorColor', v.LinkWatchedToAccent);
        setDisabled('BadgeTextColor', v.AutoBadgeText);

        // Hex boxes follow their pickers (unless being typed in).
        document.querySelectorAll('#tb-live-panel .tb-hex').forEach(box => {
            if (document.activeElement !== box) box.value = el(box.getAttribute('data-for')).value;
        });

        // Changed markers and count.
        let changed = 0;
        fields.forEach(f => {
            if (f.section) return;
            const isChanged = String(v[f.id]) !== String(f.default);
            if (isChanged) changed++;
            const row = document.querySelector(`#tb-live-panel .tb-field[data-id="${f.id}"]`);
            if (row) row.classList.toggle('tb-changed', isChanged);
        });
        document.getElementById('tb_changed_count').textContent = changed ? String(changed) : '';
        document.getElementById('tb-live-panel').style.setProperty('--tb-accent', v.AccentColor || '#00a4dc');
        document.getElementById('tb-live-panel').style.setProperty('--tb-accent-text', contrastText(v.AccentColor || '#00a4dc'));
        document.querySelectorAll('#tb-live-panel .tb-pv-mode').forEach(b => b.classList.toggle('tb-active', b.getAttribute('data-mode') === previewMode));
        if (document.getElementById('tb_changed_only').checked) applyFilter();

        recordHistory();
    }

    // ---- Editor state: unsaved changes, undo/redo, filtering ----

    let savedSnapshot = null;   // settings as last loaded/saved
    let editHistory = [];           // settings snapshots (JSON)
    let editHistoryPos = -1;
    let historyTimer = null;
    let restoringHistory = false;
    let previewMode = 'desktop';

    function isDirty() {
        return savedSnapshot !== null && JSON.stringify(readValues()) !== savedSnapshot;
    }

    // Snapshots are taken 400 ms after the last change, so dragging a slider is one undo step.
    function recordHistory() {
        if (restoringHistory || savedSnapshot === null) return;
        clearTimeout(historyTimer);
        historyTimer = setTimeout(function () {
            const snap = JSON.stringify(readValues());
            if (snap === editHistory[editHistoryPos]) return;
            editHistory = editHistory.slice(0, editHistoryPos + 1);
            editHistory.push(snap);
            if (editHistory.length > 100) editHistory.shift();
            editHistoryPos = editHistory.length - 1;
            updateHistoryButtons();
        }, 400);
        updateHistoryButtons();
    }

    function stepHistory(dir) {
        clearTimeout(historyTimer);
        // A change still waiting to be recorded counts as the newest step.
        const current = JSON.stringify(readValues());
        if (current !== editHistory[editHistoryPos]) {
            editHistory = editHistory.slice(0, editHistoryPos + 1);
            editHistory.push(current);
            editHistoryPos = editHistory.length - 1;
        }
        const target = editHistoryPos + dir;
        if (target < 0 || target >= editHistory.length) return;
        editHistoryPos = target;
        restoringHistory = true;
        writeValues(JSON.parse(editHistory[editHistoryPos]));
        refreshRangeLabels();
        applyLive();
        restoringHistory = false;
        updateHistoryButtons();
    }

    function updateHistoryButtons() {
        const undo = document.getElementById('tb_undo_btn');
        const redo = document.getElementById('tb_redo_btn');
        if (!undo) return;
        const pending = savedSnapshot !== null && JSON.stringify(readValues()) !== editHistory[editHistoryPos];
        undo.disabled = !(editHistoryPos > 0 || pending);
        redo.disabled = pending || editHistoryPos >= editHistory.length - 1;
    }

    function readCollapsed() {
        try { return JSON.parse(localStorage.getItem('tb-collapsed-names') || '[]'); } catch (e) { return []; }
    }

    // Search text and "Changed only" together decide which options show. A search shows matches even
    // inside collapsed sections.
    function applyFilter() {
        const term = document.getElementById('tb_search').value.trim().toLowerCase();
        const changedOnly = document.getElementById('tb_changed_only').checked;
        let any = false;
        document.querySelectorAll('#tb-live-panel .tb-section').forEach(s => {
            let visible = 0;
            s.classList.toggle('tb-searching', !!term);
            s.querySelectorAll('.tb-field').forEach(fl => {
                const match = (!term || fl.getAttribute('data-text').indexOf(term) !== -1) && (!changedOnly || fl.classList.contains('tb-changed'));
                fl.style.display = match ? '' : 'none';
                if (match) visible++;
            });
            s.style.display = visible ? '' : 'none';
            if (term && visible) s.classList.remove('tb-collapsed');
            if (visible) any = true;
        });
        const none = document.getElementById('tb_no_results');
        none.textContent = changedOnly && !term ? 'Nothing is changed from the defaults.' : 'No options match your search.';
        none.style.display = any ? 'none' : '';
    }

    function showToast(text) {
        let t = document.getElementById('tb_toast');
        if (!t) {
            t = document.createElement('div');
            t.id = 'tb_toast';
            t.style.cssText = 'position: absolute; left: 50%; bottom: 95px; transform: translateX(-50%); z-index: 7; background: #2b2b2b; color: #eee; padding: 10px 16px; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.6); max-width: 80%; text-align: center; transition: opacity 0.3s;';
            document.getElementById('tb-live-panel').appendChild(t);
        }
        t.textContent = text;
        t.style.opacity = '1';
        clearTimeout(t._timer);
        t._timer = setTimeout(() => { t.style.opacity = '0'; }, 3500);
    }

    // ---- Artwork colours (accent suggestions and the automatic per-title accent) ----

    // The best artwork URL on the current page: details backdrop, else the details poster, else the page backdrop.
    function pageArtworkUrl() {
        const fromStyle = (node) => {
            if (!node) return null;
            const m = /url\(["']?([^"')]+)["']?\)/.exec(node.style.backgroundImage || getComputedStyle(node).backgroundImage || '');
            return m ? m[1] : null;
        };
        const page = document.querySelector('.itemDetailPage:not(.hide)');
        if (page) {
            const url = fromStyle(page.querySelector('.itemBackdrop')) || fromStyle(page.querySelector('.detailImageContainer .cardImageContainer'));
            if (url) return url;
            const img = page.querySelector('.detailImageContainer img');
            if (img && img.src) return img.src;
        }
        const backdrop = fromStyle(document.querySelector('.backdropImage'));
        if (backdrop) return backdrop;
        // Other plugins' banners (Editor's Choice, Media Bar...): the largest on-screen Jellyfin image.
        let best = null, bestArea = 0;
        document.querySelectorAll('[style*="/Images/"], img[src*="/Images/"], [class*="ackdrop"]').forEach(el => {
            if (el.closest('#tb-live-panel')) return;
            const r = el.getBoundingClientRect();
            const area = Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
            if (area <= bestArea) return;
            const url = el.tagName === 'IMG' ? el.src : fromStyle(el);
            if (url && url.indexOf('/Images/') !== -1) { best = url; bestArea = area; }
        });
        return best;
    }

    const paletteCache = {};

    // Up to `count` vivid, distinct colours from an image (downscaled; pixels scored by saturation and brightness).
    function paletteFromImage(url, count) {
        if (paletteCache[url]) return Promise.resolve(paletteCache[url].slice(0, count));
        return new Promise(function (resolve) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function () {
                try {
                    const size = 48;
                    const canvas = document.createElement('canvas');
                    canvas.width = canvas.height = size;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, size, size);
                    const data = ctx.getImageData(0, 0, size, size).data;
                    const buckets = {};
                    for (let i = 0; i < data.length; i += 4) {
                        const [h, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);
                        if (s < 0.3 || l < 0.2 || l > 0.85) continue;
                        const key = Math.round(h * 18);                      // 20-degree hue buckets
                        const b = buckets[key] || (buckets[key] = { score: 0, r: 0, g: 0, b: 0, n: 0 });
                        b.score += s * (1 - Math.abs(l - 0.5));
                        b.r += data[i]; b.g += data[i + 1]; b.b += data[i + 2]; b.n++;
                    }
                    const colors = Object.values(buckets).sort((a, b) => b.score - a.score).map(b => {
                        const [h, s, l] = rgbToHsl(b.r / b.n, b.g / b.n, b.b / b.n);
                        // Keep it usable as an accent: saturated and mid-bright.
                        return hslToHex(h, Math.max(s, 0.55), Math.min(Math.max(l, 0.45), 0.6));
                    });
                    paletteCache[url] = colors;
                    resolve(colors.slice(0, count));
                } catch (e) {
                    resolve([]);
                }
            };
            img.onerror = () => resolve([]);
            img.src = url;
        });
    }

    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0;
        const l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
            h /= 6;
        }
        return [h, s, l];
    }

    function hslToHex(h, s, l) {
        const f = (n) => {
            const k = (n + h * 12) % 12;
            const a = s * Math.min(l, 1 - l);
            const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
            return Math.round(c * 255).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    // ---- Diagnostics ----

    async function runDiagnostics() {
        const box = document.getElementById('tb_diag');
        const list = document.getElementById('tb_diag_list');
        box.style.display = 'flex';
        list.innerHTML = 'Checking…';
        const rows = [];
        const add = (ok, title, detail) => rows.push({ ok, title, detail });
        const text = (url) => fetch(url, { cache: 'no-store' }).then(r => r.ok ? r.text() : Promise.reject(new Error('HTTP ' + r.status)));

        add(true, 'Editor script running', 'Version ' + TB_VERSION);
        try {
            const html = await text(ApiClient.getUrl('web/index.html'));
            add(html.indexOf('ThemeBuilder/editor.js') !== -1, 'Server adds the theme to the web client',
                html.indexOf('ThemeBuilder/editor.js') !== -1 ? 'index.html includes the editor script and stylesheet.' : 'index.html does not include the script. Is File Transformation installed and enabled?');
        } catch (e) { add(false, 'Server adds the theme to the web client', 'Could not load index.html: ' + e.message); }
        // What the server recorded while registering with File Transformation, and its periodic check of the page.
        try {
            const st = (await ApiClient.getJSON(ApiClient.getUrl('ThemeBuilder/status'))).injection;
            const esc = (t) => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
            const when = (iso) => iso ? new Date(iso).toLocaleString() : 'not yet';
            add(st.state === 'registered', 'Registered with File Transformation',
                st.state === 'registered'
                    ? `At ${when(st.registeredAt)}${st.attempts > 1 ? ` (attempt ${st.attempts})` : ''}, ${st.copiesRegistered} of ${st.copies} loaded copies. Page last checked ${when(st.lastCheckAt)}${st.lastCheckInjected === false ? ' and the script was missing' : ''}${st.repairs ? `; repaired ${st.repairs} time(s)` : ''}.`
                    : `State: ${esc(st.state)} after ${st.attempts} attempt(s)${st.error ? ': ' + esc(st.error) : ''}. Restart Jellyfin; Dashboard > Activity has the details.`);
        } catch (e) { add(false, 'Registered with File Transformation', 'Could not read the server\'s status: ' + e.message); }

        const sheet =[...document.styleSheets].find(s => (s.href || '').indexOf('ThemeBuilder/style.css') !== -1);
        let ruleCount = -1;
        try { ruleCount = sheet ? sheet.cssRules.length : -1; } catch (e) { ruleCount = -1; }
        add(ruleCount > 0, 'Saved theme stylesheet loaded', ruleCount > 0 ? ruleCount + ' rules active.' : 'style.css is missing or empty. Save the theme once.');

        const cfg = loadedConfig || {};
        add(cfg.CssVersion === TB_VERSION, 'Saved theme built by this version',
            cfg.CssVersion === TB_VERSION ? 'Built by ' + TB_VERSION + '.' : 'Built by ' + (cfg.CssVersion || 'an older version') + '. It rebuilds automatically, or click Save & Reload.');

        try {
            const branding = await ApiClient.getNamedConfiguration('branding');
            const custom = (branding && branding.CustomCss) || '';
            const s = custom.indexOf(BRAND_START), e = custom.indexOf(BRAND_END);
            const inSync = s !== -1 && e > s && custom.slice(s + BRAND_START.length, e).trim() === (cfg.GeneratedCss || '').trim();
            add(inSync, 'TV apps get the same theme (Custom CSS copy)', inSync ? 'The copy in Dashboard > General > Custom CSS matches.' : 'The Custom CSS copy is missing or out of date. Click Save & Reload to update it.');
        } catch (e) { add(false, 'TV apps get the same theme (Custom CSS copy)', 'Could not read branding settings: ' + e.message); }

        // A page chunk corrupted by an over-broad File Transformation pattern starts with "<" instead of JavaScript.
        // Script names differ between jellyfin-web versions, so check the web client's own scripts, the ones whose names
        // an over-broad pattern would hit ("index", "html", "details") first.
        const risky = (n) => /index|html|details/i.test(n.split('/').pop()) ? 0 : 1;
        const chunks = [...new Set(performance.getEntriesByType('resource').map(r => r.name.split('?')[0])
            .filter(n => n.indexOf(location.origin) === 0 && /\/web\/[^?]*\.js$/.test(n) && n.indexOf('ThemeBuilder') === -1))]
            .sort((a, b) => risky(a) - risky(b));
        if (chunks.length) {
            let bad = [];
            for (const c of chunks.slice(0, 6)) {
                try { if ((await text(c)).trimStart().startsWith('<')) bad.push(c.split('/').pop()); } catch (e) { /* ignore */ }
            }
            add(bad.length === 0, 'Page scripts are not corrupted', bad.length ? 'Corrupted: ' + bad.join(', ') : 'Checked ' + Math.min(chunks.length, 6) + ' page scripts.');
        } else {
            add(true, 'Page scripts are not corrupted', 'No page scripts loaded yet (open a details page and run again to check).');
        }

        add(CSS.supports('selector(:has(a))'), 'Browser supports :has()', CSS.supports('selector(:has(a))') ? 'All options work in this browser.' : 'A few options (Play All/Shuffle, watched dimming, My Media row) won\'t apply in this browser.');

        list.innerHTML = rows.map(r => `<div class="tb-diag-row"><span style="color: ${r.ok ? '#6fcf6f' : '#ff8a80'}; font-weight: bold; width: 1.2em;">${r.ok ? '&#10003;' : '&#10007;'}</span><span><b style="color: #eee;">${r.title}</b><br><span style="font-size: 0.9em; color: #999;">${r.detail}</span></span></div>`).join('');
    }

    function closePanel() {
        document.getElementById('tb-live-panel').style.transform = 'translateX(105%)';
        // Discard the unsaved preview; the saved theme (style.css) stays applied.
        const styleTag = document.getElementById('tb-live-styles');
        if (styleTag) styleTag.remove();
    }

    function buildPanel() {
        // Each section is its own block (searchable, with its own Reset); each option is a .tb-field.
        let inputsHtml = '';
        let sec = -1;
        fields.forEach(f => {
            if (f.section) {
                if (sec >= 0) inputsHtml += '</div>';
                sec++;
                f._sec = sec;
                inputsHtml += `<div class="tb-section" data-sec="${sec}">
                    <h3 style="display: flex; justify-content: space-between; align-items: baseline; margin: 25px 0 15px 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px; font-size: 1.1em; color: #ddd; font-weight: 500;">
                        <span class="tb-sec-toggle" data-sec="${sec}" title="Collapse / expand" style="cursor: pointer; user-select: none;"><span class="tb-chev" style="display: inline-block; width: 1em; color: #777; transition: transform 0.15s;">&#9662;</span>${f.section}</span>
                        <button type="button" class="tb-sec-reset" data-sec="${sec}" style="background: none; border: none; color: #888; font-size: 0.75em; cursor: pointer; padding: 0;">Reset section</button>
                    </h3>`;
                return;
            }
            f._sec = sec;
            inputsHtml += `<div class="tb-field" data-id="${f.id}" data-text="${(f.label + ' ' + fields.filter(s => s.section)[sec].section).toLowerCase().replace(/"/g, '')}">`;
            if (f.type === 'checkbox') {
                inputsHtml += `<label style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; cursor: pointer; color: #ccc;">
                                <input type="checkbox" id="tb_${f.id}" style="width: 18px; height: 18px;" />
                                <span>${f.label}</span>
                             </label>`;
            } else if (f.type === 'select') {
                inputsHtml += `<div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 5px; font-size: 0.95em; color: #aaa;">${f.label}</label>
                                <select id="tb_${f.id}" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: #1c1c1c; color: #fff;">
                                    ${f.options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join('')}
                                </select>
                             </div>`;
            } else if (f.type === 'color') {
                inputsHtml += `<div style="margin-bottom: 15px;" id="tb_wrap_${f.id}">
                                <label style="display: block; margin-bottom: 5px; font-size: 0.95em; color: #aaa;">${f.label}</label>
                                <div style="display: flex; gap: 8px; align-items: center;">
                                    <input type="color" id="tb_${f.id}" style="flex: 1; min-width: 0; height: 45px; border: none; border-radius: 6px; cursor: pointer; background: none;" />
                                    <input type="text" class="tb-hex" data-for="${f.id}" maxlength="7" spellcheck="false" title="Hex colour, e.g. #e50914" style="width: 90px; padding: 11px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.4); color: #fff; font-family: monospace;" />
                                </div>
                                ${f.id === 'AccentColor' ? `<div style="display: flex; align-items: center; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
                                    <button type="button" id="tb_swatch_btn" class="tb-tool-btn" style="padding: 6px 10px; font-size: 0.85em;">Suggest from this page</button>
                                    <span id="tb_swatches" style="display: flex; gap: 6px;"></span>
                                </div>` : ''}
                             </div>`;
            } else if (f.type === 'range') {
                inputsHtml += `<div style="margin-bottom: 15px;">
                                <label style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.95em; color: #aaa;"><span>${f.label}</span><span id="tb_val_${f.id}" style="color: #fff;"></span></label>
                                <input type="range" id="tb_${f.id}" min="${f.min}" max="${f.max}" step="${f.step}" style="width: 100%;" />
                             </div>`;
            } else {
                inputsHtml += `<div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 5px; font-size: 0.95em; color: #aaa;">${f.label}</label>
                                <input type="text" id="tb_${f.id}" style="width: 100%; padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.4); color: #fff; box-sizing: border-box;" />
                             </div>`;
            }
            inputsHtml += '</div>';
        });
        if (sec >= 0) inputsHtml += '</div>';
        inputsHtml += '<div id="tb_no_results" style="display: none; color: #888; margin-top: 30px;">No options match your search.</div>';

        // Toolbar icons (inline SVG: the web client's icon font doesn't have every glyph).
        const svg = (d) => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
        const ICON = {
            undo: svg('<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>'),
            redo: svg('<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>'),
            more: svg('<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>'),
            export: svg('<path d="M12 15V3"/><path d="m7 8 5-5 5 5"/><path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>'),
            import: svg('<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>'),
            history: svg('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>'),
            diag: svg('<path d="M3 12h4l2-6 4 12 2-6h6"/>'),
            desktop: svg('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
            phone: svg('<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>'),
            tv: svg('<rect x="2.5" y="6" width="19" height="13" rx="2"/><path d="m8 2.5 4 3.5 4-3.5"/>'),
            eye: svg('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
            eyeOff: svg('<path d="M9.9 5.2A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3 3.9M6.6 6.6C3.8 8.4 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/><path d="m3 3 18 18"/>')
        };

        // Search, presets and theme code, pinned above the options.
        const toolsHtml = `
            <div id="tb_tools">
                <div class="tb-tools-row">
                    <input id="tb_search" class="tb-ctl" type="search" placeholder="Search options…" style="flex: 1 1 auto;" />
                    <select id="tb_preset" class="tb-ctl" title="Start from a preset" style="flex: 0 0 auto; max-width: 48%;">
                        <option value="">Presets…</option>
                        ${PRESET_GROUPS.map(([group, names]) => `<optgroup label="${group}">${names.map(k => `<option value="${k}">${k}</option>`).join('')}</optgroup>`).join('')}
                    </select>
                </div>
                <div class="tb-tools-row">
                    <div class="tb-seg" role="group" aria-label="History">
                        <button id="tb_undo_btn" type="button" class="tb-icon-btn" title="Undo (Ctrl+Z)" aria-label="Undo" disabled>${ICON.undo}</button>
                        <button id="tb_redo_btn" type="button" class="tb-icon-btn" title="Redo (Ctrl+Y)" aria-label="Redo" disabled>${ICON.redo}</button>
                    </div>
                    <label class="tb-switch" title="Only show options that differ from the default">
                        <input id="tb_changed_only" type="checkbox" />
                        <span class="tb-switch-track"><span class="tb-switch-thumb"></span></span>
                        <span>Changed only</span>
                        <span id="tb_changed_count" class="tb-count"></span>
                    </label>
                    <div class="tb-more">
                        <button id="tb_more_btn" type="button" class="tb-icon-btn tb-icon-btn-solo" title="More actions" aria-label="More actions" aria-haspopup="true" aria-expanded="false">${ICON.more}</button>
                        <div id="tb_more_menu" class="tb-menu" role="menu">
                            <button id="tb_export_btn" type="button" class="tb-menu-item" role="menuitem">${ICON.export}<span>Export theme code…</span></button>
                            <button id="tb_import_btn" type="button" class="tb-menu-item" role="menuitem">${ICON.import}<span>Import theme code…</span></button>
                            <button id="tb_previous_btn" type="button" class="tb-menu-item" role="menuitem" title="Load the settings from before the last save">${ICON.history}<span>Load previous save</span></button>
                            <div class="tb-menu-sep"></div>
                            <button id="tb_diag_btn" type="button" class="tb-menu-item" role="menuitem" title="Check the plugin is working">${ICON.diag}<span>Diagnostics</span></button>
                        </div>
                    </div>
                </div>
            </div>`;

        // Theme code dialog, shared by Export (filled + selected) and Import (empty, paste then Apply).
        const codeHtml = `
            <div id="tb_code" style="display: none; position: absolute; inset: 0; z-index: 5; background: rgba(0,0,0,0.75); align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
                <div style="width: 100%; max-width: 560px; background: #1b1b1b; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 18px; box-sizing: border-box;">
                    <h3 id="tb_code_title" style="margin: 0 0 6px 0; color: #fff; font-weight: 500;"></h3>
                    <div id="tb_code_hint" style="color: #999; font-size: 0.9em; margin-bottom: 10px;"></div>
                    <textarea id="tb_code_text" spellcheck="false" style="width: 100%; height: 260px; box-sizing: border-box; background: #0f0f0f; color: #ddd; border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; padding: 10px; font-family: monospace; font-size: 12px;"></textarea>
                    <div id="tb_code_msg" style="min-height: 1.3em; margin: 6px 0; font-size: 0.9em;"></div>
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button id="tb_code_cancel" type="button" class="tb-tool-btn">Close</button>
                        <button id="tb_code_copy" type="button" class="tb-tool-btn">Copy</button>
                        <button id="tb_code_apply" type="button" class="tb-tool-btn" style="background: ${SAVE_COLOR}; color: #fff;">Apply</button>
                    </div>
                </div>
            </div>
            <div id="tb_confirm" class="tb-modal" style="display: none;">
                <div class="tb-modal-box" style="max-width: 400px;">
                    <h3 style="margin: 0 0 8px 0; color: #fff; font-weight: 500;">Discard unsaved changes?</h3>
                    <div style="color: #aaa; margin-bottom: 16px;">You changed settings since the last save. Closing throws those changes away.</div>
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button id="tb_confirm_keep" type="button" class="tb-tool-btn">Keep editing</button>
                        <button id="tb_confirm_discard" type="button" class="tb-tool-btn" style="background: #a33; color: #fff;">Discard</button>
                    </div>
                </div>
            </div>
            <div id="tb_diag" class="tb-modal" style="display: none;">
                <div class="tb-modal-box" style="max-width: 560px;">
                    <h3 style="margin: 0 0 10px 0; color: #fff; font-weight: 500;">Diagnostics</h3>
                    <div id="tb_diag_list" style="color: #ccc; line-height: 1.5; max-height: 55vh; overflow-y: auto;"></div>
                    <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 14px;">
                        <button id="tb_diag_rerun" type="button" class="tb-tool-btn">Run again</button>
                        <button id="tb_diag_close" type="button" class="tb-tool-btn">Close</button>
                    </div>
                </div>
            </div>`;

        // One poster for the preview; `k` is 'a' (normal) or 'b' (hover state, with ring + overlay buttons).
        const posterHtml = (k, title, badge) => `
            <div id="tb_pv_card_${k}" style="width: 74px; flex-shrink: 0; transition: transform 0.2s;">
                <div id="tb_pv_poster_${k}" style="position: relative; height: 108px; overflow: hidden; background: linear-gradient(160deg, ${k === 'a' ? '#4b4f7a 0%, #262840 55%, #151624' : '#7a4b5a 0%, #402630 55%, #241518'} 100%);">
                    ${k === 'a' ? '<div id="tb_pv_flag" style="position: absolute; top: 5px; left: 5px; padding: 0 3px; border-radius: 2px; background: #1f4fa3; color: #fff; font-size: 8px; font-weight: bold; line-height: 12px;">EN</div>' : ''}
                    <div id="tb_pv_played_${k}" style="position: absolute; top: 5px; right: 5px; min-width: 18px; height: 18px; padding: 0 3px; box-sizing: border-box; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold;">${badge}</div>
                    ${k === 'b' ? `<div id="tb_pv_overlay" style="position: absolute; inset: 0;">
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -60%); width: 26px; height: 26px; border-radius: 50%; background: rgba(0,0,0,0.6); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px;">&#9654;</div>
                        <div style="position: absolute; right: 3px; bottom: 12px; display: flex; gap: 1px; font-size: 11px; line-height: 1;">
                            <span id="tb_pv_ob_played" class="tb-pv-ob">&#10003;</span>
                            <span id="tb_pv_ob_fav" class="tb-pv-ob">&#10084;</span>
                            <span id="tb_pv_ob_more" class="tb-pv-ob" style="font-weight: bold;">&#8942;</span>
                        </div>
                    </div>
                    <div id="tb_pv_ring" style="position: absolute; inset: 0; border: 3px solid transparent; pointer-events: none;"></div>` : ''}
                    <div id="tb_pv_track_${k}" style="position: absolute; left: 5px; right: 5px; bottom: 5px; background: rgba(0,0,0,0.55); overflow: hidden;">
                        <div id="tb_pv_bar_${k}" style="width: ${k === 'a' ? '60' : '35'}%; height: 100%;"></div>
                    </div>
                </div>
                <div id="tb_pv_title_${k}" style="margin-top: 5px; text-align: center; color: #ddd; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${title}</div>
            </div>`;

        const previewHtml = `
            <div id="tb_pv_sticky">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; gap: 8px;">
                    <span style="font-size: 0.8em; text-transform: uppercase; letter-spacing: 0.08em; color: #888;">Preview</span>
                    <span id="tb_pv_modes" class="tb-seg tb-seg-sm" role="group" aria-label="Preview device" style="margin-left: auto;">
                        <button type="button" class="tb-pv-mode" data-mode="desktop" title="Desktop">${ICON.desktop}<span>Desktop</span></button>
                        <button type="button" class="tb-pv-mode" data-mode="phone" title="Phone">${ICON.phone}<span>Phone</span></button>
                        <button type="button" class="tb-pv-mode" data-mode="tv" title="TV">${ICON.tv}<span>TV</span></button>
                    </span>
                    <button id="tb_pv_toggle" type="button" class="tb-icon-btn tb-icon-btn-solo tb-icon-btn-sm" title="Hide preview" aria-label="Hide preview">${ICON.eyeOff}</button>
                </div>
                <div id="tb_pv_page" style="border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); color: #eee; margin: 0 auto; transition: width 0.2s;">
                    <div style="position: relative; height: 64px; overflow: hidden;">
                        <div id="tb_pv_backdrop" style="position: absolute; inset: -12px; background: linear-gradient(120deg, #c0663a 0%, #6b3f8f 45%, #1f5f8b 100%);"></div>
                        <div id="tb_pv_dim" style="position: absolute; inset: 0;"></div>
                        <div id="tb_pv_header" style="position: absolute; top: 0; left: 0; right: 0; height: 20px; display: flex; align-items: center; justify-content: space-between; padding: 0 8px;">
                            <span id="tb_pv_logo" style="font-weight: 700; font-size: 0.9em; background-size: contain; background-repeat: no-repeat; background-position: left center;">Jellyfin</span>
                            <span style="display: flex; gap: 6px; align-items: center; opacity: 0.85;">
                                <svg id="tb_pv_hsync" viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm16 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/></svg>
                                <svg id="tb_pv_hcast" viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11z"/></svg>
                                <svg id="tb_pv_hsearch" viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                                <span id="tb_pv_avatar" style="display: inline-block; width: 11px; height: 11px; border-radius: 50%; background: #00729a;"></span>
                            </span>
                        </div>
                        <div id="tb_pv_ribbon" style="position: absolute; left: 4px; bottom: 3px; right: 4px; padding: 2px 4px; border-radius: 4px;">
                            <div style="font-weight: 700;">Detail Page Title</div>
                            <div style="font-size: 0.85em; opacity: 0.9;"><span id="tb_pv_age" style="border: 1px solid currentColor; border-radius: 3px; padding: 0 3px; margin-right: 6px;">PG-13</span><span id="tb_pv_ratings">&#9733; 8.1 &nbsp; &#127813; 92%</span></div>
                        </div>
                    </div>
                    <div style="padding: 8px 8px 0; display: flex; gap: 5px; flex-wrap: wrap;" title="Detail page buttons (played and favourite shown switched on)">
                        ${DETAIL_BTNS.map(b => `<span id="tb_pv_db_${b.k}" style="width: 24px; height: 24px; border-radius: 50%; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="${b.d}"/></svg></span>`).join('')}
                    </div>
                    <div style="padding: 10px 8px; display: flex; gap: 12px; align-items: flex-start;">
                        <div id="tb_pv_posters" style="display: flex;">
                            ${posterHtml('a', 'Movie Title', '3')}
                            ${posterHtml('b', 'Hovered', '&#10003;')}
                        </div>
                        <div style="flex: 1; min-width: 0;">
                            <div id="tb_pv_tab" style="font-weight: 600; margin-bottom: 6px; padding-bottom: 2px; border-bottom: 2px solid transparent; display: inline-block;">Active Tab</div>
                            <div id="tb_pv_surface" style="padding: 6px 8px; margin-bottom: 6px; color: #ccc;">Menu &amp; dialog</div>
                            <div style="display: flex; gap: 5px; flex-wrap: wrap; align-items: center; margin-bottom: 6px;">
                                <span id="tb_pv_play" style="padding: 4px 9px; font-weight: 600;">&#9654; Play</span>
                                <span id="tb_pv_playall" style="padding: 4px 9px; font-weight: 600;">Play All</span>
                                <span id="tb_pv_shuffle" style="padding: 4px 9px; font-weight: 600;">&#8646; Shuffle</span>
                                <span id="tb_pv_likes" style="opacity: 0.85;">&#128077; &#128078;</span>
                            </div>
                            <div id="tb_pv_cast" style="font-size: 0.85em; color: #aaa;">Cast: A. Actor, B. Actor</div>
                        </div>
                    </div>
                    <div id="tb_pv_player" title="Video player" style="position: relative; height: 72px; margin: 0 8px 10px 8px; border-radius: 6px; overflow: hidden; background: linear-gradient(135deg, #2a3140 0%, #4a3f55 100%);">
                        <div style="position: absolute; left: 0; right: 0; bottom: 24px; text-align: center; line-height: 1.2;"><span id="tb_pv_sub" style="font-size: 11px;">Subtitles look like this</span></div>
                        <div style="position: absolute; left: 6px; right: 6px; bottom: 6px; display: flex; align-items: center; gap: 7px;">
                            <svg id="tb_pv_pause" viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                            <div style="flex: 1; height: 3px; background: rgba(255,255,255,0.3); position: relative; border-radius: 2px;">
                                <div id="tb_pv_seek" style="width: 40%; height: 100%; border-radius: 2px;"></div>
                                <div id="tb_pv_thumb" style="position: absolute; left: 40%; top: 50%; width: 9px; height: 9px; border-radius: 50%; transform: translate(-50%, -50%);"></div>
                            </div>
                            <svg id="tb_pv_vol" viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                        </div>
                    </div>
                    <div id="tb_pv_login" style="height: 36px; background-size: cover; background-position: center; border-top: 1px solid rgba(255,255,255,0.08); display: flex; align-items: flex-end; padding: 3px 8px; box-sizing: border-box; font-size: 0.8em; text-shadow: 0 1px 2px #000;">Login page</div>
                </div>
                <div style="font-size: 0.85em; color: #888; margin-top: 12px; line-height: 1.4;">Changes also preview live on the page behind. Close (&times;) to discard, or save to apply for everyone.</div>
            </div>`;

        const panel = document.createElement('div');
        panel.id = 'tb-live-panel';
        panel.style.cssText = 'position: fixed; top: 0; right: 0; width: 820px; max-width: 100vw; height: 100vh; background: rgba(17,17,17,0.97); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); z-index: 99999; box-shadow: -10px 0 40px rgba(0,0,0,0.8); transform: translateX(105%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; font-family: sans-serif; border-left: 1px solid rgba(255,255,255,0.05);';
        panel.innerHTML = `
            <div style="padding: 20px 25px; background: rgba(0,0,0,0.4); border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center;">
                <h2 style="margin: 0; font-size: 1.4em; color: #fff; font-weight: 500;">Theme Editor <span style="font-size: 0.55em; color: #777; font-weight: 400;">v${TB_VERSION}</span></h2>
                <button id="tb_close_btn" type="button" title="Close without saving" style="background: none; border: none; color: #aaa; font-size: 2em; line-height: 1; cursor: pointer; padding: 0;">&times;</button>
            </div>
            <style>
                /* Preview in its own column on the left, options scrolling on the right. */
                #tb_body { flex: 1; min-height: 0; display: flex; }
                #tb_pv_col { width: 360px; flex-shrink: 0; overflow-y: auto; padding: 18px 20px; box-sizing: border-box; border-right: 1px solid rgba(255,255,255,0.06); background: rgba(0,0,0,0.25); }
                #tb_scroll { flex: 1; min-width: 0; overflow-y: auto; padding: 0 25px 30px 25px; }
                /* Narrow screens (phones): stack the preview above the options. */
                @media (max-width: 820px) {
                    #tb_body { flex-direction: column; }
                    #tb_pv_col { width: auto; max-height: 45vh; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
                    /* Typing on a phone: the keyboard takes half the screen, so drop the preview and the Save bar
                       until the box loses focus, or the search box and its results end up behind the keyboard. */
                    #tb-live-panel.tb-typing #tb_pv_col, #tb-live-panel.tb-typing #tb_footer { display: none !important; }
                    /* iPhones zoom the whole page into any text box under 16px, which knocks the panel off screen. */
                    #tb-live-panel input:not([type="checkbox"]):not([type="range"]):not([type="color"]), #tb-live-panel select, #tb-live-panel textarea { font-size: 16px !important; }
                }
                /* The web client turns text selection off in its phone and TV layouts; some phones then won't type into boxes. */
                #tb-live-panel input, #tb-live-panel textarea, #tb-live-panel select { -webkit-user-select: text; user-select: text; }
                /* The editor's own tick boxes and sliders follow the accent being edited, not the browser's blue. */
                #tb-live-panel input[type="checkbox"], #tb-live-panel input[type="range"] { accent-color: var(--tb-accent, #00a4dc); }
                #tb_scroll.tb-slim-scroll::-webkit-scrollbar { width: 8px; }
                #tb_scroll.tb-slim-scroll::-webkit-scrollbar-track { background: transparent; }
                #tb_scroll.tb-slim-scroll::-webkit-scrollbar-thumb { background: var(--tb-accent); border-radius: 8px; }
                /* Toolbar: two tidy rows of equal-height controls; rarely used actions live in the More menu. */
                #tb_tools { position: sticky; top: 0; z-index: 2; display: flex; flex-direction: column; gap: 8px; padding: 14px 0 12px 0; background: rgb(17,17,17); border-bottom: 1px solid rgba(255,255,255,0.06); }
                #tb-live-panel .tb-tools-row { display: flex; align-items: center; gap: 6px; min-width: 0; }
                #tb-live-panel .tb-ctl { height: 34px; box-sizing: border-box; min-width: 0; padding: 0 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); background: #1c1c1c; color: #fff; font-size: 0.9em; }
                #tb-live-panel .tb-tool-btn { display: inline-flex; align-items: center; gap: 6px; height: 34px; box-sizing: border-box; padding: 0 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08); background: #262626; color: #ddd; cursor: pointer; font-size: 0.9em; white-space: nowrap; }
                #tb-live-panel .tb-tool-btn:hover:not(:disabled) { background: #333; }
                /* Undo / Redo: one joined pair of icon buttons. */
                #tb-live-panel .tb-seg { display: inline-flex; height: 34px; box-sizing: border-box; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; background: #1c1c1c; }
                #tb-live-panel .tb-icon-btn { display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 100%; padding: 0; border: none; background: none; color: #ddd; cursor: pointer; transition: background 0.15s, color 0.15s; }
                #tb-live-panel .tb-seg .tb-icon-btn + .tb-icon-btn { border-left: 1px solid rgba(255,255,255,0.1); }
                #tb-live-panel .tb-icon-btn:hover:not(:disabled) { background: #2c2c2c; color: #fff; }
                #tb-live-panel .tb-icon-btn:disabled { color: #555; cursor: default; }
                #tb-live-panel .tb-icon-btn-solo { width: 34px; height: 34px; box-sizing: border-box; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; background: #1c1c1c; }
                #tb-live-panel .tb-icon-btn[aria-expanded="true"] { background: #2c2c2c; color: #fff; }
                #tb-live-panel .tb-icon-btn:focus-visible, #tb-live-panel .tb-switch input:focus-visible + .tb-switch-track { outline: 2px solid var(--tb-accent, #00a4dc); outline-offset: 2px; }
                /* "Changed only": a pill switch with a count badge. */
                #tb-live-panel .tb-switch { display: inline-flex; align-items: center; gap: 8px; height: 34px; box-sizing: border-box; padding: 0 12px 0 8px; border: 1px solid rgba(255,255,255,0.1); border-radius: 17px; background: #1c1c1c; color: #ccc; font-size: 0.88em; cursor: pointer; white-space: nowrap; user-select: none; }
                #tb-live-panel .tb-switch:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
                #tb-live-panel .tb-switch input { position: absolute; opacity: 0; width: 1px; height: 1px; margin: 0; }
                #tb-live-panel .tb-switch-track { position: relative; width: 28px; height: 16px; border-radius: 8px; background: #444; transition: background 0.15s; flex: 0 0 auto; }
                #tb-live-panel .tb-switch-thumb { position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; border-radius: 50%; background: #ddd; transition: transform 0.15s; }
                #tb-live-panel .tb-switch input:checked + .tb-switch-track { background: var(--tb-accent, #00a4dc); }
                #tb-live-panel .tb-switch input:checked + .tb-switch-track .tb-switch-thumb { transform: translateX(12px); background: #fff; }
                #tb-live-panel .tb-count { min-width: 18px; padding: 1px 6px; border-radius: 9px; background: #333; color: #ddd; font-size: 0.85em; text-align: center; box-sizing: border-box; }
                #tb-live-panel .tb-count:empty { display: none; }
                #tb-live-panel .tb-more { position: relative; margin-left: auto; }
                #tb-live-panel .tb-menu { display: none; position: absolute; right: 0; top: calc(100% + 4px); min-width: 190px; padding: 4px; background: #1c1c1c; border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.6); z-index: 10; }
                #tb-live-panel .tb-menu.tb-open { display: block; }
                #tb-live-panel .tb-menu-item { display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 8px 10px; border: none; border-radius: 5px; background: none; color: #ddd; cursor: pointer; font-size: 0.9em; }
                #tb-live-panel .tb-menu-item svg { width: 16px; height: 16px; color: #999; flex: 0 0 auto; }
                #tb-live-panel .tb-menu-item:hover svg { color: var(--tb-accent, #00a4dc); }
                #tb-live-panel .tb-menu-item:hover { background: #2e2e2e; color: #fff; }
                #tb-live-panel .tb-menu-sep { height: 1px; margin: 4px 6px; background: rgba(255,255,255,0.08); }
                #tb-live-panel .tb-sec-reset:hover { color: #fff !important; }
                #tb-live-panel .tb-tool-btn:disabled { opacity: 0.4; cursor: default; }
                /* Collapsed sections hide their options. */
                #tb-live-panel .tb-section.tb-collapsed .tb-field { display: none !important; }
                #tb-live-panel .tb-section.tb-collapsed .tb-chev { transform: rotate(-90deg); }
                /* Options that differ from their default get an accent dot. */
                #tb-live-panel .tb-field { position: relative; }
                #tb-live-panel .tb-field.tb-changed::before { content: ''; position: absolute; left: -14px; top: 7px; width: 7px; height: 7px; border-radius: 50%; background: var(--tb-accent, #00a4dc); }
                #tb-live-panel .tb-modal { position: absolute; inset: 0; z-index: 6; background: rgba(0,0,0,0.75); align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; }
                #tb-live-panel .tb-modal-box { width: 100%; background: #1b1b1b; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 18px; box-sizing: border-box; }
                /* Preview device switcher: a smaller segmented control with icons. */
                #tb-live-panel .tb-seg-sm { height: 28px; border-radius: 7px; }
                #tb-live-panel .tb-pv-mode { display: inline-flex; align-items: center; justify-content: center; gap: 5px; width: 32px; height: 100%; padding: 0; border: none; background: none; color: #999; font-size: 0.78em; cursor: pointer; transition: background 0.15s, color 0.15s; }
                #tb-live-panel .tb-pv-mode + .tb-pv-mode { border-left: 1px solid rgba(255,255,255,0.1); }
                #tb-live-panel .tb-pv-mode svg { width: 14px; height: 14px; }
                #tb-live-panel .tb-pv-mode:hover:not(.tb-active) { background: #2c2c2c; color: #fff; }
                #tb-live-panel .tb-pv-mode.tb-active { background: var(--tb-accent, #00a4dc); color: var(--tb-accent-text, #fff); }
                #tb-live-panel .tb-pv-mode:focus-visible { outline: 2px solid var(--tb-accent, #00a4dc); outline-offset: -2px; }
                #tb-live-panel .tb-icon-btn-sm { width: 28px; height: 28px; border-radius: 7px; }
                #tb-live-panel .tb-icon-btn-sm svg { width: 15px; height: 15px; }
                #tb-live-panel .tb-pv-mode span { display: none; } /* icons only; the name is the tooltip */
                #tb-live-panel .tb-swatch { width: 26px; height: 26px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3); cursor: pointer; padding: 0; }
                #tb-live-panel .tb-diag-row { display: flex; gap: 8px; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
            </style>
            <div id="tb_body">
                <div id="tb_pv_col">${previewHtml}</div>
                <div id="tb_scroll">${toolsHtml}${inputsHtml}</div>
            </div>
            ${codeHtml}
            <div id="tb_footer" style="padding: 20px 25px; background: rgba(0,0,0,0.6); border-top: 1px solid rgba(255,255,255,0.05); display: flex; gap: 12px;">
                <button id="tb_reset_btn" type="button" style="flex: 0 0 auto; padding: 15px 18px; background: #3a3a3a; color: #ddd; border: none; border-radius: 6px; font-size: 1em; cursor: pointer;">Reset</button>
                <button id="tb_save_btn" type="button" style="flex: 1; padding: 15px; background: ${SAVE_COLOR}; color: #fff; border: none; border-radius: 6px; font-weight: bold; font-size: 1.1em; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.4);">Save &amp; Reload</button>
            </div>
        `;
        document.body.appendChild(panel);

        // Phones: keep the panel to the part of the screen above the on-screen keyboard (the page itself doesn't
        // shrink for it), and make room while a text box has focus.
        const isTextBox = (t) => t && (t.tagName === 'TEXTAREA' || (t.tagName === 'INPUT' && /^(text|search|url|number|)$/.test(t.type)));
        panel.addEventListener('focusin', (e) => {
            if (isTextBox(e.target)) panel.classList.add('tb-typing');
            // Open menus and dialogs trap focus by watching focusin on the document and pulling focus back to
            // themselves; keep the editor's focus to itself so its text boxes can always be typed in.
            e.stopPropagation();
        });
        panel.addEventListener('focusout', (e) => { if (isTextBox(e.target) && !isTextBox(e.relatedTarget)) panel.classList.remove('tb-typing'); });
        const vv = window.visualViewport;
        if (vv) {
            // The visible area: the whole window normally, the part above the keyboard while it's open.
            const fit = () => { panel.style.height = vv.height + 'px'; panel.style.top = vv.offsetTop + 'px'; };
            vv.addEventListener('resize', fit);
            vv.addEventListener('scroll', fit);
            fit();
        }

        // Close: ask first (inside the panel, not a browser dialog) when there are unsaved changes.
        document.getElementById('tb_close_btn').addEventListener('click', function () {
            if (isDirty()) document.getElementById('tb_confirm').style.display = 'flex';
            else closePanel();
        });
        document.getElementById('tb_confirm_keep').addEventListener('click', () => { document.getElementById('tb_confirm').style.display = 'none'; });
        document.getElementById('tb_confirm_discard').addEventListener('click', () => { document.getElementById('tb_confirm').style.display = 'none'; closePanel(); });

        // Undo / redo (buttons, and Ctrl+Z / Ctrl+Y or Ctrl+Shift+Z while the panel has focus, except in text boxes).
        document.getElementById('tb_undo_btn').addEventListener('click', () => stepHistory(-1));
        document.getElementById('tb_redo_btn').addEventListener('click', () => stepHistory(1));
        panel.addEventListener('keydown', function (e) {
            if (!(e.ctrlKey || e.metaKey) || /^(TEXTAREA)$/.test(e.target.tagName) || (e.target.type === 'text' || e.target.type === 'search')) return;
            const k = e.key.toLowerCase();
            if (k === 'z' && !e.shiftKey) { e.preventDefault(); stepHistory(-1); }
            else if (k === 'y' || (k === 'z' && e.shiftKey)) { e.preventDefault(); stepHistory(1); }
        });

        // Collapsible sections, remembered in this browser by name (so reordering sections is safe).
        const sectionName = (s) => fields.filter(f => f.section)[Number(s.getAttribute('data-sec'))].section;
        const collapsed = readCollapsed();
        document.querySelectorAll('#tb-live-panel .tb-section').forEach(s => {
            if (collapsed.indexOf(sectionName(s)) !== -1) s.classList.add('tb-collapsed');
        });
        document.querySelectorAll('#tb-live-panel .tb-sec-toggle').forEach(t => {
            t.addEventListener('click', function () {
                const s = this.closest('.tb-section');
                s.classList.toggle('tb-collapsed');
                const now = [...document.querySelectorAll('#tb-live-panel .tb-section.tb-collapsed')].map(sectionName);
                try { localStorage.setItem('tb-collapsed-names', JSON.stringify(now)); } catch (e) { /* storage unavailable */ }
            });
        });

        // Hex boxes mirror their colour pickers both ways.
        document.querySelectorAll('#tb-live-panel .tb-hex').forEach(box => {
            box.addEventListener('input', function () {
                const v = this.value.trim();
                if (/^#[0-9a-f]{6}$/i.test(v)) { el(this.getAttribute('data-for')).value = v.toLowerCase(); applyLive(); }
            });
        });

        // Accent suggestions from the artwork on the current page.
        document.getElementById('tb_swatch_btn').addEventListener('click', function () {
            const out = document.getElementById('tb_swatches');
            out.innerHTML = '<span style="color: #888; font-size: 0.85em;">Looking…</span>';
            const url = pageArtworkUrl();
            if (!url) { out.innerHTML = '<span style="color: #888; font-size: 0.85em;">No artwork here. Open a title first.</span>'; return; }
            paletteFromImage(url, 5).then(colors => {
                out.innerHTML = colors.length ? '' : '<span style="color: #888; font-size: 0.85em;">No strong colours found.</span>';
                colors.forEach(c => {
                    const b = document.createElement('button');
                    b.type = 'button'; b.className = 'tb-swatch'; b.title = c; b.style.background = c;
                    b.addEventListener('click', () => { el('AccentColor').value = c; applyLive(); });
                    out.appendChild(b);
                });
            });
        });

        // Preview size: desktop, phone (no hover), TV (focus ring instead of hover, no overlay buttons).
        document.querySelectorAll('#tb-live-panel .tb-pv-mode').forEach(b => {
            b.addEventListener('click', function () { previewMode = this.getAttribute('data-mode'); applyLive(); });
        });

        document.getElementById('tb_changed_only').addEventListener('change', applyFilter);

        document.getElementById('tb_previous_btn').addEventListener('click', function () {
            let prev = null;
            try { prev = loadedConfig && loadedConfig.PreviousSettingsJson ? JSON.parse(loadedConfig.PreviousSettingsJson) : null; } catch (e) { prev = null; }
            if (!prev) { showToast('There is no earlier save to go back to yet.'); return; }
            writeValues(prev);
            refreshRangeLabels();
            applyLive();
            showToast('Loaded the settings from before the last save. Click Save & Reload to keep them.');
        });

        document.getElementById('tb_diag_btn').addEventListener('click', runDiagnostics);
        document.getElementById('tb_diag_rerun').addEventListener('click', runDiagnostics);
        document.getElementById('tb_diag_close').addEventListener('click', () => { document.getElementById('tb_diag').style.display = 'none'; });

        document.getElementById('tb_pv_toggle').addEventListener('click', function () {
            const pv = document.getElementById('tb_pv_page');
            const hidden = pv.style.display === 'none';
            pv.style.display = hidden ? '' : 'none';
            this.innerHTML = hidden ? ICON.eyeOff : ICON.eye;
            this.title = hidden ? 'Hide preview' : 'Show preview';
            this.setAttribute('aria-label', this.title);
        });

        fields.forEach(f => {
            if (f.section) return;
            const input = el(f.id);
            const onChange = () => {
                if (f.type === 'range') document.getElementById('tb_val_' + f.id).textContent = input.value;
                applyLive();
            };
            input.addEventListener('input', onChange);
            input.addEventListener('change', onChange);
        });

        document.getElementById('tb_reset_btn').addEventListener('click', function () {
            writeValues({});
            refreshRangeLabels();
            applyLive();
        });

        // Reset one section: its fields go back to defaults, everything else is kept.
        document.querySelectorAll('#tb-live-panel .tb-sec-reset').forEach(btn => {
            btn.addEventListener('click', function () {
                const secNo = Number(this.getAttribute('data-sec'));
                const v = readValues();
                fields.forEach(f => { if (!f.section && f._sec === secNo) v[f.id] = f.default; });
                writeValues(v);
                refreshRangeLabels();
                applyLive();
            });
        });

        // Search: show matching options (label or section name); hide sections with no matches.
        document.getElementById('tb_search').addEventListener('input', applyFilter);

        // Presets start from the defaults, then apply their own values. Nothing is saved until Save.
        document.getElementById('tb_preset').addEventListener('change', function () {
            if (!this.value) return;
            writeValues(PRESETS[this.value]);
            refreshRangeLabels();
            applyLive();
            this.value = '';
        });

        // Theme code: export the current (unsaved) settings as JSON, or paste JSON to import.
        const code = document.getElementById('tb_code');
        const codeText = document.getElementById('tb_code_text');
        const codeMsg = document.getElementById('tb_code_msg');
        const openCode = (mode) => {
            const exporting = mode === 'export';
            document.getElementById('tb_code_title').textContent = exporting ? 'Export theme' : 'Import theme';
            document.getElementById('tb_code_hint').textContent = exporting
                ? 'Copy this code to back up or share the theme. It includes every option shown in the editor.'
                : 'Paste a theme code, then Apply. Options missing from the code go back to their defaults. Nothing is saved until you click Save & Reload.';
            codeText.value = exporting ? JSON.stringify({ themeBuilder: TB_VERSION, settings: readValues() }, null, 2) : '';
            codeText.readOnly = exporting;
            document.getElementById('tb_code_copy').style.display = exporting ? '' : 'none';
            document.getElementById('tb_code_apply').style.display = exporting ? 'none' : '';
            codeMsg.textContent = '';
            code.style.display = 'flex';
            codeText.focus();
            if (exporting) codeText.select();
        };
        // "More" menu: opens on click, closes on choosing an item, clicking elsewhere or Escape.
        const moreBtn = document.getElementById('tb_more_btn');
        const moreMenu = document.getElementById('tb_more_menu');
        const setMore = (open) => { moreMenu.classList.toggle('tb-open', open); moreBtn.setAttribute('aria-expanded', String(open)); };
        moreBtn.addEventListener('click', (e) => { e.stopPropagation(); setMore(!moreMenu.classList.contains('tb-open')); });
        moreMenu.addEventListener('click', () => setMore(false));
        document.getElementById('tb-live-panel').addEventListener('click', (e) => { if (!moreMenu.contains(e.target)) setMore(false); });
        document.getElementById('tb-live-panel').addEventListener('keydown', (e) => { if (e.key === 'Escape' && moreMenu.classList.contains('tb-open')) { e.stopPropagation(); setMore(false); moreBtn.focus(); } });

        document.getElementById('tb_export_btn').addEventListener('click', () => openCode('export'));
        document.getElementById('tb_import_btn').addEventListener('click', () => openCode('import'));
        document.getElementById('tb_code_cancel').addEventListener('click', () => { code.style.display = 'none'; });
        document.getElementById('tb_code_copy').addEventListener('click', function () {
            // navigator.clipboard needs HTTPS; execCommand also works over plain http on a LAN.
            codeText.select();
            let ok = false;
            try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
            if (!ok && navigator.clipboard) navigator.clipboard.writeText(codeText.value).then(() => { codeMsg.textContent = 'Copied.'; });
            codeMsg.style.color = '#8fd18f';
            codeMsg.textContent = ok ? 'Copied.' : 'Select the text and press Ctrl+C to copy.';
        });
        document.getElementById('tb_code_apply').addEventListener('click', function () {
            let data;
            try { data = JSON.parse(codeText.value); } catch (e) { data = null; }
            const settings = data && (data.settings || data);
            if (!settings || typeof settings !== 'object' || !fields.some(f => f.id && settings[f.id] !== undefined)) {
                codeMsg.style.color = '#ff8a80';
                codeMsg.textContent = 'That doesn\'t look like a Theme Builder code.';
                return;
            }
            writeValues(settings);
            refreshRangeLabels();
            applyLive();
            code.style.display = 'none';
        });

        document.getElementById('tb_save_btn').addEventListener('click', function () {
            const values = readValues();
            Dashboard.showLoadingMsg();
            // Re-read the stored config so we never overwrite fields we don't manage.
            const css = buildCss(values);
            ApiClient.getPluginConfiguration(pluginId).then(function (config) {
                config = config || {};
                // Keep the outgoing settings for "Previous save" (only when they actually change).
                const next = JSON.stringify(values);
                if (config.SettingsJson && config.SettingsJson !== next) config.PreviousSettingsJson = config.SettingsJson;
                config.SettingsJson = next;
                config.GeneratedCss = css;
                config.CssVersion = TB_VERSION;
                return ApiClient.updatePluginConfiguration(pluginId, config);
            }).then(function () {
                return syncBrandingCss(css);
            }).then(function () {
                window.location.reload();
            }).catch(function (err) {
                Dashboard.hideLoadingMsg();
                console.error('[ThemeBuilder] Save failed', err);
                Dashboard.alert('Saving the theme failed. Check the browser console for details.');
            });
        });

        panelBuilt = true;
    }

    // TV apps (Tizen, webOS) ship their own copy of the web client, so the index.html injection never
    // reaches them, but every web-based client applies the server's Custom CSS (Dashboard > General).
    // Keep our theme in a marked block at the top of it (a font @import must come first) and leave
    // anything else the admin wrote there untouched.
    // BRAND_START / BRAND_END must match BrandingSync in Plugin.cs (the server restores this block at startup).
    const BRAND_START = '/* ThemeBuilder:start (managed by the Theme Builder plugin; edits here are overwritten) */';
    const BRAND_END = '/* ThemeBuilder:end */';

    // An @import statement (url(…) or a quoted string, then optional media/layer conditions), or a comment so that
    // an @import inside a comment is left alone. Must match ImportOrComment in Plugin.cs.
    const IMPORT_OR_COMMENT = /\/\*[\s\S]*?\*\/|@import\s+(?:url\(\s*(?:'[^']*'|"[^"]*"|[^)]*)\s*\)|'[^']*'|"[^"]*")[^;]*;\s*/g;

    // The admin's Custom CSS with our theme in its marked block and everything else kept. The admin's own @import
    // lines go first: browsers ignore an @import that comes after any other rule, so leaving them below our block
    // would silently switch off an imported theme or font. Must give the same result as BrandingSync.Merge in Plugin.cs.
    function mergeBrandingCss(existing, css) {
        let rest = existing || '';
        const s = rest.indexOf(BRAND_START);
        const e = s === -1 ? -1 : rest.indexOf(BRAND_END, s);
        if (s !== -1 && e > s) rest = rest.slice(0, s) + rest.slice(e + BRAND_END.length);
        // The manual @import from older versions is now redundant.
        rest = rest.replace(/@import url\(['"]?\/ThemeBuilder\/style\.css['"]?\);?\s*/g, '');
        const imports = [];
        rest = rest.replace(IMPORT_OR_COMMENT, (m) => {
            if (m.startsWith('/*')) return m;
            imports.push(m.trim());
            return '';
        }).trim();
        return (imports.length ? imports.join('\n') + '\n\n' : '') + `${BRAND_START}\n${css}\n${BRAND_END}` + (rest ? '\n\n' + rest : '');
    }

    function syncBrandingCss(css) {
        return ApiClient.getNamedConfiguration('branding').then(function (branding) {
            branding = branding || {};
            branding.CustomCss = mergeBrandingCss(branding.CustomCss, css);
            return ApiClient.updateNamedConfiguration('branding', branding);
        });
    }

    function refreshRangeLabels() {
        fields.forEach(f => {
            if (f.type === 'range') document.getElementById('tb_val_' + f.id).textContent = el(f.id).value;
        });
    }

    function loadConfigIntoPanel() {
        return ApiClient.getPluginConfiguration(pluginId).then(function (config) {
            loadedConfig = config || {};
            let saved = {};
            try { saved = loadedConfig.SettingsJson ? JSON.parse(loadedConfig.SettingsJson) : {}; } catch (e) { saved = {}; }
            writeValues(saved);
            refreshRangeLabels();
            // Baseline for "unsaved changes" and a fresh undo history.
            savedSnapshot = JSON.stringify(readValues());
            editHistory = [savedSnapshot];
            editHistoryPos = 0;
            applyLive();
        }).catch(function (err) {
            console.error('[ThemeBuilder] Failed to load plugin configuration', err);
        });
    }

    function openPanel() {
        if (!panelBuilt) buildPanel();
        loadConfigIntoPanel();
        document.getElementById('tb-live-panel').style.transform = 'none';
    }

    function refreshAdminState() {
        const userId = ApiClient.getCurrentUserId && ApiClient.getCurrentUserId();
        if (!userId) {
            isAdmin = false;
            checkedUserId = null;
            return;
        }
        if (userId === checkedUserId) return;
        checkedUserId = userId;
        ApiClient.getCurrentUser().then(function (user) {
            isAdmin = !!(user && user.Policy && user.Policy.IsAdministrator);
            injectEntryPoints();
            if (isAdmin) rebuildIfOutdated();
            loadUserTheme();
        }).catch(function () {
            isAdmin = false;
            checkedUserId = null;
        });
    }

    // ---- Automatic rebuild after a plugin update ----
    // The theme CSS is generated here in the browser. After the plugin is updated, the saved CSS (and the
    // Custom CSS copy the TV apps use) can be missing newer rules, so the first administrator to open the
    // web client regenerates both from the saved settings. Nothing about the theme's settings changes.
    let rebuildChecked = false;

    function rebuildIfOutdated() {
        if (rebuildChecked) return;
        rebuildChecked = true;
        ApiClient.getPluginConfiguration(pluginId).then(function (config) {
            if (!config || !config.SettingsJson || config.CssVersion === TB_VERSION) return;
            let saved;
            try { saved = JSON.parse(config.SettingsJson); } catch (e) { return; }
            const css = buildCss(Object.assign(defaultValues(), saved));
            const from = config.CssVersion || 'an older version';
            config.GeneratedCss = css;
            config.CssVersion = TB_VERSION;
            return ApiClient.updatePluginConfiguration(pluginId, config)
                .then(() => syncBrandingCss(css))
                .then(function () {
                    // Swap in the rebuilt stylesheet without a reload.
                    const link = document.querySelector('link[href*="ThemeBuilder/style.css"]');
                    if (link) link.href = link.href.split('?')[0] + '?v=' + encodeURIComponent(TB_VERSION);
                    console.info(`[ThemeBuilder] Rebuilt the saved theme (was built by ${from}, now ${TB_VERSION}), including the TV apps' Custom CSS copy.`);
                });
        }).catch(function (err) {
            console.warn('[ThemeBuilder] Could not check or rebuild the saved theme', err);
        });
    }

    function defaultValues() {
        const d = {};
        fields.forEach(f => { if (!f.section) d[f.id] = f.default; });
        return d;
    }

    // ---- Server settings (for every user) and the runtime theme layer ----
    // Personal themes and the per-title accent restyle the page by adding a stylesheet built from the server
    // settings, placed after the saved theme so it wins, and before the editor's live preview.

    let serverSettings = null;
    let serverSettingsPromise = null;
    let userThemeName = null;      // personal theme chosen in "My Theme" (null = server theme)
    let autoAccent = null;         // accent taken from the current title's artwork
    let lastArtworkUrl = null;

    function loadServerSettings() {
        if (!serverSettingsPromise) {
            serverSettingsPromise = fetch(ApiClient.getUrl('ThemeBuilder/settings'), { cache: 'no-store' })
                .then(r => r.json())
                .then(j => { serverSettings = Object.assign(defaultValues(), j.settings || {}); return serverSettings; })
                .catch(() => { serverSettings = defaultValues(); return serverSettings; });
        }
        return serverSettingsPromise;
    }

    function themeSettingsFor(name) {
        if (!name || !PRESETS[name]) return serverSettings;
        // "Jellyfin Default" means plain defaults. Other presets replace the whole style; only what the admin
        // chose to hide (the Hide… options) and the plain TV background carry over from the server theme.
        if (name === 'Jellyfin Default') return defaultValues();
        const hidden = {};
        Object.keys(serverSettings || {}).forEach(k => { if (k.indexOf('Hide') === 0 || k === 'TvPlainBackground') hidden[k] = serverSettings[k]; });
        return Object.assign(defaultValues(), hidden, PRESETS[name]);
    }

    function renderRuntimeTheme() {
        if (!serverSettings) return;
        const personal = serverSettings.AllowUserThemes && userThemeName && PRESETS[userThemeName] ? userThemeName : null;
        const accent = serverSettings.AutoAccentFromBackdrop ? autoAccent : null;
        let tag = document.getElementById('tb-runtime-theme');
        if (!personal && !accent) {
            if (tag) tag.remove();
            return;
        }
        const v = Object.assign({}, themeSettingsFor(personal));
        if (accent) v.AccentColor = accent;
        if (!tag) {
            tag = document.createElement('style');
            tag.id = 'tb-runtime-theme';
            placeLateStyle(tag, document.getElementById('tb-live-styles'));
        }
        tag.textContent = buildCss(v);
    }

    // Per-title accent: on a details page, take the most vivid colour from the title's artwork.
    function updateAutoAccent() {
        if (!serverSettings || !serverSettings.AutoAccentFromBackdrop) return;
        const onDetails = !!document.querySelector('.itemDetailPage:not(.hide)');
        const url = onDetails ? pageArtworkUrl() : null;
        if (url === lastArtworkUrl) return;
        lastArtworkUrl = url;
        if (!url) {
            autoAccent = null;
            renderRuntimeTheme();
            return;
        }
        paletteFromImage(url, 1).then(function (colors) {
            if (url !== lastArtworkUrl) return;       // the user moved on meanwhile
            autoAccent = colors[0] || null;
            renderRuntimeTheme();
        });
    }

    // ---- Personal themes ("My Theme") ----
    // Stored per user on the server in Jellyfin's display preferences (so it follows the user between
    // browsers), with this browser's storage as a fallback.

    const PREF_ID = 'themebuilder';

    function userId() { return ApiClient.getCurrentUserId && ApiClient.getCurrentUserId(); }

    function loadUserTheme() {
        loadServerSettings().then(function () {
            const uid = userId();
            if (!uid) return;
            let local = null;
            try { local = localStorage.getItem('tb-user-theme-' + uid); } catch (e) { local = null; }
            const apply = (name) => { userThemeName = name || null; renderRuntimeTheme(); injectEntryPoints(); };
            if (typeof ApiClient.getDisplayPreferences !== 'function') { apply(local); return; }
            ApiClient.getDisplayPreferences(PREF_ID, uid, 'ThemeBuilder')
                .then(p => apply((p && p.CustomPrefs && p.CustomPrefs.theme) || local))
                .catch(() => apply(local));
        });
    }

    function saveUserTheme(name) {
        const uid = userId();
        userThemeName = name || null;
        renderRuntimeTheme();
        try {
            if (name) localStorage.setItem('tb-user-theme-' + uid, name);
            else localStorage.removeItem('tb-user-theme-' + uid);
        } catch (e) { /* storage unavailable */ }
        if (typeof ApiClient.getDisplayPreferences !== 'function') return;
        ApiClient.getDisplayPreferences(PREF_ID, uid, 'ThemeBuilder').then(function (p) {
            p = p || {};
            p.Id = p.Id || PREF_ID;
            p.CustomPrefs = Object.assign({}, p.CustomPrefs, { theme: name || '' });
            return ApiClient.updateDisplayPreferences(PREF_ID, p, uid, 'ThemeBuilder');
        }).catch(err => console.warn('[ThemeBuilder] Could not store the personal theme on the server', err));
    }

    function openMyTheme() {
        let dlg = document.getElementById('tb-my-theme');
        if (!dlg) {
            dlg = document.createElement('div');
            dlg.id = 'tb-my-theme';
            dlg.style.cssText = 'position: fixed; inset: 0; z-index: 99998; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; padding: 20px; font-family: sans-serif;';
            dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.style.display = 'none'; });
            document.body.appendChild(dlg);
        }
        const names = [null].concat(...PRESET_GROUPS.map(g => g[1]));
        const swatch = (name) => {
            const v = name ? themeSettingsFor(name) : serverSettings;
            const bg = v.EnableOledBlack ? '#000' : v.BackgroundColor;
            return `<span style="display: inline-flex; width: 38px; height: 26px; border-radius: 5px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); flex-shrink: 0;"><span style="flex: 2; background: ${bg};"></span><span style="flex: 1; background: ${v.AccentColor};"></span></span>`;
        };
        dlg.innerHTML = `
            <div style="width: 100%; max-width: 380px; background: #1b1b1b; color: #eee; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 18px; box-shadow: 0 10px 40px rgba(0,0,0,0.7);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <h3 style="margin: 0; font-weight: 500;">My Theme</h3>
                    <button type="button" data-close style="background: none; border: none; color: #aaa; font-size: 1.6em; cursor: pointer; line-height: 1;">&times;</button>
                </div>
                <div style="color: #999; font-size: 0.9em; margin-bottom: 12px;">Only changes how Jellyfin looks for you.</div>
                ${names.map(n => `<button type="button" data-theme="${n || ''}" style="display: flex; align-items: center; gap: 12px; width: 100%; padding: 10px; margin-bottom: 6px; border-radius: 8px; border: 1px solid ${(n || null) === userThemeName ? 'var(--tb-me, #1f9d55)' : 'rgba(255,255,255,0.08)'}; background: ${(n || null) === userThemeName ? 'rgba(31,157,85,0.15)' : '#242424'}; color: #eee; cursor: pointer; text-align: left; font-size: 1em;">${swatch(n)}<span>${n || 'Server theme (default)'}</span></button>`).join('')}
            </div>`;
        dlg.querySelector('[data-close]').addEventListener('click', () => { dlg.style.display = 'none'; });
        dlg.querySelectorAll('[data-theme]').forEach(b => b.addEventListener('click', function () {
            saveUserTheme(this.getAttribute('data-theme') || null);
            openMyTheme();                              // redraw with the new selection marked
        }));
        dlg.style.display = 'flex';
    }

    // ---- Night mode ----

    function updateNight() {
        const root = document.documentElement;
        if (!serverSettings || !serverSettings.NightMode) { root.classList.remove('tb-night'); return; }
        const h = new Date().getHours();
        const s = Number(serverSettings.NightStart), e = Number(serverSettings.NightEnd);
        const night = s === e ? false : s < e ? (h >= s && h < e) : (h >= s || h < e);
        root.classList.toggle('tb-night', night);
    }

    // ---- User menu entries ----

    // Inline SVGs so the icons don't depend on which glyphs the web client's icon font ships.
    const brushIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" style="display:block;flex-shrink:0;"><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37-1.34-1.34a.996.996 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96a.996.996 0 0 0 0-1.41z"/></svg>';
    const paletteIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" style="display:block;flex-shrink:0;"><path d="M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>';

    // Every variant of the user menu (legacy side drawer, legacy preferences page, MUI dropdown)
    // has a Sign Out entry. We clone it so our entries inherit that menu's exact markup and
    // styling, then swap in our icon, label and click handler, and insert them just above Sign Out.
    function findLogoutEntries() {
        const entries = new Set();
        document.querySelectorAll('.btnLogout').forEach(e => entries.add(e));
        document.querySelectorAll('[data-testid="LogoutIcon"]').forEach(icon => {
            const item = icon.closest('[role="menuitem"], li, a, button');
            if (item) entries.add(item);
        });
        return Array.from(entries).filter(e => !e.hasAttribute('data-tb-entry'));
    }

    function closeMenus() {
        // MUI dropdown: clicking its backdrop closes it. Use the open menu's own backdrop (the last open one): the
        // first backdrop on the page can belong to something else, which left the menu open, and an open MUI menu
        // keeps pulling keyboard focus back to itself, so the editor's text boxes couldn't be typed in.
        const open = Array.from(document.querySelectorAll('.MuiModal-root:not(.MuiModal-hidden), .MuiPopover-root, .MuiMenu-root'))
            .filter(m => m.querySelector('.MuiBackdrop-root'));
        const menu = open[open.length - 1];
        if (menu) {
            menu.querySelector('.MuiBackdrop-root').click();
            menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        }
        // Legacy side drawer.
        if (document.querySelector('.mainDrawer') && window.Emby && Emby.Page && Emby.Page.closeDrawer) {
            try { Emby.Page.closeDrawer(); } catch (e) { /* ignore */ }
        }
        document.body.classList.remove('drawerIsOpen');
    }

    function buildEntryFrom(logoutEl, kind, label, icon, onClick) {
        const entry = logoutEl.cloneNode(true);
        entry.setAttribute('data-tb-entry', kind);
        entry.removeAttribute('id');
        entry.classList.remove('btnLogout');
        if (entry.hasAttribute('href')) entry.setAttribute('href', '#');
        entry.querySelectorAll('[id]').forEach(e => e.removeAttribute('id'));

        // Icon: replace the Sign Out icon (font glyph or MUI svg) with ours, keeping layout classes.
        const oldIcon = entry.querySelector('.navMenuOptionIcon, .listItemIcon, .MuiListItemIcon-root, .material-icons, svg');
        if (oldIcon) {
            if (oldIcon.tagName.toLowerCase() === 'svg') {
                oldIcon.outerHTML = icon;
            } else {
                // Drop the glyph classes (e.g. "material-icons exit_to_app") so the font doesn't draw over our svg.
                oldIcon.className = oldIcon.className.split(/\s+/)
                    .filter(c => c && (c.indexOf('Icon') !== -1 || c.indexOf('icon') !== -1 || c.indexOf('Mui') === 0) && c !== 'material-icons')
                    .join(' ');
                oldIcon.style.display = 'inline-flex';
                oldIcon.style.alignItems = 'center';
                oldIcon.innerHTML = icon;
            }
        }

        // Label: the deepest element whose text is the Sign Out label.
        const labelEl = entry.querySelector('.navMenuOptionText, .listItemBodyText, .MuiListItemText-primary, .MuiTypography-root')
            || Array.from(entry.querySelectorAll('*')).reverse().find(e => e.children.length === 0 && e.textContent.trim());
        if (labelEl) labelEl.textContent = label;
        else entry.appendChild(document.createTextNode(label));

        // Capture phase + stopImmediatePropagation so the cloned Sign Out behaviour can never fire.
        entry.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            closeMenus();
            onClick();
        }, true);

        return entry;
    }

    // "My Theme" for everyone when the admin allows personal themes; "Theme Editor" for administrators.
    function injectEntryPoints() {
        const wanted = [];
        if (serverSettings && serverSettings.AllowUserThemes) wanted.push({ kind: 'mytheme', label: 'My Theme', icon: paletteIcon, onClick: openMyTheme });
        if (isAdmin) wanted.push({ kind: 'editor', label: 'Theme Editor', icon: brushIcon, onClick: openPanel });

        document.querySelectorAll('[data-tb-entry]').forEach(e => {
            if (!wanted.some(w => w.kind === e.getAttribute('data-tb-entry'))) e.remove();
        });
        if (!wanted.length) return;

        findLogoutEntries().forEach(logoutEl => {
            const parent = logoutEl.parentElement;
            if (!parent) return;
            wanted.forEach(w => {
                if (parent.querySelector(`:scope > [data-tb-entry="${w.kind}"]`)) return;
                parent.insertBefore(buildEntryFrom(logoutEl, w.kind, w.label, w.icon, w.onClick), logoutEl);
            });
        });
    }

    function start() {
        // Wait for Jellyfin's core API to initialize
        if (!window.ApiClient || !window.Dashboard) {
            setTimeout(start, 200);
            return;
        }

        // The web client is a SPA: menus are re-rendered and users can log in/out
        // without a page load, so keep re-checking as the DOM changes.
        let accentTimer = null;
        const observer = new MutationObserver(() => {
            refreshAdminState();
            injectEntryPoints();
            // Details pages fill in their artwork after navigation; check shortly after changes settle.
            if (serverSettings && serverSettings.AutoAccentFromBackdrop) {
                clearTimeout(accentTimer);
                accentTimer = setTimeout(updateAutoAccent, 300);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        refreshAdminState();
        watchScroll();
        loadServerSettings().then(function () {
            injectEntryPoints();
            updateNight();
            setInterval(updateNight, 60000);
            updateAutoAccent();
        });
    }

    // Marks <html> with "tb-scrolled" once the page is scrolled, for the "transparent header at the top"
    // option. Scroll events don't bubble, so listen in the capture phase and only look at vertical
    // scrollers: horizontal card rows (scrollHeight == clientHeight) and our own panel are ignored.
    function watchScroll() {
        const root = document.documentElement;
        // Tells the CSS the scroll watcher runs, so the transparent top bar can rely on tb-scrolled.
        root.classList.add('tb-js');
        const update = (target) => {
            const t = target && target !== document && target.scrollHeight !== undefined ? target : document.scrollingElement;
            if (!t || (t.closest && t.closest('#tb-live-panel'))) return;
            if (t !== document.scrollingElement && t.scrollHeight <= t.clientHeight + 5) return;
            root.classList.toggle('tb-scrolled', t.scrollTop > 10);
        };
        document.addEventListener('scroll', (e) => update(e.target), { capture: true, passive: true });
        // A new page starts at the top.
        window.addEventListener('hashchange', () => setTimeout(() => update(null), 50));
    }

    // The automated test page (tests/editor-test.html) sets window.__TB_TEST__ to get at the internals
    // without starting the runtime.
    if (window.__TB_TEST__) {
        window.__ThemeBuilderTest = { buildCss, mergeBrandingCss, BRAND_START, BRAND_END, fields, PRESETS, PRESET_GROUPS, openPanel, defaultValues, paletteFromImage, rgbToHsl, hslToHex, themeSettingsFor,
            setServerSettings: (s) => { serverSettings = Object.assign(defaultValues(), s); } };
    } else {
        // Used by the plugin's Dashboard page ("Open Theme Editor" and the status checks).
        window.ThemeBuilder = {
            version: TB_VERSION,
            openEditor: function () { if (isAdmin) openPanel(); },
            openMyTheme: function () { openMyTheme(); },
            runDiagnostics: function () { if (isAdmin) { openPanel(); setTimeout(runDiagnostics, 400); } }
        };
        start();
    }
})();
