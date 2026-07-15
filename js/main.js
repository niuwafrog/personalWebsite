/**
 * Y2K Portfolio — Main JavaScript
 * Author: Steve Mao
 * Era: Windows 2000 / Y2K Aesthetic
 */

(function() {
  'use strict';

  // ============================================
  // 1. CLOCK (Taskbar System Tray)
  // ============================================
  function updateClock() {
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    document.getElementById('clockDisplay').textContent = `${h}:${m} ${ampm}`;
  }
  updateClock();
  setInterval(updateClock, 10000);

  // ============================================
  // 2. START MENU
  // ============================================
  const startBtn = document.getElementById('startBtn');
  const startMenu = document.getElementById('startMenu');

  startBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    startMenu.classList.toggle('open');
  });

  document.addEventListener('click', function(e) {
    if (!startMenu.contains(e.target) && e.target !== startBtn) {
      startMenu.classList.remove('open');
    }
  });

  // Close start menu when clicking an item
  document.querySelectorAll('.start-item').forEach(item => {
    item.addEventListener('click', function() {
      startMenu.classList.remove('open');
    });
  });

  // ============================================
  // 3. TYPEWRITER EFFECT
  // ============================================
  const typewriterEl = document.getElementById('typewriter');
  const phrases = [
    'Full-Stack Developer',
    'UI/UX Enthusiast',
    'Code Artist',
    'Digital Creator',
    'Open Source Lover',
    'AI Explorer'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    const current = phrases[phraseIdx];
    if (!isDeleting) {
      typewriterEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        typeSpeed = 1500; // pause before deleting
      } else {
        typeSpeed = 60 + Math.random() * 60;
      }
    } else {
      typewriterEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 400;
      } else {
        typeSpeed = 30 + Math.random() * 30;
      }
    }
    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // ============================================
  // 4. VISITOR COUNTER ANIMATION
  // ============================================
  const counterEl = document.getElementById('visitorCounter');
  let counterValue = 42;
  setInterval(() => {
    counterValue += Math.floor(Math.random() * 3) + 1;
    counterEl.textContent = String(counterValue).padStart(4, '0');
  }, 4000);

  // ============================================
  // 5. PERSONALITY LOADING BAR
  // ============================================
  const loadingBar = document.getElementById('personalityBar');
  const loadingPct = document.getElementById('personalityPct');
  let loadProgress = 0;

  function animateLoading() {
    if (loadProgress < 100) {
      loadProgress += Math.random() * 8 + 2;
      if (loadProgress > 100) loadProgress = 100;
      loadingBar.style.width = loadProgress + '%';
      loadingPct.textContent = Math.floor(loadProgress) + '%';
      const delay = 200 + Math.random() * 300;
      setTimeout(animateLoading, delay);
    } else {
      // Restart after a pause
      setTimeout(() => {
        loadProgress = 0;
        loadingBar.style.width = '0%';
        loadingPct.textContent = '0%';
        setTimeout(animateLoading, 500);
      }, 3000);
    }
  }
  setTimeout(animateLoading, 1000);

  // ============================================
  // 6. SKILL BAR ANIMATION (on scroll)
  // ============================================
  function animateSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
      const row = fill.closest('.skill-row');
      const pct = parseInt(row.dataset.pct) || 0;
      fill.style.width = pct + '%';
    });
  }

  // Intersection Observer for skill panels
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

  // ============================================
  // 7. PROJECT FILTER
  // ============================================
  const projTabs = document.querySelectorAll('.proj-tab');
  const projContainer = document.getElementById('projContainer');
  const projCards = document.querySelectorAll('.proj-card');

  projTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      projTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter;
      projCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // View toggle (grid/list)
  const viewBtns = document.querySelectorAll('.view-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      viewBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const view = this.dataset.view;
      projContainer.className = 'proj-container ' + view + '-view';
    });
  });

  // ============================================
  // 8. EXPERIENCE TABS
  // ============================================
  const expTabs = document.querySelectorAll('.exp-tab');
  const expPanels = {
    work: document.getElementById('expWork'),
    education: document.getElementById('expEducation')
  };

  expTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      expTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const target = this.dataset.tab;
      Object.values(expPanels).forEach(p => p.classList.remove('active'));
      if (expPanels[target]) expPanels[target].classList.add('active');
    });
  });

  // ============================================
  // 9. WINDOW CONTROLS
  // ============================================
  // Minimize
  document.querySelectorAll('.btn-minimize').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const win = this.closest('.window');
      win.classList.toggle('minimized');
    });
  });

  // Maximize
  document.querySelectorAll('.btn-maximize').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const win = this.closest('.window');
      win.classList.toggle('maximized');
    });
  });

  // Close (hide)
  document.querySelectorAll('.btn-close').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const win = this.closest('.window');
      win.style.display = 'none';
    });
  });

  // Click on title bar text to restore
  document.querySelectorAll('.titlebar-text').forEach(text => {
    text.addEventListener('dblclick', function() {
      const win = this.closest('.window');
      if (win.classList.contains('minimized')) {
        win.classList.remove('minimized');
      } else if (win.classList.contains('maximized')) {
        win.classList.remove('maximized');
      }
    });
  });

  // ============================================
  // 10. CONTACT FORM
  // ============================================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('fName').value.trim();
      const email = document.getElementById('fEmail').value.trim();
      const message = document.getElementById('fMessage').value.trim();

      if (!name || !email || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = '⚠ Error: Please fill in all required fields!';
        return;
      }

      // Simulate sending
      formStatus.className = 'form-status success';
      formStatus.textContent = '✓ Message sent successfully! (Demo mode)';

      // Reset form
      setTimeout(() => {
        contactForm.reset();
        setTimeout(() => {
          formStatus.className = 'form-status';
          formStatus.textContent = '';
        }, 3000);
      }, 1000);
    });
  }

  // ============================================
  // 11. FLOATING NOW PLAYING (Winamp style)
  // ============================================
  const npText = document.getElementById('npText');
  const songList = [
    'Intro.wav',
    'Main_Theme.mp3',
    'Cyberpunk_ Dreams.wav',
    'Neon_Lights.mid',
    'Pixel_Rain.mp3',
    'Chrome_Heart.wav',
    'Dial_Up_Noise.mp3',
    'Y2K_Vibes.mid'
  ];
  let songIdx = 0;

  setInterval(() => {
    songIdx = (songIdx + 1) % songList.length;
    if (npText) npText.textContent = 'Now Playing: ' + songList[songIdx];
  }, 6000);

  // Also update winamp text
  const winampText = document.getElementById('winampText');
  if (winampText) {
    setInterval(() => {
      winampText.textContent = 'PLAYING: ' + songList[songIdx].toUpperCase();
    }, 1000);
  }

  // ============================================
  // 12. TASKBAR ITEM ACTIVATION ON SCROLL
  // ============================================
  const tbItems = document.querySelectorAll('.tb-item');
  const windows = document.querySelectorAll('.window[id]');

  function updateActiveTaskbar() {
    const scrollPos = window.scrollY + 100;
    let activeId = 'home';

    windows.forEach(win => {
      const rect = win.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      if (scrollPos >= absoluteTop) {
        activeId = win.id;
      }
    });

    tbItems.forEach(item => {
      item.classList.remove('active');
      const targetId = item.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
      if (targetId && targetId.includes(activeId)) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveTaskbar);

  // ============================================
  // 13. DESKTOP ICON DOUBLE-CLICK EFFECT
  // ============================================
  document.querySelectorAll('.desk-icon').forEach(icon => {
    icon.addEventListener('dblclick', function() {
      // Scale bounce effect
      this.style.transform = 'scale(0.9)';
      setTimeout(() => { this.style.transform = ''; }, 150);
    });
  });

  // ============================================
  // 14. SMOOTH SCROLL FOR NAVIGATION
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // 15. SEED RANDOM STAR SPARKLES
  // ============================================
  function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✦';
    sparkle.style.cssText = `
      position: fixed;
      pointer-events: none;
      color: #FFD700;
      font-size: ${8 + Math.random() * 12}px;
      text-shadow: 0 0 6px #FFD700;
      z-index: 99999;
      animation: sparkle 1s ease-out forwards;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
    `;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }

  // Add sparkle style if not exists
  if (!document.getElementById('sparkleStyle')) {
    const style = document.createElement('style');
    style.id = 'sparkleStyle';
    style.textContent = `
      @keyframes sparkle {
        0% { opacity: 1; transform: scale(1) translateY(0); }
        100% { opacity: 0; transform: scale(0) translateY(-30px); }
      }
    `;
    document.head.appendChild(style);
  }

  // Generate sparkles periodically
  setInterval(createSparkle, 3000);

  // ============================================
  // 16. KEYBOARD EASTER EGGS
  // ============================================
  let konami = '';
  document.addEventListener('keydown', function(e) {
    konami += e.key;
    konami = konami.slice(-10);
    if (konami.toLowerCase() === 'hollywood') {
      document.querySelectorAll('.window').forEach(win => {
        win.style.transform = 'rotate(' + (Math.random() * 4 - 2) + 'deg)';
      });
      setTimeout(() => {
        document.querySelectorAll('.window').forEach(win => {
          win.style.transform = '';
        });
      }, 2000);
    }
  });

  // ============================================
  // 17. CONSOLE GREETING
  // ============================================
  console.log('%c┌─────────────────────────────┐', 'color: #00FF00');
  console.log('%c│  Welcome to my Y2K Portfolio! │', 'color: #00FF00');
  console.log('%c│  ╔═══╗ ╔═══╗ ╔═══╗ ╔═══╗ ╔═══╗ │', 'color: #FF69B4');
  console.log('%c│  ╚═══╝ ╚═══╝ ╚═══╝ ╚═══╝ ╚═══╝ │', 'color: #FF69B4');
  console.log('%c└─────────────────────────────┘', 'color: #00FF00');
  console.log('%c✦ Built with pure HTML/CSS/JS ✦', 'color: #00FFFF');

})();
