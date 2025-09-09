
        document.addEventListener('DOMContentLoaded', () => {
            // Configuration
            const config = {
                userName: "Imran",
                hostname: "Imran",
                currentPath: "~",
                projects: [
                    { name: 'Vulnerability Scanner', desc: 'Automated web application vulnerability scanner built with Python. Detects common security flaws like XSS, SQL injection, and directory traversal.', url: '#' },
                    { name: 'Network Penetration Tool', desc: 'Custom penetration testing framework for network security assessment. Includes port scanning, service enumeration, and exploit modules.', url: '#' },
                    { name: 'Imran Linux Portfolio OS', desc: 'Interactive web-based portfolio that simulates a Imran Linux desktop environment. Built with HTML, CSS, and JavaScript.', url: '#' }
                ]
            };

            let windows = document.querySelectorAll('.window');
            let activeWindow = null;
            let highestZIndex = 100;

            // Browser functionality
            let browserHistory = [];
            let currentHistoryIndex = -1;
            let tabCounter = 1;
            let currentTabId = 1;

            // Clock functionality
            function updateClock() {
                const now = new Date();
                const timeString = now.toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit'
                });
                const dateString = now.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });
                document.getElementById('clock').textContent = `${dateString} ${timeString}`;
            }
            updateClock();
            setInterval(updateClock, 1000);

            // Enhanced Browser Functions
            window.navigateToUrl = function (url) {
                const urlInput = document.getElementById('url-input');
                const browserFrame = document.getElementById('browser-frame');
                const loadingBar = document.getElementById('loading-bar');

                // Show loading
                loadingBar.style.width = '0%';
                setTimeout(() => loadingBar.style.width = '100%', 100);

                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    if (url.includes('.') && !url.includes(' ')) {
                        url = 'https://' + url;
                    } else {
                        url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
                    }
                }

                urlInput.value = url;
                browserFrame.src = url;

                // Add to history
                if (currentHistoryIndex < browserHistory.length - 1) {
                    browserHistory = browserHistory.slice(0, currentHistoryIndex + 1);
                }
                browserHistory.push(url);
                currentHistoryIndex = browserHistory.length - 1;

                updateNavigationButtons();

                // Update tab title
                const activeTab = document.querySelector('.browser-tab.active .tab-title');
                activeTab.textContent = 'Loading...';
            };

            window.navigateToUrlFromInput = function () {
                const url = document.getElementById('url-input').value.trim();
                if (url) {
                    navigateToUrl(url);
                }
            };

            window.goBack = function () {
                if (currentHistoryIndex > 0) {
                    currentHistoryIndex--;
                    const url = browserHistory[currentHistoryIndex];
                    document.getElementById('url-input').value = url;
                    document.getElementById('browser-frame').src = url;
                    updateNavigationButtons();
                }
            };

            window.goForward = function () {
                if (currentHistoryIndex < browserHistory.length - 1) {
                    currentHistoryIndex++;
                    const url = browserHistory[currentHistoryIndex];
                    document.getElementById('url-input').value = url;
                    document.getElementById('browser-frame').src = url;
                    updateNavigationButtons();
                }
            };

            window.refreshPage = function () {
                const browserFrame = document.getElementById('browser-frame');
                const loadingBar = document.getElementById('loading-bar');

                loadingBar.style.width = '0%';
                setTimeout(() => loadingBar.style.width = '100%', 100);

                browserFrame.src = browserFrame.src;
            };

            window.addNewTab = function () {
                tabCounter++;
                const tabsContainer = document.querySelector('.browser-tabs');
                const addButton = document.querySelector('.add-tab-btn');

                const newTab = document.createElement('div');
                newTab.className = 'browser-tab';
                newTab.setAttribute('data-tab-id', tabCounter);
                newTab.innerHTML = `
                    <i class="fas fa-globe"></i>
                    <span class="tab-title">New Tab</span>
                    <span class="tab-close" onclick="closeTab(${tabCounter})">×</span>
                `;

                // Remove active from other tabs
                document.querySelectorAll('.browser-tab').forEach(tab => {
                    tab.classList.remove('active');
                });

                newTab.classList.add('active');
                tabsContainer.insertBefore(newTab, addButton);

                currentTabId = tabCounter;
                navigateToUrl('https://google.com');

                // Add click event to new tab
                newTab.addEventListener('click', function (e) {
                    if (!e.target.classList.contains('tab-close')) {
                        switchToTab(tabCounter);
                    }
                });
            };

            window.closeTab = function (tabId) {
                const tab = document.querySelector(`[data-tab-id="${tabId}"]`);
                const isActive = tab.classList.contains('active');

                tab.remove();

                if (isActive) {
                    const remainingTabs = document.querySelectorAll('.browser-tab');
                    if (remainingTabs.length > 0) {
                        remainingTabs[0].classList.add('active');
                        currentTabId = remainingTabs[0].getAttribute('data-tab-id');
                    }
                }
            };

            window.switchToTab = function (tabId) {
                document.querySelectorAll('.browser-tab').forEach(tab => {
                    tab.classList.remove('active');
                });

                document.querySelector(`[data-tab-id="${tabId}"]`).classList.add('active');
                currentTabId = tabId;
            };

            window.toggleBookmark = function () {
                const bookmarkBtn = document.querySelector('.browser-nav-btn .fa-star');
                bookmarkBtn.classList.toggle('fas');
                bookmarkBtn.classList.toggle('far');
            };

            window.openSettings = function () {
                alert('Firefox Settings - Feature coming soon!');
            };

            window.onPageLoad = function () {
                const loadingBar = document.getElementById('loading-bar');
                setTimeout(() => {
                    loadingBar.style.width = '0%';

                    // Update tab title
                    const activeTab = document.querySelector('.browser-tab.active .tab-title');
                    const currentUrl = document.getElementById('url-input').value;

                    if (currentUrl.includes('google.com')) {
                        activeTab.textContent = 'Google';
                    } else if (currentUrl.includes('github.com')) {
                        activeTab.textContent = 'GitHub';
                    } else {
                        activeTab.textContent = new URL(currentUrl).hostname;
                    }
                }, 1000);
            };

            function updateNavigationButtons() {
                document.getElementById('back-btn').disabled = currentHistoryIndex <= 0;
                document.getElementById('forward-btn').disabled = currentHistoryIndex >= browserHistory.length - 1;
            }

            // URL input event listeners
            document.getElementById('url-input').addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    navigateToUrlFromInput();
                }
            });

            // Add click events to existing tabs
            document.querySelectorAll('.browser-tab').forEach(tab => {
                tab.addEventListener('click', function (e) {
                    if (!e.target.classList.contains('tab-close')) {
                        const tabId = this.getAttribute('data-tab-id');
                        switchToTab(tabId);
                    }
                });
            });

            // Window management
            function setupWindow(windowEl) {
                makeDraggable(windowEl);
                makeResizable(windowEl);

                windowEl.addEventListener('mousedown', () => {
                    bringToFront(windowEl);
                });

                // Window controls
                const controls = windowEl.querySelectorAll('.control-btn');
                controls.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const action = btn.dataset.action;
                        const windowId = btn.dataset.window;

                        switch (action) {
                            case 'close':
                                windowEl.style.display = 'none';
                                updateWindowList();
                                break;
                            case 'minimize':
                                windowEl.style.display = 'none';
                                updateWindowList();
                                break;
                            case 'maximize':
                                toggleMaximize(windowEl);
                                break;
                        }
                    });
                });
            }

            function bringToFront(windowEl) {
                highestZIndex++;
                windowEl.style.zIndex = highestZIndex;
                activeWindow = windowEl;

                // Update dock icons
                document.querySelectorAll('.dock-icon').forEach(icon => {
                    icon.classList.remove('active');
                });

                const windowId = windowEl.id;
                const associatedIcon = document.querySelector(`[data-window="${windowId}"]`);
                if (associatedIcon) {
                    associatedIcon.classList.add('active');
                }
            }

            function toggleMaximize(windowEl) {
                if (windowEl.dataset.isMaximized === "true") {
                    // Restore
                    windowEl.style.width = windowEl.dataset.originalWidth;
                    windowEl.style.height = windowEl.dataset.originalHeight;
                    windowEl.style.top = windowEl.dataset.originalTop;
                    windowEl.style.left = windowEl.dataset.originalLeft;
                    windowEl.dataset.isMaximized = "false";
                } else {
                    // Maximize
                    windowEl.dataset.originalWidth = windowEl.style.width || windowEl.offsetWidth + 'px';
                    windowEl.dataset.originalHeight = windowEl.style.height || windowEl.offsetHeight + 'px';
                    windowEl.dataset.originalTop = windowEl.style.top || windowEl.offsetTop + 'px';
                    windowEl.dataset.originalLeft = windowEl.style.left || windowEl.offsetLeft + 'px';

                    windowEl.style.width = '100vw';
                    windowEl.style.height = 'calc(100vh - 80px)';
                    windowEl.style.top = '35px';
                    windowEl.style.left = '0';
                    windowEl.dataset.isMaximized = "true";
                }
            }

            function openWindow(windowId) {
                const windowEl = document.getElementById(windowId);
                if (windowEl) {
                    windowEl.style.display = 'flex';
                    bringToFront(windowEl);
                    updateWindowList();
                }
            }

            function updateWindowList() {
                const windowList = document.getElementById('window-list');
                windowList.innerHTML = '';

                windows.forEach(win => {
                    if (win.style.display === 'flex') {
                        const btn = document.createElement('button');
                        btn.className = 'window-button';
                        btn.textContent = win.querySelector('.title-bar span').textContent;
                        btn.addEventListener('click', () => {
                            if (win.style.display === 'none') {
                                win.style.display = 'flex';
                            }
                            bringToFront(win);
                        });
                        windowList.appendChild(btn);
                    }
                });
            }

            // Initialize all windows
            windows.forEach(setupWindow);

            // Dock functionality
            document.querySelectorAll('.dock-icon, .desktop-icon, .app-item').forEach(icon => {
                icon.addEventListener('click', () => {
                    const windowId = icon.dataset.window;
                    if (windowId) {
                        openWindow(windowId);
                    }
                });
            });

            // Applications menu
            const appMenu = document.getElementById('app-menu');
            const appsButton = document.getElementById('applications-menu');

            appsButton.addEventListener('click', (e) => {
                e.stopPropagation();
                appMenu.style.display = appMenu.style.display === 'block' ? 'none' : 'block';
            });

            // Context menu
            const contextMenu = document.getElementById('context-menu');

            document.addEventListener('contextmenu', (e) => {
                if (e.target.id === 'desktop' || e.target.closest('#desktop') === document.getElementById('desktop')) {
                    e.preventDefault();
                    contextMenu.style.display = 'block';
                    contextMenu.style.left = e.clientX + 'px';
                    contextMenu.style.top = e.clientY + 'px';
                }
            });

            document.addEventListener('click', () => {
                contextMenu.style.display = 'none';
                appMenu.style.display = 'none';
            });

            // Terminal functionality
            const terminalInput = document.getElementById('terminal-input');
            const terminalOutput = document.getElementById('terminal-output');
            const terminalContent = document.getElementById('terminal-content');

            terminalContent.addEventListener('click', () => terminalInput.focus());

            terminalInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const command = terminalInput.value.trim();
                    const outputLine = document.createElement('div');
                    outputLine.innerHTML = `<span class="terminal-prompt">${config.userName}@${config.hostname}:${config.currentPath}$</span> ${command}`;
                    terminalOutput.appendChild(outputLine);

                    executeCommand(command);
                    terminalInput.value = '';
                    terminalContent.scrollTop = terminalContent.scrollHeight;
                }
            });

            function executeCommand(command) {
                const output = document.createElement('div');
                const args = command.split(' ');
                const cmd = args[0].toLowerCase();

                switch (cmd) {
                    case 'help':
                        output.innerHTML = `<span style="color: var(--accent-color);">Available commands:</span><br>
                        <strong>help</strong> - Show this help message<br>
                        <strong>whoami</strong> - Display current user<br>
                        <strong>ls</strong> - List directory contents<br>
                        <strong>pwd</strong> - Print working directory<br>
                        <strong>cat [file]</strong> - Display file contents<br>
                        <strong>projects</strong> - Show my projects<br>
                        <strong>nmap [target]</strong> - Network scan simulation<br>
                        <strong>nikto [url]</strong> - Web vulnerability scan<br>
                        <strong>clear</strong> - Clear terminal<br>
                        <strong>neofetch</strong> - System information<br>
                        <strong>date</strong> - Show current date/time<br>
                        <strong>uname -a</strong> - System information`;
                        break;
                    case 'whoami':
                        output.textContent = config.userName;
                        break;
                    case 'pwd':
                        output.textContent = `/home/${config.userName}`;
                        break;
                    case 'ls':
                        output.innerHTML = `<span style="color: #4a9eff;">Desktop</span>&nbsp;&nbsp;<span style="color: #4a9eff;">Documents</span>&nbsp;&nbsp;<span style="color: #4a9eff;">Downloads</span>&nbsp;&nbsp;<span style="color: #4a9eff;">Pictures</span><br>
                        <span style="color: var(--accent-color);">script.py</span>&nbsp;&nbsp;<span style="color: #fff;">notes.txt</span>&nbsp;&nbsp;<span style="color: #ff6b6b;">tools.zip</span>`;
                        break;
                    case 'projects':
                        output.innerHTML = `<span style="color: var(--accent-color);">My Security Projects:</span><br>`;
                        config.projects.forEach((project, index) => {
                            output.innerHTML += `<br><strong style="color: var(--accent-color);">${index + 1}. ${project.name}</strong><br>`;
                            output.innerHTML += `   ${project.desc}<br>`;
                            output.innerHTML += `   <a href="${project.url}" style="color: var(--accent-color);">View Project</a><br>`;
                        });
                        break;
                    case 'cat':
                        if (args[1] === 'notes.txt') {
                            output.innerHTML = `Security Research Notes<br>
                            =====================<br>
                            - Always validate input<br>
                            - Use HTTPS everywhere<br>
                            - Regular security audits<br>
                            - Keep systems updated`;
                        } else {
                            output.innerHTML = `cat: ${args[1] || '[filename]'}: No such file or directory`;
                        }
                        break;
                    case 'nmap':
                        const target = args[1] || 'localhost';
                        output.innerHTML = `<span style="color: var(--accent-color);">Starting Nmap scan against ${target}</span><br>
                        PORT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATE&nbsp;&nbsp;&nbsp;SERVICE<br>
                        22/tcp&nbsp;&nbsp;&nbsp;open&nbsp;&nbsp;&nbsp;&nbsp;ssh<br>
                        80/tcp&nbsp;&nbsp;&nbsp;open&nbsp;&nbsp;&nbsp;&nbsp;http<br>
                        443/tcp&nbsp;&nbsp;open&nbsp;&nbsp;&nbsp;&nbsp;https<br>
                        <span style="color: var(--accent-color);">Nmap done: 1 IP address scanned</span>`;
                        break;
                    case 'nikto':
                        const url = args[1] || 'example.com';
                        output.innerHTML = `<span style="color: var(--accent-color);">- Nikto v2.1.6</span><br>
                        + Target IP: ${url}<br>
                        + Server: Apache/2.4.41<br>
                        + Retrieved x-powered-by header: PHP/7.4.3<br>
                        + Cookie PHPSESSID created without the httponly flag<br>
                        <span style="color: var(--accent-color);">+ 2 host(s) tested</span>`;
                        break;
                    case 'neofetch':
                        output.innerHTML = `<pre style="color: var(--accent-color); margin: 0;">
         ..............                 ${config.userName}@${config.hostname}
      ...................               --------------
    .......................             OS: Imran GNU/Linux Rolling
  ...........................           Kernel: 5.15.0-Imran3-amd64
 .............................          Uptime: 2 hours, 30 mins
 ..............................         Shell: bash 5.1.4
 ...............................        Terminal: gnome-terminal
 ................................       CPU: Intel i7-10700K
 .................................      Memory: 2048MiB / 16384MiB
 ..................................     </pre>`;
                        break;
                    case 'clear':
                        terminalOutput.innerHTML = '';
                        return;
                    case 'date':
                        output.textContent = new Date().toString();
                        break;
                    case 'uname':
                        if (args[1] === '-a') {
                            output.textContent = 'Linux Imran 5.15.0-Imran3-amd64 #1 SMP Debian x86_64 GNU/Linux';
                        } else {
                            output.textContent = 'Linux';
                        }
                        break;
                    case '':
                        break;
                    default:
                        output.innerHTML = `<span style="color: #ff6b6b;">bash: ${command}: command not found</span><br>Type <strong>help</strong> for available commands.`;
                        break;
                }

                if (cmd !== 'clear') {
                    terminalOutput.appendChild(output);
                }
            }

            // Utility functions
            function makeDraggable(element) {
                let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                const titleBar = element.querySelector('.title-bar');

                if (titleBar) {
                    titleBar.onmousedown = dragMouseDown;
                }

                function dragMouseDown(e) {
                    e = e || window.event;
                    e.preventDefault();
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    document.onmousemove = elementDrag;
                }

                function elementDrag(e) {
                    e = e || window.event;
                    e.preventDefault();
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    element.style.top = (element.offsetTop - pos2) + "px";
                    element.style.left = (element.offsetLeft - pos1) + "px";
                }

                function closeDragElement() {
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            }

            function makeResizable(element) {
                const resizer = document.createElement('div');
                resizer.style.width = '10px';
                resizer.style.height = '10px';
                resizer.style.background = 'transparent';
                resizer.style.position = 'absolute';
                resizer.style.right = '0';
                resizer.style.bottom = '0';
                resizer.style.cursor = 'nw-resize';
                element.appendChild(resizer);

                let isResizing = false;

                resizer.addEventListener('mousedown', (e) => {
                    isResizing = true;
                    document.addEventListener('mousemove', resize);
                    document.addEventListener('mouseup', stopResize);
                });

                function resize(e) {
                    if (!isResizing) return;

                    const rect = element.getBoundingClientRect();
                    const newWidth = e.clientX - rect.left;
                    const newHeight = e.clientY - rect.top;

                    if (newWidth > 300) element.style.width = newWidth + 'px';
                    if (newHeight > 200) element.style.height = newHeight + 'px';
                }

                function stopResize() {
                    isResizing = false;
                    document.removeEventListener('mousemove', resize);
                    document.removeEventListener('mouseup', stopResize);
                }
            }

            // Global functions for context menu
            window.openTerminal = () => openWindow('terminal-window');
            window.refreshDesktop = () => location.reload();
            window.showProperties = () => alert('Desktop Properties - Imran Linux Desktop Environment');

            // Initialize browser
            navigateToUrl('https://google.com');

            // Initial terminal welcome
            executeCommand('neofetch');
        });
    