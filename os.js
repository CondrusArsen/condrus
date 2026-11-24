// CondrusOS — портфолио Арсения Атрохова в виде операционной системы.
// Иконки открывают окна-приложения: профиль, LinkedIn, GitHub (живые данные), Roblox-игры,
// играбельная аркада, резюме, шоурил, разборы, терминал и контакты.
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
// ---------- Язык (RU / EN) ----------
// Приоритет: ?lang= в адресе → localStorage → язык браузера. После смены страница перезагружается.
const store = {
  get: k => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
};
const pickLang = () => {
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'en' || q === 'ru') return q;
  const saved = store.get('condrus-lang');
  if (saved === 'en' || saved === 'ru') return saved;
  return (navigator.language || '').toLowerCase().startsWith('ru') ? 'ru' : 'en';
};
const LANG = pickLang();
document.documentElement.lang = LANG;
const T = (ru, en) => LANG === 'en' ? en : ru;
const LOCALE = T('ru-RU', 'en-US');
const LINKS = {
  linkedin: 'https://www.linkedin.com/in/arseni-atrokhov/',
  github: 'https://github.com/CondrusArsen',
  telegram: 'https://t.me/qintin',
  arcade: 'https://condrusarsen.github.io/ai-game-lab/',
  list: 'https://condrusarsen.github.io/ai-game-lab/list/',
};
const K = 'assets/kit';
const shot = (g, name, kind = name.startsWith('real') ? 'real' : name.startsWith('ui') ? 'ui' : 'art') => ({ src: `${K}/${g}/${name}.jpg`, thumb: `${K}/${g}/${name}-s.jpg`, kind });
const KIND_LABEL = { art: T('Обложка', 'Store art'), real: T('Кадр из игры', 'Real gameplay'), ui: T('Интерфейс', 'UI') };
const ROBLOX = [
  { id: 'knife', title: '+1 Knife Size Every Cut', icon: `${K}/knife/icon.png`, url: 'https://www.roblox.com/games/102709455340707',
    stamp: ['ship', T('Выпущена · один', 'Shipped · solo')], img: `${K}/knife/key-knife-size-s.jpg`,
    tag: T('Моя игра от идеи до релиза', 'My own game, concept to launch'),
    text: T('Каждый разрез делает нож больше: ASMR-нарезка мыла, редкости брусков, прогрессия и побег от волны пены.',
      'Every cut makes the knife bigger: ASMR soap shaving, bar rarities, progression and a foam wave to outrun.'),
    shots: [shot('knife', 'key-knife-size'), shot('knife', 'real-cutting'), shot('knife', 'key-shave'), shot('knife', 'real-hub'), shot('knife', 'key-rarities'), shot('knife', 'real-gym-shop'), shot('knife', 'key-giant-knife'), shot('knife', 'real-mine-gate'), shot('knife', 'key-foam'), shot('knife', 'real-flight')],
    decisions: T(['Один глагол и видимый рост: каждый разрез делает нож больше.', 'Волна пены превращает спокойный цикл в забег домой.', 'Переделал первую сессию по итогам плейтестов.'],
      ['One verb, visible growth: every cut makes the knife bigger.', 'A foam wave turns a calm loop into a run home.', 'Rebuilt the first session after playtests.']),
    role: T(['Идея, игровой цикл и прогрессия', 'Карта, интерфейс и магазин', 'Код — Claude Code и Codex по моему ТЗ, ревью каждой сборки', 'Арт страницы игры'],
      ['Concept, core loop and progression', 'Map, UI and shop', 'Code by Claude Code and Codex to my spec, every build reviewed', 'Store page art']),
    tech: ['Luau', 'UI', T('Прогрессия', 'Progression'), T('Арт страницы', 'Store art')] },
  { id: 'lake', title: 'Fish & Survive: Zombie Lake', icon: `${K}/lake/icon.png`, url: 'https://www.roblox.com/games/134519178428493',
    stamp: ['co', T('Совместная · в разработке', 'Co-dev · in development')], img: `${K}/lake/key-hooked-s.jpg`,
    tag: T('Интерфейс, карта, клиент-сервер', 'UI, map, client/server systems'),
    text: T('Днём ловишь рыбу, ночью держишь оборону от зомби. 15 классов, легендарные рыбы, кровавая луна, общий прогресс между лобби и матчем.',
      'Fish by day, survive the zombie night. 15 classes, legendary fish, a blood moon and shared progression between the lobby and match places.'),
    video: 'video/zombie-lake-1080.mp4', poster: `${K}/lake/key-hooked.jpg`,
    shots: [shot('lake', 'key-day-night'), shot('lake', 'real-cast-ui'), shot('lake', 'key-legendary'), shot('lake', 'real-night-fight'), shot('lake', 'key-classes'), shot('lake', 'real-class-lineup'), shot('lake', 'key-halloween')],
    decisions: T(['Дневная рыбалка кормит ночную оборону: одна экономика, два настроения.', 'Телепорты лобби ↔ матч через резервные серверы.', 'Общие сохранения с блокировкой сессии: прогресс не раздваивается.'],
      ['Day fishing feeds night defence: one economy, two moods.', 'Lobby ↔ match teleports with reserved servers.', 'Session-locked shared saves, so progress never forks.']),
    role: T(['Интерфейс и карта', 'Клиент-серверные скрипты с ИИ', 'Механики придумывали вдвоём с напарником; учил его Luau и Rojo'],
      ['UI and map', 'Client/server scripts with AI tools', 'Mechanics designed together with my teammate; taught him Luau and Rojo']),
    tech: ['Luau', 'TeleportService', 'DataStore', 'Rojo'] },
  { id: 'dice', title: 'Dice & Dash: Roll the World', icon: `${K}/dice/icon.png`, url: 'https://www.roblox.com/games/70861231474704',
    stamp: ['dev', T('Новое ядро · в разработке', 'New core · in development')], img: `${K}/dice/key-roll-s.jpg`,
    tag: T('Геймдизайн и руководство новым ядром', 'Design and direction of the new core'),
    text: T('Гигантский кубик падает на арену, и выпавшая грань перестраивает карту в одну из шести мини-игр. Добычу несёшь домой — она приносит доход.',
      'A giant die lands on the arena and the rolled face rebuilds the map into one of six mini-games. You carry the loot home, and it earns income.'),
    note: T('Сейчас на Roblox — переработанный купленный шаблон. Новое ядро с кубиком собираю в Studio с ИИ-агентами.',
      'The live version on Roblox is a reworked purchased template. I am building the new dice core in Studio with AI agents.'),
    shots: [shot('dice', 'key-roll'), shot('dice', 'real-aerial'), shot('dice', 'key-what-will-you-roll'), shot('dice', 'real-dice-plaza'), shot('dice', 'key-run-it-home'), shot('dice', 'real-rift-road'), shot('dice', 'key-golden-roll'), shot('dice', 'ui-kit'), shot('dice', 'real-plaza'), shot('dice', 'key-in-the-dark')],
    decisions: T(['Бросок решает сервер, клиент только показывает анимацию кубика.', '«Мешок» граней: одна и та же грань не выпадет дважды подряд.', 'Правило из ТЗ: игрок действует уже через 8 секунд после входа.'],
      ['The server owns the roll; the client only plays the die animation.', 'Shuffle bag: the same face never comes up twice in a row.', 'Spec rule: the player acts within 8 seconds of joining.']),
    role: T(['Геймдизайн: раунд 90 секунд, 7 игроков, 6 граней', 'ТЗ первых 90 секунд по секундам', 'Код — агенты по моему ТЗ, ревью и плейтесты — мои', 'Арт страницы: иконки, обложки'],
      ['Design: 90-second rounds, 7 players, 6 faces', 'Second-by-second spec of the first 90 seconds', 'Code by agents to my spec; reviews and playtests by me', 'Store art: icons, thumbnails']),
    tech: ['Luau --!strict', T('6 режимов', '6 modes'), 'ProfileStore', 'Studio MCP'] },
];
// Лента кадров: обложка и настоящий кадр той же игры по очереди, две строки едут навстречу.
const RIBBON = ROBLOX.flatMap(g => g.shots.map(sh => ({ ...sh, game: g.id })));
function ribbonHTML(cls = '') {
  const rowA = RIBBON.filter((_, i) => Math.floor(i / 2) % 2 === 0), rowB = RIBBON.filter((_, i) => Math.floor(i / 2) % 2 === 1).reverse();
  const row = (items, dir) => `<div class="rb-row ${dir}"><div class="rb-track">${[...items, ...items].map(it => `<button class="rb-shot" data-game="${it.game}" tabindex="-1"><img src="${it.thumb}" alt="" loading="lazy"><span class="k-${it.kind}">${KIND_LABEL[it.kind]}</span></button>`).join('')}</div></div>`;
  return `<div class="ribbon ${cls}">${row(rowA, 'ltr')}${row(rowB, 'rtl')}</div>`;
}
const GAMES = [
  { id: 'breaking-storm', title: 'Breaking Storm Live', note: T('Поймай торнадо в кадр эфира', 'Catch the tornado on live TV'), local: true },
  { id: 'block-express', title: 'Block Express', note: T('Гонка поезда с закатом', 'Race a train against the sunset'), local: true },
  { id: 'twelve-second-heist', title: '12-Second Heist', note: T('Ограбление за 12 секунд', 'A heist in 12 seconds'), local: true },
  { id: 'foggy-woods', title: 'Foggy Woods', note: T('Найди пса в тумане', 'Find the dog in the fog'), local: true },
  { id: 'cube-cutter', title: 'Cube Cutter', note: T('Режь кубы в ритм', 'Slice cubes to the beat') },
  { id: 'block-towers', title: 'Block Towers', note: T('Строй башню из блоков', 'Stack blocks into a tower') },
  { id: 'icing-joust', title: 'Icing Joust', note: T('Кондитерская дуэль', 'A pastry joust') },
  { id: 'tick-and-toll', title: 'Tick & Toll', note: T('Головоломка со временем', 'A puzzle about time') },
  { id: 'loop-and-snip', title: 'Loop & Snip', note: T('Петли и ножницы', 'Loops and scissors') },
  { id: 'foam-patrol', title: 'Foam Patrol', note: T('Пенный патруль', 'A foam patrol') },
  { id: 'mouse-heist', title: 'Mouse Heist', note: T('Мышиное ограбление', 'A mouse heist') },
  { id: 'glub-glub', title: 'Glub Glub', note: T('Подводная аркада', 'An underwater arcade') },
];
const CVS = T([
  ['Atrokhov_Arseniy_Roblox_RU.pdf', 'Roblox · RU'],
  ['Arseni_Atrokhov_Game_Prototyper_EN.pdf', 'Game Prototyper · EN'],
  ['Atrokhov_Arseniy_Game_Design_RU.pdf', 'Геймдизайн · RU'],
  ['Atrokhov_Arseniy_AI_Tools_RU.pdf', 'AI-инструменты · RU'],
], [
  ['Arseni_Atrokhov_Game_Prototyper_EN.pdf', 'Game Prototyper · EN'],
  ['Atrokhov_Arseniy_Roblox_RU.pdf', 'Roblox (Russian)'],
  ['Atrokhov_Arseniy_Game_Design_RU.pdf', 'Game design (Russian)'],
  ['Atrokhov_Arseniy_AI_Tools_RU.pdf', 'AI tools (Russian)'],
]);

// ---------- Иконки приложений ----------
const GLYPH = {
  user: '<path d="M12 12a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Zm-7.5 8.4c.6-3.6 3.6-6 7.5-6s6.9 2.4 7.5 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
  linkedin: '<path fill="#fff" d="M5.3 9h3v10h-3zM6.8 4.2a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM10.5 9h2.9v1.4c.4-.8 1.5-1.6 3.1-1.6 3.2 0 3.8 2.1 3.8 4.9V19h-3v-4.6c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4V19h-3z"/>',
  github: '<path fill="#fff" d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.7c-2.7.6-3.2-1.2-3.2-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1.1-4.3-4.7 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1a9 9 0 0 1 4.7 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.7-2.2 4.5-4.3 4.7.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z"/>',
  gamepad: '<path d="M7 8h10a5 5 0 0 1 4.6 7l-.7 1.6a2.4 2.4 0 0 1-4 .5L15 15H9l-1.9 2.1a2.4 2.4 0 0 1-4-.5L2.4 15A5 5 0 0 1 7 8Z" fill="#fff"/><path d="M7.5 10.5v3M6 12h3" stroke="#5b2bd1" stroke-width="1.6" stroke-linecap="round"/><circle cx="16" cy="11" r="1.1" fill="#5b2bd1"/><circle cx="17.8" cy="13" r="1.1" fill="#5b2bd1"/>',
  cart: '<rect x="5" y="3.5" width="14" height="17" rx="2" fill="#fff"/><rect x="7.5" y="6" width="9" height="6.5" rx="1" fill="#e2462f"/><path d="M8 16h3M8 18h5" stroke="#e2462f" stroke-width="1.5" stroke-linecap="round"/>',
  play: '<path d="M8 5.5v13l11-6.5z" fill="#fff"/>',
  doc: '<path d="M6 3h8l4 4v14H6z" fill="#fff"/><path d="M14 3v4h4" fill="#d6dbe6"/><path d="M8.5 11h7M8.5 14h7M8.5 17h4.5" stroke="#d93a3a" stroke-width="1.5" stroke-linecap="round"/>',
  book: '<path d="M4 5.5c2.7-1 5.3-1 8 .5 2.7-1.5 5.3-1.5 8-.5v13c-2.7-1-5.3-1-8 .5-2.7-1.5-5.3-1.5-8-.5z" fill="#fff"/><path d="M12 6v13" stroke="#b9772a" stroke-width="1.4"/>',
  term: '<rect x="2.5" y="4" width="19" height="16" rx="3" fill="#111"/><path d="m6.5 9 3 3-3 3M11.5 15h5" stroke="#cfe57e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  send: '<path d="M21 3 3 10.5l7 2.5 2.5 7z" fill="#fff"/><path d="M10 13 21 3" stroke="#1d8fd8" stroke-width="1.4"/>',
  roll: '<rect x="5" y="5" width="14" height="14" rx="3.5" fill="#fff"/><circle cx="9" cy="9" r="1.3" fill="#c98a12"/><circle cx="15" cy="15" r="1.3" fill="#c98a12"/><circle cx="12" cy="12" r="1.3" fill="#c98a12"/>',
};
const APPS = {
  about:    { name: T('Обо мне', 'About me'),  g: ['#ffd36b', '#e0901a'], glyph: 'user',     w: 880, h: 660 },
  studio:   { name: T('Как я делаю игры', 'How I make games'), g: ['#f5c542', '#b07a0e'], glyph: 'roll', w: 1120, h: 760 },
  linkedin: { name: 'LinkedIn',     g: ['#2a8bf2', '#0a5cad'], glyph: 'linkedin', w: 820, h: 680 },
  github:   { name: 'GitHub',       g: ['#3b4252', '#161b22'], glyph: 'github',   w: 1180, h: 800 },
  roblox:   { name: T('Игры · дела', 'Games · case files'),  g: ['#8a5cff', '#4b1fc9'], glyph: 'gamepad',  w: 1100, h: 780 },
  arcade:   { name: T('Аркада', 'Arcade'),  g: ['#ff7a59', '#d6342a'], glyph: 'cart',     w: 920, h: 660 },
  reel:     { name: T('Шоурил.mp4', 'Showreel.mp4'),  g: ['#3fd1ff', '#1767d6'], glyph: 'play',     w: 860, h: 530 },
  cv:       { name: T('Резюме.pdf', 'CV.pdf'),  g: ['#ff6b6b', '#c4262f'], glyph: 'doc',      w: 760, h: 760 },
  lib:      { name: T('Разборы', 'Teardowns'),  g: ['#f2b25b', '#a15d14'], glyph: 'book',     w: 820, h: 600 },
  term:     { name: T('Терминал', 'Terminal'),  g: ['#2e2a3f', '#0b0a12'], glyph: 'term',     w: 640, h: 420 },
  contact:  { name: T('Связаться', 'Contact'),  g: ['#37b6ff', '#1279c9'], glyph: 'send',     w: 720, h: 660 },
};
const DESKTOP_ORDER = ['about', 'studio', 'roblox', 'arcade', 'reel', 'cv', 'github', 'linkedin', 'contact'];
const DOCK_ORDER = ['about', 'studio', 'roblox', 'arcade', 'reel', 'lib', 'sep', 'github', 'linkedin', 'cv', 'contact', 'term'];
const icon = (id, size = '') => `<span class="appicon ${size}" style="--g1:${APPS[id].g[0]};--g2:${APPS[id].g[1]}"><svg viewBox="0 0 24 24" aria-hidden="true">${GLYPH[APPS[id].glyph]}</svg></span>`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// ---------- Студия: команда и конвейер ----------
const CODE_ROLL = `<span class="c">-- RoundDirector.luau · server</span>
<span class="kw">local function</span> <span class="fn">refillBag</span>()
  bag = { <span class="n">1</span>, <span class="n">2</span>, <span class="n">3</span>, <span class="n">4</span>, <span class="n">5</span>, <span class="n">6</span> }
  <span class="kw">local</span> rng = Random.<span class="fn">new</span>()
  <span class="kw">for</span> i = #bag, <span class="n">2</span>, -<span class="n">1</span> <span class="kw">do</span>
    <span class="kw">local</span> j = rng:<span class="fn">NextInteger</span>(<span class="n">1</span>, i)
    bag[i], bag[j] = bag[j], bag[i]
  <span class="kw">end</span>
  <span class="c">-- no face twice in a row</span>`;
const coll = imgs => `<div class="coll">${imgs.map(x => `<img src="${x}" alt="" loading="lazy">`).join('')}</div>`;
const TEAM = [
  { id: 'me', tag: T('Игрок 1 · Режиссёр', 'Player 1 · Director'), name: T('Арсений Атрохов', 'Arseni Atrokhov'), who: T('Геймдизайн · ревью кода · плейтесты', 'Game design · code review · playtests'),
    art: '<img src="assets/photo.jpg" alt="">', bars: [['Luau', 92], [T('Дизайн', 'Design'), 88], [T('Релизы', 'Shipping'), 85]],
    fact: T('<b>13 000+</b> уроков по Luau — читаю чужой код каждый день, поэтому сам решаю, что из кода агентов принять.', '<b>13,000+</b> Luau lessons taught — I read code for a living, so I decide what agent code gets in.') },
  { id: 'eng', tag: T('Инженерия', 'Engineering'), name: 'Claude Code · Codex', who: T('Моя команда разработки', 'My dev team'), art: `<div class="code">${CODE_ROLL}</div>`,
    bars: [[T('Скорость', 'Speed'), 95], [T('Системы', 'Systems'), 80]], fact: T('Пишут код по моему ТЗ. Архитектура и последнее слово — <b>за мной</b>.', 'Write code to my spec. <b>I own</b> the architecture and the final call.'), open: 'github' },
  { id: 'research', tag: T('Исследования', 'Research'), name: T('Разборы', 'Teardowns'), who: T('Почему хиты работают', 'Why hits work'),
    art: coll(['doors', 'dead-rails', '99-nights-in-the-forest', 'catch-a-brainrot'].map(x => `assets/td/${x}.jpg`)), bars: [[T('Глубина', 'Depth'), 90], [T('Объём', 'Volume'), 97]],
    fact: T('<b>600+</b> игр разобрано: цикл, первая сессия, экономика.', '<b>600+</b> games taken apart: loops, first session, economy.'), open: 'lib' },
  { id: 'art', tag: T('Арт', 'Art'), name: T('Арт страниц', 'Store art'), who: T('Иконки · обложки · трейлеры', 'Icons · thumbnails · trailers'),
    art: coll([`${K}/lake/key-hooked-s.jpg`, `${K}/knife/key-knife-size-s.jpg`, `${K}/dice/key-golden-roll-s.jpg`, `${K}/lake/key-legendary-s.jpg`]), bars: [[T('Кликабельность', 'Click appeal'), 88], [T('Стиль', 'Style'), 84]],
    fact: T('Сам веду арт: каждая картинка, которую игрок видит первой.', 'I art-direct every image a player sees first.'), open: 'roblox' },
  { id: 'qa', tag: T('QA · плейтесты', 'QA · playtests'), name: T('Плейтесты', 'Playtests'), who: T('Телефон и ПК, каждая сборка', 'Phone + desktop, every build'),
    art: coll([`${K}/lake/real-cast-ui-s.jpg`, `${K}/knife/real-cutting-s.jpg`, `${K}/dice/real-plaza-s.jpg`, `${K}/knife/real-hub-s.jpg`]), bars: [[T('Охват', 'Coverage'), 86], [T('Ощущение', 'Feel'), 90]],
    fact: T('Ничего не выходит, пока я <b>сам не сыграю</b>.', 'Nothing ships until I have <b>played it myself</b>.'), open: 'roblox' },
];
const teamCard = (m, cls = '') => `<button class="tcard ${m.id === 'me' ? 'p1' : ''} ${cls}" ${m.open ? `data-open="${m.open}"` : 'data-open="about"'}>
  <div class="tc-art">${m.art}<span class="tc-tag">${m.tag}</span>${m.id === 'me' ? `<span class="tc-sel">${T('ВЫБРАН', 'SELECTED')}</span>` : ''}</div>
  <div class="tc-bd"><b>${m.name}</b><small>${m.who}</small>${m.bars.map(([l, v]) => `<div class="tc-bar"><span>${l}</span><i style="--v:${v}%"></i></div>`).join('')}<p>${m.fact}</p></div></button>`;
const PIPE = [
  { n: 1, who: 'me', title: T('Разбор', 'Teardown'), text: T('Разбираю хит: что держит игрока первые 60 секунд.', 'Take a hit apart: what hooks a player in the first 60 s.'),
    vis: coll(['natural-disaster-survival', 'creatures-of-sonaria', 'doors', 'dead-rails'].map(x => `assets/td/${x}.jpg`)), open: 'lib' },
  { n: 2, who: 'me', title: T('ТЗ', 'Spec'), text: T('Первые 90 секунд расписаны по секундам, у каждого шага — критерий приёмки.', 'The first 90 seconds, second by second, each step with a pass criterion.'),
    vis: `<div class="spec">${T([['0–8 с', 'Кубик, яйцо и арка дома видны с первого кадра. Одна кнопка.'], ['8–18 с', 'Игрок запускает кубик → он вскрывает гнездо, трасса наклоняется.'], ['18–35 с', 'Одна гарантированная цель рядом, ценный питомец — на боковом пути.']],
      [['0–8 s', 'Die, egg and home arch visible on frame one. One CTA.'], ['8–18 s', 'Player launches the die → it cracks the nest, the track tilts.'], ['18–35 s', 'One sure target close by, a richer pet on the side route.']]).map(([t, d]) => `<div><span>${t}</span>${d}</div>`).join('')}</div>` },
  { n: 3, who: 'ai', title: T('Агенты пишут код', 'Agents build'), text: T('Claude Code и Codex пишут по ТЗ, я читаю и отклоняю лишнее.', 'Claude Code & Codex write to the spec; I review and reject.'),
    vis: `<div class="code"><span class="c">-- Gather → Lock → Roll → Reveal</span>
<span class="c">-- → Morph → Grow → Play → Results</span>
<span class="kw">function</span> RoundDirector.<span class="fn">FaceOfDay</span>()
  <span class="kw">local</span> d = os.<span class="fn">date</span>(<span class="n">"!*t"</span>)
  <span class="kw">local</span> seed = d.year * <span class="n">400</span> + d.yday
  <span class="kw">return</span> (seed * <span class="n">7919</span>) % <span class="n">6</span> + <span class="n">1</span>
<span class="kw">end</span></div>`, open: 'github' },
  { n: 4, who: 'both', title: T('Плейтест', 'Playtest'), text: T('Studio и настоящие устройства, раунды на 7 игроков, правка, повтор.', 'Studio + real devices, 7-player rounds, fix, repeat.'), vis: `<img src="${K}/dice/real-aerial.jpg" alt="">`, open: 'roblox', game: 'dice' },
  { n: 5, who: 'both', title: T('Арт страницы', 'Store art'), text: T('Иконки, обложки, трейлер — то, что игрок видит первым.', 'Icons, thumbnails, trailer — the first thing players see.'), vis: `<img src="${K}/dice/key-what-will-you-roll-s.jpg" alt="">`, open: 'roblox', game: 'dice' },
  { n: 6, who: 'me', title: T('Релиз в Roblox', 'Ship to Roblox'), text: T('Публикую и дорабатываю первую сессию.', 'Publish, then iterate on the first session.'),
    vis: `<div class="shipped"><img src="${K}/knife/icon.png" alt=""><span class="stamp ship">${T('ВЫПУЩЕНА', 'SHIPPED')}</span></div>`, open: 'roblox', game: 'knife' },
];
const WHO = { me: T('Я', 'Me'), ai: T('Агенты · ревью моё', 'AI · reviewed by me'), both: T('Я + агенты', 'Me + agents') };
const SLOGAN = T('Нанимаете одного — <em>получаете студию.</em>', 'Hire one person. <em>Get a studio.</em>');

// ---------- Содержимое приложений ----------
const VIEWS = {
  about: () => ({ html: `<div class="about">
      <div class="photo"><div class="ring"></div><img src="assets/photo.jpg" alt="${T('Арсений Атрохов', 'Arseni Atrokhov')}"></div>
      <div data-stagger>
        <span class="badge"><i></i>${T('Открыт к удалённой работе · полный день', 'Open to remote, full-time roles')}</span>
        <h1>${T('Арсений Атрохов', 'Arseni Atrokhov')}</h1>
        <div class="role">Roblox Developer &amp; Game Prototyper</div>
        <div class="slogan">${SLOGAN}</div>
        <p>${T('Я придумываю игру, ставлю задачи команде ИИ-агентов (Claude Code, Codex), проверяю каждую строку и сам играю в каждую сборку — и довожу Roblox-игры до релиза. 13 000+ уроков по Luau научили меня читать чужой код, поэтому что из кода агентов принять, решаю я.',
          'I design the game, direct a crew of AI agents (Claude Code, Codex), review every line and playtest every build — and ship Roblox games end to end. 13,000+ Luau lessons taught me to read other people\'s code, so I decide what agent code gets in.')}</p>
        <div class="loc">${T('Гомель, Беларусь · UTC+3 · русский родной, английский письменно', 'Gomel, Belarus · UTC+3 · Russian native, English in writing')}</div>
        <div class="row">
          <button class="btn btn-gold" data-open="studio">▶ ${T('Как я делаю игры', 'How I make games')}</button>
          <button class="btn" data-open="roblox">${T('Игры', 'Games')}</button>
          <button class="btn" data-open="cv">📄 ${T('Резюме', 'CV')}</button>
          <a class="btn" href="${LINKS.telegram}" target="_blank" rel="noopener">✈️ Telegram</a>
        </div>
        <div class="section-t">${T('Игры · дела', 'Games · case files')}</div>
        <div class="tiles">${ROBLOX.map(g => `<button class="tile" data-open="roblox" data-game="${g.id}"><img src="${g.img}" alt=""><span class="stamp ${g.stamp[0]}">${g.stamp[1]}</span><div><b>${g.title}</b><span>${g.tag}</span></div></button>`).join('')}</div>
        <div class="chips"><span>Luau</span><span>Roblox Studio</span><span>DataStore / ProfileStore</span><span>Rojo</span><span>${T('Геймдизайн', 'Game design')}</span><span>HTML5 / Canvas</span><span>UI/UX · Figma</span><span>Claude Code · Codex</span></div>
      </div></div>` }),

  studio: () => {
    // Колода без прокрутки: колесо, стрелки, свайп и карта уровней листают слайды вбок.
    const slides = [
      `<div class="dk-intro"><div class="k">${T('Как у меня рождается игра', 'How a game gets made here')}</div><h2>${SLOGAN}</h2>
        <p>${T('Шесть уровней от разбора до релиза. На каждом — настоящий кусок работы и видно, где решаю я, а где работают агенты.', 'Six levels from teardown to launch. Each shows a real piece of the work — and where I decide versus where the agents build.')}</p>
        <div class="dk-team">${TEAM.map(m => teamCard(m, 'mini')).join('')}</div>
        <button class="btn btn-gold big" data-go="1">${T('▶ Начать с уровня 1', '▶ Start at level 1')}</button></div>`,
      ...PIPE.map(st => `<div class="dk-step"><div class="dk-vis">${st.vis}</div>
        <div class="dk-tx"><span class="dk-lvl">${T('Уровень', 'Level')} ${st.n} / 6</span><h3>${st.title}</h3><p>${st.text}</p>
          <span class="who ${st.who}">${WHO[st.who]}</span>
          ${st.open ? `<button class="btn" data-open="${st.open}" ${st.game ? `data-game="${st.game}"` : ''}>${T('Посмотреть вживую →', 'See it live →')}</button>` : ''}</div></div>`),
      `<div class="dk-cases"><div class="k">${T('Игры · дела', 'Games · case files')}</div><h2>${T('Решения, а не цифры', 'Decisions, not vanity stats')}</h2>
        <div class="dk-files">${ROBLOX.map(g => `<button class="file" data-open="roblox" data-game="${g.id}"><div class="f-img"><img src="${g.img}" alt=""><span class="stamp ${g.stamp[0]}">${g.stamp[1]}</span></div>
          <b>${g.title}</b><ul>${g.decisions.map(d => `<li>${d}</li>`).join('')}</ul></button>`).join('')}</div></div>`,
    ];
    const names = [T('Старт', 'Start'), ...PIPE.map(st => st.title), T('Дела', 'Cases')];
    return { html: `<div class="deck">
      <nav class="dk-map">${names.map((n, i) => `<button data-go="${i}" class="${i ? '' : 'on'}"><i>${i === 0 ? '★' : i === names.length - 1 ? '◆' : i}</i><span>${n}</span></button>`).join('<b class="dk-path"></b>')}</nav>
      <div class="dk-view"><div class="dk-track">${slides.map(sl => `<section class="dk-slide">${sl}</section>`).join('')}</div></div>
      <div class="dk-hint">${T('Колесо мыши, ← → или свайп', 'Mouse wheel, ← → or swipe')}</div>
    </div>`,
      mount: (win) => {
        const track = $('.dk-track', win), dots = $$('.dk-map button', win), view = $('.dk-view', win);
        let cur = 0, lock = 0;
        const go = i => {
          cur = Math.max(0, Math.min(slides.length - 1, i));
          track.style.transform = `translateX(${-cur * 100}%)`;
          dots.forEach((d, k) => { d.classList.toggle('on', k === cur); d.classList.toggle('done', k < cur); });
          $$('.dk-slide', win).forEach((sl, k) => sl.classList.toggle('on', k === cur));
        };
        go(0);
        $$('[data-go]', win).forEach(b => b.onclick = () => go(+b.dataset.go));
        view.addEventListener('wheel', e => {
          e.preventDefault();
          const now = Date.now(); if (now < lock) return;
          const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
          if (Math.abs(d) < 8) return;
          lock = now + 650; go(cur + (d > 0 ? 1 : -1));
        }, { passive: false });
        win.addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(cur + 1); if (e.key === 'ArrowLeft') go(cur - 1); });
        win.tabIndex = -1; win.focus({ preventScroll: true });
        let x0 = null;
        view.addEventListener('pointerdown', e => { x0 = e.clientX; });
        view.addEventListener('pointerup', e => { if (x0 !== null && Math.abs(e.clientX - x0) > 60) go(cur + (e.clientX < x0 ? 1 : -1)); x0 = null; });
      } };
  },

  linkedin: () => ({ url: 'linkedin.com/in/arseni-atrokhov', real: LINKS.linkedin, realLabel: T('Открыть в LinkedIn', 'Open on LinkedIn'), html: `<div class="li">
      <div class="li-card"><div class="li-banner" style="background-image:url(assets/li-banner.jpg)"></div>
        <div class="li-top"><div class="li-otw"></div><img class="li-avatar" src="assets/photo.jpg" alt="">
          <div class="li-name">Arseni Atrokhov</div>
          <div class="li-head">Roblox Developer &amp; Game Prototyper | Hire one person, get a studio: I direct AI agents like a dev team | Luau · Roblox Studio</div>
          <div class="li-meta">Gomel, Belarus · <a href="${LINKS.linkedin}" target="_blank" rel="noopener">Contact info</a> · 500+ connections</div>
          <div class="li-otwbox"><b>Open to work</b>Roblox Developer, Game Prototyper, Gameplay Programmer · remote</div>
          <div class="li-btns"><a class="li-btn primary" href="${LINKS.linkedin}" target="_blank" rel="noopener">Connect</a><a class="li-btn ghost" href="${LINKS.linkedin}" target="_blank" rel="noopener">Message</a></div>
        </div></div>
      <div class="li-card li-sec"><h3>About</h3><p><b>Hire one person. Get a studio.</b><br>I design Roblox games, direct a crew of AI agents (Claude Code, Codex) like a dev team, review every line and playtest every build — and ship. How I make games: Teardown → Spec → Agents build → Playtest → Store art → Ship. 100+ playable prototypes, 600+ game teardowns, 13,000+ Luau lessons taught.</p></div>
      <div class="li-card li-sec"><h3>Featured</h3><div class="li-feat">
        <a href="#studio" data-open="studio"><img src="assets/og.jpg" alt=""><div>How I make games · 6 levels</div></a>
        <a href="#reel" data-open="reel"><img src="video/showreel-poster.jpg" alt=""><div>Showreel · 3 Roblox games</div></a>
        <a href="#roblox" data-open="roblox"><img src="assets/kit/knife/key-knife-size-s.jpg" alt=""><div>Case files · decisions, not stats</div></a></div></div>
      <div class="li-card li-sec"><h3>Experience</h3>
        <div class="li-exp"><div class="li-logo" style="background:#5b2bd1">GS</div><div><b>Game Designer &amp; AI Prototyper</b><span>Independent Game Studio · Contract</span><span>Jul 2026 – Oct 2026 · Remote</span><em>Game research, prototype specs, AI-assisted browser builds, playtests and QA; a redesigned loop and playable prototype for a live Roblox game.</em></div></div>
        <div class="li-exp"><div class="li-logo" style="background:#e0901a">UI</div><div><b>UI/UX Designer — Mobile &amp; Game Interfaces</b><span>Freelance · Self-employed</span><span>Oct 2021 – Jul 2026</span><em>Paid Figma work: mobile game and app interfaces, user flows, screen states.</em></div></div>
        <div class="li-exp"><div class="li-logo" style="background:#1279c9">IT</div><div><b>Roblox Studio &amp; Luau Instructor</b><span>Itgenio · Part-time</span><span>Dec 2019 – Jul 2026 · Remote</span><em>Gameplay systems, RemoteEvents, DataStore, NPC behaviour, GUI and live debugging.</em></div></div>
      </div>
      <div class="li-card li-sec"><h3>Education</h3><div class="li-exp"><div class="li-logo" style="background:#333">GSU</div><div><b>Francisk Skorina Gomel State University</b><span>Mathematics · 2017 – 2021</span></div></div></div>
    </div>` }),

  github: () => ({ url: 'github.com/CondrusArsen', real: LINKS.github, realLabel: T('Открыть на GitHub', 'Open on GitHub'), html: `<div class="ghx">
      <header class="ghx-top"><svg viewBox="0 0 24 24" class="ghx-logo">${GLYPH.github}</svg><b>CondrusArsen</b><div class="ghx-search">Type <kbd>/</kbd> to search</div></header>
      <nav class="ghx-tabs"><button class="on" data-tab="overview">Overview</button><button data-tab="repos">Repositories <span data-gh="count">16</span></button><button>Projects</button><button>Packages</button><button>Stars</button></nav>
      <div class="ghx-body">
        <aside class="ghx-side"><img class="ghx-avatar" src="https://github.com/CondrusArsen.png?size=460" onerror="this.src='assets/photo.jpg'" alt="">
          <h2>Arseni Atrokhov</h2><div class="ghx-login">CondrusArsen</div>
          <p data-gh="bio">Roblox developer &amp; game prototyper | Luau, HTML5, AI-assisted development</p>
          <a class="ghx-follow" href="${LINKS.github}" target="_blank" rel="noopener">Follow</a>
          <ul class="ghx-meta"><li>📍 Gomel, Belarus · Remote</li><li>🔗 <a href="${LINKS.arcade}" target="_blank" rel="noopener">condrusarsen.github.io</a></li><li>in <a href="${LINKS.linkedin}" target="_blank" rel="noopener">in/arseni-atrokhov</a></li></ul>
        </aside>
        <section class="ghx-main" data-pane="overview">
          <div class="ghx-readme"><div class="ghx-readme-h">CondrusArsen / README<span>.md</span></div><article class="markdown-body" data-gh="readme"><p style="color:#8d96a0">${T('Загружаю README…', 'Loading README…')}</p></article></div>
          <h3 class="ghx-h3">Pinned <span class="gh-live" data-gh="live"></span></h3>
          <div class="gh-pins" data-gh="pins"></div>
          <h3 class="ghx-h3" data-gh="contrib-title">Contribution activity</h3>
          <div class="ghx-graph" data-gh="graph"></div>
        </section>
        <section class="ghx-main" data-pane="repos" hidden><div class="ghx-repos" data-gh="repos-list"></div></section>
      </div></div>`, mount: mountGitHub }),

  roblox: (opts = {}) => {
    const game = ROBLOX.find(g => g.id === opts.game) || ROBLOX[0];
    const media = [...(game.video ? [{ video: game.video, poster: game.poster, thumb: game.shots[0].thumb, kind: 'real' }] : []), ...game.shots];
    return { html: `<div class="rbx2">
      ${ribbonHTML('one')}
      <div class="rbx-tabs">${ROBLOX.map(g => `<button class="rbx-tab ${g.id === game.id ? 'on' : ''}" data-game="${g.id}"><img src="${g.icon}" alt="">${g.title}</button>`).join('')}</div>
      <div class="rbx-page" data-anim>
        <div class="rbx-media">
          <div class="rbx-stage">${media.map((m, i) => m.video
            ? `<video class="rbx-slide ${i ? '' : 'on'}" src="${m.video}" poster="${m.poster}" muted loop playsinline ${i ? '' : 'autoplay'} data-kind="real"></video>`
            : `<img class="rbx-slide ${i ? '' : 'on'}" src="${m.src}" alt="" data-kind="${m.kind}" loading="lazy">`).join('')}<span class="rbx-kind k-${media[0].kind}">${game.video ? T('Трейлер', 'Trailer') : KIND_LABEL[media[0].kind]}</span></div>
          <div class="rbx-strip">${media.map((m, i) => `<button class="${i ? '' : 'on'} k-${m.kind}" data-slide="${i}"><img src="${m.thumb}" alt="" loading="lazy">${m.video ? '<i>▶</i>' : ''}</button>`).join('')}</div>
        </div>
        <aside class="rbx-info">
          <div class="rbx-id"><img src="${game.icon}" alt=""><div><h2>${game.title}</h2><span>by Zombie Lake Games</span></div></div>
          <span class="stamp ${game.stamp[0]}">${game.stamp[1]}</span>
          <p>${game.text}</p>
          ${game.note ? `<p class="rbx-note">${game.note}</p>` : ''}
          <a class="btn btn-play" href="${game.url}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>${T('Играть на Roblox', 'Play on Roblox')}</a>
          <div class="section-t">${T('Мои решения', 'My calls')}</div>
          <ul class="rbx-calls">${game.decisions.map(r => `<li>${r}</li>`).join('')}</ul>

          <div class="chips">${game.tech.map(t => `<span>${t}</span>`).join('')}</div>
        </aside>
      </div></div>`,
      mount: (win) => {
        $$('.rbx-tab, .rb-shot', win).forEach(b => b.onclick = () => openApp('roblox', { game: b.dataset.game, replace: true }));
        const slides = $$('.rbx-slide', win), dots = $$('[data-slide]', win);
        let current = 0, timer;
        const show = i => {
          slides[current].classList.remove('on'); dots[current].classList.remove('on');
          if (slides[current].tagName === 'VIDEO') slides[current].pause();
          current = (i + slides.length) % slides.length;
          slides[current].classList.add('on'); dots[current].classList.add('on');
          if (slides[current].tagName === 'VIDEO') slides[current].play();
          const kind = slides[current].dataset.kind, lab = $('.rbx-kind', win);
          lab.className = `rbx-kind k-${kind}`; lab.textContent = slides[current].tagName === 'VIDEO' ? T('Трейлер', 'Trailer') : KIND_LABEL[kind];
          dots[current].scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
        };
        const auto = () => { clearInterval(timer); timer = setInterval(() => { if (!win.isConnected) return clearInterval(timer); if (slides[current].tagName !== 'VIDEO') show(current + 1); }, 3800); };
        dots.forEach(d => d.onclick = () => { show(+d.dataset.slide); auto(); });
        slides.forEach(v => { if (v.tagName === 'VIDEO') v.addEventListener('ended', () => show(current + 1)); });
        // Видео крутится 14 секунд, потом галерея листается сама.
        setTimeout(() => { if (win.isConnected && slides[current].tagName === 'VIDEO') show(1); auto(); }, game.video ? 14000 : 0);
      } };
  },

  arcade: () => ({ real: LINKS.arcade, realLabel: T('Вся аркада · 83', 'Full arcade · 83'), html: `<div class="arcade">
      <div class="arcade-head"><div><h2>${T('Аркада', 'Arcade')}</h2><p>${T('83 браузерные игры, собранные с ИИ-агентами. Отмеченные «Играть» запускаются прямо здесь, в окне.', '83 browser games built with AI agents. Games marked "Play" run right here in the window.')}</p></div></div>
      <div class="carts">${GAMES.map(g => `<button class="cart" data-game="${g.id}">${g.local ? `<span class="play">${T('▶ Играть', '▶ Play')}</span>` : ''}<img src="assets/covers/${g.id}.jpg" alt=""><b>${g.title}</b><span>${g.note}</span></button>`).join('')}</div></div>`,
    mount: (win) => $$('.cart', win).forEach(b => b.onclick = () => {
      const game = GAMES.find(g => g.id === b.dataset.game);
      if (game.local) openGame(game); else window.open(LINKS.arcade, '_blank', 'noopener');
    }) }),

  reel: () => ({ html: `<div class="player"><video src="video/showreel.mp4" controls autoplay muted playsinline poster="video/showreel-poster.jpg"></video></div>` }),

  cv: () => ({ html: `<div class="cvtabs">${CVS.map(([f, label], i) => `<button data-cv="${f}" class="${i ? '' : 'on'}">${label}</button>`).join('')}<a class="btn" style="margin-left:auto;padding:5px 12px" data-dl href="cv/${CVS[0][0]}" download>${T('⬇ Скачать', '⬇ Download')}</a></div><iframe class="cvframe" src="cv/${CVS[0][0]}#view=FitH" title="${T('Резюме', 'CV')}"></iframe>`,
    mount: (win) => $$('[data-cv]', win).forEach(b => b.onclick = () => {
      $$('[data-cv]', win).forEach(x => x.classList.toggle('on', x === b));
      $('.cvframe', win).src = `cv/${b.dataset.cv}#view=FitH`; $('[data-dl]', win).href = `cv/${b.dataset.cv}`;
    }) }),

  lib: () => ({ real: LINKS.list, realLabel: T('Все 69 разборов', 'All 69 teardowns'), html: `<div class="lib">
      <div class="arcade-head"><div><h2>${T('Разборы', 'Teardowns')}</h2><p>${T('69 разборов игр: игровой цикл, первая сессия, экономика, удержание. 17 — хиты Roblox.', '69 game teardowns: core loop, first session, economy, retention. 17 of them are Roblox hits.')}</p></div></div>
      <div class="lib-grid">${['doors', 'dead-rails', '99-nights-in-the-forest', 'natural-disaster-survival', 'creatures-of-sonaria', 'catch-a-brainrot'].map(id => `<a class="book" href="${LINKS.list}" target="_blank" rel="noopener"><img src="assets/td/${id}.jpg" alt=""><div>${id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div></a>`).join('')}
        <a class="book" href="https://github.com/CondrusArsen/match3-game-design-case-study" target="_blank" rel="noopener"><img src="assets/match3.jpg" alt=""><div>${T('Match-3 кейс', 'Match-3 case study')}</div></a></div></div>` }),

  term: () => ({ html: `<div class="term" data-term><div data-out></div><label class="term-in"><span class="p">arseni@condrus:~$</span><input data-in autocomplete="off" spellcheck="false" aria-label="${T('Команда', 'Command')}"></label></div>`, mount: mountTerminal }),

  contact: () => ({ html: `<div class="ct" data-stagger>
      <header class="ct-head"><div class="ct-photo"><img src="assets/photo.jpg" alt=""><i></i></div>
        <div><h2>${T('Давай работать', 'Let\'s work together')}</h2><div class="ct-sub">${T('Арсений Атрохов', 'Arseni Atrokhov')} · Roblox Developer &amp; Game Prototyper</div>
        <div class="ct-live"><span class="ct-dot"></span><span data-ct="time">${T('Гомель', 'Gomel')}</span></div></div></header>
      <div class="ct-main">
        <a class="ct-tg" href="${LINKS.telegram}" target="_blank" rel="noopener">
          <div class="ct-tg-txt"><span class="ct-k">${T('Самый быстрый способ', 'The fastest way')}</span><b>Telegram</b><span class="ct-nick">@qintin</span>
            <span class="ct-tg-go">${T('Написать ↗', 'Message me ↗')}</span></div>
          <div class="ct-qr"><img src="assets/qr-telegram.svg" alt="${T('QR-код на t.me/qintin', 'QR code for t.me/qintin')}"><span>${T('с телефона', 'scan with phone')}</span></div>
        </a>
        <button class="ct-copy" data-copy="@qintin"><svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" fill="none" stroke="currentColor" stroke-width="2"/></svg><span>${T('Скопировать @qintin', 'Copy @qintin')}</span></button>
      </div>
      <div class="ct-quick"><div class="section-t">${T('Написать в один клик', 'Message in one click')}</div>
        <div class="ct-chips">${T([['💼 Есть вакансия', 'Здравствуйте, Арсений! У нас открыта вакансия Roblox-разработчика (удалённо). Можно обсудить?'],
           ['🧪 Предложить тестовое', 'Здравствуйте, Арсений! Посмотрели ваше портфолио CondrusOS. Готовы прислать тестовое задание — удобно?'],
           ['🎮 Обсудить проект', 'Привет! Есть идея Roblox-игры / прототипа, хотим обсудить сроки и формат работы.']],
          [['💼 We have a job', 'Hello Arseni! We have an open Roblox developer position (remote). Can we talk about it?'],
           ['🧪 Send a test task', 'Hello Arseni! We looked at your CondrusOS portfolio. We are ready to send you a test task. Is that OK?'],
           ['🎮 Discuss a project', 'Hi! We have an idea for a Roblox game or prototype. We would like to talk about the timeline and how to work together.']])
          .map(([t, m]) => `<button class="ct-chip" data-msg="${esc(m)}">${t}</button>`).join('')}</div>
        <p class="ct-hint">${T('Текст скопируется, Telegram откроется сам — останется вставить.', 'The text is copied and Telegram opens. You only need to paste it.')}</p></div>
      <div class="ct-grid">
        <a href="${LINKS.linkedin}" target="_blank" rel="noopener">${icon('linkedin')}<b>LinkedIn</b><span>arseni-atrokhov</span></a>
        <a href="${LINKS.github}" target="_blank" rel="noopener">${icon('github')}<b>GitHub</b><span>CondrusArsen</span></a>
        <button data-open="cv">${icon('cv')}<b>${T('Резюме', 'CV')}</b><span>${T('4 версии, PDF', '4 versions, PDF')}</span></button>
        <a href="https://www.roblox.com/users/3638923507/profile" target="_blank" rel="noopener">${icon('roblox')}<b>Roblox</b><span>${T('игры и группа', 'games and group')}</span></a>
      </div>
      <div class="ct-look"><span>${T('Ищу:', 'Looking for:')}</span><i>Roblox Developer</i><i>Game Prototyper</i><i>Gameplay Programmer</i><i>${T('удалённо', 'remote')}</i><i>${T('полный день', 'full-time')}</i></div>
    </div>`, mount: mountContact }),
};

// «Связаться»: живое время в Гомеле, копирование ника и готовых сообщений.
function toast(text) {
  const t = $('#toast'); t.textContent = text; t.hidden = false;
  t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => { t.classList.remove('show'); setTimeout(() => { t.hidden = true; }, 300); }, 2600);
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const area = document.createElement('textarea'); area.value = text; document.body.append(area); area.select();
    const ok = document.execCommand('copy'); area.parentNode.removeChild(area); return ok;
  }
}
function mountContact(win) {
  const tick = () => {
    if (!win.isConnected) return clearInterval(timer);
    const now = new Date();
    const time = now.toLocaleTimeString(LANG, { timeZone: 'Europe/Minsk', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    const h = +now.toLocaleString('en', { timeZone: 'Europe/Minsk', hour: 'numeric', hourCycle: 'h23' });
    const awake = h >= 9 && h < 23;
    $('[data-ct=time]', win).textContent = T(`В Гомеле ${time} · ${awake ? 'на связи, отвечу сегодня' : 'сплю — отвечу утром'}`,
      `Gomel time ${time} · ${awake ? 'on-line, I\'ll reply today' : 'asleep — I\'ll reply in the morning'}`);
    $('.ct-dot', win).classList.toggle('sleep', !awake);
  };
  const timer = setInterval(tick, 15000); tick();
  $$('[data-copy]', win).forEach(b => b.onclick = async () => {
    if (await copyText(b.dataset.copy)) { toast(T('Скопировано: @qintin', 'Copied: @qintin')); b.classList.add('done'); setTimeout(() => b.classList.toggle('done', false), 1400); }
  });
  $$('[data-msg]', win).forEach(b => b.onclick = async () => {
    await copyText(b.dataset.msg); toast(T('Текст скопирован — вставь в Telegram', 'Text copied — paste it in Telegram'));
    setTimeout(() => window.open(LINKS.telegram, '_blank', 'noopener'), 600);
  });
}

// GitHub: подтягиваем живые описания и даты репозиториев через публичный API.
const PINS = ['ai-game-lab', 'roblox-feature-pack', 'arcane-orchard-rpg', 'ai-agent-demo', 'match3-game-design-case-study', 'playable-ads-demo'];
const PIN_FALLBACK = {
  'ai-game-lab': ['AI Game Market: 83 browser games, 69 teardowns, Roblox projects', 'HTML'],
  'roblox-feature-pack': ['Server-authoritative Luau systems, persistence, Rojo and checks', 'Luau'],
  'arcane-orchard-rpg': ['Roblox RPG: magic combat, NPC pathfinding, DataStore', 'Luau'],
  'ai-agent-demo': ['Telegram AI agent: tool calling, CRM and RAG over docs', 'Python'],
  'match3-game-design-case-study': ['Match-3 early-game analysis, obstacles and an event', 'Design'],
  'playable-ads-demo': ['HTML5 playable ads (MRAID 2.0, single-file)', 'HTML'],
};
const LANG_COLOR = { Luau: '#00a2ff', Lua: '#000080', HTML: '#e34c26', Python: '#3572A5', JavaScript: '#f1e05a', Design: '#a371f7' };
function renderPins(win, data) {
  $('[data-gh=pins]', win).innerHTML = PINS.map(name => {
    const repo = data?.[name], [desc, lang] = PIN_FALLBACK[name];
    const language = repo?.language || lang;
    return `<a class="gh-pin" href="${LINKS.github}/${name}" target="_blank" rel="noopener"><b>${name}</b><p>${esc(repo?.description || desc)}</p><span class="lang"><i style="background:${LANG_COLOR[language] || '#8d96a0'}"></i>${language}${repo ? ` · ${T('обновлён', 'updated')} ${new Date(repo.pushed_at).toLocaleDateString(LOCALE)}` : ''}</span></a>`;
  }).join('');
}
function renderGraph(win, data) {
  // Настоящий календарь вкладов GitHub (снимается tools/gh_contrib.py в assets/gh/contrib.json).
  const days = data?.days || {};
  const today = new Date(); const start = new Date(today); start.setDate(start.getDate() - 364 - start.getDay());
  let cells = '', months = '';
  const max = Math.max(1, ...Object.values(days));
  for (let w = 0; w < 53; w++) {
    const first = new Date(start); first.setDate(first.getDate() + w * 7);
    if (first.getDate() <= 7 && w < 52) months += `<span style="grid-column:${w + 1}/span 4">${first.toLocaleDateString('en', { month: 'short' })}</span>`;
    for (let d = 0; d < 7; d++) {
      const day = new Date(start); day.setDate(day.getDate() + w * 7 + d);
      if (day > today) continue;
      const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
      const c = days[key] || 0;
      const lvl = c === 0 ? 0 : Math.min(4, 1 + Math.floor((c / max) * 3.999));
      cells += `<i class="l${lvl}" style="grid-column:${w + 1};grid-row:${d + 1};animation-delay:${(w * 7 + d) * 2}ms" title="${c} contribution${c === 1 ? '' : 's'} on ${day.toDateString()}"></i>`;
    }
  }
  $('[data-gh=graph]', win).innerHTML = `<div class="ghx-months">${months}</div><div class="ghx-cells">${cells}</div><div class="ghx-legend">Less <i class="l0"></i><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i> More</div>`;
  $('[data-gh=contrib-title]', win).textContent = data ? `${data.total} contributions in the last year` : 'Contribution activity';
}
function renderRepos(win, repos) {
  $('[data-gh=repos-list]', win).innerHTML = repos.sort((a, b) => b.pushed_at.localeCompare(a.pushed_at)).map(r =>
    `<a class="ghx-repo" href="${r.html_url}" target="_blank" rel="noopener"><div><b>${r.name}</b><span class="ghx-pub">Public</span></div><p>${esc(r.description || '')}</p>
      <span class="lang">${r.language ? `<i style="background:${LANG_COLOR[r.language] || '#8d96a0'}"></i>${r.language} · ` : ''}Updated ${new Date(r.pushed_at).toLocaleDateString('en', { day: 'numeric', month: 'short' })}</span></a>`).join('');
}
async function mountGitHub(win) {
  renderPins(win, null);
  $$('[data-tab]', win).forEach(b => b.onclick = () => {
    $$('[data-tab]', win).forEach(x => x.classList.toggle('on', x === b));
    $$('[data-pane]', win).forEach(p => { p.hidden = p.dataset.pane !== b.dataset.tab; });
  });
  // README — тот же HTML, что GitHub рендерит для профиля (assets/gh/readme.html).
  fetch('assets/gh/readme.html').then(r => r.text()).then(html => { $('[data-gh=readme]', win).innerHTML = html; }).catch(() => {});
  fetch('assets/gh/contrib.json').then(r => r.json()).then(d => renderGraph(win, d)).catch(() => renderGraph(win, null));
  try {
    const [user, repos] = await Promise.all([
      fetch('https://api.github.com/users/CondrusArsen').then(r => r.ok ? r.json() : Promise.reject()),
      fetch('https://api.github.com/users/CondrusArsen/repos?per_page=100').then(r => r.ok ? r.json() : Promise.reject()),
    ]);
    if (user.bio) $('[data-gh=bio]', win).textContent = user.bio;
    $('[data-gh=count]', win).textContent = user.public_repos;
    renderPins(win, Object.fromEntries(repos.map(r => [r.name, r])));
    renderRepos(win, repos);
    $('[data-gh=live]', win).textContent = T('● живые данные с GitHub', '● live data from GitHub');
  } catch {}
}

// Терминал с командами.
const COMMANDS = {
  help: () => T('Команды', 'Commands') + ': <span class="c">whoami</span> · <span class="c">skills</span> · <span class="c">games</span> · <span class="c">play</span> · <span class="c">cv</span> · <span class="c">contact</span> · <span class="c">hire</span> · <span class="c">linkedin</span> · <span class="c">github</span> · <span class="c">clear</span>',
  whoami: () => T('Арсений Атрохов — Roblox Developer &amp; Game Prototyper.<br><span class="m">Гомель, UTC+3 · ищу удалённую работу на полный день.</span>',
    'Arseni Atrokhov — Roblox Developer &amp; Game Prototyper.<br><span class="m">Gomel, UTC+3 · open to remote, full-time roles.</span>'),
  skills: () => 'Luau · Roblox Studio · DataStore/ProfileStore · Rojo · HTML5/Canvas · Three.js · Python · Figma · Claude Code · Codex',
  games: () => ROBLOX.map(g => `▸ <a href="${g.url}" target="_blank" rel="noopener">${g.title}</a> <span class="m">— ${g.tag}</span>`).join('<br>'),
  play: () => { openGame(GAMES[0]); return T('Запускаю Breaking Storm Live…', 'Starting Breaking Storm Live…'); },
  cv: () => { openApp('cv'); return T('Открываю резюме…', 'Opening the CV…'); },
  contact: () => `Telegram: <a href="${LINKS.telegram}" target="_blank" rel="noopener">@qintin</a> · LinkedIn: <a href="${LINKS.linkedin}" target="_blank" rel="noopener">arseni-atrokhov</a>`,
  linkedin: () => { openApp('linkedin'); return T('Открываю LinkedIn…', 'Opening LinkedIn…'); },
  github: () => { openApp('github'); return T('Открываю GitHub…', 'Opening GitHub…'); },
  hire: () => T('<span class="c">✔ Отличный выбор.</span> Пиши в Telegram: <a href="https://t.me/qintin" target="_blank" rel="noopener">@qintin</a> — отвечу в течение дня.',
    '<span class="c">✔ Great choice.</span> Write to me in Telegram: <a href="https://t.me/qintin" target="_blank" rel="noopener">@qintin</a>. I reply within a day.'),
  'sudo hire arseni': () => T('<span class="c">[sudo] доступ разрешён.</span> Оффер отправлен в Telegram @qintin 😉', '<span class="c">[sudo] access granted.</span> The offer was sent to Telegram @qintin 😉'),
};
function mountTerminal(win) {
  const out = $('[data-out]', win), input = $('[data-in]', win);
  const print = html => { out.insertAdjacentHTML('beforeend', `<div>${html}</div>`); win.querySelector('.content').scrollTop = 1e6; };
  const run = cmd => {
    print(`<span class="p">arseni@condrus:~$</span> ${esc(cmd)}`);
    const key = cmd.trim().toLowerCase();
    if (key === 'clear') { out.innerHTML = ''; return; }
    print(COMMANDS[key] ? COMMANDS[key]() : key ? T(`Команда не найдена: ${esc(key)}. Набери <span class="c">help</span>.`, `Command not found: ${esc(key)}. Type <span class="c">help</span>.`) : '');
  };
  print(T('<span class="m">CondrusOS terminal · набери help</span>', '<span class="m">CondrusOS terminal · type help</span>'));
  run('whoami');
  input.addEventListener('keydown', e => { if (e.key === 'Enter') { run(input.value); input.value = ''; } });
  win.addEventListener('pointerup', () => input.focus());
  setTimeout(() => input.focus(), 300);
}

// ---------- Окна ----------
let z = 20, cascade = 0;
const open = new Map();
const narrow = () => innerWidth <= 760;
// Обои чуть следуют за курсором — рабочий стол «дышит».
if (matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let raf = 0;
  addEventListener('pointermove', e => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0; const w = $('.wallpaper');
      w.style.setProperty('--px', (e.clientX / innerWidth - .5).toFixed(3));
      w.style.setProperty('--py', (e.clientY / innerHeight - .5).toFixed(3));
    });
  });
}

function dockRect(id) {
  const el = $(`.dock-item[data-app="${id}"]`) || $('.dock');
  return el.getBoundingClientRect();
}
function focusWin(win) {
  $$('.win').forEach(w => w.classList.toggle('focused', w === win));
  win.style.zIndex = ++z;
}
function createWindow(key, { title, appId, w, h, url, real, realLabel, html, origin }) {
  const win = document.createElement('section');
  win.className = 'win';
  win.dataset.key = key;
  const vw = innerWidth, vh = innerHeight;
  const width = Math.min(w, vw - 40), height = Math.min(h, vh - 34 - 120);
  const left = Math.max(12, (vw - width) / 2 + (cascade % 5) * 26 - 52), top = Math.max(46, (vh - height) / 2 - 30 + (cascade % 5) * 22);
  cascade++;
  Object.assign(win.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
  if (origin) { win.style.setProperty('--ox', `${origin.x - left}px`); win.style.setProperty('--oy', `${origin.y - top}px`); }
  win.innerHTML = `<div class="titlebar"><div class="lights"><button class="l-close" aria-label="${T('Закрыть', 'Close')}"><span>×</span></button><button class="l-min" aria-label="${T('Свернуть', 'Minimize')}"><span>–</span></button><button class="l-max" aria-label="${T('Развернуть', 'Maximize')}"><span>+</span></button></div>
      ${url ? `<div class="urlbar"><svg viewBox="0 0 24 24"><path d="M7 11V8a5 5 0 0 1 10 0v3" fill="none" stroke="currentColor" stroke-width="2"/><rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor"/></svg>${url}</div>` : `<div class="t-title">${icon(appId)}${esc(title)}</div>`}
      <div class="t-actions">${real ? `<a class="btn ${appId === 'linkedin' ? 'btn-blue' : ''}" href="${real}" target="_blank" rel="noopener">${realLabel} ↗</a>` : ''}</div></div>
    <div class="content">${html}</div>`;
  $('#windows').append(win);
  stagger(win);
  focusWin(win);
  win.addEventListener('pointerdown', () => focusWin(win));
  $('.l-close', win).onclick = e => { e.stopPropagation(); closeWin(key); };
  $('.l-min', win).onclick = e => { e.stopPropagation(); minimizeWin(key); };
  $('.l-max', win).onclick = e => { e.stopPropagation(); win.classList.toggle('maximized'); };
  $('.titlebar', win).addEventListener('dblclick', () => win.classList.toggle('maximized'));
  drag(win);
  return win;
}
// Содержимое окна появляется лесенкой: каждый блок с небольшой задержкой.
function stagger(root) { $$('[data-stagger]', root).forEach(g => [...g.children].forEach((c, i) => c.style.setProperty('--i', i))); }
function drag(win) {
  const bar = $('.titlebar', win);
  bar.addEventListener('pointerdown', e => {
    if (narrow() || e.target.closest('button, a, .urlbar') || win.classList.contains('maximized')) return;
    const sx = e.clientX, sy = e.clientY, ox = win.offsetLeft, oy = win.offsetTop;
    win.classList.add('dragging'); bar.setPointerCapture(e.pointerId);
    const move = ev => {
      win.style.left = `${Math.min(innerWidth - 80, Math.max(-win.offsetWidth + 120, ox + ev.clientX - sx))}px`;
      win.style.top = `${Math.min(innerHeight - 60, Math.max(36, oy + ev.clientY - sy))}px`;
    };
    const up = () => { win.classList.remove('dragging'); bar.removeEventListener('pointermove', move); bar.removeEventListener('pointerup', up); };
    bar.addEventListener('pointermove', move); bar.addEventListener('pointerup', up);
  });
}
function setRunning() {
  $$('.dock-item').forEach(d => d.classList.toggle('running', [...open.keys()].some(k => k.split(':')[0] === d.dataset.app)));
}
function closeWin(key) {
  const win = open.get(key); if (!win) return;
  win.classList.add('closing');
  setTimeout(() => win.remove(), 220);
  open.delete(key); setRunning();
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
}
function minimizeWin(key) {
  const win = open.get(key); if (!win) return;
  const r = dockRect(key.split(':')[0]), wr = win.getBoundingClientRect();
  win.style.setProperty('--dx', `${r.left + r.width / 2 - (wr.left + wr.width / 2)}px`);
  win.style.setProperty('--dy', `${r.top - (wr.top + wr.height / 2)}px`);
  win.classList.add('minimizing');
  setTimeout(() => { win.hidden = true; win.classList.remove('minimizing'); }, 380);
}

function openApp(id, opts = {}) {
  const app = APPS[id]; if (!app) return;
  const existing = open.get(id);
  if (existing && !opts.replace) {
    existing.hidden = false; existing.style.animation = 'none'; void existing.offsetWidth; existing.style.animation = '';
    focusWin(existing); return;
  }
  const view = VIEWS[id](opts);
  if (existing && opts.replace) {
    $('.content', existing).innerHTML = view.html; stagger(existing); view.mount?.(existing); return;
  }
  const r = opts.from || dockRect(id);
  const win = createWindow(id, { title: app.name, appId: id, w: app.w, h: app.h, ...view, origin: { x: r.left + r.width / 2, y: r.top } });
  open.set(id, win);
  view.mount?.(win);
  const dock = $(`.dock-item[data-app="${id}"]`);
  if (dock) { dock.classList.remove('bounce'); void dock.offsetWidth; dock.classList.add('bounce'); }
  setRunning();
}
function openGame(game) {
  const key = `arcade:${game.id}`;
  if (open.has(key)) { const w = open.get(key); w.hidden = false; focusWin(w); return; }
  const win = createWindow(key, {
    title: game.title, appId: 'arcade', w: 1000, h: 680, real: `${LINKS.arcade}games/${game.id}/`, realLabel: T('Открыть отдельно', 'Open separately'),
    html: `<iframe class="gameframe" src="games/${game.id}/index.html" title="${esc(game.title)}" allow="autoplay; fullscreen; gamepad"></iframe>`,
  });
  open.set(key, win); setRunning();
}

// ---------- Рабочий стол, док, виджеты ----------
$('#icons').innerHTML = DESKTOP_ORDER.map(id => `<button class="dicon" data-open="${id}">${icon(id)}<span>${APPS[id].name}</span></button>`).join('');
$('#dock').innerHTML = DOCK_ORDER.map(id => id === 'sep' ? '<span class="dock-sep"></span>' :
  `<button class="dock-item" data-app="${id}" data-open="${id}" aria-label="${APPS[id].name}">${icon(id)}<span class="tip">${APPS[id].name}</span><span class="run"></span></button>`).join('');
$('#widgets').innerHTML = `
  <section class="widget w-now"><div class="w-head"><span>${T('Сейчас делаю', 'Working on')}</span><span>Roblox</span></div><img src="${K}/dice/key-roll-s.jpg" alt="">
    <div class="w-body"><b>Dice &amp; Dash: Roll the World</b><p>${T('Собираю новое ядро: кубик падает на арену и перестраивает карту в одну из шести мини-игр.', 'Building the new core: a die lands on the arena and rebuilds the map into one of six mini-games.')}</p>
      <div style="display:flex;gap:8px"><button class="btn btn-gold" data-open="roblox" data-game="dice">${T('Как устроено', 'How it works')}</button><button class="btn" data-open="studio">${T('Процесс', 'Process')}</button></div></div></section>
  <section class="widget"><div class="w-head"><span>${T('В цифрах', 'By the numbers')}</span></div><div class="w-stats">
    <div><b>3</b><span>${T('игры в Roblox', 'Roblox games')}</span></div><div><b>100+</b><span>${T('прототипов · 83 в аркаде', 'prototypes · 83 public')}</span></div>
    <div><b>600+</b><span>${T('разборов · 69 открыты', 'teardowns · 69 published')}</span></div><div><b>13k+</b><span>${T('уроков по Luau', 'Luau lessons taught')}</span></div></div></section>
  <section class="widget w-log" style="animation-delay:.1s"><div class="w-head"><span>${T('Из журнала разработки', 'From my dev log')}</span><span>Dice &amp; Dash</span></div>
    <div class="log"><div><i class="ok">✓</i>${T('Бросок решает сервер — клиент только показывает кубик', 'Server owns the roll — the client only shows the die')}</div>
      <div><i class="ok">✓</i>${T('«Мешок» граней: без повторов подряд', 'Shuffle bag: no face twice in a row')}</div>
      <div><i class="no">✗</i>${T('Магазин в первые 8 секунд — запрещён ТЗ', 'Shop in the first 8 seconds — banned by spec')}</div>
      <div><i class="ok">✓</i>${T('Плейтест: 7 игроков, раунд 90 с', 'Playtest: 7 players, 90 s round')}</div></div>
    <button class="btn" data-open="studio" style="margin:0 14px 14px">${T('Как я делаю игры →', 'How I make games →')}</button></section>`;

document.addEventListener('click', e => {
  const t = e.target.closest('[data-open]');
  if (!t) return;
  e.preventDefault();
  openApp(t.dataset.open, { game: t.dataset.game, from: t.getBoundingClientRect() });
});

// Увеличение иконок дока под курсором, как в настоящей системе.
const dock = $('#dock');
dock.addEventListener('pointermove', e => {
  if (narrow()) return;
  $$('.dock-item', dock).forEach(item => {
    const r = item.getBoundingClientRect(), d = Math.abs(e.clientX - (r.left + r.width / 2));
    const s = 1 + Math.max(0, 1 - d / 140) * .55;
    item.style.transform = `scale(${s})`; item.style.margin = `0 ${(s - 1) * 14}px`;
  });
});
dock.addEventListener('pointerleave', () => $$('.dock-item', dock).forEach(i => { i.style.transform = ''; i.style.margin = ''; }));

// Часы.
const clock = $('#clock');
const tick = () => { clock.textContent = new Date().toLocaleString(LOCALE, { weekday: 'short', hour: '2-digit', minute: '2-digit' }); };
tick(); setInterval(tick, 20000);

addEventListener('keydown', e => {
  if (e.key === 'Escape') { const top = [...open.entries()].filter(([, w]) => !w.hidden).sort((a, b) => b[1].style.zIndex - a[1].style.zIndex)[0]; if (top) closeWin(top[0]); }
});

// ---------- Язык: статичные тексты и переключатель ----------
// Тексты из index.html подменяются при старте, aria-label ставим из JS.
const STATIC_TEXT = {
  status: T('Открыт к удалённой работе', 'Open to remote, full-time roles'),
  cv: T('Резюме', 'CV'),
  role: 'Roblox Developer · Game Prototyper',
  boot: T('Арсений Атрохов · Roblox Developer & Game Prototyper', 'Arseni Atrokhov · Roblox Developer & Game Prototyper'),
};
$$('[data-i18n]').forEach(el => { el.textContent = STATIC_TEXT[el.dataset.i18n]; });
$('.mb-logo').setAttribute('aria-label', APPS.about.name);
$('#icons').setAttribute('aria-label', T('Иконки рабочего стола', 'Desktop icons'));
$('#dock').setAttribute('aria-label', T('Док', 'Dock'));
document.title = T('Condrus Studio · Арсений Атрохов — Roblox Developer & Game Prototyper', 'Condrus Studio · Arseni Atrokhov — Roblox Developer & Game Prototyper');
$$('#lang b').forEach(b => b.classList.toggle('on', b.dataset.l === LANG));
// Клик: запоминаем выбор, ставим ?lang= (хэш сохраняется) и перезагружаем страницу.
$('#lang').addEventListener('click', () => {
  const next = LANG === 'en' ? 'ru' : 'en';
  store.set('condrus-lang', next);
  const url = new URL(location.href);
  url.searchParams.set('lang', next);
  location.href = url.href;
});

// ---------- Стартовый экран «Выбор команды» ----------
function showSelect() {
  let el = $('#select');
  if (!el) {
    el = document.createElement('div'); el.id = 'select'; el.className = 'select';
    el.innerHTML = `<div class="sel-in">
      <div class="sel-top"><div><div class="sel-k">CONDRUS STUDIO · ${T('ВЫБЕРИ КОМАНДУ', 'SELECT YOUR TEAM')}</div><h1>${SLOGAN.replace('— ', '—<br>').replace('. <em>', '.<br><em>')}</h1></div>
        <p>${T('Я придумываю игру, веду команду ИИ-агентов, проверяю каждую строку и играю в каждую сборку — и довожу Roblox-игры до релиза.', 'I design the game, direct a crew of AI agents, review every line and playtest every build — and ship Roblox games end to end.')}</p></div>
      <div class="sel-cards">${TEAM.map(m => teamCard(m)).join('')}</div>
      <div class="sel-start"><span class="press">▶ PRESS START</span>
        <div class="sel-btns"><button class="btn btn-gold big" data-sel="studio">▶ ${T('Как я делаю игры', 'How I make games')}</button><button class="btn big" data-sel="desktop">${T('Открыть мой компьютер', 'Open my computer')}</button><button class="btn big" data-sel="contact">${T('Нанять', 'Hire me')}</button></div></div>
      <div class="sel-hint">${T('← → выбрать карту · Enter открыть · Esc на рабочий стол', '← → pick a card · Enter to open · Esc for the desktop')}</div></div>`;
    document.body.append(el);
    // Фокус-рамка ходит по картам, как курсор в выборе персонажа.
    $$('.sel-cards .tcard', el).forEach((c, i) => c.addEventListener('pointerenter', () => setFocus(i)));
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-sel], .tcard'); if (!b) return;
      e.stopPropagation();
      const go = b.dataset.sel || b.dataset.open;
      hideSelect(go === 'desktop' ? 'about' : go);
    });
  }
  setFocus(0);
  void el.offsetWidth; el.classList.add('on');
}
let selFocus = 0;
function setFocus(i) {
  const cards = $$('#select .sel-cards .tcard'); if (!cards.length) return;
  selFocus = (i + cards.length) % cards.length;
  cards.forEach((c, k) => c.classList.toggle('focus', k === selFocus));
}
function hideSelect(then) {
  const el = $('#select'); if (!el) return;
  el.classList.remove('on'); el.classList.add('off');
  setTimeout(() => { el.classList.remove('off'); if (then && APPS[then]) openApp(then); }, 420);
}
addEventListener('keydown', e => {
  const el = $('#select'); if (!el || !el.classList.contains('on')) return;
  if (e.key === 'ArrowRight') setFocus(selFocus + 1);
  if (e.key === 'ArrowLeft') setFocus(selFocus - 1);
  if (e.key === 'Enter') { const c = $$('#select .sel-cards .tcard')[selFocus]; hideSelect(selFocus === 0 ? 'studio' : c?.dataset.open || 'studio'); }
  if (e.key === 'Escape') { e.stopImmediatePropagation(); hideSelect('about'); }
}, true);
const mbLogo = $('.mb-logo');
mbLogo.removeAttribute('data-open');
mbLogo.addEventListener('click', () => showSelect());

// ---------- Загрузка ----------
// Глубокие ссылки: …/#linkedin, #arcade, #cv — удобно ставить в профили.
const boot = $('#boot');
const params = new URLSearchParams(location.search);
// Режим снимка для README и баннеров: без загрузки, сразу раскладка окон.
if (params.has('shot')) {
  boot.remove();
  const layout = params.get('shot').split(',');
  layout.forEach(id => id === 'select' ? showSelect() : APPS[id] && openApp(id));
  if (params.has('focus')) openApp(params.get('focus'));
}
const seen = sessionStorage.getItem('condrus-booted') || params.has('shot');
setTimeout(() => {
  boot.classList.add('done');
  sessionStorage.setItem('condrus-booted', '1');
  const hash = location.hash.slice(1);
  if (params.has('shot')) return;
  // Глубокая ссылка — сразу нужное окно; иначе стартовый экран «Выбор команды».
  if (APPS[hash]) openApp(hash);
  else if (hash === 'select' || !sessionStorage.getItem('condrus-selected')) { sessionStorage.setItem('condrus-selected', '1'); showSelect(); }
  else openApp('about');
}, seen ? 250 : 1700);
boot.addEventListener('click', () => boot.classList.add('done'));
addEventListener('hashchange', () => { const id = location.hash.slice(1); if (APPS[id]) openApp(id); });
