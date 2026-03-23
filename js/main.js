document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile drawer toggle with height animation ---
    const toggleBtn = document.querySelector('#collapsed-nav .nav-toggle');
    const drawer = document.getElementById('mobile-drawer');

    const boxes = document.querySelectorAll('.box');
    const aside = document.querySelector('aside');

    if (toggleBtn && drawer) {
        // drawer height here
        const EXPANDED_HEIGHT = '180px';

        function openDrawer() {
            drawer.style.display = 'grid';
            void drawer.offsetHeight;               // force reflow
            drawer.style.maxHeight = EXPANDED_HEIGHT;

            // Add blur to boxes and aside
            boxes.forEach(box => box.classList.add('box-blur'));
            if (aside) aside.classList.add('box-blur');

            // Disable clicks on aside
            if (aside) aside.classList.add('aside-disabled');
        }

        function closeDrawer() {
            if (drawer.style.display !== 'grid') return;

            drawer.style.maxHeight = '0';

            // Remove blur
            boxes.forEach(box => box.classList.remove('box-blur'));
            if (aside) aside.classList.remove('box-blur');

            // Re-enable clicks on aside
            if (aside) aside.classList.remove('aside-disabled');

            drawer.addEventListener('transitionend', function onEnd() {
                if (drawer.style.maxHeight === '0px') {
                    drawer.style.display = 'none';
                }
                drawer.removeEventListener('transitionend', onEnd);
            }, { once: true });
        }

        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (drawer.style.display === 'grid') {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        document.addEventListener('click', function(e) {
            if (!toggleBtn.contains(e.target) && !drawer.contains(e.target)) {
                closeDrawer();
            }
        });
    }
});

// --- Read-more toggle function ---

function toggleReadMore(button) {
    const moreContent = button.nextElementSibling;

    if (moreContent.style.display === "block") {
        moreContent.style.display = "none";
        button.textContent = "Read more";
    } else {
        moreContent.style.display = "block";
        button.textContent = "Read less";
    }
}