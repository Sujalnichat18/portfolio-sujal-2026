// =========================================================
// Sujal Nichat — Portfolio JS
// =========================================================
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Theme toggle (dark/light, persisted) ---------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const themeIcon = themeBtn.querySelector('i');

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      themeIcon.className = 'bi bi-moon-stars-fill';
    } else {
      root.removeAttribute('data-theme');
      themeIcon.className = 'bi bi-sun-fill';
    }
  }

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  themeBtn.addEventListener('click', function () {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });

  /* ---------- Typing effect (hero role line) ---------- */
  const roles = [
    'AI & Data Science Undergraduate',
    'Web Developer',
    'Full-Stack Developer (learning)',
    'Building practical digital solutions'
  ];
  const typedEl = document.getElementById('typedRole');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ---------- Active tab highlighting on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const tabItems = document.querySelectorAll('.tab-item');

  function setActiveTab() {
    let currentId = sections[0] ? sections[0].id : '';
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) currentId = sec.id;
    });
    tabItems.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('href') === '#' + currentId);
    });
  }
  setActiveTab();
  window.addEventListener('scroll', setActiveTab, { passive: true });

  // Collapse mobile nav after clicking a tab
  const navCollapseEl = document.getElementById('navTabs');
  tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      if (navCollapseEl.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapseEl).hide();
      }
    });
  });

  /* ---------- Project filter buttons ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  const noProjectsMsg = document.getElementById('noProjectsMsg');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      projectItems.forEach(item => {
        const match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.classList.toggle('filtered-out', !match);
        if (match) visibleCount++;
      });

      noProjectsMsg.classList.toggle('d-none', visibleCount !== 0);
    });
  });

  /* ---------- Copy email button ---------- */
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyLabel = document.getElementById('copyEmailLabel');
  const emailAddress = 'sujalnichat1109@gmail.com';

  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(emailAddress).then(() => {
      copyLabel.textContent = 'Copied!';
      showToast('Email address copied to clipboard');
      setTimeout(() => { copyLabel.textContent = 'Copy email address'; }, 2000);
    }).catch(() => {
      copyLabel.textContent = 'Copy failed — email visible above';
      setTimeout(() => { copyLabel.textContent = 'Copy email address'; }, 2500);
    });
  });

  /* ---------- Toast helper ---------- */
  function showToast(message) {
    let toast = document.querySelector('.toast-copy');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-copy';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => toast.classList.remove('show'), 2200);
  }

  /* ---------- Contact form: Bootstrap validation + mailto ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
      formStatus.textContent = 'Please fix the highlighted fields.';
      return;
    }

    const name = document.getElementById('cfName').value.trim();
    const email = document.getElementById('cfEmail').value.trim();
    const subject = document.getElementById('cfSubject').value.trim();
    const message = document.getElementById('cfMessage').value.trim();

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    formStatus.textContent = 'Opening your email client with this message pre-filled…';
    contactForm.classList.remove('was-validated');
  });

  /* ---------- Back to top ---------- */
  const backToTopBtn = document.getElementById('backToTop');
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
