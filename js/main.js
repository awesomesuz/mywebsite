document.addEventListener('DOMContentLoaded', function() {
    const fullNav = document.getElementById('full-nav');
    const collapsedNav = document.getElementById('collapsed-nav');
    const fullNavButton = fullNav.querySelector('.nav-toggle');
    const collapsedNavButton = collapsedNav.querySelector('.nav-toggle');
    
    if (!fullNav || !collapsedNav) return;
    
    // Copy active link
    const activeLink = document.querySelector('#full-nav a.active');
    if (activeLink && collapsedNav.querySelector('.collapsed-nav-content')) {
        collapsedNav.querySelector('.collapsed-nav-content').innerHTML = activeLink.outerHTML;
    }
    
    // Toggle function
    function toggleNav() {
        if (fullNav.style.display !== 'none') {
            // Switching from full nav to collapsed nav
            fullNav.style.display = 'none';
            collapsedNav.style.display = 'block';
        } else {
            // Switching from collapsed nav to full nav
            collapsedNav.style.display = 'none';
            fullNav.style.display = 'block';
        }
    }
    
    // Add click event to buttons
    if (collapsedNavButton) {
        collapsedNavButton.addEventListener('click', toggleNav);
    }
    if (fullNavButton) {
        fullNavButton.addEventListener('click', toggleNav);
    }
    
    // Auto-switch when scrolling
    let hasAutoSwitched = false;
    let ticking = false;
    
    function checkNavPosition() {
        if (window.innerWidth >= 790) return;
        if (hasAutoSwitched) return;
        if (collapsedNav.style.display === 'block') return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Get nav position
        const navRect = fullNav.getBoundingClientRect();
        const distanceFromTop = navRect.top; // Distance from viewport top
        
        // Toggle when nav is 10px or less from top
        if (distanceFromTop <= 10) {
            fullNav.style.display = 'none';
            collapsedNav.style.display = 'block';
            hasAutoSwitched = true;
            
            // Show button on full-nav for future toggles
            fullNavButton.style.display = 'block';
        }
    }
    
    // Scroll listener
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                checkNavPosition();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Handle resize
    function handleResize() {
        if (window.innerWidth >= 790) {
            // Desktop
            fullNav.style.display = 'block';
            collapsedNav.style.display = 'none';
            fullNavButton.style.display = 'none';
            hasAutoSwitched = false;
        } else {
            // Mobile
            fullNav.style.display = 'block';
            collapsedNav.style.display = 'none';
            fullNavButton.style.display = 'none'; // Keep hidden initially
            hasAutoSwitched = false;
            checkNavPosition();
        }
    }
    
    // Initial setup
    handleResize();
    window.addEventListener('resize', handleResize);
});

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