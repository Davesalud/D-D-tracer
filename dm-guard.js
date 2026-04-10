(function (global) {
    var DM_PIN = '446944-';

    function getOverlay() {
        return document.getElementById('dm-pin-overlay');
    }

    global.openDmPanel = function () {
        var overlay = getOverlay();
        if (!overlay) {
            if (typeof global.prompt === 'function' && global.prompt('DM PIN:') === DM_PIN) {
                try {
                    sessionStorage.setItem('dmGate', '1');
                } catch (e) {}
                global.location.href = 'dm.html';
            }
            return;
        }
        overlay.style.display = 'flex';
        var input = document.getElementById('dm-pin-input');
        if (input) {
            input.value = '';
            setTimeout(function () {
                try {
                    input.focus();
                } catch (e) {}
            }, 0);
        }
    };

    global.closeDmPinOverlay = function () {
        var overlay = getOverlay();
        if (overlay) overlay.style.display = 'none';
    };

    global.submitDmPin = function () {
        var input = document.getElementById('dm-pin-input');
        if (!input) return;
        if (input.value === DM_PIN) {
            try {
                sessionStorage.setItem('dmGate', '1');
            } catch (e) {}
            global.location.href = 'dm.html';
        } else {
            alert('Hibás PIN.');
            input.value = '';
            try {
                input.focus();
            } catch (e) {}
        }
    };

    global.requireDmGate = function () {
        try {
            if (sessionStorage.getItem('dmGate') !== '1') {
                global.location.replace('index.html');
            }
        } catch (e) {
            global.location.replace('index.html');
        }
    };
})(typeof window !== 'undefined' ? window : this);
