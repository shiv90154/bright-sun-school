// assets/js/main.js - UPDATED VERSION
document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
    setActiveNavLink();
    initMobileMenu();
    
    // Set current year in copyright
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Function to dynamically determine base path
function getBasePath() {
    const currentPath = window.location.pathname;
    
    // Check if we're in pages directory
    if (currentPath.includes('/pages/')) {
        return '../components/';
    } else {
        return 'components/';
    }
}

// Load navbar and footer components
async function loadComponents() {
    const basePath = getBasePath();
    
    try {
        // Load navbar
        const navResponse = await fetch(basePath + 'navbar.html');
        const navData = await navResponse.text();
        document.getElementById('navbar-container').innerHTML = navData;
        
        // Load footer
        const footerResponse = await fetch(basePath + 'footer.html');
        const footerData = await footerResponse.text();
        if (document.getElementById('footer-container')) {
            document.getElementById('footer-container').innerHTML = footerData;
        }
        
        // Re-initialize after components are loaded
        initMobileMenu();
        setActiveNavLink();
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkPage = linkHref.split('/').pop();
        
        // Check for index.html or home
        if (currentPage === '' || currentPage === 'index.html' || currentPage.includes('bright-sun-school')) {
            if (linkHref === 'index.html' || linkHref === './' || linkHref === '/') {
                link.classList.add('active');
            }
        }
        // Check for other pages
        else if (linkPage === currentPage) {
            link.classList.add('active');
        }
        // Check for pages in subdirectories
        else if (linkHref.includes(currentPage.replace('.html', ''))) {
            link.classList.add('active');
        }
    });
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }
}

// Form validation functions remain same...