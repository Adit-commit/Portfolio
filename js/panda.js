/**
 * LIVE CURSOR-TRACKING PANDA COMPANION
 * Aditya Soni - Portfolio
 *
 * Features:
 * - Eyes dynamically follow the cursor anywhere on screen with trigonometric clamping.
 * - Natural autonomous blinking with eyelids animation.
 * - Smooth position transitions across screen corners/edges as the user scrolls down through sections.
 * - Interactive speech bubble responding to sections & user clicks.
 * - Playful bounce/giggle on click.
 */

document.addEventListener('DOMContentLoaded', () => {
  const panda = document.getElementById('panda-companion');
  const leftPupil = document.getElementById('panda-pupil-left');
  const rightPupil = document.getElementById('panda-pupil-right');
  const speechBubble = document.getElementById('panda-speech');
  const speechText = document.getElementById('panda-speech-text');

  if (!panda || !leftPupil || !rightPupil) return;

  // Max pupil travel radius from eye center (SVG pixels)
  const MAX_PUPIL_RADIUS = 3.5;

  // Section Dialogue Map
  const sectionDialogues = {
    home: "Hi! I'm Koko the Tech Panda 🐼",
    about: "ST. Peter's & Big Ambitions! 🚲",
    skills: "Python + AI/ML Stack! 🚀",
    certification: "Verified AI Foundations! 📜",
    contact: "Let's connect with Aditya! 📬"
  };

  const randomDialogues = [
    "I'm keeping an eye on your cursor! 👀",
    "Aditya loves AI and real startup ideas! 💡",
    "Did you try downloading the AI Certificate? 📜",
    "High five! 🐾",
    "1st year B.Tech and already building! ⚡",
    "Ready to build cool AI projects! 🤖",
    "Cycling + Cinema + Business case studies! 🎬"
  ];

  let currentSection = 'home';
  let speechTimeout = null;

  function showDialogue(text, duration = 3500) {
    if (!speechBubble || !speechText) return;
    speechText.textContent = text;
    speechBubble.classList.add('visible');

    if (speechTimeout) clearTimeout(speechTimeout);
    speechTimeout = setTimeout(() => {
      speechBubble.classList.remove('visible');
    }, duration);
  }

  // Initial greeting
  setTimeout(() => {
    showDialogue(sectionDialogues.home, 4000);
  }, 1200);

  /* ==========================================================================
     1. CURSOR EYE TRACKING
     ========================================================================== */
  function trackEyes(e) {
    // Get cursor coordinates
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Get Eye reference positions in viewport coordinates
    const leftEye = document.getElementById('panda-eye-left-sclera');
    const rightEye = document.getElementById('panda-eye-right-sclera');

    if (leftEye && rightEye) {
      const leftRect = leftEye.getBoundingClientRect();
      const rightRect = rightEye.getBoundingClientRect();

      const leftCenterX = leftRect.left + leftRect.width / 2;
      const leftCenterY = leftRect.top + leftRect.height / 2;

      const rightCenterX = rightRect.left + rightRect.width / 2;
      const rightCenterY = rightRect.top + rightRect.height / 2;

      // Left eye offset
      const dxL = mouseX - leftCenterX;
      const dyL = mouseY - leftCenterY;
      const angleL = Math.atan2(dyL, dxL);
      const distL = Math.min(MAX_PUPIL_RADIUS, Math.hypot(dxL, dyL) / 45);
      const pupilLx = Math.cos(angleL) * distL;
      const pupilLy = Math.sin(angleL) * distL;
      leftPupil.style.transform = `translate(${pupilLx}px, ${pupilLy}px)`;

      // Right eye offset
      const dxR = mouseX - rightCenterX;
      const dyR = mouseY - rightCenterY;
      const angleR = Math.atan2(dyR, dxR);
      const distR = Math.min(MAX_PUPIL_RADIUS, Math.hypot(dxR, dyR) / 45);
      const pupilRx = Math.cos(angleR) * distR;
      const pupilRy = Math.sin(angleR) * distR;
      rightPupil.style.transform = `translate(${pupilRx}px, ${pupilRy}px)`;

      // Subtle body/head tilt toward cursor
      const pandaRect = panda.getBoundingClientRect();
      const pandaCenterX = pandaRect.left + pandaRect.width / 2;
      const tilt = Math.max(-8, Math.min(8, (mouseX - pandaCenterX) / 60));
      panda.style.setProperty('--panda-tilt', `${tilt}deg`);
    }
  }

  window.addEventListener('mousemove', trackEyes, { passive: true });

  /* ==========================================================================
     2. SMOOTH POSITION SHIFT AS USER SCROLLS DOWN
     ========================================================================== */
  const sections = ['home', 'about', 'skills', 'certification', 'contact'];

  function updatePandaPosition() {
    const scrollPosition = window.scrollY + window.innerHeight * 0.45;
    let activeSec = 'home';

    for (const secId of sections) {
      const el = document.getElementById(secId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          activeSec = secId;
          break;
        }
      }
    }

    if (activeSec !== currentSection) {
      // Remove old position classes
      sections.forEach((s) => panda.classList.remove(`pos-${s}`));
      // Add new position class
      panda.classList.add(`pos-${activeSec}`);
      currentSection = activeSec;

      // Pop dialogue for the section
      if (sectionDialogues[activeSec]) {
        showDialogue(sectionDialogues[activeSec], 3500);
      }
    }
  }

  // Set initial position
  panda.classList.add('pos-home');
  window.addEventListener('scroll', updatePandaPosition, { passive: true });

  /* ==========================================================================
     3. INTERACTIVE CLICK / PANDA GIGGLE
     ========================================================================== */
  panda.addEventListener('click', () => {
    // Jump/bounce animation
    panda.classList.add('panda-jump');
    setTimeout(() => {
      panda.classList.remove('panda-jump');
    }, 600);

    // Pick random cute quote
    const randomPick = randomDialogues[Math.floor(Math.random() * randomDialogues.length)];
    showDialogue(randomPick, 4000);
  });

  /* ==========================================================================
     4. AUTONOMOUS BLINKING
     ========================================================================== */
  function triggerBlink() {
    const eyelids = document.querySelectorAll('.panda-eyelid');
    eyelids.forEach((lid) => lid.classList.add('blinking'));

    setTimeout(() => {
      eyelids.forEach((lid) => lid.classList.remove('blinking'));
    }, 180);

    // Schedule next blink randomly between 3s and 6.5s
    const nextBlink = Math.random() * 3500 + 3000;
    setTimeout(triggerBlink, nextBlink);
  }

  setTimeout(triggerBlink, 3000);
});
