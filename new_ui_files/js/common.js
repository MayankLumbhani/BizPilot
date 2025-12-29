// common.js

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileOverlay = document.getElementById('mobileOverlay');
const sidebar = document.querySelector('.sidebar');

function toggleMobileMenu() {
  sidebar.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
}

function closeMobileMenu() {
  sidebar.classList.remove('active');
  mobileOverlay.classList.remove('active');
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}
if (mobileOverlay) {
  mobileOverlay.addEventListener('click', closeMobileMenu);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 999;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}
