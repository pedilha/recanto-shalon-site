/* ============================================================
   RECANTO SHALON — Painel Administrativo
   Login · Textos · Carrossel · Configurações
   ============================================================ */

(function () {
  'use strict';

  /* ─── Constantes ──────────────────────────────────────── */
  const DEFAULT_PASS    = 'shalon2025';
  const KEY_PASS        = 'shalon_admin_pass';
  const KEY_TEXTOS      = 'shalon_textos';
  const SESSION_KEY     = 'shalon_session';
  const DB_NAME         = 'shaloncms';
  const DB_VERSION      = 1;
  const STORE           = 'images';

  /* ─── Textos padrão ────────────────────────────────────── */
  const DEFAULTS = {
    heroBadge:   '4,5 · 386 avaliações no Google',
    heroEyebrow: 'Dois espaços · Uma experiência única',
    heroSubtitle:'Transformamos momentos em memórias eternas. Aparecida de Goiânia · GO',
    sobreDesc1:  'O Recanto Shalon nasceu da paixão por criar eventos que ficam na memória. Com dois espaços cuidadosamente projetados para perfis diferentes de celebração, oferecemos estrutura completa, atendimento personalizado e toda a infraestrutura para que você foque apenas em aproveitar cada momento.',
    sobreDesc2:  'Nossa equipe — liderada pela Giselia — é conhecida pela dedicação e atenção aos detalhes desde o primeiro contato até o encerramento do evento.',
    e1Tag:       '🌿 Ao ar livre · Rústico · Piscina',
    e1Desc:      'Um ambiente encantador cercado de natureza, perfeito para quem busca autenticidade e aconchego. Com área arborizada, piscina e charme rústico — ideal para aniversários, confraternizações e celebrações durante o dia.',
    e2Tag:       '✨ Salão climatizado · Formal · Jardim instagramável',
    e2Desc:      'Sofisticação e requinte em cada detalhe. Salão fechado, climatizado e com boa acústica, ideal para cerimônias formais. O jardim instagramável é o cenário perfeito para fotos memoráveis de casamentos, formaturas e festas de 15 anos.',
  };

  /* ═══════════════════════════════════════════════════════
     INDEXEDDB — armazenamento de imagens
  ═══════════════════════════════════════════════════════ */
  let db = null;

  function openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = e => {
        const database = e.target.result;
        if (!database.objectStoreNames.contains(STORE)) {
          const store = database.createObjectStore(STORE, { keyPath: 'id' });
          store.createIndex('carousel', 'carousel', { unique: false });
        }
      };
      req.onsuccess = e => { db = e.target.result; resolve(db); };
      req.onerror   = ()  => reject(req.error);
    });
  }

  function dbGetByCarousel(carouselId) {
    return new Promise((resolve, reject) => {
      if (!db) { resolve([]); return; }
      const tx  = db.transaction(STORE, 'readonly');
      const idx = tx.objectStore(STORE).index('carousel');
      const req = idx.getAll(carouselId);
      req.onsuccess = () => resolve(req.result.sort((a, b) => a.order - b.order));
      req.onerror   = () => reject(req.error);
    });
  }

  function dbPut(item) {
    return new Promise((resolve, reject) => {
      if (!db) { reject(new Error('DB indisponível')); return; }
      const tx  = db.transaction(STORE, 'readwrite');
      const req = tx.objectStore(STORE).put(item);
      req.onsuccess = () => resolve();
      req.onerror   = () => reject(req.error);
    });
  }

  function dbDelete(id) {
    return new Promise((resolve, reject) => {
      if (!db) { resolve(); return; }
      const tx  = db.transaction(STORE, 'readwrite');
      const req = tx.objectStore(STORE).delete(id);
      req.onsuccess = () => resolve();
      req.onerror   = () => reject(req.error);
    });
  }

  function dbClear() {
    return new Promise((resolve, reject) => {
      if (!db) { resolve(); return; }
      const tx  = db.transaction(STORE, 'readwrite');
      const req = tx.objectStore(STORE).clear();
      req.onsuccess = () => resolve();
      req.onerror   = () => reject(req.error);
    });
  }

  /* ═══════════════════════════════════════════════════════
     AUTH
  ═══════════════════════════════════════════════════════ */
  const getPass    = ()  => localStorage.getItem(KEY_PASS) || DEFAULT_PASS;
  const isLoggedIn = ()  => sessionStorage.getItem(SESSION_KEY) === '1';

  function doLogin(password) {
    if (password !== getPass()) return false;
    sessionStorage.setItem(SESSION_KEY, '1');
    return true;
  }

  function doLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    showLoginScreen();
  }

  /* ═══════════════════════════════════════════════════════
     TELAS
  ═══════════════════════════════════════════════════════ */
  const loginScreen = document.getElementById('login-screen');
  const adminPanel  = document.getElementById('admin-panel');

  function showLoginScreen() {
    loginScreen.hidden = false;
    adminPanel.hidden  = true;
  }

  function showAdminPanel() {
    loginScreen.hidden = true;
    adminPanel.hidden  = false;
    loadAll();
  }

  /* ─── Form de login ────────────────────────────────── */
  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    const pwd   = document.getElementById('password').value.trim();
    const error = document.getElementById('login-error');
    if (doLogin(pwd)) {
      error.hidden = true;
      showAdminPanel();
    } else {
      error.hidden = false;
      document.getElementById('password').value = '';
      document.getElementById('password').focus();
    }
  });

  document.getElementById('btn-logout').addEventListener('click', doLogout);

  /* ═══════════════════════════════════════════════════════
     TABS
  ═══════════════════════════════════════════════════════ */
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });

  /* ═══════════════════════════════════════════════════════
     TEXTOS
  ═══════════════════════════════════════════════════════ */
  function loadTextos() {
    const saved = JSON.parse(localStorage.getItem(KEY_TEXTOS) || '{}');
    const data  = { ...DEFAULTS, ...saved };

    document.getElementById('hero-badge').value    = data.heroBadge;
    document.getElementById('hero-eyebrow').value  = data.heroEyebrow;
    document.getElementById('hero-subtitle').value = data.heroSubtitle;
    document.getElementById('sobre-desc1').value   = data.sobreDesc1;
    document.getElementById('sobre-desc2').value   = data.sobreDesc2;
    document.getElementById('e1-tag').value        = data.e1Tag;
    document.getElementById('e1-desc').value       = data.e1Desc;
    document.getElementById('e2-tag').value        = data.e2Tag;
    document.getElementById('e2-desc').value       = data.e2Desc;
  }

  function saveTextos() {
    const data = {
      heroBadge:   document.getElementById('hero-badge').value.trim(),
      heroEyebrow: document.getElementById('hero-eyebrow').value.trim(),
      heroSubtitle:document.getElementById('hero-subtitle').value.trim(),
      sobreDesc1:  document.getElementById('sobre-desc1').value.trim(),
      sobreDesc2:  document.getElementById('sobre-desc2').value.trim(),
      e1Tag:       document.getElementById('e1-tag').value.trim(),
      e1Desc:      document.getElementById('e1-desc').value.trim(),
      e2Tag:       document.getElementById('e2-tag').value.trim(),
      e2Desc:      document.getElementById('e2-desc').value.trim(),
    };
    localStorage.setItem(KEY_TEXTOS, JSON.stringify(data));
    showToast('✓ Textos salvos! Recarregue o site para ver.');
  }

  document.getElementById('save-textos').addEventListener('click', saveTextos);

  /* ═══════════════════════════════════════════════════════
     CARROSSEL — IMAGENS
  ═══════════════════════════════════════════════════════ */
  async function renderGrid(carouselId, gridId) {
    const grid   = document.getElementById(gridId);
    const images = await dbGetByCarousel(carouselId);

    grid.innerHTML = '';

    if (images.length === 0) {
      grid.innerHTML = `
        <p class="empty-state">
          Nenhuma foto adicionada ainda.<br/>
          Clique em <strong>+ Adicionar fotos</strong> para fazer upload do seu dispositivo.
        </p>`;
      return;
    }

    images.forEach(img => {
      const card = document.createElement('div');
      card.className = 'img-card';
      card.innerHTML = `
        <img src="${img.dataURL}" alt="${escHtml(img.name)}" loading="lazy">
        <div class="img-card-footer">
          <input type="text" class="img-caption" value="${escHtml(img.caption || '')}" placeholder="Legenda (opcional)">
        </div>
        <button class="img-delete" aria-label="Remover foto">✕</button>
      `;

      /* Salva legenda ao sair do campo */
      card.querySelector('.img-caption').addEventListener('change', async e => {
        img.caption = e.target.value;
        await dbPut(img);
        showToast('Legenda salva!');
      });

      /* Deleta imagem */
      card.querySelector('.img-delete').addEventListener('click', async () => {
        if (!confirm('Remover esta foto do carrossel?')) return;
        await dbDelete(img.id);
        renderGrid(carouselId, gridId);
        showToast('Foto removida.');
      });

      grid.appendChild(card);
    });
  }

  async function handleUpload(files, carouselId, gridId) {
    if (!files.length) return;
    const existing = await dbGetByCarousel(carouselId);
    let order = existing.length;

    for (const file of files) {
      const raw        = await fileToDataURL(file);
      const compressed = await compressImage(raw, 1400, 0.82);
      await dbPut({
        id:        `${carouselId}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        carousel:  carouselId,
        dataURL:   compressed,
        name:      file.name,
        caption:   '',
        order:     order++,
      });
    }

    await renderGrid(carouselId, gridId);
    showToast(`${files.length} foto${files.length > 1 ? 's adicionadas' : ' adicionada'}!`);
  }

  /* Lê arquivo como DataURL */
  function fileToDataURL(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload  = e => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  /* Comprime imagem via canvas */
  function compressImage(dataURL, maxWidth, quality) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width  = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width  = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = dataURL;
    });
  }

  /* Inputs de upload */
  document.getElementById('upload-c1').addEventListener('change', e => {
    handleUpload(Array.from(e.target.files), 'c1', 'grid-c1');
    e.target.value = '';
  });

  document.getElementById('upload-c2').addEventListener('change', e => {
    handleUpload(Array.from(e.target.files), 'c2', 'grid-c2');
    e.target.value = '';
  });

  /* ═══════════════════════════════════════════════════════
     CONFIGURAÇÕES — Senha
  ═══════════════════════════════════════════════════════ */
  document.getElementById('save-senha').addEventListener('click', () => {
    const atual     = document.getElementById('senha-atual').value;
    const nova      = document.getElementById('senha-nova').value;
    const confirmar = document.getElementById('senha-confirmar').value;
    const msg       = document.getElementById('config-msg');

    const show = (text, type) => {
      msg.textContent  = text;
      msg.className    = `config-msg ${type}`;
      msg.hidden       = false;
    };

    if (atual !== getPass())     return show('❌ Senha atual incorreta.', 'error');
    if (nova.length < 4)         return show('❌ A nova senha deve ter pelo menos 4 caracteres.', 'error');
    if (nova !== confirmar)      return show('❌ As senhas não coincidem.', 'error');

    localStorage.setItem(KEY_PASS, nova);
    document.getElementById('senha-atual').value    = '';
    document.getElementById('senha-nova').value     = '';
    document.getElementById('senha-confirmar').value = '';
    show('✓ Senha alterada com sucesso!', 'success');
  });

  /* ─── Restaurar original ──────────────────────────── */
  document.getElementById('btn-reset').addEventListener('click', async () => {
    if (!confirm('Isso irá apagar TODOS os textos editados e TODAS as fotos do painel. Tem certeza?')) return;
    localStorage.removeItem(KEY_TEXTOS);
    await dbClear();
    loadTextos();
    await renderGrid('c1', 'grid-c1');
    await renderGrid('c2', 'grid-c2');
    showToast('Conteúdo restaurado ao original.');
  });

  /* ═══════════════════════════════════════════════════════
     TOAST
  ═══════════════════════════════════════════════════════ */
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('admin-toast');
    toast.textContent = msg;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  /* ═══════════════════════════════════════════════════════
     UTILS
  ═══════════════════════════════════════════════════════ */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /* ═══════════════════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════════════════ */
  async function loadAll() {
    loadTextos();
    await renderGrid('c1', 'grid-c1');
    await renderGrid('c2', 'grid-c2');
  }

  async function init() {
    try {
      await openDB();
    } catch (e) {
      console.warn('IndexedDB indisponível — upload de fotos desabilitado.', e);
    }
    if (isLoggedIn()) {
      showAdminPanel();
    } else {
      showLoginScreen();
    }
  }

  init();

})();
