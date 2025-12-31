// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        menuToggle.textContent = sidebar.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
        menuToggle.textContent = '☰';
    });

    // Close menu when clicking a nav item on mobile
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                mobileOverlay.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    });

    // Close menu on window resize if desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    });
});