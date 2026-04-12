
/**
 * Közös kliens védelem: felhasználói szöveg megjelenítése előtti escapelés (XSS csökkentés).
 * Megjegyzés: igazi adatvédelem Firebase Security Rules és auth mellett érhető el.
 */
(function (global) {
    function escapeHtml(s) {
        if (s == null) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    global.escapeHtml = escapeHtml;
})(typeof window !== 'undefined' ? window : this);
