/**
 * RESUME PREVIEW & DOWNLOAD HANDLER
 * Aditya Soni - Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const resumeModal = document.getElementById('resume-modal');
  const resumeModalClose = document.getElementById('resume-modal-close');
  const modalResumeCloseBtn = document.getElementById('modal-resume-close-btn');
  const modalResumePrintBtn = document.getElementById('modal-resume-print-btn');
  
  // Triggers
  const navResumeBtn = document.getElementById('nav-resume-btn');
  const drawerResumeBtn = document.getElementById('drawer-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const downloadResumeBtn = document.getElementById('download-resume-btn');
  const previewResumeModalBtn = document.getElementById('preview-resume-modal-btn');

  function openResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Trigger Print to PDF
  function printResume() {
    if (window.showToast) {
      window.showToast('Preparing ATS Resume for Print/PDF saving...', 'info');
    }
    // Make sure modal is open for print view
    openResumeModal();
    setTimeout(() => {
      window.print();
    }, 300);
  }

  // Direct download button action
  function handleDownloadResume() {
    if (window.showToast) {
      window.showToast('Opening Resume Print / PDF Dialog...', 'success');
    }
    openResumeModal();
    setTimeout(() => {
      window.print();
    }, 400);
  }

  if (previewResumeModalBtn) {
    previewResumeModalBtn.addEventListener('click', openResumeModal);
  }

  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', handleDownloadResume);
  }

  if (heroResumeBtn) {
    heroResumeBtn.addEventListener('click', openResumeModal);
  }

  if (navResumeBtn) {
    navResumeBtn.addEventListener('click', openResumeModal);
  }

  if (drawerResumeBtn) {
    drawerResumeBtn.addEventListener('click', () => {
      const mobileDrawer = document.getElementById('mobile-drawer');
      if (mobileDrawer) mobileDrawer.classList.remove('open');
      openResumeModal();
    });
  }

  if (modalResumePrintBtn) {
    modalResumePrintBtn.addEventListener('click', printResume);
  }

  if (resumeModalClose) {
    resumeModalClose.addEventListener('click', closeResumeModal);
  }

  if (modalResumeCloseBtn) {
    modalResumeCloseBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResumeModal();
      const certModal = document.getElementById('cert-modal');
      if (certModal) certModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
