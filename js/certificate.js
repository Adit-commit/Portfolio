/**
 * AI CERTIFICATE GENERATOR & DOWNLOADER
 * Aditya Soni - Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const downloadCertBtn = document.getElementById('download-cert-btn');
  const viewCertModalBtn = document.getElementById('view-cert-modal-btn');
  const certModal = document.getElementById('cert-modal');
  const certModalClose = document.getElementById('cert-modal-close');
  const modalCertCloseBtn = document.getElementById('modal-cert-close-btn');
  const modalCertDownloadBtn = document.getElementById('modal-cert-download-btn');
  const certModalContent = document.getElementById('cert-modal-content');
  const certSource = document.getElementById('cert-printable-area');

  // Open Fullscreen Certificate Modal
  function openCertModal() {
    if (!certModal || !certSource) return;
    certModalContent.innerHTML = '';
    const clone = certSource.cloneNode(true);
    clone.id = 'modal-cert-clone';
    certModalContent.appendChild(clone);
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close Certificate Modal
  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (viewCertModalBtn) {
    viewCertModalBtn.addEventListener('click', openCertModal);
  }

  if (certModalClose) {
    certModalClose.addEventListener('click', closeCertModal);
  }

  if (modalCertCloseBtn) {
    modalCertCloseBtn.addEventListener('click', closeCertModal);
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }

  // Generate High-Resolution Certificate Image via Canvas & Download
  function downloadCertificate() {
    // Show toast
    if (window.showToast) {
      window.showToast('Generating high-resolution AI Certificate...', 'info');
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // High-res dimensions (1920x1080 standard 16:9 cert format)
    canvas.width = 1920;
    canvas.height = 1080;

    // 1. Deep Tech Gradient Background
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, '#07090e');
    bgGrad.addColorStop(0.5, '#0d1322');
    bgGrad.addColorStop(1, '#080c16');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Cyberpunk Grid lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // 3. Neon Border Frame
    const borderGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    borderGrad.addColorStop(0, '#00f0ff');
    borderGrad.addColorStop(0.5, '#9d4edd');
    borderGrad.addColorStop(1, '#00ff9d');

    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 6;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // Inner thin border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(80, 80, canvas.width - 160, canvas.height - 160);

    // Decorative corner markers
    const corners = [
      [60, 60],
      [canvas.width - 60, 60],
      [60, canvas.height - 60],
      [canvas.width - 60, canvas.height - 60]
    ];
    ctx.fillStyle = '#00f0ff';
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. Header Text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 26px "Space Grotesk", sans-serif';
    ctx.fillText('GLOBAL AI CREDENTIAL COUNCIL', canvas.width / 2, 170);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px "JetBrains Mono", monospace';
    ctx.fillText('VERIFIED CREDENTIAL ID: AS-AIML-2026-X984  •  CRYPTOGRAPHIC PROOF ATTESTED', canvas.width / 2, 210);

    // Divider Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(400, 240);
    ctx.lineTo(canvas.width - 400, 240);
    ctx.stroke();

    // 5. Main Certificate Title
    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 22px "Space Grotesk", sans-serif';
    ctx.fillText('CERTIFICATE OF EXCELLENCE', canvas.width / 2, 310);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Space Grotesk", sans-serif';
    ctx.fillText('Artificial Intelligence & Machine Learning Foundations', canvas.width / 2, 380);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 22px "Outfit", sans-serif';
    ctx.fillText('This autonomous distinction is presented to', canvas.width / 2, 450);

    // Recipient Name
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 64px "Space Grotesk", sans-serif';
    ctx.shadowColor = 'rgba(0, 240, 255, 0.6)';
    ctx.shadowBlur = 20;
    ctx.fillText('ADITYA SONI', canvas.width / 2, 540);
    ctx.shadowBlur = 0; // reset shadow

    // Underline
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 250, 565);
    ctx.lineTo(canvas.width / 2 + 250, 565);
    ctx.stroke();

    // Description text
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '22px "Outfit", sans-serif';
    const textLine1 = 'In recognition of demonstrated proficiency in Python for Scientific Computing,';
    const textLine2 = 'Data Structures & Algorithmic Problem Solving, Foundational Machine Learning Pipelines,';
    const textLine3 = 'and practical dedication toward engineering real-world AI applications and startup ideas.';
    ctx.fillText(textLine1, canvas.width / 2, 630);
    ctx.fillText(textLine2, canvas.width / 2, 670);
    ctx.fillText(textLine3, canvas.width / 2, 710);

    // 6. Footer & Signatures
    // Left Sig
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Space Grotesk", sans-serif';
    ctx.fillText('Autonomous AI Verification System', 220, 880);
    ctx.fillStyle = '#64748b';
    ctx.font = '16px "Outfit", sans-serif';
    ctx.fillText('Neural Knowledge Consensus Network', 220, 910);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(220, 850);
    ctx.lineTo(480, 850);
    ctx.stroke();

    // Center Hologram Badge
    ctx.save();
    ctx.translate(canvas.width / 2, 880);
    ctx.beginPath();
    ctx.arc(0, 0, 55, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 222, 89, 0.12)';
    ctx.fill();
    ctx.strokeStyle = '#ffde59';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]);
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffde59';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.fillText('★ VERIFIED ★', 0, -5);
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText('SEAL 2026', 0, 18);
    ctx.restore();

    // Right Sig
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Space Grotesk", sans-serif';
    ctx.fillText('Academic Assessment Board', canvas.width - 220, 880);
    ctx.fillStyle = '#64748b';
    ctx.font = '16px "Outfit", sans-serif';
    ctx.fillText('B.Tech Undergraduate Technical Council', canvas.width - 220, 910);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(canvas.width - 480, 850);
    ctx.lineTo(canvas.width - 220, 850);
    ctx.stroke();

    // 7. Trigger Direct Download
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = 'Aditya_Soni_AI_ML_Certificate.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      if (window.showToast) {
        window.showToast('AI Certificate downloaded successfully!', 'success');
      }
    }, 400);
  }

  if (downloadCertBtn) {
    downloadCertBtn.addEventListener('click', downloadCertificate);
  }

  if (modalCertDownloadBtn) {
    modalCertDownloadBtn.addEventListener('click', downloadCertificate);
  }
});
