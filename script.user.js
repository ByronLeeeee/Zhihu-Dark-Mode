// ==UserScript==
// @name         可能是更优雅的知乎网页版暗黑模式 - Zhihu Dark Mode
// @version      0.2.4
// @description  知乎网页版的暗黑模式就写了一半，我帮它尽量写完
// @author       ByronLeeeee
// @match        *://*.zhihu.com/*
// @grant        none
// @run-at       document-start
// @license      MIT
// @namespace https://github.com/ByronLeeeee/Zhihu-Dark-Mode
// ==/UserScript==

(function () {
    'use strict';

    const STORAGE_KEY = 'zhihu-dark-mode';
    const BUTTON_ID = 'zhihu-dark-mode-toggle';

    // 检查用户保存的深色模式偏好
    let isDark = false;
    try {
        isDark = localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (error) {
        console.error('[Zhihu Dark Mode] 读取网站储存失败', error);
    }

    // 在页面解析前注入CSS样式
    const style = document.createElement('style');
    style.media = isDark ? 'all' : 'not all';

    // 设置主题函数
    const applyTheme = () => {
        const root = document.documentElement;
        if (!root) return;
        // 日间停用夜间样式，修复背景透明问题。
        const media = isDark ? 'all' : 'not all';
        if (style.media !== media) style.media = media;
        const theme = isDark ? 'dark' : 'light';
        // 避免重复设置主题触发监听循环。
        if (root.getAttribute('data-theme') !== theme) {
            root.setAttribute('data-theme', theme);
        }
    };

    style.textContent = `

        /* 全局悬浮效果 */
        html[data-theme="dark"] button:hover {
            opacity: 0.8;
            transform: scale(1.1);
            transition: all 0.2s ease;
        }

        /* --- 暗黑模式下的CSS变量 --- */
        html[data-theme="dark"] {
            /* 背景色 */
            --bg-primary: #1a1a1a;       /* 主要内容背景 */
            --bg-secondary: #2a2a2a;    /* 次要/编辑区背景 */
            --bg-code: #242424;         /* 代码块背景 */
            --bg-header: #191b1f;       /* 顶栏背景 */
            --bg-hover: #333333;        /* 悬浮背景 */
            --bg-card: #212121;         /* 卡片背景 */
            --bg-button: #2d2d2d;       /* 按钮背景 */
            --bg-tag: #3a3a3a;          /* 标签背景 */
            --bg-pure-black: #000000;   /* 纯黑背景 */

            /* 文本颜色 */
            --text-primary: #b0b0b0;    /* 主要文本 */
            --text-secondary: #999999;  /* 副文/注释 */
            --text-title: #d3d3d3;      /* 标题 */
            --text-highlight: #ffffff;  /* 高亮/突出文本 */
            --text-link: #86b8ff;       /* 超链接 */

            /* 边框颜色 */
            --border-primary: #404040;
            --border-secondary: #555555;
            --border-hover: #606060;

            /* 其他 */
            --icon-fill: #b0b0b0;
        }

        /* --- 按功能/组件应用变量 --- */
        /* 顶部导航栏 (banner) */
        html[data-theme="dark"] .AppHeader,
        html[data-theme="dark"] header[role="banner"],
        html[data-theme="dark"] .ColumnPageHeader,
        html[data-theme="dark"] .css-1ppjin3,
        html[data-theme="dark"] .css-nbr1cj,
        html[data-theme="dark"] .css-2lvw8d,
        html[data-theme="dark"] .sgui-header {
            background-color: var(--bg-header) !important;
            border-bottom: 1px solid var(--border-primary) !important;
        }

        /* 导航栏内的文字和链接 */
        html[data-theme="dark"] .Tabs-link {
            color: var(--text-primary) !important;
        }

        html[data-theme="dark"] .Tabs-link.is-active {
            color: var(--text-highlight) !important;
        }

        /* 搜索框 */
        html[data-theme="dark"] .SearchBar-input {
            background-color: var(--bg-hover) !important;
            color: var(--text-primary) !important;
            border: 1px solid var(--border-primary) !important;
        }

        /* 移除消息、私信、创作中心按钮的边框 */
        html[data-theme="dark"] .AppHeader-notifications,
        html[data-theme="dark"] .AppHeader-messages,
        html[data-theme="dark"] .css-18vqx7l .Button {
            border: none !important;
            background-color: var(--bg-header) !important;
            color: var(--text-primary) !important;
        }

        /* 通用 SVG 图标颜色 */
        html[data-theme="dark"] .ZDI,
        html[data-theme="dark"] .css-133xqjo svg,
        html[data-theme="dark"] .css-3470e2 svg,
        html[data-theme="dark"] .css-wuse5b svg {
            fill: var(--icon-fill) !important;
        }

        /* logo 调整（反色以适应暗色背景） */
        html[data-theme="dark"] .css-1hlrcxk {
            filter: brightness(0) invert(1) !important;
        }

        /* 用户头像边框 */
        html[data-theme="dark"] .AppHeader-profileAvatar {
            border: 1px solid var(--border-primary) !important;
        }

        /* 主要标题文本 */
        html[data-theme="dark"] h1,
        html[data-theme="dark"] .ContentItem-title,
        html[data-theme="dark"] .QuestionHeader-title,
        html[data-theme="dark"] .LevelInfoV2-creatorInfo,
        html[data-theme="dark"] .css-vurnku,
        html[data-theme="dark"] .css-cnnstd,
        html[data-theme="dark"] .css-180vb7x,
        html[data-theme="dark"] .css-1fu8ne5,
        html[data-theme="dark"] .css-1yn8tbw,
        html[data-theme="dark"] .css-ac5rcx,
        html[data-theme="dark"] .css-12kq1qx,
        html[data-theme="dark"] .css-33pnco,
        html[data-theme="dark"] .css-dpt3mb,
        html[data-theme="dark"] .css-1brgq4x,
        html[data-theme="dark"] .css-1yuw5jz,
        html[data-theme="dark"] .css-1jrei64,
        html[data-theme="dark"] .css-1czelnl {
            color: var(--text-title) !important;
        }

        /* 主要内容区域 (深色背景 + 浅色文字) */
        html[data-theme="dark"] .css-nomdw0,
        html[data-theme="dark"] .css-i9ss08,
        html[data-theme="dark"] .css-1nr5ql7,
        html[data-theme="dark"] .css-157mis2,
        html[data-theme="dark"] .css-7hb6gj,
        html[data-theme="dark"] .css-1mbpn2d,
        html[data-theme="dark"] .css-1yjqd5z,
        html[data-theme="dark"] .css-12lqyc0,
        html[data-theme="dark"] .css-35pmty,
        html[data-theme="dark"] .css-1t0dqk7,
        html[data-theme="dark"] .css-1cr4989,
        html[data-theme="dark"] .css-1357f6,
        html[data-theme="dark"] .css-1ury69a,
        html[data-theme="dark"] .css-looxkda,
        html[data-theme="dark"] .Sticky,
        html[data-theme="dark"] .css-xpmfhx,
        html[data-theme="dark"] .css-3zr8ne,
        html[data-theme="dark"] .CreationManage-CreationCard,
        html[data-theme="dark"] .css-slqtjm,
        html[data-theme="dark"] .css-1rniuv1,
        html[data-theme="dark"] .Tabs,
        html[data-theme="dark"] .css-k5im1d,
        html[data-theme="dark"] .css-986uza,
        html[data-theme="dark"] .css-1w24404,
        html[data-theme="dark"] .css-xoei2t,
        html[data-theme="dark"] .css-1m8gbjc,
        html[data-theme="dark"] .css-1oqbvad,
        html[data-theme="dark"] .css-1ta275q,
        html[data-theme="dark"] .css-ndiv23,
        html[data-theme="dark"] .css-1wof2n,
        html[data-theme="dark"] .css-fqja0q,
        html[data-theme="dark"] .css-114mqx8,
        html[data-theme="dark"] .css-1iazx5e,
        html[data-theme="dark"] .css-yckfye,
        html[data-theme="dark"] .css-lztgnc,
        html[data-theme="dark"] .Creator-salt-author-welfare,
        html[data-theme="dark"] .Creator-salt-author-welfare-card,
        html[data-theme="dark"] .CreatorSalt-personalInfo,
        html[data-theme="dark"] .css-d1sc5t,
        html[data-theme="dark"] .CreatorSalt-sideBar-wrapper,
        html[data-theme="dark"] .css-19nug30,
        html[data-theme="dark"] .css-h9kawn,
        html[data-theme="dark"] .css-127i0sx,
        html[data-theme="dark"] .WriteIndexLayout-main,
        html[data-theme="dark"] .css-wmwsyx,
        html[data-theme="dark"] .ListShortcut,
        html[data-theme="dark"] .css-4jezjh,
        html[data-theme="dark"] .css-10kzyet,
        html[data-theme="dark"] .css-1byd3cx,
        html[data-theme="dark"] .css-15k5nix,
        html[data-theme="dark"] .css-15aftra,
        html[data-theme="dark"] .css-kt4t4n,
        html[data-theme="dark"] .css-1e7fksk,
        html[data-theme="dark"] .css-70t8h2,
        html[data-theme="dark"] .css-13445jb,
        html[data-theme="dark"] .css-smf7y2,
        html[data-theme="dark"] .css-h07o3w,
        html[data-theme="dark"] .css-7tlwbh,
        html[data-theme="dark"] .css-jtt4ph,
        html[data-theme="dark"] .css-qf4x08,
        html[data-theme="dark"] .css-1y416g7,
        html[data-theme="dark"] .css-1p9otau,
        html[data-theme="dark"] .css-qgxdhd,
        html[data-theme="dark"] .css-16xfl53,
        html[data-theme="dark"] .css-89btt1,
        html[data-theme="dark"] .css-3wnwue,
        html[data-theme="dark"] .css-1tny33p,
        html[data-theme="dark"] .css-5fegde,
        html[data-theme="dark"] table.css-our8ff,
        html[data-theme="dark"] table.css-our8ff tr,
        html[data-theme="dark"] table.css-our8ff td,
        html[data-theme="dark"] table.css-our8ff th,
        html[data-theme="dark"] .css-odpg9,
        html[data-theme="dark"] .css-tl7t4z {
            background-color: var(--bg-primary) !important;
            color: var(--text-primary) !important;
        }

        /* 次要内容区域 (稍亮的背景) */
        html[data-theme="dark"] .css-1so3nbl,
        html[data-theme="dark"] .WriteIndex-titleInput,
        html[data-theme="dark"] .EditorSnapshotWrapper,
        html[data-theme="dark"] .css-13mrzb0,
        html[data-theme="dark"] .css-qhzfje {
            background-color: var(--bg-secondary) !important;
        }

        /* 主要文本颜色 (无背景修改) */
        html[data-theme="dark"] .css-sgbbgb,
        html[data-theme="dark"] .Creator-QuestionShared-title,
        html[data-theme="dark"] .css-1o7uqnr,
        html[data-theme="dark"] .css-atxtl4,
        html[data-theme="dark"] .css-qlj5ur,
        html[data-theme="dark"] .css-1kq86bv,
        html[data-theme="dark"] .css-z06s02,
        html[data-theme="dark"] .css-1xvfl67,
        html[data-theme="dark"] .css-1yijwry,
        html[data-theme="dark"] .css-1rspjpf,
        html[data-theme="dark"] .css-15box0,
        html[data-theme="dark"] .css-urncze,
        html[data-theme="dark"] .css-1k65ame,
        html[data-theme="dark"] .css-g62hty,
        html[data-theme="dark"] .css-rg9c67,
        html[data-theme="dark"] .css-1oq372o,
        html[data-theme="dark"] .css-141xy67,
        html[data-theme="dark"] .css-vm9s9s,
        html[data-theme="dark"] .css-68ooft,
        html[data-theme="dark"] .css-1t3in1,
        html[data-theme="dark"] .ToolsCopyright-FieldName,
        html[data-theme="dark"] .Create-salt-author-complaint-page-content h2,
        html[data-theme="dark"] .css-bjox9u,
        html[data-theme="dark"] .css-1w0nc6z,
        html[data-theme="dark"] .css-1k10w8f,
        html[data-theme="dark"] .css-10u695f,
        html[data-theme="dark"] .CommentContent,
        html[data-theme="dark"] .css-19m36yt,
        html[data-theme="dark"] .css-1yj4uzm,
        html[data-theme="dark"] .css-1pmadmj,
        html[data-theme="dark"] .css-rv8vcy,
        html[data-theme="dark"] .css-1tvhjhb,
        html[data-theme="dark"] .css-f3930v,
        html[data-theme="dark"] .css-13awyku,
        html[data-theme="dark"] .css-1f4cz9u,
        html[data-theme="dark"] .css-r4op92,
        html[data-theme="dark"] .css-1ptti3p,
        html[data-theme="dark"] .css-m9wflr,
        html[data-theme="dark"] .css-9rfw7f,
        html[data-theme="dark"] .AuthorInfo-name,
        html[data-theme="dark"] .css-1ggwcl9,
        html[data-theme="dark"] .css-4uviby,
        html[data-theme="dark"] .css-lmmx7rh,
        html[data-theme="dark"] .css-1iz9tag,
        html[data-theme="dark"] .css-roes5o,
        html[data-theme="dark"] .css-1qqcn7d,
        html[data-theme="dark"] .css-yn7rjo,
        html[data-theme="dark"] .css-me2vqk,
        html[data-theme="dark"] .css-e0p248,
        html[data-theme="dark"] .css-iotqsc,
        html[data-theme="dark"] .css-onu91o,
        html[data-theme="dark"] .Create-salt-author-complaint-page-content p,
        html[data-theme="dark"] .css-h5rdys,
        html[data-theme="dark"] .css-1symrae,
        html[data-theme="dark"] .css-705zp9,
        html[data-theme="dark"] .css-l2s8o9,
        html[data-theme="dark"] .App-pc,
        html[data-theme="dark"] .css-1eqmq6,
        html[data-theme="dark"] .css-133xqjo,
        html[data-theme="dark"] .css-17rhbf0,
        html[data-theme="dark"] .css-3470e2,
        html[data-theme="dark"] .css-wuse5b {
            color: var(--text-primary) !important;
        }

        /* 副文/注释文本 */
        html[data-theme="dark"] .css-1dydzuy,
        html[data-theme="dark"] .AuthorInfo-badgeText {
            color: var(--text-secondary) !important;
        }

        /* 高亮/突出文本 */
        html[data-theme="dark"] .css-anmzua,
        html[data-theme="dark"] .css-1woiwqg,
        html[data-theme="dark"] .MCNQuestionListItem-answerBtn,
        html[data-theme="dark"] .css-66w2mh,
        html[data-theme="dark"] .css-oxh2a1,
        html[data-theme="dark"] .css-1946lac,
        html[data-theme="dark"] .css-1wp1nud,
        html[data-theme="dark"] .css-zkfaav,
        html[data-theme="dark"] .css-qlzdd2,
        html[data-theme="dark"] .css-14w1mp,
        html[data-theme="dark"] .css-2kp40o,
        html[data-theme="dark"] .css-risksa,
        html[data-theme="dark"] .css-6j0ktf {
            color: var(--text-highlight) !important;
        }

        /* 超链接文本 */
        html[data-theme="dark"] .css-b7erz1,
        html[data-theme="dark"] .css-140fcia {
            color: var(--text-link) !important;
        }

        /* 纯黑背景 */
        html[data-theme="dark"] .css-2sopzd {
            background-color: var(--bg-pure-black) !important;
        }

        /* 代码区 */
        html[data-theme="dark"] code,
        html[data-theme="dark"] .css-ob6uua pre,
        html[data-theme="dark"] .css-1mev9j9 pre,
        html[data-theme="dark"] .css-1yl6ec1 pre,
        html[data-theme="dark"] .css-oqi8p3 pre {
            background: var(--bg-code) !important;
        }

        /* 卡片样式 (LinkCard) */
        html[data-theme="dark"] .LinkCard {
            background-color: var(--bg-card) !important;
            border: 1px solid var(--border-secondary) !important;
            border-radius: 8px !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
        }

        html[data-theme="dark"] .LinkCard.new.css-1vqsdx1 {
            background-color: transparent !important;
            color: var(--text-title) !important;
        }

        html[data-theme="dark"] .LinkCard.new.css-1vqsdx1:hover {
            background-color: var(--bg-hover) !important;
            transition: background-color 0.3s ease !important;
        }

        html[data-theme="dark"] .LinkCard-contents { background-color: transparent !important; }

        html[data-theme="dark"] .LinkCard-title { color: var(--text-title) !important; font-weight: 600 !important; }

        html[data-theme="dark"] .LinkCard-desc { color: var(--text-primary) !important; }

        html[data-theme="dark"] .LinkCard-tag {
            background-color: var(--bg-tag) !important;
            color: var(--text-title) !important;
        }

        html[data-theme="dark"] .LinkCard-image {
            background-color: var(--bg-primary) !important;
            border: 1px solid var(--border-secondary) !important;
        }

        html[data-theme="dark"] .LinkCard-image img { opacity: 0.9 !important; transition: opacity 0.3s ease !important; }

        html[data-theme="dark"] .LinkCard-image img:hover { opacity: 1 !important; }

        html[data-theme="dark"] .LinkCard-image--video .Zi.Zi--Play { color: var(--text-highlight) !important; }

        /* 导航菜单悬浮效果 */
        html[data-theme="dark"] .css-17rhbf0:hover {
            background-color: var(--bg-hover) !important;
            color: var(--text-highlight) !important;
        }

        /* 特殊图标 */
        html[data-theme="dark"] .css-1bh8qzv path:first-child { fill: #d32f2f !important; }

        html[data-theme="dark"] .css-1bh8qzv path:last-child { fill: var(--text-highlight) !important; }

        /* “稍后答”等按钮的悬浮效果 */
        html[data-theme="dark"] .css-3470e2:hover,
        html[data-theme="dark"] .css-wuse5b:hover {
            color: var(--text-highlight) !important;
            background-color: var(--bg-hover) !important;
        }

        html[data-theme="dark"] .css-3470e2:hover svg,
        html[data-theme="dark"] .css-wuse5b:hover svg {
            fill: var(--text-highlight) !important;
        }

        /* 通用按钮 */
        html[data-theme="dark"] .css-hdz1a3,
        html[data-theme="dark"] .css-1q65fkr,
        html[data-theme="dark"] .css-97fdvh {
            color: var(--text-primary) !important;
            background-color: var(--bg-button) !important;
            border: 1px solid var(--border-primary) !important;
        }

        html[data-theme="dark"] .css-hdz1a3:hover {
            color: var(--text-highlight) !important;
            background-color: var(--bg-hover) !important;
            border-color: var(--border-hover) !important;
        }

        /* 滚动条 */
        html[data-theme="dark"] .StrollBar { background-color: transparent !important; }

        html[data-theme="dark"] .StrollBar > div { background-color: rgba(255, 255, 255, 0.3) !important; }
    `;

    // 使用 MutationObserver 监控 data-theme 变化，防止知乎自身脚本覆盖主题
    const themeObserver = new MutationObserver(applyTheme);
    const initializeTheme = () => {
        if (!document.documentElement) return false;
        // 开始观察 <html> 的属性变化
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        // 在页面解析之前设置初始主题，避免白屏
        applyTheme();
        // 立即将样式添加到页面，即使DOM还未完全加载
        (document.head || document.documentElement).appendChild(style);
        return true;
    };

    // 提前初始化，修复载入时主题被覆盖的问题。
    if (!initializeTheme()) {
        // 等待 <html> 创建后初始化。
        const rootObserver = new MutationObserver(() => {
            if (initializeTheme()) rootObserver.disconnect();
        });
        rootObserver.observe(document, { childList: true });
    }

    const initializeButton = () => {
        applyTheme();
        if (!document.body || document.getElementById(BUTTON_ID)) return;

        // 创建切换按钮
        const toggleBtn = document.createElement('button');
        toggleBtn.id = BUTTON_ID;
        toggleBtn.type = 'button';
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.top = '10px';
        toggleBtn.style.right = '10px';
        toggleBtn.style.zIndex = '9999';
        toggleBtn.style.width = '32px';
        toggleBtn.style.height = '32px';
        toggleBtn.style.padding = '0';
        toggleBtn.style.border = '1px solid #404040';
        toggleBtn.style.borderRadius = '50%';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.display = 'flex';
        toggleBtn.style.alignItems = 'center';
        toggleBtn.style.justifyContent = 'center';
        toggleBtn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

        // SVG 图标（太阳和月亮）
        const sunIcon = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        `;

        const moonIcon = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0C0C0" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;

        const updateButton = () => {
            toggleBtn.innerHTML = isDark ? sunIcon : moonIcon;
            toggleBtn.style.backgroundColor = isDark ? '#333333' : '#ffffff';
            toggleBtn.title = isDark ? '切换到浅色模式' : '切换到深色模式';
            toggleBtn.setAttribute('aria-label', toggleBtn.title);
            toggleBtn.setAttribute('aria-pressed', String(isDark));
        };
        // 设置初始图标
        updateButton();

        // 点击切换主题
        toggleBtn.onclick = () => {
            const nextPreference = !isDark;
            try {
                // 储存成功后更新主题和按钮。
                localStorage.setItem(STORAGE_KEY, String(nextPreference));
                isDark = nextPreference;
                applyTheme();
                updateButton();
            } catch (error) {
                toggleBtn.title = '主题设定储存失败，请检查网站储存权限';
                console.error('[Zhihu Dark Mode] 储存设定失败', error);
            }
        };

        // 添加按钮到页面
        document.body.appendChild(toggleBtn);
    };

    // 页面加载完成后执行后续逻辑
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeButton, { once: true });
    } else {
        initializeButton();
    }
})();
