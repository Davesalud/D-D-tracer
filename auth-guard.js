(function () {
    var path = window.location.pathname || '';
    if (/login\.html$/i.test(path)) return;

    window.getSelectedCharId = function () {
        try {
            return localStorage.getItem('selectedCharId') || sessionStorage.getItem('selectedCharId');
        } catch (e) {
            try { return sessionStorage.getItem('selectedCharId'); } catch (e2) { return null; }
        }
    };

    var idFromUrl = null;
    try {
        var params = new URLSearchParams(window.location.search);
        var cid = params.get('c');
        if (cid) {
            idFromUrl = String(cid).trim();
            if (idFromUrl) {
                try { localStorage.setItem('selectedCharId', idFromUrl); } catch (e) {}
                try { sessionStorage.setItem('selectedCharId', idFromUrl); } catch (e2) {}
                params.delete('c');
                var rest = params.toString();
                var clean = path + (rest ? '?' + rest : '') + window.location.hash;
                window.history.replaceState(null, '', clean);
            }
        }
    } catch (e) {}

    /* Ha a tároló nem írható (privát ablak, file://, stb.), a getSelectedCharId() üres,
       pedig a bejelentkezés már átadta az id-t a ?c= paraméterben — akkor is engedjünk be. */
    var id = idFromUrl || window.getSelectedCharId();

    if (!id) {
        window.location.replace('login.html');
        return;
    }

    try { localStorage.setItem('selectedCharId', id); } catch (e) {}
    try { sessionStorage.setItem('selectedCharId', id); } catch (e) {}
})();
