import './public/js/acceptConditions.js';
import './public/js/firebase.js';
import './public/js/auth.js';
import './public/js/firestore.js';

import { downloadTimer, messageline } from './public/js/tools.js';
import { shortcuts } from './public/js/shortcuts.js';

window.tools = {};
window.tools.timer = new downloadTimer();
window.tools.message = new messageline();
window.tools.shortcuts = new shortcuts();
document.addEventListener('DOMContentLoaded', function () {
    window.tools.timer.start(5, 1, "progressBar");
    window.tools.shortcuts.addShortcut();
});

import "./public/css/style.css"
