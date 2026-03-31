document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.project-sidebar');
    const layout = document.querySelector('.project-layout');

    if (!toggleBtn || !sidebar || !layout) return;

    function closeSidebar() {
        sidebar.classList.remove('open');
        layout.classList.remove('sidebar-open');
    }

    function openSidebar() {
        sidebar.classList.add('open');
        layout.classList.add('sidebar-open');
    }

    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();

        if (sidebar.classList.contains('open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // Optional: close sidebar when clicking on blurred content
    const mainContent = document.querySelector('.project-main');

    if (mainContent) {
        mainContent.addEventListener('click', function() {
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 780) {
            closeSidebar();
        }
    });
});