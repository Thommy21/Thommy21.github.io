// Check initial viewport width on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    checkViewportWidth();
    checkMenuScrollPosition();
});

// Function to check and update menu styles based on viewport width
function checkViewportWidth () {
    const menuContainer = document.querySelector('.container-menu');
    if (menuContainer) {
        const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

        if (viewportWidth >= 768) {
            menuContainer.classList.add("menu-desktop");
            menuContainer.classList.remove("menu-mobile");
        } else {
            menuContainer.classList.add("menu-mobile");
            menuContainer.classList.remove("menu-desktop");
        }
    }
};

// Monitor viewport width changes
window.addEventListener('resize', checkViewportWidth);

// Show/hide fly-out mobile menu
const menuIcon = document.querySelector('.item-icon');
if (menuIcon) {
    menuIcon.addEventListener('click', toggleMobileMenu);
}

// Function to toggle the mobile menu
function toggleMobileMenu () {
    const menuIcon = document.querySelector('.item-icon');
    const menuContainer = document.querySelector('.container-menu');
    const menuList = document.querySelector('.container-menu ul');
    const htmlElement = document.querySelector('html');

    if (menuIcon && menuContainer && menuList) {
        menuIcon.classList.toggle("change");

        // If fly-out menu is currently hidden, display it
        if (menuIcon.classList.contains('change')) {
            menuList.classList.add('mobile-display');
            menuContainer.classList.add('menu-on-scroll');
            htmlElement.classList.add('no-scroll');
        } 
        // If fly-out menu is currently open, close it
        else {
            menuList.classList.remove('mobile-display');
            menuContainer.classList.remove('menu-on-scroll');
            htmlElement.classList.remove('no-scroll');
        }
    }
};

// Add scroll event listener to update menu styles on scroll
const menuContainer = document.querySelector('.container-menu');
if (menuContainer) {
    window.addEventListener('scroll', swapMenuStyle);
}

// Function to update menu styles based on scroll position
function swapMenuStyle () {
    const menuContainer = document.querySelector('.container-menu');
    if (menuContainer) {
        const scrollThreshold = menuContainer.offsetTop + 300;

        if (window.pageYOffset > scrollThreshold) {
            menuContainer.classList.add("menu-on-scroll");
        } else {
            menuContainer.classList.remove("menu-on-scroll");
        }
    }
};

// Check initial menu scroll position on DOMContentLoaded
function checkMenuScrollPosition (){
    const menuContainer = document.querySelector('.container-menu');
    if (menuContainer && window.scrollY === 0) {
        menuContainer.classList.remove("menu-on-scroll");
    }
};